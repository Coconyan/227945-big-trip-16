import { remove, render, RenderPosition } from '../utils/render.js';
import { UserAction, UpdateType } from '../utils/const.js';
import { isEscKey } from '../utils/is-esc-key.js';
import EditView from '../view/edit-view.js';

export default class pointNewPresenter {
  #pointListContainer = null;
  #changeData = null;
  #pointEditComponent = null;
  #tripAddButtonElement = null;

  constructor(pointListContainer, tripAddButtonElement, changeData) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#tripAddButtonElement = tripAddButtonElement;
  }

  init = (destinations, types) => {
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EditView(undefined ,destinations, types);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);
    this.#tripAddButtonElement.disabled = true;

    render(this.#pointListContainer, this.#pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;
    this.#tripAddButtonElement.disabled = false;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving = () => {
    this.#pointEditComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting = () => {
    const resetFormState = () => {
      this.#pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
    this.destroy();
  }

  #handleDeleteClick = () => {
    this.destroy();
  }

  #escKeyDownHandler = (evt) => {
    if (isEscKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
