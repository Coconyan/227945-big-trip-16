import { RenderPosition, render, replace } from '../utils/render.js';
import ListItemView from '../view/list-item-view.js';
import ListItemEditView from '../view/form-edit-view.js';

export default class PointPresenter {
  #tripListContainer = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;

  constructor(tripListContainer) {
    this.#tripListContainer = tripListContainer;
  }

  init = (point) => {
    this.#point = point;

    this.#pointComponent = new ListItemView(point);
    this.#pointEditComponent = new ListItemEditView(point);

    this.#pointComponent.setItemClickHandler(this.#handlePointClick);
    this.#pointEditComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);

    render(this.#tripListContainer, this.#pointComponent, RenderPosition.BEFOREEND);
  }

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handlePointClick = () => {
    this.#replacePointToForm();
  };

  #handleEditClick = () => {
    this.#replaceFormToPoint();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
  };
}
