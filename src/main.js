import { renderTemplate, RenderPosition, render } from './render.js';
import MenuView from './view/menu-view.js';
import FilterView from './view/filters-view.js';
import SortView from './view/sort-view.js';
import FormCreateView from './view/form-create-view.js';
import ListElementView from './view/list-view.js';
import { createFormEditTemplate } from './view/form-edit-view.js';
import { createListItemTemplate } from './view/list-item-view.js';
import { generatePoint } from './mock/point.js';
import { createTripInfoTemplate } from './view/header-trip-info-view.js';

const ITEMS_COUNT = 15;

const points = Array.from({length: ITEMS_COUNT}, generatePoint);
const tripControlsElement = document.querySelector('.trip-controls__navigation');
const tripFiltersElement = document.querySelector('.trip-controls__filters');

render(tripControlsElement, new MenuView().element, RenderPosition.BEFOREEND);
render(tripFiltersElement, new FilterView().element, RenderPosition.BEFOREEND);

const tripEventsElement = document.querySelector('.trip-events');

render(tripEventsElement, new ListElementView().element, RenderPosition.BEFOREEND);

const tripListElement = tripEventsElement.querySelector('.trip-events__list');

render(tripListElement, new SortView().element, RenderPosition.BEFOREEND);
renderTemplate(tripListElement, createFormEditTemplate(points[0]), RenderPosition.BEFOREEND);
render(tripListElement, new FormCreateView().element, RenderPosition.BEFOREEND);

for (let i = 1; i < ITEMS_COUNT; i++) {
  renderTemplate(tripListElement, createListItemTemplate(points[i]), RenderPosition.BEFOREEND);
}

const tripMainElement = document.querySelector('.trip-main');
renderTemplate(tripMainElement, createTripInfoTemplate(points), RenderPosition.AFTERBEGIN);
