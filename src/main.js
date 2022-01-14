import { RenderPosition, render, remove } from './utils/render.js';
import { CITIES, generatePoint, OFFERS } from './mock/point.js';
import MenuView from './view/menu-view.js';
import StatisticsView from './view/statistic-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import { MenuItem } from './utils/const.js';

const ITEMS_COUNT = 15;

const points = Array.from({length: ITEMS_COUNT}, generatePoint);
const tripControlsElement = document.querySelector('.trip-controls__navigation');
const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const siteMenuComponent = new MenuView();

const pointsModel = new PointsModel();
pointsModel.points = points;

const filterModel = new FilterModel();

render(tripControlsElement, siteMenuComponent, RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripEventsElement, tripMainElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripFiltersElement, filterModel, pointsModel);

let statisticComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.POINTS:
      filterPresenter.init();
      tripPresenter.init(CITIES, OFFERS, true);
      siteMenuComponent.setMenuItem(MenuItem.POINTS);
      remove(statisticComponent);
      break;
    case MenuItem.STATISTICS:
      filterPresenter.destroy();
      tripPresenter.destroy(true);
      siteMenuComponent.setMenuItem(MenuItem.STATISTICS);
      statisticComponent = new StatisticsView(pointsModel.points, OFFERS);
      render(tripEventsElement, statisticComponent, RenderPosition.BEFOREEND);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
tripPresenter.init(CITIES, OFFERS);

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  filterPresenter.destroy();
  filterPresenter.init();
  tripPresenter.destroy();
  tripPresenter.init(CITIES, OFFERS);
  remove(statisticComponent);
  tripPresenter.createPoint();
  siteMenuComponent.setMenuItem(MenuItem.POINTS);
});
