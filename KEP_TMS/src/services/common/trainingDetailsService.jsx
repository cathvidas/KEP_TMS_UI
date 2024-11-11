import {
  CompareDateWithToday,
  CompareTimeWithToday,
} from "../../utils/datetime/dateComparison";
import sortSchedules from "../../utils/SortSchedule";

const trainingDetailsService = {
  checkIfTrainingEndsAlready: (data) => {
    let isEnd = false;
    if (CompareDateWithToday(data?.trainingEndDate)?.isPast) {
      isEnd = true;
    } else if (
      CompareDateWithToday(data?.trainingEndDate)?.isToday &&
      data?.trainingDates?.length > 0
    ) {
      const lastSchedule = sortSchedules(data?.trainingDates)[
        data?.trainingDates?.length - 1
      ];
      isEnd = CompareTimeWithToday(lastSchedule?.endTime)?.isPast;
    }
    return isEnd;
  },
  checkTrainingScheduleStatus: (data) => {
    let isEnd = false;
    let isOngoing = false;
    let isUpcoming = false;
    if (CompareDateWithToday(data?.trainingEndDate)?.isPast) {
      isEnd = true;
    } else if (
      CompareDateWithToday(data?.trainingStartDate)?.isFuture &&
      data?.trainingDates?.length > 0
    ) {
      isUpcoming = true;
    } else if (
      CompareDateWithToday(data?.trainingStartDate)?.isToday &&
      data?.trainingDates?.length > 0
    ) {
      const firstSchedule = sortSchedules(data?.trainingDates)[0];
      isOngoing = CompareTimeWithToday(firstSchedule?.startTime)?.isPast;
      isUpcoming = !isOngoing;
      const lastSchedule = sortSchedules(data?.trainingDates)[
        data?.trainingDates?.length - 1
      ];
      isEnd = CompareTimeWithToday(lastSchedule?.endTime)?.isPast;
    }
    return {isEnd, isOngoing, isUpcoming};
  },
  checkTrainingIfOutDated: (data) => {
    let isOutDated = false;
    if (
      CompareDateWithToday(data?.trainingStartDate)?.isPast ||
      CompareDateWithToday(data?.trainingEndDate)?.isPast
    ) {
      isOutDated = true;
    } else if (CompareDateWithToday(data?.trainingStartDate)?.isToday) {
      const startDate = sortSchedules(data?.trainingDates)[0];
      isOutDated = CompareTimeWithToday(startDate?.startTime)?.isPast;
    }
    return isOutDated;
  },
  getLastTrainingSchedule: (trainingDates) => {
    return sortSchedules(trainingDates)[trainingDates?.length - 1];
  },
};
export default trainingDetailsService;
