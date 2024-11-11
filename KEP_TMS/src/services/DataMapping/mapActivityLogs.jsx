const mapActivityLogs = (activityLogs) => {
  //mapped the data so that the statusIs of the previous log will be the status of the current log
  let updatedList = [];
  const mappedActivityLogs = activityLogs?.map((log, index) => {
    if (index === 0) {
      updatedList.push({
        ...log,
        statusId: null,
        remarks: null
      })
    } else {
      updatedList.push({
        ...log,
        statusId: activityLogs[index - 1].statusId,
        remarks: activityLogs[index - 1]?.remarks
      })
    }
  })
  console.log(updatedList);
  return mappedActivityLogs;
  
};
export default mapActivityLogs;