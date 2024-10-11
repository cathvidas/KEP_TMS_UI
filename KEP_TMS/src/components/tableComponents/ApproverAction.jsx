import { Button } from "primereact/button";
import { SessionGetEmployeeId } from "../../services/sessions";
import {
  actionFailed,
  actionSuccessful,
  confirmAction,
} from "../../services/sweetalert";
import { statusCode } from "../../api/constants";
import handleResponseAsync from "../../services/handleResponseAsync";
import trainingRequestService from "../../services/trainingRequestService";
import { useNavigate } from "react-router-dom";
import proptype from "prop-types";
const ApproverAction = ({ reqId, onFinish, hasView = false }) => {
  const navigate = useNavigate();
  const handleApproveRequest = async (data) => {
    const newData = {
      requestId: data.id,
      employeeBadge: SessionGetEmployeeId(),
      statusId: data.statusId,
      updatedBy: SessionGetEmployeeId(),
    };
    handleResponseAsync(
      () => trainingRequestService.approveTrainingRequest(newData),
      (e) => actionSuccessful("Success", data?.statusId === statusCode.DISAPPROVED ? "Successfully disapproved the request": e.message),
      (error) =>
        actionFailed("Error Approving Training Request", error?.message),
      () => onFinish()
    );
  };
  return (
    <div className="d-flex">
      {hasView && (
        <Button
          type="button"
          icon="pi pi-eye"
          size="small"
          severity="success"
          className="rounded"
          text
          onClick={() => navigate(`/KEP_TMS/TrainingRequest/${reqId}`)}
        />
      )}
      <Button
        type="button"
        icon="pi pi-thumbs-up
"
        onClick={() =>
          confirmAction({
            title: "Approve Request",
            text: `Are you sure you want to approve this request?`,
            confirmButtonText: "Approve",
            cancelButtonText: "No",
            onConfirm: handleApproveRequest,
            param: { id: reqId, statusId: statusCode.APPROVED },
          })
        }
        size="small"
        className="rounded"
        text
      />
      <Button
        type="button"
        icon="pi pi-thumbs-down
"
        size="small"
        className="rounded"
        severity="danger"
        text
        onClick={() =>
          confirmAction({
            title: "Disapprove Request",
            text: `Are you sure you want to disapprove this request?`,
            confirmButtonText: "Disapproved",
            cancelButtonText: "No",
            confirmButtonColor: "#d33",
            onConfirm: handleApproveRequest,
            param: { id: reqId, statusId: statusCode.DISAPPROVED },
          })
        }
      />
    </div>
  );
};
ApproverAction.propTypes = {
  reqId: proptype.number.isRequired,
  onFinish: proptype.func.isRequired,
  hasView: proptype.bool,
};
export default ApproverAction;
