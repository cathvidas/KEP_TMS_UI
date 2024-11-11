import { useEffect, useState } from "react";
import getStatusById from "../utils/status/getStatusById";
import { statusCode } from "../api/constants";
import { formatDateTime } from "../utils/datetime/Formatting";

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
  useMappedActivityLogs: (activityData, author) => {
    const [data, setData] = useState([]);
    useEffect(() => {
      const activityLogs = activityData?.routings;
      const mappedActivityLogs = [];
      mappedActivityLogs.push({
        name: author?.fullname,
        process: "New",
        status: activityLogs?.length > 0 ? "Submitted" : "New",
        remark: "Submitted",
        date: formatDateTime(activityData?.createdDate),
      });
      activityLogs?.map((log) => {
        mappedActivityLogs.push({
          name: log?.userDetail.fullname,
          process: log?.userDetail?.position + " Approval",
          status: getStatusById(log?.statusId),
          remark: log?.statusId === statusCode.FORAPPROVAL ? "Pending" : log?.remarks,
          date: log?.updatedDate ? formatDateTime(log?.updatedDate) : "N/A",
        });
      });
      setData(mappedActivityLogs);
    }, [activityData, author]);
    return data;
  },
};
export default mappingHook;
