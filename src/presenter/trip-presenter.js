import { RenderPosition, render, remove } from '../utils/render.js';
import { FilterType, SortType, UpdateType, UserAction } from '../utils/const.js';
import { sortDate, sortPrice, sortTime } from '../utils/sort.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import LoadingView from '../view/loading-view.js';
import TripInfoView from '../view/header-trip-info-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointPresenter, { State as PointPresenterViewState } from './point-presenter.js';
import PointNewPresenter from './point-new-presenter.js';
import { filter } from '../utils/filter.js';

export default class TripPresenter {
  #tripContainer = null;
  #tripInfoContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #pointListComponent = new ListView();
  #emptyListComponent = null;
  #sortComponent = null;
  #tripInfoComponent = null;
  #loadingComponent = new LoadingView();

  #pointPresenter = new Map();
  #pointNewPresenter = null;
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

  constructor(tripContainer, tripInfoContainer, tripAddButtonElement, pointsModel, filterModel) {
    this.#tripContainer = tripContainer;
    this.#tripInfoContainer = tripInfoContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#pointNewPresenter = new PointNewPresenter(this.#pointListComponent, tripAddButtonElement, this.#handleViewAction);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPrice);
      case SortType.DEFAULT:
        return filteredPoints.sort(sortDate);
    }

    return this.filteredPoints;
  }

  get destinations() {
    return this.#pointsModel.destinations;
  }

  get offers() {
    return this.#pointsModel.offers;
  }

  init = async (withoutTripInfo) => {

    render(this.#tripContainer, this.#pointListComponent, RenderPosition.BEFOREEND);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#renderTrip(withoutTripInfo);
  }

  destroy = (withoutTripInfo) => {
    if (withoutTripInfo) {
      this.#clearTrip({resetSortType: true}, withoutTripInfo);
    } else {
      this.#clearTrip({resetSortType: true});
    }

    remove(this.#pointListComponent);

    this.#pointsModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  }

  createPoint = () => {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init(this.destinations, this.offers);
  }

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setViewState(PointPresenterViewState.SAVING);
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setViewState(PointPresenterViewState.ABORTING);
        }
        break;
      case UserAction.ADD_POINT:
        this.#pointNewPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#pointNewPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).setViewState(PointPresenterViewState.DELETING);
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setViewState(PointPresenterViewState.ABORTING);
        }
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data, this.destinations, this.offers);
        remove(this.#tripInfoComponent);
        this.#renderTripInfo(this.points);
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip({resetSortType: true});
        this.#renderTrip();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderTrip();
        break;
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTrip();
    this.#renderTrip();
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#tripContainer, this.#sortComponent, RenderPosition.AFTERBEGIN);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, this.destinations, this.offers);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderLoading = () => {
    render(this.#pointListComponent, this.#loadingComponent, RenderPosition.AFTERBEGIN);
  }

  #clearTrip = ({resetSortType = false} = {}, withoutTripInfo) => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    if (!withoutTripInfo) {
      remove(this.#tripInfoComponent);
    }

    remove(this.#loadingComponent);

    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderNoPoints = () => {
    this.#emptyListComponent = new ListEmptyView(this.#filterType);
    render(this.#pointListComponent, this.#emptyListComponent, RenderPosition.BEFOREEND);
  }

  #renderTripInfo = (points) => {
    this.#tripInfoComponent = new TripInfoView(points);
    render(this.#tripInfoContainer, this.#tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  #renderTrip = (withoutTripInfo) => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPoints(this.points);
    if (!withoutTripInfo) {
      this.#renderTripInfo(this.points);
    }
  }
}
