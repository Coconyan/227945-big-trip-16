import { RenderPosition, render, replace } from './utils/render.js';
import { generatePoint } from './mock/point.js';
import MenuView from './view/menu-view.js';
import FilterView from './view/filters-view.js';
import SortView from './view/sort-view.js';
import ListView from './view/list-view.js';
import ListItemEditView from './view/form-edit-view.js';
import ListItemView from './view/list-item-view.js';
import TripInfoView from './view/header-trip-info-view.js';
import ListEmptyView from './view/list-empty-view.js';

const ITEMS_COUNT = 15;

const points = Array.from({length: ITEMS_COUNT}, generatePoint);
const tripControlsElement = document.querySelector('.trip-controls__navigation');
const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const renderPoint = (tripListElement, point) => {
  const pointComponent = new ListItemView(point);
  const pointEditComponent = new ListItemEditView(point);

  const replacePointToForm = () => {
    replace(pointEditComponent, pointComponent);
  };

  const replaceFormToPoint = () => {
    replace(pointComponent, pointEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.setItemClickHandler(() => {
    replacePointToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setEditClickHandler(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setFormSubmitHandler(() => {
    replaceFormToPoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(tripListElement, pointComponent, RenderPosition.BEFOREEND);
};

const renderTrip = (tripPoints) => {
  if (tripPoints.length === 0) {
    render(tripEventsElement, new ListEmptyView(), RenderPosition.BEFOREEND);
    return;
  }

  const pointListComponent = new ListView();
  render(tripEventsElement, pointListComponent, RenderPosition.BEFOREEND);
  render(pointListComponent, new SortView(), RenderPosition.BEFOREEND);

  for (let i = 0; i < ITEMS_COUNT; i++) {
    renderPoint(pointListComponent, points[i]);
  }

  const tripMainElement = document.querySelector('.trip-main');
  render(tripMainElement, new TripInfoView(points), RenderPosition.AFTERBEGIN);
};

render(tripControlsElement, new MenuView(), RenderPosition.BEFOREEND);
render(tripFiltersElement, new FilterView(), RenderPosition.BEFOREEND);
renderTrip(points);
