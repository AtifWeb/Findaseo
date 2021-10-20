import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  subDays,
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

export const filterOptions = ["Last 7 Days", "This Week", "This Month"];
