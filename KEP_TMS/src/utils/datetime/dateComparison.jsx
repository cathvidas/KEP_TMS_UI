export const CompareTimeWithToday = (startTime) => {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  //make it two digits each
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  const timeToday = `${hours}:${minutes}:${seconds}`;
  // check if time is ealier today HH:mm:ss
  let isPast = false;
  let isToday = false;
  let isFuture = false;
  if (startTime < timeToday) {
    isPast = true;
  } else if (startTime === timeToday) {
    isToday = true;
  } else if (startTime > timeToday) {
    isFuture = true;
  }
  return { isPast, isToday, isFuture };
};
export const CompareDateWithToday = (date) => {
  date = new Date(date);
  const today = new Date();
  let isPast = false;
  let isToday = false;
  let isFuture = false;
  //check if date is earlier than today
  if (
    date.getFullYear() < today.getFullYear() ||
    (date.getFullYear() === today.getFullYear() &&
      date.getMonth() < today.getMonth()) ||
    (date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() < today.getDate())
  )
    isPast = true;
  //check if date is today or tomorrow
  if (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  )
    isToday = true;
  //check if date is in the future
  if (
    date.getFullYear() > today.getFullYear() ||
    (date.getFullYear() === today.getFullYear() &&
      date.getMonth() > today.getMonth()) ||
    (date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() > today.getDate())
  )
    isFuture = true;

  return { isPast, isToday, isFuture };
};
export const CompareDateTimeWithToday = (date) => {
  date = new Date(date);
  const today = new Date();
  let isPast = false;
  let isToday = false;
  let isFuture = false;
  const difference = date.getTime() - today.getTime();
  if (difference < 0) {
    isPast = true;
  } else if (difference === 0) {
    isToday = true;
  } else if (difference > 0) {
    isFuture = true;
  }
  return { isPast, isToday, isFuture };
};

export const CompareDates = (firstDate, secondDate) => {
  const firstDateObj = new Date(firstDate);
  const secondDateObj = new Date(secondDate);
  return firstDateObj.getTime() === secondDateObj.getTime();
};
