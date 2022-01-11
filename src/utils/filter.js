import dayjs from 'dayjs';
import { FilterType } from '../utils/const.js';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => +dayjs(point.dateStart) >= Date.now()),
  [FilterType.PAST]: (points) => points.filter((point) => +dayjs(point.dateEnd) < Date.now()),
};
