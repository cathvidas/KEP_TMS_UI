import { useEffect, useState } from "react";
import { formatDateTime } from "../utils/datetime/Formatting";
import getNameFromList from "../services/common/getNameFromList";
import sortRoutingBySequence from "../services/common/sortRoutingsBySequence";
import { statusCode } from "../api/constants";
const activityLogHook = {
    useReportsActivityLog: (defaultValue, userData) => {
      const [logs, setLogs] = useState([]);
      useEffect(()=>{
      if (defaultValue) {
        let newLogs = [];
        newLogs.push({
          label: `Created by ${userData?.fullname ?? defaultValue?.auditTrail?.createdBy}`,
          date: formatDateTime(defaultValue?.auditTrail?.createdDate),
        });

        sortRoutingBySequence(defaultValue?.routings)
        defaultValue?.routings?.forEach((item) => {
          const isApproved =
            item?.statusId === statusCode.APPROVED ? true : false;
          if (isApproved) {
            newLogs.push({
              label: `Routed to ${item.assignedName ?? item.assignedTo}`,
              date: formatDateTime(item?.createdDate),
              severity: "default",
            });
          }
          newLogs.push({
            label: isApproved
              ? `Approved by ${item.assignedName ?? item.assignedTo}`
              : `Routed to ${item.assignedName ?? item.assignedTo}`,
            date: formatDateTime(isApproved ? item.updatedDate : item?.createdDate),
            severity: isApproved ? "success" : "default",
          });
        });
        setLogs(newLogs);
      }
      },[defaultValue, userData])
      return logs;
    },
    useTrainingRequestActivityLogs: (data, reportsData)=>{
      const [logs, setLogs] = useState([]);
      useEffect(() => {
        if(data){
        let newLogs = [];
        newLogs.push({
          label: "Created",
          date: data?.createdDate,
            severity: "secondary"
        });
        //effectiveness
        if (reportsData) {
          // if (data?.durationInHours >= OtherConstant.EFFECTIVENESS_MINHOUR) {
            reportsData?.forEach(item=>{
                if(item?.effectivenessDetail?.id){
                    newLogs.push({
                        label: `${item?.userDetail?.fullname ?? item?.effectivenessDetail?.createdBy} submitted an effectiveness Report`,
                        date: item?.effectivenessDetail?.createdDate,
                        severity: "warning"
                      });
                }
                if(item?.reportDetail?.id){
                    newLogs.push({
                        label: `${item?.userDetail?.fullname ?? item?.reportDetail?.createdBy} submitted a Training Report`,
                        date: item?.reportDetail?.createdDate,
                        severity: "warning"
                      });
                }
                if(item?.evaluationDetail?.id){
                    newLogs.push({
                        label: `${item?.userDetail?.fullname ?? item?.evaluationDetail?.createdBy} submitted an evaluation Report`,
                        date: item?.evaluationDetail?.createdDate,
                        severity: "warning"
                      });
                }
            });
          // }
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
            date: item.updatedDate,
            severity: isApproved ? "success" : "default",
          });
        });}
        const sortedItems = newLogs
          .sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
          })
          ?.map((item) => {
            item.date = formatDateTime(item.date);
            return item;
          });
        setLogs(sortedItems);
        }
      }, [data, reportsData]);
      return logs;
    }

}
export default activityLogHook;