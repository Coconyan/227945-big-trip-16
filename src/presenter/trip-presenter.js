import { RenderPosition, render, remove } from '../utils/render.js';
import { SortType, UpdateType, UserAction } from '../utils/const.js';
import { sortDate, sortPrice, sortTime } from '../utils/sort.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import TripInfoView from '../view/header-trip-info-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';

export default class TripPresenter {
  #tripContainer = null;
  #tripInfoContainer = null;
  #pointsModel = null;

  #pointListComponent = new ListView();
  #emptyListComponent = new ListEmptyView();
  #sortComponent = null;
  #tripInfoComponent = null;

  #pointPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #destinations = [];
  #types = [];

  constructor(tripContainer, tripInfoContainer, pointsModel) {
    this.#tripContainer = tripContainer;
    this.#tripInfoContainer = tripInfoContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortTime);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortPrice);
      case SortType.DEFAULT:
        return [...this.#pointsModel.points].sort(sortDate);
    }

    return this.#pointsModel.points;
  }

  init = (destinations, types) => {
    this.#destinations = [...destinations];
    this.#types = [...types];

    render(this.#tripContainer, this.#pointListComponent, RenderPosition.BEFOREEND);

    this.#renderTrip();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data, this.#destinations, this.#types);
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
    pointPresenter.init(point, this.#destinations, this.#types);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  }

  #clearTrip = ({resetSortType = false} = {}) => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#emptyListComponent);
    remove(this.#tripInfoComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderNoPoints = () => {
    render(this.#pointListComponent, this.#emptyListComponent, RenderPosition.BEFOREEND);
  }

  #renderTripInfo = (points) => { // todo вынести в отдельный презентер
    this.#tripInfoComponent = new TripInfoView(points);
    render(this.#tripInfoContainer, this.#tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  #renderTrip = () => {
    if (this.points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPoints(this.points);
    this.#renderTripInfo(this.points);
  }
}
