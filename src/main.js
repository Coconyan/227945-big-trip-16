import { RenderPosition, render } from './utils/render.js';
import { CITIES, generatePoint, OFFERS } from './mock/point.js';
import MenuView from './view/menu-view.js';
import FilterView from './view/filters-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';

const ITEMS_COUNT = 15;

const points = Array.from({length: ITEMS_COUNT}, generatePoint);
const tripControlsElement = document.querySelector('.trip-controls__navigation');
const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');

const pointsModel = new PointsModel();
pointsModel.points = points;

render(tripControlsElement, new MenuView(), RenderPosition.BEFOREEND);
render(tripFiltersElement, new FilterView(), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripEventsElement, tripMainElement, pointsModel);
tripPresenter.init(CITIES, OFFERS);
