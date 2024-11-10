import { useEffect, useState } from "react";
import { formatDateTime } from "../utils/datetime/Formatting";
import getNameFromList from "../services/common/getNameFromList";
import sortRoutingBySequence from "../services/common/sortRoutingsBySequence";
import { statusCode } from "../api/constants";
import { extractChanges } from "../utils/stringUtil";
const activityLogHook = {
  useReportsActivityLog: (defaultValue, userData) => {
    const [logs, setLogs] = useState([]);
    useEffect(() => {
      if (defaultValue) {
        let newLogs = [];
        newLogs.push({
          name: userData?.fullname ?? defaultValue?.auditTrail?.createdBy,
          process: "New",
          remark: "N/A",
          severity: "secondary",
          show: true,
          label: `Created by ${
            userData?.fullname ?? defaultValue?.auditTrail?.createdBy
          }`,
          date:
            defaultValue?.auditTrail?.length > 0
              ? formatDateTime(defaultValue?.auditTrail[0]?.createdDate)
              : "",
        });
        sortRoutingBySequence(defaultValue?.routings);
        defaultValue?.routings?.forEach((item) => {
          const isApproved =
            item?.statusId === statusCode.APPROVED ? true : false;
          const isDisapproved =
            item?.statusId === statusCode.DISAPPROVED ? true : false;
          const changes = JSON.parse(item?.changes);
          if (isApproved || isDisapproved) {
            newLogs.push({
              label: `Routed to ${item.assignedName ?? item.assignedTo}`,
              date: formatDateTime(item?.createdDate),
              severity: "default",
              show: true,
              name:item.assignedName ?? item.assignedTo,
              remark: isApproved ? "Approved" : isDisapproved ? remarks?.toValue ?? "Disapproved": "N/A"
            });
          }
          const remarks = extractChanges(changes?.Remarks ?? "");
          newLogs.push({
            label: isApproved
              ? `Approved by ${item.assignedName ?? item.assignedTo}`
              : isDisapproved
              ? `Returned by ${item.assignedName ?? item.assignedTo} ${
                  remarks?.toValue && "with a message '" + remarks.toValue + "'"
                } `
              : `Routed to ${item.assignedName ?? item.assignedTo}`,
            date: formatDateTime(
              isApproved ? item.updatedDate : item?.createdDate
            ),
            severity: isApproved
              ? "success"
              : isDisapproved
              ? "danger"
              : "default",
              show: false,
          });
        });
        setLogs(newLogs);
      }
    }, [defaultValue, userData]);
    return logs;
  },
  useTrainingRequestActivityLogs: (data, reportsData) => {
    const [logs, setLogs] = useState([]);
    useEffect(() => {
      if (data) {
        let newLogs = [];
        newLogs.push({
          name: data?.requestor?.fullname,
          process: "New",
          remark: "N/A",
          label: "Created",
          date: data?.createdDate,
          severity: "secondary",
          show: true,
        });
        // Routings
        if (data?.status?.id != statusCode.SUBMITTED) {
          sortRoutingBySequence(data?.routings);
          data?.routings?.forEach((item) => {
            const isApproved =
              item?.statusId === statusCode.APPROVED;
            const isDisapproved =
              item?.statusId === statusCode.DISAPPROVED;
            const changes = JSON.parse(item?.changes);
            const remarks = extractChanges(changes?.Remarks ?? "");
            if (isApproved || isDisapproved) {
              newLogs.push({
                name: getNameFromList(data?.approvers, item?.assignedTo) ?? item.assignedTo,
                process: getNameFromList(data?.approvers, item?.assignedTo, false)?.position,
                label: `Routed to ${
                  getNameFromList(data?.approvers, item?.assignedTo) ??
                  item.assignedTo
                }`,
                date: formatDateTime(item?.updatedDate),
                severity: "default",
                show: true,
                remark: isApproved ? "Approved" : isDisapproved ? remarks?.toValue ?? "Disapproved": "N/A"
              });
            }

            newLogs.push({
              name: getNameFromList(data?.approvers, item?.assignedTo)?.position ?? item.assignedTo,
              process: getNameFromList(data?.approvers, item?.assignedTo, false)?.position + " Approval",
              label: isApproved
                ? `Approved by ${
                    getNameFromList(data?.approvers, item?.assignedTo) ??
                    item.assignedTo
                  }`
                : isDisapproved
                ? `Returned by ${
                    getNameFromList(data?.approvers, item?.assignedTo) ??
                    item.assignedTo
                  } ${
                    remarks?.toValue &&
                    "with a message '" + remarks.toValue + "'"
                  } `
                : `Routed to ${
                    getNameFromList(data?.approvers, item?.assignedTo) ??
                    item.assignedTo
                  }`,
              date: formatDateTime(
                isApproved || isDisapproved
                  ? item.updatedDate
                  : item?.createdDate
              ),
              show: false,
              severity: isApproved
                ? "success"
                : isDisapproved
                ? "danger"
                : "default",
            });
          });
        }
        
        //effectiveness
        if (reportsData) {
          // if (data?.durationInHours >= OtherConstant.EFFECTIVENESS_MINHOUR) {
          reportsData?.forEach((item) => {
            if (item?.effectivenessDetail?.id) {
              newLogs.push({
                label: `${
                  item?.userDetail?.fullname ??
                  item?.effectivenessDetail?.createdBy
                } submitted an effectiveness Report`,
                date: item?.effectivenessDetail?.createdDate,
                severity: "warning",
              });
            }
            if (item?.reportDetail?.id) {
              newLogs.push({
                label: `${
                  item?.userDetail?.fullname ?? item?.reportDetail?.createdBy
                } submitted a Training Report`,
                date: item?.reportDetail?.createdDate,
                severity: "warning",
              });
            }
            if (item?.evaluationDetail?.id) {
              newLogs.push({
                label: `${
                  item?.userDetail?.fullname ??
                  item?.evaluationDetail?.createdBy
                } submitted an evaluation Report`,
                date: item?.evaluationDetail?.createdDate,
                severity: "warning",
              });
            }
          });
          // }
        }
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
  },
  useRequestAuditTrailActivityLogs: (auditTrail)=>{
    const [logs, setLogs] = useState([]);
    useEffect(() => {
      if(auditTrail){
        const newLogs = auditTrail.map((item) => {
          const changes = JSON.parse(item?.changes);
          return {...item, changes: changes}
        });
        setLogs(newLogs);
      }
    }, [auditTrail]);
    return logs;
  }
};
export default activityLogHook;
