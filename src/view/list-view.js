import { createElement } from '../render.js';

const createListElement = () => (
  `<ul class="trip-events__list">
  </ul`
);

export default class ListView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createListElement();
  }

  removeElement() {
    this.#element = null;
  }
}
