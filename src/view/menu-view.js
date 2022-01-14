import AbstractView from './abstract-view.js';
import { MenuItem } from '../utils/const.js';

const createMenuTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn trip-tabs__btn--active" href="#" value="${MenuItem.POINTS}">Table</a>
    <a class="trip-tabs__btn" href="#" value="${MenuItem.STATISTICS}">Stats</a>
  </nav>`
);

export default class MenuView extends AbstractView {

  get template() {
    return createMenuTemplate();
  }

  setMenuClickHandler = (callback) => {
    this._callback.menuClick = callback;
    this.element.addEventListener('click', this.#menuClickHandler);
  }

  setMenuItem = (menuItem) => {
    const item = this.element.querySelector(`[value=${menuItem}]`);
    const anotherItem = this.element.querySelector(`a:not([value=${menuItem}])`);
    if (item !== null) {
      item.classList.add('trip-tabs__btn--active');
      anotherItem.classList.remove('trip-tabs__btn--active');
    }
  }

  #menuClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.menuClick(evt.target.attributes.value.value);
  }
}
