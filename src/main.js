import { RenderPosition, render } from './utils/render.js';
import { CITIES, generatePoint, OFFERS } from './mock/point.js';
import MenuView from './view/menu-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const ITEMS_COUNT = 15;

const points = Array.from({length: ITEMS_COUNT}, generatePoint);
const tripControlsElement = document.querySelector('.trip-controls__navigation');
const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');

const pointsModel = new PointsModel();
pointsModel.points = points;

const filterModel = new FilterModel();

render(tripControlsElement, new MenuView(), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripEventsElement, tripMainElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripFiltersElement, filterModel, pointsModel);
filterPresenter.init();
tripPresenter.init(CITIES, OFFERS);

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createTask();
});
