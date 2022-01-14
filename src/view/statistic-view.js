import SmartView from './smart-view.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { msToTime } from '../utils/ms-to-time.js';
import dayjs from 'dayjs';

const getTypeMoney = (points, types) => (
  types.map((type) => {
    let sum = 0;
    points.forEach((point) => {
      if (type === point.type) {
        sum += point.price;
      }
    });
    return sum;
  })
);

const getTypeCount = (points, types) => (
  types.map((type) => {
    let count = 0;
    points.forEach((point) => {
      if (type === point.type) {
        count += 1;
      }
    });
    return count;
  })
);
const getTypeTime = (points, types) => (
  types.map((type) => {
    let time = 0;
    points.forEach((point) => {
      if (type === point.type) {
        time += Math.abs(dayjs(point.dateStart).diff(dayjs(point.dateEnd)));
      }
    });
    return time;
  })
);

const renderMoneyChart = (moneyCtx, points, types) => (
  // график по цене
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
          formatter: (value) => `${msToTime(value)}`,
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
    const moneyCtx = this.element.querySelector('#money');
    const typeCtx = this.element.querySelector('#type');
    const timeCtx = this.element.querySelector('#time');
    const BAR_HEIGHT = 55;
    moneyCtx.height = BAR_HEIGHT * this.#types.length;
    typeCtx.height = BAR_HEIGHT * this.#types.length;
    timeCtx.height = BAR_HEIGHT * this.#types.length;
    renderMoneyChart(moneyCtx, this._data, this.#types);
    renderTypeChart(typeCtx, this._data, this.#types);
    renderTimeChart(timeCtx, this._data, this.#types);
  }
}