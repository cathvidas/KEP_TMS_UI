import { statusCode } from "../../api/constants";
import countData from "../../utils/countData";
import { checkTrainingIfOutDated } from "../inputValidation/validateTrainingSchedules";
import { SessionGetEmployeeId, SessionGetRole } from "../sessions";
import getStatusById from "../../utils/status/getStatusById";
import ToastTemplate from "../../components/General/ToastTemplate";
import handleApproveRequest from "../handlers/handleApproveRequest";

const getToastDetail = (
  data,
  user,
  userReports,
  cancelRequest,
  updateRequest
) => {
  const reloadPage = ()=>{
    setTimeout(()=>{
      window.location.reload()
    }, 1500)
  }
  const isAdmin =
    SessionGetRole() === "Admin" || SessionGetRole() === "SuperAdmin"
      ? true
      : false;
  const isTrainee = data?.trainingParticipants?.find(
    (item) => item?.employeeBadge === user
  );
  const isFacilitator = data?.trainingFacilitators?.some(
    (f) => f.employeeBadge === user
  );
  const status = data?.status?.id;
  const statusData = { show: true, summary: "", detail: {}, statusId: status };
  if (
    (status == statusCode.FORAPPROVAL ||
      status == statusCode.SUBMITTED ||
      status == statusCode.APPROVED) &&
    checkTrainingIfOutDated(data)
  ) {
    statusData.detail =
      isAdmin || data?.requestorBadge === SessionGetEmployeeId()
        ? "This training Request is outdated, please update training dates OR cancel training Request."
        : "This training Request is outdated and is no longer available.";
    statusData.summary = "OutDated Training Request";
    statusData.severity = "error";
    statusData.content =
      isAdmin || data?.requestorBadge === SessionGetEmployeeId()
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
  } else if (status == statusCode.FORAPPROVAL) {
    statusData.detail = [data?.currentRouting?.fullname];
    statusData.summary =
      user === data?.currentRouting?.employeeBadge
        ? "Waiting for your Approval"
        : `For ${data?.currentRouting?.position} Approval`;
    statusData.severity = "info";
    statusData.content =
      user === data?.currentRouting?.employeeBadge ? (
        <>
          <ToastTemplate
            detail={"Click 'Approve' to approve or 'Disapprove' to reject"}
            summary={statusData.summary}
            icon="pi pi-info-circle"
            leftButtonLabel="Approve"
            leftButtonIcon="pi pi-thumbs-up"
            leftButtonCommand={() =>handleApproveRequest({id: data.id, approve: true, onFinish:reloadPage, user: SessionGetEmployeeId() })}
            rightButtonLabel="Disapprove"
            rightButtonSeverity="danger"
            rightButtonOutlined
            rightButtonIcon="pi pi-thumbs-down"
            rightButtonCommand={() =>handleApproveRequest({id: data.id, approve: false, onFinish:reloadPage, user: SessionGetEmployeeId() })}
          />
        </>
      ) : (
        ""
      );
  } else if (status == statusCode.APPROVED) {
    statusData.summary = "Waiting for Facilitator's Action";
    let facilitators = "";
    data?.trainingFacilitators?.forEach((f) => {
      facilitators += `${f?.fullname}, `;
    });
    statusData.severity = "info";
    statusData.detail = isFacilitator
      ? "Please add module or exam if necessary and publish the request"
      : facilitators;
  } else if (status == statusCode.SUBMITTED) {
    if (userReports && userReports?.effectivenessDetail?.id !== 0) {
      const effStatus = userReports?.effectivenessDetail?.statusName;
      statusData.summary = "Training Effectiveness Submitted";
      statusData.detail =
        effStatus === getStatusById(statusCode.FORAPPROVAL)
          ? `Waiting for approval by ${userReports?.effectivenessDetail?.currentRouting?.assignedDetail?.fullname}`
          : effStatus === getStatusById(statusCode.DISAPPROVED)
          ? "Please wait for further details."
          : "Please wait for further details.";
      statusData.severity =
        effStatus === getStatusById(statusCode.FORAPPROVAL)
          ? "info"
          : effStatus === getStatusById(statusCode.APPROVED)
          ? "success"
          : "error";
    } else {
      statusData.summary = "Waiting for participants Effectiveness";
      statusData.detail =
        isTrainee && isTrainee?.effectivenessId === null
          ? "Navigate to Report section and fill out the effectiveness form"
          : // : isTrainee?.effectivenessId?.sta
            `${countData(data.trainingParticipants, "effectivenessId", 4)}/${
              data.totalParticipants
            } submitted`;
      statusData.severity = "warn";
    }
  } else {
    statusData.show = false;
    // statusData.summary = data?.status?.name;
    // statusData.detail = "";
    // statusData.severity = status == statusCode.SUBMITTED ? "warning" : status === statusCode.PUBLISHED? "success": "secondary" ;
  }
  return statusData;
};
export default getToastDetail;
