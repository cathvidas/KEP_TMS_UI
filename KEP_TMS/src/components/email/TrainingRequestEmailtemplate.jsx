import proptype from "prop-types";
import {
  formatCurrency,
  formatDateOnly,
  formatDateTime,
} from "../../utils/datetime/Formatting";
import { statusCode, TrainingType } from "../../api/constants";
import TableEmailTemplate from "./TableEmailTemplate";
import {
  FormatTime,
  formatTotalTime,
  getTotalTime,
} from "../../utils/datetime/FormatDateTime";
import mappingHook from "../../hooks/mappingHook";
import getStatusById from "../../utils/status/getStatusById";
import commonHook from "../../hooks/commonHook";
import externalFacilitatorHook from "../../hooks/externalFacilitatorHook";

const TrainingRequestEmailtemplate = ({
  requestDetail,
  recipient,
  activityLogs,
}) => {
  const tableHedear = (value) => {
    return (
      <>
        <p>
            <strong>{value}</strong>
        </p>
      </>
    );
  };
  const mappedFaciList =
    requestDetail?.trainingType?.id === TrainingType.INTERNAL
      ? commonHook.useMappedInternalFacilitatorList(
          requestDetail?.trainingFacilitators
        )
      : externalFacilitatorHook.useListExternalFacilitators(requestDetail?.trainingFacilitators, "externalFacilitatorId")
     ;
  console.log(mappedFaciList, requestDetail, requestDetail?.trainingType?.id=== TrainingType.EXTERNAL,externalFacilitatorHook.useListExternalFacilitators(requestDetail?.trainingFacilitators, "externalFacilitatorId") )
  const faciList =  mappedFaciList?.data?.map((item, index) => {
    if(requestDetail?.trainingType?.id === TrainingType.INTERNAL){
    return{
      no: index + 1,
      name: item?.fullname,
      position: item?.position,
      department: item?.departmentName,
    }}
    else if(requestDetail?.trainingType?.id === TrainingType.EXTERNAL){
      return{
        no: index + 1,
        name: item?.name,
        position: item?.position,
        department: item?.depatmentOrganization,
      }
    }
  })
  const mappedApprovers = mappingHook.useMappedActivityRoute(
    requestDetail?.approvers,
    requestDetail?.routings
  );
  const scheduleItems = [
    {
      header: "No",
      field: "no",
    },
    {
      header: "Date",
      field: "date",
    },
    {
      header: "Start Time",
      field: "startTime",
    },
    {
      header: "End Time",
      field: "endTime",
    },
    {
      header: "Total Time",
      field: "totalTime",
    },
  ];
  const scheduleList = requestDetail?.trainingDates?.map((item, index) => {
    return {
      no: index + 1,
      date: formatDateOnly(item.date),
      startTime: FormatTime(item.startTime),
      endTime: FormatTime(item.endTime),
      totalTime: formatTotalTime(getTotalTime(item.startTime, item.endTime)),
    };
  });

  const participantsItems = [
    {
      header: "No",
      field: "no",
    },
    {
      header: "Name",
      field: "name",
    },
    {
      header: "Position",
      field: "position",
    },
    {
      header: "Department",
      field: "department",
    },
  ];
  const participantsList = requestDetail?.trainingParticipants?.map(
    (item, index) => {
      return {
        no: index + 1,
        name: item?.fullname,
        position: item?.position,
        department: item?.departmentName,
      };
    }
  );
  const facilitatorsList = requestDetail?.trainingFacilitators?.map(
    (item, index) => {
      return {
        no: index + 1,
        name: item?.fullname,
        position: item?.position,
        department: item?.departmentName,
      };
    }
  );
  const routeItems = [
    {
      header: "No",
      field: "no",
    },
    {
      header: "Name",
      field: "name",
    },
    {
      header: "Title",
      field: "title",
    },
    {
      header: "Status",
      field: "status",
    },
    {
      header: "Approved Date",
      field: "date",
    },
  ];
  const routeList = mappedApprovers?.map((item, index) => {
    return {
      no: index + 1,
      name: item?.detail?.fullname,
      title: item?.detail?.position + " Approval",
      status:getStatusById(item?.status?.statusId)=== statusCode.FORAPPROVAL ? "For Approval": getStatusById(item?.status?.statusId),
      date: item?.status?.updatedDate
        ? formatDateTime(item?.status?.updatedDate)
        : "N/A",
    };
  });
  const activityItems = [
    {
      header: "No",
      field: "no",
    },
    {
      header: "Processed By",
      field: "name",
    },
    {
      header: "Process",
      field: "process",
    },
    {
      header: "Date",
      field: "date",
    },
    {
      header: "Remarks",
      field: "remarks",
    },
  ];
  const activityList = activityLogs?.map((item, index) => {
    return { ...item, no: index + 1, remarks: item?.remark };
  });
  return (
    <>
      <p>&nbsp;</p>
      <p>
        Good Day {recipient?.fullname},
        <br />
        <br />
        I hope you&apos;re doing well.
        <br />
        <br />
        This is a friendly reminder that{" "}
        <strong>
          Training Request #{requestDetail?.id}
        </strong>{" "}
        is currently awaiting your approval.
        <br />
        Could you kindly review and approve the request at your earliest
        convenience?
        <br />
        <br />
        Thank you for your attention to this matter.
      </p>
        <>
          <p>
            <br />
            For your reference, here are the details of the training request:
          </p>
          <table
            style={{
              borderCollapse: "collapse",
              fontFamily: "Arial, sans-serif",
              width: "100%",
            }}
            border="1"
            cellPadding="5"
            cellSpacing="0"
          >
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th colSpan="4" style={{textAlign: "center"}}>
                    <strong>{`${requestDetail?.trainingType?.name} Training Request #${requestDetail?.id} Details`}</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>REQUESTOR:</strong>
                </td>
                <td>{requestDetail?.requesterName}</td>
                <td rowSpan="2">
                  <strong>DATE:</strong>
                </td>
                <td rowSpan="2">11/06/2024 10:40:13 am</td>
              </tr>
              <tr>
                <td>
                  <strong>BADGE ID:</strong>
                </td>
                <td>{requestDetail?.requesterBadge}</td>
              </tr>
              <tr>
                <td>
                  <strong>TRAINING PROGRAM:</strong>
                </td>
                <td style={{ padding: "7.5pt" }} colSpan="3">
                  {requestDetail?.trainingProgram?.name}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>CATEGORY:</strong>
                </td>
                <td colSpan="3">{requestDetail?.trainingCategory?.name}</td>
              </tr>
              <tr>
                <td>
                  <strong>TRAINING OBJECTIVES:</strong>
                </td>
                <td colSpan="3">{requestDetail?.trainingObjectives}</td>
              </tr>
              <tr>
                <td>
                  <strong>TRAINING DURATION:</strong>
                </td>
                <td>
                  Training Start:{" "}
                  {formatDateOnly(requestDetail?.trainingStartDate)}
                  <br />
                  Training End: {formatDateOnly(requestDetail?.trainingEndDate)}
                </td>
                <td>
                  <strong>VENUE</strong>
                </td>
                <td>{requestDetail?.venue}</td>
              </tr>
              <tr>
                <td>
                  <strong>TRAINING FEE:</strong>
                </td>
                <td>{formatCurrency(requestDetail?.trainingFee)}</td>
                <td>
                  <strong>TOTAL COST:</strong>
                </td>
                <td>{formatCurrency(requestDetail?.totalTrainingFee)}</td>
              </tr>
            </tbody>
          </table>
          <p></p>
          {tableHedear("TRAINING SCHEDULES")}
          <TableEmailTemplate items={scheduleItems} value={scheduleList} />
          <p></p>
          {tableHedear("TRAINING PARTICIPANTS")}
          <TableEmailTemplate
            items={participantsItems}
            value={participantsList}
          />
          <p></p>
          {tableHedear("TRAINING FACILITATORS")}
          <TableEmailTemplate
            items={participantsItems}
            value={faciList}
          />
          <p></p>
          {tableHedear("ROUTES")}
          <TableEmailTemplate items={routeItems} value={routeList} />
          <p></p>
          {tableHedear("ACTIVITIES")}
          <TableEmailTemplate items={activityItems} value={activityList} />
          <p></p>
        </>
    </>
  );
};
TrainingRequestEmailtemplate.propTypes = {
  requestDetail: proptype.object,
  recipient: proptype.object,
  activityLogs: proptype.array,
  activityTitle: proptype.string,
};
export default TrainingRequestEmailtemplate;
