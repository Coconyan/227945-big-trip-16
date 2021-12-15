import dayjs from 'dayjs';


const getTimeDifference = (from, to) => Math.abs(dayjs(from).diff(dayjs(to)));

export const sortTime = (pointA, pointB) => getTimeDifference(pointB.dateStart, pointB.dateEnd) - getTimeDifference(pointA.dateStart, pointA.dateEnd);
export const sortPrice = (pointA, pointB) => pointB.price - pointA.price;
export const sortDate = (pointA, pointB) => pointA.dateStart.getTime() - pointB.dateStart.getTime();
