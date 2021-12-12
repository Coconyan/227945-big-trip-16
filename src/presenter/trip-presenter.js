import { RenderPosition, render, replace } from '../utils/render.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import ListItemEditView from '../view/form-edit-view.js';
import ListItemView from '../view/list-item-view.js';
import TripInfoView from '../view/header-trip-info-view.js';
import ListEmptyView from '../view/list-empty-view.js';


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
    const pointComponent = new ListItemView(point);
    const pointEditComponent = new ListItemEditView(point);

    const replacePointToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setItemClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setEditClickHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(this.#pointListComponent, pointComponent, RenderPosition.BEFOREEND);
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
