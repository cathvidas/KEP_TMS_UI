import proptype from "prop-types";
import { statusCode } from "../../api/constants";
const ActivityStatus = ({ showIcon = true, icon, status, severity, color }) => {
  let newIcon = "";
  let newColor = "";
  let placeholder = "";
  switch (status) {
    case statusCode.ACTIVE:
      newIcon = "pi pi-check-circle";
      newColor = "text-success";
      placeholder = "Active";
      break;
    case statusCode.INACTIVE:
      newIcon = "";
      newColor = "text-secondary";
      placeholder = "Inactive";
      break;
    case statusCode.FORAPPROVAL:
      newIcon = "";
      newColor = "text-primary";
      placeholder = "For Approval";
      break;
    case statusCode.DISAPPROVED:
      newIcon = "pi pi-refresh";
      newColor = "text-danger";
      placeholder = "Returned";
      break;
    case statusCode.APPROVED:
      newIcon = "pi pi-check";
      newColor = "text-success";
      placeholder = "Approved";
      break;
    case statusCode.TOUPDATE:
      newIcon = "pi pi-refresh";
      newColor = "text-warning";
      placeholder = "Returned";
      break;
    case statusCode.CLOSED:
      newIcon = "pi pi-check-circle";
      newColor = "text-secondary";
      placeholder = "Closed";
      break;
    case statusCode.SUBMITTED:
      newIcon = "pi pi-exclamation-triangle";
      newColor = "text-warning";
      placeholder = "Submitted";
      break;
    default:
      newIcon = "";
      newColor = "text-secondary";
      placeholder = status;
  }

  return (
    <>
      <span
        className={`${severity ?? (!color && newColor)}`}
        style={{ color: color }}
      >
        {showIcon && (
          <>
            {" "}
            <i className={icon ?? newIcon}></i>&nbsp;
          </>
        )}
        {placeholder}
      </span>
    </>
  );
};

ActivityStatus.propTypes = {
  showIcon: proptype.bool,
  status: proptype.string,
  severity: proptype.string,
  color: proptype.string,
  icon: proptype.string,
};
export default ActivityStatus;
