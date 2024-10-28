export const FormatDate = (dateString) => {
    if (!dateString) return "Invalid date"; // Handle case where dateString is undefined or null

    const [year, month, day] = dateString.split('-'); // Split the date string into year, month, and day
    const date = new Date(year, month - 1, day); // Create a Date object

    if (isNaN(date.getTime())) return ""; // Handle invalid date

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString("en-US", options);
};


  export const FormatTime = (timeString) => {
    // Provide a fallback for timeString
    const timeToFormat = timeString || "00:00";
    
    // Split the time string into hours and minutes
    const [hours, minutes] = timeToFormat.split(':').map(Number);
  
    // Create a Date object for the time
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
  
    // Options for formatting
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
  
    // Format and return the time
    const result = new Intl.DateTimeFormat('en-US', options).format(date);
    return result;
  };
  

  export const getTotalTime=(startTime, endTime) => {
    // Split the time strings into hours and minutes
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    // Calculate the total time in minutes
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    // Calculate the difference in minutes
    const difference = endTotalMinutes - startTotalMinutes;

    // Format and return the total time
    return difference;
  }

  export const formatTotalTime = (difference) => {
    // Convert the difference to hours and minutes
    const hours = Math.floor(difference / 60);
    const minutes = difference % 60;
    return `${hours > 0 ? hours + (hours < 2 ? " hour" : " hours") : ""} ${
      hours > 0 && minutes > 0 ? "and" : ""
    } ${minutes > 0 ? minutes + (minutes < 2 ? " minute" : " minutes") : ""}`;
  };

  export const combineDateTime = (date, time, isLocalDateTime)=>{
    const [year, month, day] = date.split("-");
    const [hours, minutes] = time.split(":").map(Number);
    const dateObj = new Date(year, month - 1, day, hours, minutes);

    if(isLocalDateTime) {
      //format like this 1997-07-16T19:20:15
      return dateObj.toISOString().split("T")[0] + "T" + time;
      // return dateObj.toISOString().split("T")[0] + " " + time;
    }
    return dateObj;
  }