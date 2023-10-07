/*
  Converts a date to the name of the weekday, also indicates if the date is perhaps today or tommorrow.

*/

const getForecastCardDate = (date: string) => {
  const currentDate = new Date();
  const cardDate = new Date(date);
  const daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayString = daysOfTheWeek[cardDate.getDay()];

  if (currentDate.toDateString() === cardDate.toDateString()) return "Today";
  else if (
    cardDate.toDateString() ===
    new Date(currentDate.getTime() + 24 * 60 * 60 * 1000).toDateString()
  ) {
    return "Tomorrow";
  } else {
    return dayString;
  }
};

export default getForecastCardDate;
