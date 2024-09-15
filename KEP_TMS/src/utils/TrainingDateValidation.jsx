import proptype from "prop-types"

export const TrainingDateValidations = (trainingSchedules, schedule) => {
  // Check if the new schedule conflicts with any existing schedules
  return trainingSchedules.some((existingSchedule) => {
    const isSameDate = existingSchedule.date === schedule.date;

    // Check if the time ranges overlap
    const isTimeOverlap =
      (schedule.startTime < existingSchedule.endTime && schedule.endTime > existingSchedule.startTime) ||
      (existingSchedule.startTime < schedule.endTime && existingSchedule.endTime > schedule.startTime);

    return isSameDate && isTimeOverlap;
  });
};



export const ValidateSchedule = (schedule) => {
    if (!schedule.startTime || !schedule.endTime || !schedule.date) {
      return "Please input all the fields";
    }
  
    if (schedule.startTime >= schedule.endTime) {
      return "Start time must be earlier than end time";
    }
  
    return true;
  };
  

