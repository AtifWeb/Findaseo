import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
} from "date-fns";

export const thisMonth = () => {
  const dates = [];
  let startOfTheMonth = startOfMonth(new Date());
  const endOfTheMonth = endOfMonth(new Date());

  while (startOfTheMonth.getTime() < endOfTheMonth.getTime()) {
    dates.push(format(startOfTheMonth, "PP"));
    startOfTheMonth = addDays(startOfTheMonth, 1);
  }

  return dates;
};

export const lastMonth = () => {
  const dates = [];
  let startOfTheMonth = startOfMonth(subMonths(new Date(), 1));
  const endOfTheMonth = endOfMonth(subMonths(new Date(), 1));

  while (startOfTheMonth.getTime() < endOfTheMonth.getTime()) {
    dates.push(format(startOfTheMonth, "PP"));
    startOfTheMonth = addDays(startOfTheMonth, 1);
  }

  return dates;
};

export const thisWeek = () => {
  const dates = [];
  let startOfTheWeek = startOfWeek(new Date());
  const endOfTheWeek = endOfWeek(new Date());

  while (startOfTheWeek.getTime() < endOfTheWeek.getTime()) {
    dates.push(format(startOfTheWeek, "PP"));
    startOfTheWeek = addDays(startOfTheWeek, 1);
  }

  return dates;
};

export const last7Days = () => {
  const dates = [];
  const today = new Date();
  let lastSevenD = subDays(today, 6);

  while (lastSevenD.getTime() <= today.getTime()) {
    dates.push(format(lastSevenD, "PP"));
    lastSevenD = addDays(lastSevenD, 1);
  }

  return dates;
};

export const last3Months = () => {
  const dates = [];
  const today = new Date();
  let last3M = subMonths(today, 2);

  while (last3M.getTime() <= today.getTime()) {
    dates.push(format(last3M, "MMMM"));
    last3M = addMonths(last3M, 1);
  }
  return dates;
};

export const last6Months = () => {
  const dates = [];
  const today = new Date();
  let last3M = subMonths(today, 5);

  while (last3M.getTime() <= today.getTime()) {
    dates.push(format(last3M, "MMMM"));
    last3M = addMonths(last3M, 1);
  }
  return dates;
};

export const thisYear = () => {
  const dates = [];
  let startOfTheYear = startOfYear(new Date());
  const endOfTheYear = new Date();

  while (startOfTheYear.getTime() < endOfTheYear.getTime()) {
    dates.push(format(startOfTheYear, "MMMM"));
    startOfTheYear = addMonths(startOfTheYear, 1);
  }
  return dates;
};

export const filterOptions = [
  "Last 7 Days",
  "This Week",
  "This Month",
  "Last 3 Months",
  "Last 6 Months",
  "This Year",
];
