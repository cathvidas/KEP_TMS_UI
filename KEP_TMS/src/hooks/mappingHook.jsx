import { useEffect, useState } from "react";
import getStatusById from "../utils/status/getStatusById";
import { statusCode } from "../api/constants";
import { formatDateTime } from "../utils/datetime/Formatting";
import routingService from "../services/common/routingService";

const mappingHook = {
  useMappedActivityRoute: (approvers, activity) => {
    routingService.sortRoutingBySequence(activity, false)
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
  useMappedActivityLogs: (activityData, author) => {
    routingService.sortRoutingBySequence(activityData?.routings, false)
    const [data, setData] = useState([]);
    useEffect(() => {
      const activityLogs = activityData?.routings;
      console.log(activityLogs);
      const mappedActivityLogs = [];
      mappedActivityLogs.push({
        id: 1,
        name: author?.fullname,
        process: "New / Submitted",
        status: activityLogs?.length > 0 ? "Submitted" : "New",
        remark: "N/A",
        date: formatDateTime(activityData?.createdDate),
      });
      activityLogs?.map((log, index) => {
        const activity = {
          id: index + 2,
          name: log?.userDetail.fullname,
          process: log?.userDetail?.position + " Approval",
          status: getStatusById(log?.statusId),
          remark:
            log?.statusId === statusCode.FORAPPROVAL ? "Pending" :log?.remarks ?? getStatusById(log?.statusId) ,
          date: log?.updatedDate ? formatDateTime(log?.updatedDate) : "N/A",
        };
        if (log.statusId === statusCode.TOUPDATE) {
          if (activityLogs.length > index + 1 && log.assignedTo === author?.employeeBadge) {
            activity.remark = "N/A";
            activity.name = author?.fullname;
            activity.process = "Updated";
            activity.status = "Updated";
            activity.date = activityLogs[index + 1] ? formatDateTime(activityLogs[index + 1]?.createdDate) : "N/A";
            mappedActivityLogs.push(activity);
          }
        } else {
          mappedActivityLogs.push(activity);
        }
      });
      setData(mappedActivityLogs);
    }, [activityData, author]);
    return data;
  },
};
export default mappingHook;
