import AbstractView from './abstract-view.js';

const createListElement = () => (
  `<ul class="trip-events__list">
  </ul`
);

export default class ListView extends AbstractView {

  get template() {
    return createListElement();
  }
}
