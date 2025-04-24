import proptype from "prop-types";
import { statusCode } from "../../api/constants";
const ActivityStatus = ({ showIcon = true, icon, status, severity, color, block }) => {
  let newIcon = "";
  let newColor = "";
  let customColor = color ? color : "";
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
      newIcon = "pi pi-replay";
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
      customColor = "#c084fc";
      newIcon = "pi pi-check-circle";
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
        className={`${severity ? severity : (!color && newColor) ? newColor : color} ${block ? "d-block":""} text-center`}
        style={{ color: customColor }}
      >
        {showIcon && (
          <>
            {" "}
            <i className={icon ? icon : newIcon}></i>&nbsp;
          </>
        )}
        {placeholder}
      </span>
    </>
  );
};

ActivityStatus.propTypes = {
  showIcon: proptype.bool,
  status: proptype.any,
  severity: proptype.string,
  color: proptype.string,
  icon: proptype.string,
  block: proptype.bool,
};
export default ActivityStatus;
