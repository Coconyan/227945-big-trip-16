import dayjs from 'dayjs';
import he from 'he';
import { generateDescription, generatePhotos } from '../mock/point.js';
import SmartView from './smart-view.js';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';
const BLANK_POINT = {
  type: 'flight',
  destination: '',
  options: '',
  description: '',
  photos: [''],
  dateStart: Date.now(),
  dateEnd: Date.now(),
  price: 0,
  isFavorite: false,
};

const DEFAULT_DATAPICKER_SETTING = {
  dateFormat: 'j/m/Y H:i',
  enableTime: true,
  // eslint-disable-next-line camelcase
  time_24hr: true,
};

const createAvailableOfferList = (options) => (
  options ? options.map((option) => `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${option.id}" type="checkbox" name="event-offer-luggage" checked>
    <label class="event__offer-label" for="event-offer-luggage-${option.id}">
      <span class="event__offer-title">${option.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${option.price}</span>
    </label>
  </div>`).join('') : ''
);

const createPhotosList = (photos) => (
  photos ? photos.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`).join('') : ''
);

const createDestinationsList = (destinations) => (
  destinations ? destinations.map((destination) => `<option value="${destination}"></option>`).join('') : ''
);

const createFormEditTemplate = (data, destinations, types) => {
  const {dateStart, dateEnd, type, destination, price, description, photos} = data;
  const currentType = types.filter((x) => x.type === type);
  const optionsList = createAvailableOfferList(currentType[0].offers);
  const photosList = createPhotosList(photos);
  const destinationsList = createDestinationsList(destinations);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight">
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destination)}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destinationsList}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(dateStart).format('DD/MM/YY hh:mm')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(dateEnd).format('DD/MM/YY hh:mm')}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${optionsList}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>
        </section>
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${photosList}
          </div>
        </div>
      </section>
    </form>
  </li>`;
};

export default class EditView extends SmartView {
  #destinations = [];
  #types = [];
  #datepickerStart = null;
  #datepickerEnd = null;

  constructor(point = BLANK_POINT, destinations, types) {
    super();
    this._data = EditView.parsePointToData(point);
    this.#destinations = [...destinations];
    this.#types = [...types];

    this.#setInnerHandlers();
    this.#setDatepickerStart();
    this.#setDatepickerEnd();
  }

  get template() {
    return createFormEditTemplate(this._data, this.#destinations, this.#types);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
    }

    if (this.#datepickerEnd) {
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }
  }

  reset = (point) => {
    this.updateData(
      EditView.parsePointToData(point),
    );
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepickerStart();
    this.#setDatepickerEnd();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  setEditClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickEditItemHandler);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(EditView.parseDataToPoint(this._data));
  }

  #clickEditItemHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }

  #setDatepickerStart = () => {
    this.#datepickerStart = flatpickr(
      this.element.querySelector('input[name="event-start-time"]'),
      Object.assign({}, DEFAULT_DATAPICKER_SETTING,
        {
          defaultDate: this._data.dateStart,
          minDate: 'today',
          onChange: this.#dateStartChangeHandler,
        },
      ));
  }

  #setDatepickerEnd = () => {
    this.#datepickerEnd = flatpickr(
      this.element.querySelector('input[name="event-end-time"]'),
      Object.assign({}, DEFAULT_DATAPICKER_SETTING,
        {
          defaultDate: this._data.dateEnd,
          minDate: this._data.dateStart,
          onChange: this.#dateEndChangeHandler,
        },
      ));
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeGroupHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#clickEditItemHandler);
  }

  #priceChangeHandler = (evt) => {
    this.updateData({
      price: +evt.target.value,
    });
  }

  #dateStartChangeHandler = ([userDate]) => {
    this.updateData({
      dateStart: userDate,
    });
  }

  #dateEndChangeHandler = ([userDate]) => {
    this.updateData({
      dateEnd: userDate,
    });
  }

  #typeGroupHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
    });
  }

  #destinationHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      destination: evt.target.value,
      photos: generatePhotos(),
      description: generateDescription(),
    });
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditView.parseDataToPoint(this._data));
  }

  static parsePointToData = (point) => ({...point});

  static parseDataToPoint = (data) => {
    const point = {...data};
    return point;
  }
}

