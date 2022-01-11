import AbstractView from './abstract-view.js';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return (
    `<div class="trip-filters__filter">
      <input
        type="radio"
        id="filter-${name}"
        class="trip-filters__filter-input  visually-hidden"
        name="trip-filter"
        ${type === currentFilterType ? 'checked' : ''}
        ${count === 0 ? 'disabled' : ''}
        value="${type}"
      />
      <label for="filter-${name}" class="trip-filters__filter-label">${name}</label>
    </div>`
  );
};

const createFiltersTemplate = (filterItems, currentFilterType) => (
  `<form class="trip-filters" action="#" method="get">
    ${filterItems.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class SiteFilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }
}
