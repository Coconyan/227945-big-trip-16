import dayjs from 'dayjs';
import { getRandomInteger } from '../utils/get-random-integer';
import { nanoid } from 'nanoid';

export const CITIES = [
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

export const OFFERS = [
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
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'Rent a car',
        price: 200
      }
    ]
  },
  {
    type: 'flight',
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
    type: 'check-in',
    offers: [
      {
        id: 1,
        title: 'Add breakfast',
        price: 120
      }
    ]
  },
  {
    type: 'sightseeing',
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
    type: 'restaurant',
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

export const generateDescription = () => DESCRIPTION.slice(0, getRandomInteger(1, DESCRIPTION.length - 1)).join(' ');

export const generatePhotos = () => PHOTOS.slice(0, getRandomInteger(1, PHOTOS.length - 1));

const generateDate = () => {
  const minutes = getRandomInteger(-3600, MAX_MINUTES_GAP);

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

export const OFFERS_TEST = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 190
      },
      {
        id: 2,
        title: 'Choose the radio station',
        price: 30
      },
      {
        id: 3,
        title: 'Choose temperature',
        price: 170
      },
      {
        id: 4,
        title: 'Drive quickly, I\'m in a hurry',
        price: 100
      },
      {
        id: 5,
        title: 'Drive slowly',
        price: 110
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 1,
        title: 'Infotainment system',
        price: 50
      },
      {
        id: 2,
        title: 'Order meal',
        price: 100
      },
      {
        id: 3,
        title: 'Choose seats',
        price: 190
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'Book a taxi at the arrival point',
        price: 110
      },
      {
        id: 2,
        title: 'Order a breakfast',
        price: 80
      },
      {
        id: 3,
        title: 'Wake up at a certain time',
        price: 140
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'Choose meal',
        price: 120
      },
      {
        id: 2,
        title: 'Choose seats',
        price: 90
      },
      {
        id: 3,
        title: 'Upgrade to comfort class',
        price: 120
      },
      {
        id: 4,
        title: 'Upgrade to business class',
        price: 120
      },
      {
        id: 5,
        title: 'Add luggage',
        price: 170
      },
      {
        id: 6,
        title: 'Business lounge',
        price: 160
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 1,
        title: 'Choose the time of check-in',
        price: 70
      },
      {
        id: 2,
        title: 'Choose the time of check-out',
        price: 190
      },
      {
        id: 3,
        title: 'Add breakfast',
        price: 110
      },
      {
        id: 4,
        title: 'Laundry',
        price: 140
      },
      {
        id: 5,
        title: 'Order a meal from the restaurant',
        price: 30
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: []
  },
  {
    type: 'ship',
    offers: [
      {
        id: 1,
        title: 'Choose meal',
        price: 130
      },
      {
        id: 2,
        title: 'Choose seats',
        price: 160
      },
      {
        id: 3,
        title: 'Upgrade to comfort class',
        price: 170
      },
      {
        id: 4,
        title: 'Upgrade to business class',
        price: 150
      },
      {
        id: 5,
        title: 'Add luggage',
        price: 100
      },
      {
        id: 6,
        title: 'Business lounge',
        price: 40
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'With automatic transmission',
        price: 110
      },
      {
        id: 2,
        title: 'With air conditioning',
        price: 180
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 1,
        title: 'Choose live music',
        price: 150
      },
      {
        id: 2,
        title: 'Choose VIP area',
        price: 70
      }
    ]
  }
];
