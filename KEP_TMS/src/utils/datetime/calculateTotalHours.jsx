import { getTotalTime } from "./FormatDateTime";

const calculateTotalHours = (data) => {
  return data?.reduce((total, schedule) => {
    const totalTime = getTotalTime(schedule.startTime, schedule.endTime);
    return total + totalTime;
  }, 0);
};
export default calculateTotalHours