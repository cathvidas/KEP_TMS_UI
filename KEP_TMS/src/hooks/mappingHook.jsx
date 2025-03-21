import { useEffect, useState } from "react";
import getStatusById from "../utils/status/getStatusById";
import { statusCode } from "../api/constants";
import { formatDateTime } from "../utils/datetime/Formatting";
import routingService from "../services/common/routingService";
import { sortDataByProperty } from "../services/common/sortRoutingsBySequence";

const mappingHook = {
  useMappedActivityRoute: (approvers, activity) => {
    const [data, setData] = useState([]);
    useEffect(() => {
      const mappedApprovers = [];
      approvers?.map((app) => {
        const actItem = activity?.filter(
          (act) => act?.assignedTo == app?.employeeBadge && act?.statusId != statusCode.TOUPDATE
        );
        routingService.sortRoutingBySequence(actItem, true);
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
    routingService.sortRoutingBySequence(activityData?.routings, false);
    const [data, setData] = useState([]);
    useEffect(() => {
      const activityLogs = activityData?.routings?.filter(log=>log.statusId != statusCode.INACTIVE && log.statusId != statusCode.PENDING);
      routingService.sortRoutingBySequence(activityLogs, false);
      const mappedActivityLogs = [];
      mappedActivityLogs.push({
        id: 1,
        name: author?.fullname,
        process: "Submitted",
        status: activityLogs?.length > 0 ? "Submitted" : "New",
        remark: "N/A",
        date: formatDateTime(activityData?.createdDate),
      });
      activityLogs?.map((log, index) => {
        const activity = {
          id: index + 2,
          name: log?.userDetail.fullname,
          process: 
          log?.statusId === statusCode.FORAPPROVAL
            ? "Pending" : getStatusById(log?.statusId),
          status: getStatusById(log?.statusId),
          remark: log?.remarks ?? "N/A" ,
          date: log?.updatedDate ? formatDateTime(log?.updatedDate) : "N/A",
        };
        if (log.statusId === statusCode.TOUPDATE) {
          if (
            activityLogs.length > index + 1 &&
            log.assignedTo === author?.employeeBadge
          ) {
            activity.remark =log?.remarks ?? "N/A";
            activity.name = author?.fullname;
            activity.process = "Updated";
            activity.status = "Updated";
            activity.date = activityLogs[index + 1]
              ? formatDateTime(activityLogs[index + 1]?.createdDate)
              : "N/A";
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
  useEffectivenessPerformanceRatingDate: (data, auditTrails)=>{
    if(auditTrails){
    const creatorAudit = auditTrails?.filter(audit => audit?.createdBy === data?.createdBy);
    const evaluatorAudit = auditTrails?.find(audit => audit?.createdBy === data?.evaluatorBadge);
    sortDataByProperty(creatorAudit, 'createdDate')
    return { creatorAudit: creatorAudit[creatorAudit?.length - 1]?.createdDate, evaluatorAudit: evaluatorAudit?.createdDate };}
  }
};
export default mappingHook;
