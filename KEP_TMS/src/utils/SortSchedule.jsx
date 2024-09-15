
// Function to sort schedules by date and startTime
const sortSchedules = (schedules) => {
  console.log(schedules)
    return schedules.length > 0 && schedules.sort((a, b) => {
      // First, compare by date
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
  
      if (dateA > dateB) return 1;
      if (dateA < dateB) return -1;
  
      // If dates are equal, compare by startTime
      const timeA = a.startTime.split(":").map(Number);
      const timeB = b.startTime.split(":").map(Number);
  
      const hoursA = timeA[0];
      const minutesA = timeA[1];
      const hoursB = timeB[0];
      const minutesB = timeB[1];
  
      if (hoursA > hoursB) return 1;
      if (hoursA < hoursB) return -1;
      if (minutesA > minutesB) return 1;
      if (minutesA < minutesB) return -1;
  
      return 0;
    });
  };
  export default sortSchedules;