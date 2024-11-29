import {
  CompareDateWithToday,
  CompareTimeWithToday,
} from "../../utils/datetime/dateComparison";
const validateTrainingSchedules = (trainingDates, validateDates) => {
  let hasErrors = false;
  const newErrors = { trainingSchedules: [], schedules: "" };
  if (trainingDates?.length > 0) {
    if (validateDates) {
      trainingDates?.map((sched, index) => {
        if (CompareDateWithToday(sched?.date)?.isPast) {
          newErrors.trainingSchedules = [
            ...newErrors.trainingSchedules,
            {
              index: index,
              value: `Training Date ${
                index + 1
              } is invalid, as the training schedule is in the past. Please enter a valid future date.`,
            },
          ];
          hasErrors = true;
          return;
        } else if (
          CompareDateWithToday(sched?.date)?.isToday &&
          CompareTimeWithToday(sched?.startTime, sched?.endTime)?.isPast
        ) {
          newErrors.trainingSchedules = [
            ...newErrors.trainingSchedules,
            {
              index: index,
              value: `Training Date ${
                index + 1
              } is invalid, as the training schedule is in the past. Please remove and select a different schedule.`,
            },
          ];
          hasErrors = true;
          return;
        }
      });
    }
  } else {
    hasErrors = true;
    newErrors.schedules = "No schedules added";
  }
  return { hasErrors, newErrors };
};
export default validateTrainingSchedules;

