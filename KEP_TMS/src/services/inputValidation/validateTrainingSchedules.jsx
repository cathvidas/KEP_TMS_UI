import {
  CompareDateWithToday,
  CompareTimeWithToday,
} from "../../utils/datetime/dateComparison";
import sortSchedules from "../../utils/SortSchedule";
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
              } is invalid, as the training schedule is in the past. Please remove and select a different schedule.`,
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

export const checkTrainingIfOutDated = (data) => {
  let isOutDated = false;
  if (
    CompareDateWithToday(data?.trainingStartDate)?.isPast ||
    CompareDateWithToday(data?.trainingStartDate)?.isPast
  ) {
    isOutDated = true;
  } else if (CompareDateWithToday(data?.trainingStartDate)?.isToday) {
    const startDate = sortSchedules(data?.trainingDates)[0];
    isOutDated = CompareTimeWithToday(
      startDate?.startTime,
      startDate?.endTime
    )?.isPast;
  }
  return isOutDated;
};
