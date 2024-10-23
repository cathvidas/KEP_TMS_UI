import { Button } from "primereact/button";
import { SessionGetEmployeeId } from "../../services/sessions";
import { useNavigate } from "react-router-dom";
import proptype from "prop-types";
import handleApproveRequest from "../../services/handlers/handleApproveRequest";
const ApproverAction = ({ reqId, onFinish, hasView = false }) => {
  const navigate = useNavigate();
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
        icon="pi pi-thumbs-up"
        onClick={() =>handleApproveRequest({id: reqId, approve: true, onFinish: onFinish, user: SessionGetEmployeeId() })}
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
        onClick={() =>handleApproveRequest({id: reqId, approve: false, onFinish: onFinish, user: SessionGetEmployeeId() })}
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
