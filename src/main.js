import { renderTemplate, RenderPosition, render } from './render.js';
import { createMenuTemplate } from './view/menu-view.js';
import SiteFilterView from './view/filters-view.js';
import { createSortTemplate } from './view/sort-view.js';
import { createFormCreateTemplate } from './view/form-create-view.js';
import { createFormEditTemplate } from './view/form-edit-view.js';
import { createListItemTemplate } from './view/list-item-view.js';
import { createListElement } from './view/list-view.js';
import { generatePoint } from './mock/point.js';
import { createTripInfoTemplate } from './view/header-trip-info-view.js';

const ITEMS_COUNT = 15;

const points = Array.from({length: ITEMS_COUNT}, generatePoint);
const tripControlsElement = document.querySelector('.trip-controls__navigation');
const tripFiltersElement = document.querySelector('.trip-controls__filters');

renderTemplate(tripControlsElement, createMenuTemplate(), RenderPosition.BEFOREEND);
render(tripFiltersElement, new SiteFilterView().element, RenderPosition.BEFOREEND);

const tripEventsElement = document.querySelector('.trip-events');

renderTemplate(tripEventsElement, createListElement(), RenderPosition.BEFOREEND);

const tripListElement = tripEventsElement.querySelector('.trip-events__list');

renderTemplate(tripListElement, createSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripListElement, createFormEditTemplate(points[0]), RenderPosition.BEFOREEND);
renderTemplate(tripListElement, createFormCreateTemplate(), RenderPosition.BEFOREEND);

for (let i = 1; i < ITEMS_COUNT; i++) {
  renderTemplate(tripListElement, createListItemTemplate(points[i]), RenderPosition.BEFOREEND);
}

const tripMainElement = document.querySelector('.trip-main');
renderTemplate(tripMainElement, createTripInfoTemplate(points), RenderPosition.AFTERBEGIN);
