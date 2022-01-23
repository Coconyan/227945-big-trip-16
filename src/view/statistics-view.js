import SmartView from './smart-view.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { convertMsToTime } from '../utils/ms-to-time.js';
import dayjs from 'dayjs';

const getTypeMoney = (points, types) => (
  types.map((type) => points.reduce((accumulator, point) => {
    if (type === point.type) {
      return accumulator + point.price;
    }
    return accumulator;
  }, 0))
);

const getTypeCount = (points, types) => (
  types.map((type) => points.reduce((accumulator, point) => {
    if (type === point.type) {
      return ++accumulator;
    }
    return accumulator;
  }, 0))
);

const getTypeTime = (points, types) => (
  types.map((type) => points.reduce((accumulator, point) => {
    if (type === point.type) {
      return accumulator + Math.abs(dayjs(point.dateStart).diff(dayjs(point.dateEnd)));
    }
    return accumulator;
  }, 0))
);

const renderMoneyChart = (moneyCtx, points, types) => (
  new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types,
      datasets: [{
        data: getTypeMoney(points.points, types),
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (value) => `€ ${value}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  }));

const renderTypeChart = (typeCtx, points, types) => (
  new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types,
      datasets: [{
        data: getTypeCount(points.points, types),
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (value) => `${value}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  })
);

const renderTimeChart = (timeCtx, points, types) => (
  new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: types,
      datasets: [{
        data: getTypeTime(points.points, types),
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 95,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (value) => `${convertMsToTime(value)}`,
        },
      },
      title: {
        display: true,
        text: 'TIME',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  })
);


const createStatisticsTemplate = () => (
  `<section class="statistics">
  <h2 class="visually-hidden">Trip statistics</h2>

  <div class="statistics__item">
    <canvas class="statistics__chart" id="money" width="900"></canvas>
  </div>

  <div class="statistics__item">
    <canvas class="statistics__chart" id="type" width="900"></canvas>
  </div>

  <div class="statistics__item">
    <canvas class="statistics__chart" id="time" width="900"></canvas>
  </div>
</section>`);

export default class StatisticsView extends SmartView {
  #types = [];
  constructor(points, types) {
    super();

    this._data = {
      points,
    };

    this.#types = types.map((type) => type.type);

    this.#setCharts();
  }

  get template() {
    return createStatisticsTemplate(this._data);
  }

  removeElement = () => {
    super.removeElement();
  }


  restoreHandlers = () => {
    this.#setCharts();
  }

  #setCharts = () => {
    const moneyCtxElement = this.element.querySelector('#money');
    const typeCtxElement = this.element.querySelector('#type');
    const timeCtxElement = this.element.querySelector('#time');
    const BAR_HEIGHT = 55;
    moneyCtxElement.height = BAR_HEIGHT * this.#types.length;
    typeCtxElement.height = BAR_HEIGHT * this.#types.length;
    timeCtxElement.height = BAR_HEIGHT * this.#types.length;
    renderMoneyChart(moneyCtxElement, this._data, this.#types);
    renderTypeChart(typeCtxElement, this._data, this.#types);
    renderTimeChart(timeCtxElement, this._data, this.#types);
  }
}
