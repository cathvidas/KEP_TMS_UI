const StatusColor = (status, style,customStyle, showStatus) => {
  const className =
    status === "Submitted"
      ? "bg-info"
      : status === "ForApproval"
      ? "bg-primary"
      : status === "Approved"
      ? "bg-success"
      : status === "Disapproved"
      ? "bg-danger"
      : status === "Closed"
      ? "bg-secondary"
      : status === "Pending"
      ? "bg-warning text-dark"
      : status === "Completed"
      ? "bg-danger text-white"
      : status === "Published"
      ? "bg-warning text-dark"
      : "theme-secondary text-dark";

  return (<>
  <span className={`badge ${style} ${className}`} style={customStyle} >{showStatus ? status === "ForApproval" ? "For Approval" : status : ""} </span>
  </>);
};
export default StatusColor