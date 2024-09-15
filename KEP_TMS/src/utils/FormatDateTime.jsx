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
  