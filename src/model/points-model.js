import AbstractObservable from '../utils/abstract-observable.js';
import { UpdateType } from '../utils/const.js';

export default class PointsModel extends AbstractObservable {
  #apiService = null;
  #points = [];
  #destinations = [];
  #offers = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;

  }

  init = async () => {
    try {
      const points = await this.#apiService.points;
      this.#destinations = await this.#apiService.destinations;
      this.#offers = await this.#apiService.offers;
      this.#points = points.map(this.#adaptToClient);
    } catch(err) {
      this.#points = [];
      this.#destinations = [];
      this.#offers = [];
    }

    this._notify(UpdateType.INIT);
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  updatePoint = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#apiService.updatePoint(this.#adaptToServer(update));
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  addPoint = async (updateType, update) => {
    try {
      const response = await this.#apiService.addPoint(this.#adaptToServer(update));
      const newPoint = this.#adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add point');
    }
  }

  #adaptToServer = (point) => {
    const adaptedPoint = {...point,
      'base_price': point.price,
      'date_from': point.dateStart instanceof Date ? point.dateStart.toISOString() : null,
      'date_to': point.dateEnd instanceof Date ? point.dateEnd.toISOString() : null,
      'is_favorite': point.isFavorite,
    };

    delete adaptedPoint.price;
    delete adaptedPoint.dateStart;
    delete adaptedPoint.dateEnd;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }

  #adaptToClient = (point) => {
    const adaptedPoint = {...point,
      price: point['base_price'],
      dateStart: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateEnd: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }

  deletePoint = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#apiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete point');
    }
  }
}
