import dayjs from 'dayjs';
import he from 'he';
import SmartView from './smart-view.js';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  type: 'flight',
  destination: '',
  options: '',
  description: '',
  photos: [''],
  dateStart: dayjs().toDate(),
  dateEnd: dayjs().toDate(),
  price: 0,
  isFavorite: false,
  isNewPoint: true,
};

const DEFAULT_DATAPICKER_SETTING = {
  dateFormat: 'j/m/Y H:i',
  enableTime: true,
  // eslint-disable-next-line camelcase
  time_24hr: true,
};

const createAvailableOfferList = (options, offers) => (
  options ? options.map((option) => `<div class="event__offer-selector">
    <input 
      class="event__offer-checkbox  
      visually-hidden" 
      id="event-offer-${option.id}" 
      type="checkbox" 
      name="event-offer-${option.id}" 
      ${offers.find((offer) => offer.id === option.id) ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-${option.id}">
      <span class="event__offer-title">${option.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${option.price}</span>
    </label>
  </div>`).join('') : ''
);

const createPhotosList = (photos) => (
  photos ? photos.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`).join('') : ''
);

const createDestinationsList = (destinations) => (
  destinations ? destinations.map((destination) => `<option value="${destination.name}"></option>`).join('') : ''
);

const createFormEditTemplate = (data, destinations, types) => {
  const {dateStart, dateEnd, type, destination, price, offers} = data;
  const currentType = types.filter((x) => x.type === type);
  const optionsList = createAvailableOfferList(currentType[0].offers, offers.length !== 0 ? offers : []);
  const photosList = createPhotosList(destination.pictures);
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
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${type === 'taxi' ? ' checked' : ''}>
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${type === 'bus' ? ' checked' : ''}>
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${type === 'train' ? ' checked' : ''}>
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${type === 'ship' ? ' checked' : ''}>
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${type === 'drive' ? ' checked' : ''}>
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${type === 'flight' ? ' checked' : ''}>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${type === 'check-in' ? ' checked' : ''}>
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${type === 'sightseeing' ? ' checked' : ''}>
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${type === 'restaurant' ? ' checked' : ''}>
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destination.name)}" list="destination-list-1">
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
        <button class="event__reset-btn" type="reset">${data.isNewPoint ? 'Cancel' : 'Delete'}</button>        
        <button class="event__rollup-btn" type="button" ${data.isNewPoint ? 'style="display: none !important"' : ''}>
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
          <p class="event__destination-description">${destination.description}</p>
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
      .addEventListener('input', this.#priceChangeHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationHandler);
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#clickEditItemHandler);
    this.element.querySelector('.event__available-offers')
      .addEventListener('change', this.#availableOffersHandler);
  }

  #priceChangeHandler = (evt) => {
    this.updateData({
      price: Number(evt.target.value),
    }, true);
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
      offers: [],
    });
  }

  #availableOffersHandler = (evt) => {
    const currentType = this.#types.filter((x) => x.type === this._data.type);
    const checkedOffers = [];
    currentType[0].offers.forEach((offer) => {
      if (evt.currentTarget.querySelector(`#event-offer-${offer.id}:checked`)) {
        checkedOffers.push({id: offer.id, title: offer.title, price: offer.price});
      }
    });
    this.updateData({
      offers: checkedOffers,
    }, true);
  }

  #destinationHandler = (evt) => {
    evt.preventDefault();
    const currentDestination = this.#destinations.find((destination) => destination.name === evt.target.value);
    this.updateData({
      destination: {
        name: evt.target.value,
        description: currentDestination.description,
        pictures: currentDestination.pictures
      }
    });
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    if (this._data.isNewPoint) {
      delete this._data.isNewPoint;
    }
    this._callback.formSubmit(EditView.parseDataToPoint(this._data));
  }

  static parsePointToData = (point) => ({...point});

  static parseDataToPoint = (data) => {
    const point = {...data};
    return point;
  }
}

