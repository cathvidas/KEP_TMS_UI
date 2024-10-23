import { Button } from "primereact/button";
import { statusCode } from "../../api/constants";
import countData from "../../utils/countData";
import { checkTrainingIfOutDated } from "../inputValidation/validateTrainingSchedules";
import { SessionGetRole } from "../sessions";

const getToastDetail = (data, user, cancelRequest, updateRequest)=>{
  const isAdmin = SessionGetRole() === "Admin" || SessionGetRole() === "SuperAdmin" ? true : false;
    const isTrainee = data?.trainingParticipants?.find(item => item?.employeeBadge === user); 
      const isFacilitator = data?.trainingFacilitators?.some(
        (f) => f.employeeBadge === user
      );
    const status = data?.status?.id;
    const statusData = {   show: true,
        summary: "",
        detail: {},statusId: status };
    if((status == statusCode.FORAPPROVAL || status == statusCode.SUBMITTED ||  status == statusCode.APPROVED) && checkTrainingIfOutDated(data)){
      statusData.detail = isAdmin || isFacilitator ? "This training Request is outdated, please update training dates OR cancel training Request.": "This training Request is outdated and is no longer available.";
      statusData.summary = "OutDated Training Request"
      statusData.severity = "error";  
      statusData.content = isAdmin || isFacilitator ? () => (
        <div
          className="p-toast-message-content p-0 flex-grow-1"
          data-pc-section="content"
        >
          <i className="pi pi-times-circle" style={{ fontSize: "2rem" }}></i>
          <div className="p-toast-message-text" data-pc-section="text">
            <span className="p-toast-summary" data-pc-section="summary">
              {statusData.summary}
            </span>
            <div className="p-toast-detail" data-pc-section="detail">
              {statusData.detail}
            </div>
            <div className="mt-2">
              <Button
              type="button"
              size="small"
                className="rounded"
                label="Cancel Request"
                outlined
                severity="danger"
                icon="pi pi-times-circle"
                onClick={cancelRequest}
              />
              <Button
              type="button"
              size="small"
                className="ms-2 rounded"
                label="Update"
                icon="pi pi-pencil"
                onClick={updateRequest}
             />
            </div>
          </div>
        </div>
      ): "";
    }
    else if (status == statusCode.FORAPPROVAL) {
      statusData.detail = [data?.currentRouting?.fullname];
      statusData.summary =
        user === data?.currentRouting?.employeeBadge
          ? "Waiting for your Approval"
          : `For ${data?.currentRouting?.position} Approval`;
      statusData.severity = "info";
    } else if (status == statusCode.APPROVED) {
      statusData.summary = "Waiting for Facilitator's Action";
     
      let facilitators = "";
      data?.trainingFacilitators?.forEach((f) => {
        facilitators += `${f?.fullname}, `;
      });
      statusData.severity = "info";
      statusData.detail = isFacilitator
        ? "Please add module or set an exam if required and publish the request"
        : facilitators;
    } else if (status == statusCode.SUBMITTED) {
      statusData.summary = "Waiting for participants Effectiveness";
      statusData.detail =
        isTrainee && isTrainee?.effectivenessId === null
          ? "Navigate to Report section and fill out the effectiveness form"
          : // : isTrainee?.effectivenessId?.sta
            `${countData(data.trainingParticipants, "effectivenessId", 4)}/${
              data.totalParticipants
            } submitted`;
      statusData.severity = "warn";
    } else {
      statusData.show = false;
      // statusData.summary = data?.status?.name;
      // statusData.detail = "";
      // statusData.severity = status == statusCode.SUBMITTED ? "warning" : status === statusCode.PUBLISHED? "success": "secondary" ;
    }
    return statusData;
}
export default getToastDetail;