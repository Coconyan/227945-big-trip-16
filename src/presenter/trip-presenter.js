import { RenderPosition, render } from '../utils/render.js';
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

  constructor(tripContainer, tripInfoContainer) {
    this.#tripContainer = tripContainer;
    this.#tripInfoContainer = tripInfoContainer;
  }

  init = (tripPoints) => {
    this.#tripPoints = [...tripPoints];

    render(this.#tripContainer, this.#pointListComponent, RenderPosition.BEFOREEND);

    this.#renderTrip();
  }

  #renderSort = () => {
    render(this.#tripContainer, this.#sortComponent, RenderPosition.BEFOREEND);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent);
    pointPresenter.init(point);
  }

  #renderPoints = (from, to) => {
    this.#tripPoints
      .slice(from, to)
      .forEach((point) => this.#renderPoint(point)); // todo возможно переделать и убрать слайс
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
    this.#renderPoints(0, this.#tripPoints.length); // todo ВОПРОС
    this.#renderTripInfo(this.#tripPoints);
  }
}
