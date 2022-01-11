import { FilterType } from '../utils/const.js';
import AbstractView from './abstract-view.js';

const EmptyListTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

const createListEmptyTemplate = (filterType) => {
  const emptyListTextValue = EmptyListTextType[filterType];

  return (
    `<p class="trip-events__msg">
      ${emptyListTextValue}
    </p>`);
};

export default class ListEmptyView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return createListEmptyTemplate(this._data);
  }
}
