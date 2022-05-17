import {dateToString} from './dateToString';

export const ChangeDate = date => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const twoDates = (dateA, dateB) => {
  const yearA = new Date(dateA).getFullYear();
  const yearB = new Date(dateB).getFullYear();
  if (yearA === yearB) {
    return `${dateToString(dateA)} to ${dateToString(dateB)} ${yearA}`;
  } else {
    return `${dateToString(dateA)} ${yearA} to ${dateToString(dateB)} ${yearB}`;
  }
};

export const dateDifference = (dateA, dateB) => {
  const firstDate = new Date(dateA);
  const secondDate = new Date(dateB);
  const diff =
    Math.abs(firstDate.getTime() - secondDate.getTime()) / (1000 * 3600 * 24);
  return diff;
};
