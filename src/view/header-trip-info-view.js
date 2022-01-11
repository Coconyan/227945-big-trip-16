import dayjs from 'dayjs';
import AbstractView from './abstract-view.js';

const COUNT_MAX_DISPLAY_POINTS = 3;

const compareDate = (pointA, pointB) => pointA.dateStart.getTime() - pointB.dateStart.getTime();

const createTripLineWithSkip = (points) => {
  let tripLine = '';
  tripLine += `${points[0].destination} &mdash; ... &mdash; `;
  tripLine += `${points[points.length - 1].destination}`;
  return tripLine;
};

const createTripLine = (points) => {
  let tripLine = '';
  points.forEach((point) => {
    tripLine += `${point.destination} &mdash; `;
  });
  tripLine = tripLine.slice(0, -9);
  return tripLine;
};

const getTotalCost = (points) => {
  let totalPrice = 0;
  points.forEach((point) => {
    totalPrice += point.price;
  });
  return totalPrice;
};

const createTripInfoTemplate = (points) => {
  points.sort(compareDate);
  const totalCost = getTotalCost(points);

  const tripLine = points.length > COUNT_MAX_DISPLAY_POINTS
    ? createTripLineWithSkip(points)
    : createTripLine(points);

  return `<section class="trip-main__trip-info  trip-info">
<div class="trip-info__main">
  <h1 class="trip-info__title">${tripLine}</h1>

  <p class="trip-info__dates">${dayjs(points[0].dateStarts).format('MMM DD')} &mdash; ${dayjs(points[points.length - 1].dateEnd).format('MMM DD')}</p>
</div>

<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
</p>
</section>`;};

export default class TripInfoView extends AbstractView {
  #points = null;

  constructor(points) {
    super();
    this.#points = points;
  }

  get template() {
    return createTripInfoTemplate(this.#points);
  }
}
