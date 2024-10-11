import sortSchedules from "../SortSchedule"

export const getStartDate = (datelist)=>{
    return sortSchedules(datelist)[0];
}