import { FormatDate } from "./FormatDateTime";

export const FormatToOptions = (data) => {
  return { value: data.id, label: data.name };
};

export const formatCurrency = (value) => {
  return value?.toLocaleString("en-PH", { style: "currency", currency: "PHP" });
};

export const formatDateTime = (value, hasSecond) => {
  if(!value){
    return "N/A";
  }
  const date = value && new Date(value);
  if (hasSecond) {
    return date?.toLocaleString("en-US");
  } else {
    const time = date?.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return `${date?.toLocaleDateString("en-US")} ${time}`;
  }
};

export const formatDateOnly = (value, type = "slash") => {
  if(!value) return "N/A";
  const date = new Date(value);

  if (isNaN(date.getTime())) {
    return ""; // Return empty if the date is invalid
  }

  // Extract year, month, and day components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if necessary

  // Handle different types of date formats
  switch (type) {
    case "slash": // yyyy/mm/dd
      return `${month}/${day}/${year}`;
    case "dash": // yyyy-mm-dd (default)
    default:
      return `${year}-${month}-${day}`;
  }
};

export const formatDateString = (value) => {
  const date = new Date(value);
  return FormatDate(date.toISOString().split("T")[0]);
};
export const formatSeconds = (value, toString = false) => {
  const hour = Math.floor(value / 3600);
  const minute = Math.floor((value - hour * 3600) / 60);
  const seconds = value % 60;
  if (toString) {
    return `${
      hour > 0 ? (hour > 1 ? hour + " hours," : hour + " hour,") : ""
    } ${
      minute > 0
        ? minute > 1
          ? minute + " minutes and"
          : minute + " minute and"
        : ""
    } ${seconds + " seconds"}`;
  } else {
    return `${hour < 10 ? "0" + hour : hour}:${
      minute < 10 ? "0" + minute : minute
    }:${seconds < 10 ? "0" + seconds : seconds}`;
  }
};

export const getMonthInString = (monthInNumber) => {
  switch (monthInNumber) {
    case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";
  }
};

export const GenerateTrainingDates = (trainings) => {
  let dates = [];
  if (trainings?.length > 0) {
    trainings.forEach((item) => {
      const dateData = item?.date?.split("-");
      const year = dateData[0];
      const month = getMonthInString(parseInt(dateData[1]));
      const day = parseInt(dateData[2]);
      const y = dates.find((x) => x.year === year);
      if (y) {
        const m = y.month.find((x) => x.month === month);
        if (m) {
          const d = m.days.find((x) => x === day);
          if (!d) {
            m.days.push(day);
          }
        } else {
          y.month.push({ month: month, days: [day] });
        }
      } else {
        dates.push({ year: year, month: [{ month: month, days: [day] }] });
      }
    });
  }
  const dateString = dates.map((item) => {
    return item.month
      .map((x) => {
        return (
          x.month +
          " " +
          x.days.join(
            x?.days?.indexOf(x?.days?.length - 1) && x?.days?.length > 1
              ? " and "
              : " , "
          ) +
          ", " +
          item.year
        );
      })
      .join(" ");
  });
  return dateString;
};
