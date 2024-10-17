import { useEffect, useState } from "react";
import { formatDateTime } from "../utils/datetime/Formatting";
import { OtherConstant, statusCode } from "../api/constants";
import getNameFromList from "../services/common/getNameFromList";
import sortRoutingBySequence from "../services/common/sortRoutingsBySequence";
const activityLogHook = {
    useReportsActivityLog: (defaultValue) => {
      const [logs, setLogs] = useState([]);
      useEffect(()=>{
      if (defaultValue) {
        let newLogs = [];
        newLogs.push({
          label: "Created",
          date: formatDateTime(defaultValue?.createdDate),
        });
        defaultValue?.routings?.forEach((item) => {
          const isApproved =
            item?.statusId === statusCode.APPROVED ? true : false;
          if (isApproved) {
            newLogs.push({
              label: `Routed to ${item.assignedName ?? item.assignedTo}`,
              date: newLogs[newLogs.length - 1].date,
              severity: "default",
            });
          }
          newLogs.push({
            label: isApproved
              ? `Approved by ${item.assignedName ?? item.assignedTo}`
              : `Routed to ${item.assignedName ?? item.assignedTo}`,
            date: formatDateTime(item.updatedDate),
            severity: isApproved ? "success" : "default",
          });
        });
        setLogs(newLogs);
      }
      },[defaultValue])
      return logs;
    },
    useTrainingRequestActivityLogs: (data, reportsData)=>{
      const [logs, setLogs] = useState([]);
      useEffect(() => {
        if(data){
        let newLogs = [];
        newLogs.push({
          label: "Created",
          date: formatDateTime(data?.createdDate),
            severity: "secondary"
        });
        //effectiveness
        if (reportsData) {
          if (data?.durationInHours >= OtherConstant.EFFECTIVENESS_MINHOUR) {
            reportsData?.forEach(item=>{
                if(item?.effectivenessDetail?.id){
                    newLogs.push({
                        label: `${item?.userDetail?.fullname ?? item?.effectivenessDetail?.createdBy} submitted an effectiviness Report`,
                        date: formatDateTime(item?.effectivenessDetail?.createdDate),
                        severity: "warning"
                      });
                }
                if(item?.reportDetail?.id){
                    newLogs.push({
                        label: `${item?.userDetail?.fullname ?? item?.reportDetail?.createdBy} submitted a Training Report`,
                        date: formatDateTime(item?.reportDetail?.createdDate),
                        severity: "warning"
                      });
                }
                if(item?.evaluationDetail?.id){
                    newLogs.push({
                        label: `${item?.userDetail?.fullname ?? item?.evaluationDetail?.createdBy} submitted an evaluation Report`,
                        date: formatDateTime(item?.evaluationDetail?.createdDate),
                        severity: "warning"
                      });
                }
            });
          }
        }

        // Routings
        if(data?.status?.id != statusCode.SUBMITTED){
          sortRoutingBySequence(data?.routings)
        data?.routings?.forEach((item) => {
          const isApproved =
            item?.statusId === statusCode.APPROVED ? true : false;
          if (isApproved) {
            newLogs.push({
              label: `Routed to ${getNameFromList(data?.approvers,item?.assignedTo ) ?? item.assignedTo}`,
              date: newLogs[newLogs.length - 1].date,
              severity: "default",
            });
          }
          newLogs.push({
            label: isApproved
              ? `Approved by ${getNameFromList(data?.approvers, item?.assignedTo, ) ?? item.assignedTo}`
              : `Routed to ${getNameFromList(data?.approvers,item?.assignedTo ) ?? item.assignedTo}`,
            date: formatDateTime(item.updatedDate),
            severity: isApproved ? "success" : "default",
          });
        });}

        setLogs(newLogs);
        }
      }, [data]);
      return logs;
    }

}
export default activityLogHook;