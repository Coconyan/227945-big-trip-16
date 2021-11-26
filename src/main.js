import { renderTemplate, RenderPosition } from './render.js';
import { createMenuTemplate } from './view/menu-view.js';
import { createFiltersTemplate } from './view/filters-view.js';
import { createSortTemplate } from './view/sort-view.js';
import { createFormCreateTemplate } from './view/form-create-view.js';
import { createFormEditTemplate } from './view/form-edit-view.js';
import { createListItemTemplate } from './view/list-item-view.js';
import { createListElement } from './view/list-view.js';

const ITEMS_COUNT = 3;

const tripControlsElement = document.querySelector('.trip-controls__navigation');
const tripFiltersElement = document.querySelector('.trip-controls__filters');

renderTemplate(tripControlsElement, createMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripFiltersElement, createFiltersTemplate(), RenderPosition.BEFOREEND);

const tripEventsElement = document.querySelector('.trip-events');

renderTemplate(tripEventsElement, createListElement(), RenderPosition.BEFOREEND);

const tripListElement = tripEventsElement.querySelector('.trip-events__list');

renderTemplate(tripListElement, createSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripListElement, createFormEditTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripListElement, createFormCreateTemplate(), RenderPosition.BEFOREEND);

for (let i = 0; i < ITEMS_COUNT; i++) {
  renderTemplate(tripListElement, createListItemTemplate(), RenderPosition.BEFOREEND);
}
