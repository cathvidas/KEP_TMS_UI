import { statusCode, UserTypeValue } from "../../api/constants";
import countData from "../../utils/countData";
import { SessionGetEmployeeId, SessionGetRole } from "../sessions";
import getStatusById from "../../utils/status/getStatusById";
import ToastTemplate from "../../components/General/ToastTemplate";
import handleApproveRequest from "../handlers/handleApproveRequest";
import sortRoutingBySequence from "./sortRoutingsBySequence";

const getToastDetail = (
  data,
  user,
  userReports,
  cancelRequest,
  updateRequest,
  disApproveRequest,
  reloadData
) => {
  const isAdmin =
    SessionGetRole() === UserTypeValue.ADMIN || SessionGetRole() === UserTypeValue.SUPER_ADMIN
      ? true
      : false;
  const isTrainee = data?.trainingParticipants?.find(
    (item) => item?.employeeBadge === user
  );
  const status = data?.status?.id;
  const statusData = { show: true, summary: "", detail: {}, statusId: status };
   if (status == statusCode.FORAPPROVAL) {
    statusData.detail = [data?.currentRouting?.assignedDetail?.fullname];
    statusData.summary =
      user === data?.currentRouting?.assignedTo
        ? "Waiting for your Approval"
        : `For ${data?.currentRouting?.assignedDetail?.position} Approval`;
    statusData.severity = "info";
    statusData.content =
      user === data?.currentRouting?.assignedTo ? (
        <>
          <ToastTemplate
            detail={"Click 'Approve' to approve or 'Disapprove' to reject"}
            summary={statusData.summary}
            icon="pi pi-info-circle"
            leftButtonLabel="Approve"
            leftButtonIcon="pi pi-thumbs-up"
            leftButtonCommand={() =>handleApproveRequest({id: data.id, approve: true, onFinish:reloadData, user: SessionGetEmployeeId() })}
            rightButtonLabel="Disapprove"
            rightButtonSeverity="danger"
            rightButtonOutlined
            rightButtonIcon="pi pi-thumbs-down"
            rightButtonCommand={disApproveRequest}
          />
        </>
      ) : (
        ""
      );
  } 
   else if (status == statusCode.SUBMITTED) {
    if (userReports && userReports?.effectivenessDetail?.id > 0) {
      const effStatus = userReports?.effectivenessDetail?.statusName;
      statusData.show = false; 
      statusData.summary =effStatus === getStatusById(statusCode.DISAPPROVED) ? "Training Effectiveness Disapproved": "Training Effectiveness Submitted";
      statusData.detail =
        effStatus === getStatusById(statusCode.FORAPPROVAL)
          ? `Waiting for approval by ${userReports?.effectivenessDetail?.currentRouting?.assignedDetail?.fullname}`
          : effStatus === getStatusById(statusCode.DISAPPROVED)
          ? "Your training effectiveness form was not approved. Navigate to forms section to view more details."
          : "Please wait for further details.";
      statusData.severity =
        effStatus === getStatusById(statusCode.DISAPPROVED)
          ? "error"
          : effStatus === getStatusById(statusCode.APPROVED)
          ? "success"
          : "info";
    } else {
      statusData.summary = "Waiting for participants Effectiveness";
      statusData.detail =
        isTrainee && isTrainee?.effectivenessId === null
          ? "Navigate to forms section and fill out the effectiveness form"
          : // : isTrainee?.effectivenessId?.sta
            `${countData(data.trainingParticipants, "effectivenessId", 4)}/${
              data.totalParticipants
            } submitted`;
      statusData.severity = "warn";
    }
  } else if (status == statusCode.DISAPPROVED) {
    sortRoutingBySequence(data?.routings)
    const filteredData = data?.routings?.filter(item=>item.statusId === statusCode.DISAPPROVED);
    const current = filteredData[0];
    const disApproverData = data?.approvers?.find(item=> item?.employeeBadge === current?.assignedTo);
    
    statusData.summary = "Training Request Disapproved";
    statusData.detail = `Training Request was disapproved by ${disApproverData?.fullname ?? current?.assignedTo} with a message '${current?.remarks}.'`;
    statusData.severity = "error";
    statusData.content =
      isAdmin || data?.requesterBadge === SessionGetEmployeeId()
        ? () => (
          <ToastTemplate icon="pi pi-times-circle" summary={statusData.summary} detail={statusData.detail} 
          leftButtonLabel="Cancel request" leftButtonSeverity="danger"
          leftButtonIcon="pi pi-times-circle"
          leftButtonCommand={cancelRequest}
          rightButtonLabel="Update"
          rightButtonIcon="pi pi-pencil"
          rightButtonCommand={updateRequest}
          />
          )
        : "";
  } 
  else {
    statusData.show = false;  }
  return statusData;
};
export default getToastDetail;
