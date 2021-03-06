import dayjs from 'dayjs';
import { convertMsToTime } from '../utils/ms-to-time.js';
import AbstractView from './abstract-view.js';

const createOptionsList = (options) => (
  options ? options.map((option) => `<li class="event__offer">
  <span class="event__offer-title">${option.title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${option.price}</span>
</li>`).join('') : ''
);

const createListItemTemplate = (point) => {
  const {dateStart, dateEnd, type, offers, destination, price, isFavorite} = point;
  const dateStartDayJs = dayjs(dateStart);
  const dateEndDayJs = dayjs(dateEnd);
  const optionsList = createOptionsList(offers);

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn event__favorite-btn--active'
    : 'event__favorite-btn';

  const timeDifference = convertMsToTime(Math.abs(dateStartDayJs.diff(dateEndDayJs)));
  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dayjs(dateStartDayJs).format('YYYY-MM-DD')}">${dayjs(dateStartDayJs).format('MMM DD')}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dayjs(dateStartDayJs).format('YYYY-MM-DDThh:mm')}">${dayjs(dateStartDayJs).format('hh:mm')}</time>
          &mdash;
          <time class="event__end-time" datetime="${dayjs(dateEndDayJs).format('YYYY-MM-DDThh:mm')}">${dayjs(dateEndDayJs).format('hh:mm')}</time>
        </p>
        <p class="event__duration">${timeDifference}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${optionsList}
      </ul>
      <button class="${favoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class ListItemView extends AbstractView {
  #point = null;
  _callback = {};

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createListItemTemplate(this.#point);
  }

  setItemClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickItemHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  #clickItemHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
}
