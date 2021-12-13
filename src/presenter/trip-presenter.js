import { RenderPosition, render } from '../utils/render.js';
import { updateItem } from '../utils/update-item.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import TripInfoView from '../view/header-trip-info-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';

export default class TripPresenter {
  #tripContainer = null;
  #tripInfoContainer = null;

  #pointListComponent = new ListView();
  #emptyListComponent = new ListEmptyView();
  #sortComponent = new SortView();

  #tripPoints = [];
  #pointPresenter = new Map();

  constructor(tripContainer, tripInfoContainer) {
    this.#tripContainer = tripContainer;
    this.#tripInfoContainer = tripInfoContainer;
  }

  init = (tripPoints) => {
    this.#tripPoints = [...tripPoints];

    render(this.#tripContainer, this.#pointListComponent, RenderPosition.BEFOREEND);

    this.#renderTrip();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  #renderSort = () => {
    render(this.#tripContainer, this.#sortComponent, RenderPosition.AFTERBEGIN);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = () => {
    this.#tripPoints
      .forEach((point) => this.#renderPoint(point)); // todo возможно переделать и убрать слайс
  }

  #clearTripList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #renderNoPoints = () => {
    render(this.#pointListComponent, this.#emptyListComponent, RenderPosition.BEFOREEND);
  }

  #renderTripInfo = (points) => {
    render(this.#tripInfoContainer, new TripInfoView(points), RenderPosition.AFTERBEGIN);
  }

  #renderTrip = () => {
    if (this.#tripPoints.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPoints(); // todo ВОПРОС
    this.#renderTripInfo(this.#tripPoints);
  }
}
