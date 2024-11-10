import { useEffect, useState } from "react";
import getStatusById from "../utils/status/getStatusById";

const mappingHook = {
  useMappedActivityRoute: (approvers, activity) => {
    const [data, setData] = useState([]);
    useEffect(() => {
      const mappedApprovers = [];
      approvers?.map((app) => {
        const actItem = activity?.filter(
          (act) => act?.assignedTo == app?.employeeBadge
        );
        actItem?.sort((a, b) => a.sequence - b.sequence);
        mappedApprovers.push({
          detail: app,
          status: actItem ? actItem[0] : {},
        });
      });
      setData(mappedApprovers);
    }, [approvers, activity]);
    return data;
  },
  useMappedActivityLogs: (activityLogs) => {
    const [data, setData] = useState([]);
    useEffect(() => {
      const mappedActivityLogs = [];
      activityLogs?.map((log, index) => {
        if(index > 0 ){
          const prevLog = activityLogs[index - 1];
          prevLog.status = getStatusById(log?.statusId);
        }
        const actItem = activityLogs?.filter(
          (act) => act?.activityId == log?.activityId
        );
        actItem?.sort((a, b) => a.sequence - b.sequence);
        mappedActivityLogs.push({
          detail: log,
          status: actItem ? actItem[0] : {},
        });
      });
      setData(mappedActivityLogs);
    }, [activityLogs]);
    return data;
  },
};
export default mappingHook;
