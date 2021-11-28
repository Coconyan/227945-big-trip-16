import dayjs from 'dayjs';
// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generateDestination = () => {
  const cities = [
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

  return getRandomArrayElement(cities);
};

const generateOffer = () => {
  const offers = [
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

  return getRandomArrayElement(offers);
};

const generateDescription = () => {
  const description = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
  ];

  return description.slice(0, getRandomInteger(1, description.length - 1)).join(' ');
};

const generatePhotos = () => {
  const photos = [
    'http://picsum.photos/248/152?r=0',
    'http://picsum.photos/248/152?r=1',
    'http://picsum.photos/248/152?r=2',
    'http://picsum.photos/248/152?r=3',
    'http://picsum.photos/248/152?r=4',
  ];
  return photos.slice(0, getRandomInteger(1, photos.length - 1));
};

const generateDate = () => {
  const maxMinutesGap = 480;
  const minutes = getRandomInteger(0, maxMinutesGap);

  return dayjs().add(minutes, 'minute').toDate();
};

export const generatePoint = () => {
  const offer = generateOffer();

  return {
    type: offer.type,
    destination: generateDestination(),
    options: offer.offers,
    description: generateDescription(),
    photos: generatePhotos(),
    dateStart: generateDate(),
    dateEnd: generateDate(),
    price: getRandomInteger(100, 1000),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
