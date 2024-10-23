import sortSchedules from "../../utils/SortSchedule";
export const validateTime = (startTime, endTime) => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
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
const validateTrainingSchedules = (trainingDates, validateDates) => {
  let hasErrors = false;
  const newErrors = { trainingSchedules: [], schedules: "" };
  if (trainingDates?.length > 0) {
    if(validateDates){
    trainingDates?.map((sched, index) => {
      if (validateDate(sched?.date)?.isPast) {
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
        validateDate(sched?.date)?.isToday &&
        validateTime(sched?.startTime, sched?.endTime)?.isPast
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
    });}
  } else {
    hasErrors = true;
    newErrors.schedules = "No schedules added";
  }
  return { hasErrors, newErrors };
};
export default validateTrainingSchedules;

export const checkTrainingIfOutDated = (data)=>{
  let isOutDated = false;
  if(validateDate(data?.trainingStartDate)?.isPast ||validateDate(data?.trainingStartDate)?.isPast ){
    isOutDated = true
  }else if(validateDate(data?.trainingStartDate)?.isToday){
    const startDate = sortSchedules(data?.trainingDates)[0];
    isOutDated = validateTime(startDate?.startTime, startDate?.endTime)?.isPast ;
  // console.log(validateTime(startDate?.startTime, startDate?.endTime), startDate?.startTime, startDate?.endTime, startDate)
  }
  return isOutDated;
}
export const validateDate = (date)=>{
  date = new Date(date);
  const today = new Date();
  let isPast = false
  let isToday = false
  let isFuture = false
  //check if date is earlier than today
  if(date.getFullYear() < today.getFullYear() || (date.getFullYear() === today.getFullYear() && date.getMonth() < today.getMonth()) || (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() < today.getDate()))
  isPast = true;
  //check if date is today or tomorrow
  if(date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate())
  isToday = true;
  //check if date is in the future
  if(date.getFullYear() > today.getFullYear() || (date.getFullYear() === today.getFullYear() && date.getMonth() > today.getMonth()) || (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() > today.getDate()))
  isFuture = true; 
return {isPast, isToday, isFuture}
}