import dayjs from 'dayjs';
import { getRandomInteger } from '../utils/get-random-integer';
import { nanoid } from 'nanoid';

const CITIES = [
  'Abakan',
  'Cheremushki',
  'Moscow',
  'Spb',
  'Minusink',
  'Krasnoyarsk',
  'Ivanovo',
  'Irkutsk',
  'Chernogorsk'
];

const OFFERS = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      }, {
        id: 2,
        title: 'Choose the radio station',
        price: 60
      }
    ]
  },
  {
    type: 'bus',
  },
  {
    type: 'Train',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'Ship',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'Drive',
    offers: [
      {
        id: 1,
        title: 'Rent a car',
        price: 200
      }
    ]
  },
  {
    type: 'Flight',
    offers: [
      {
        id: 1,
        title: 'Add luggage',
        price: 50
      }, {
        id: 2,
        title: 'Switch to comfort',
        price: 80
      }, {
        id: 3,
        title: 'Add meal',
        price: 15
      }, {
        id: 4,
        title: 'Choose seats',
        price: 5
      }, {
        id: 5,
        title: 'Travel by train',
        price: 40
      }
    ]
  },
  {
    type: 'Check-in',
    offers: [
      {
        id: 1,
        title: 'Add breakfast',
        price: 120
      }
    ]
  },
  {
    type: 'Sightseeing',
    offers: [
      {
        id: 1,
        title: 'Book tickets',
        price: 40
      }, {
        id: 2,
        title: 'Lunch in city',
        price: 30
      }
    ]
  },
  {
    type: 'Restaurant',
  },
];

const DESCRIPTION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
];

const PHOTOS = [
  'http://picsum.photos/248/152?r=0',
  'http://picsum.photos/248/152?r=1',
  'http://picsum.photos/248/152?r=2',
  'http://picsum.photos/248/152?r=3',
  'http://picsum.photos/248/152?r=4',
];

const MAX_MINUTES_GAP = 7200;

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generateDescription = () => DESCRIPTION.slice(0, getRandomInteger(1, DESCRIPTION.length - 1)).join(' ');

const generatePhotos = () => PHOTOS.slice(0, getRandomInteger(1, PHOTOS.length - 1));

const generateDate = () => {
  const minutes = getRandomInteger(0, MAX_MINUTES_GAP);

  return dayjs().add(minutes, 'minute').toDate();
};

export const generatePoint = () => {
  const offer = getRandomArrayElement(OFFERS);

  return {
    id: nanoid(),
    type: offer.type,
    destination: getRandomArrayElement(CITIES),
    options: offer.offers,
    description: generateDescription(),
    photos: generatePhotos(),
    dateStart: generateDate(),
    dateEnd: generateDate(),
    price: getRandomInteger(100, 1000),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
