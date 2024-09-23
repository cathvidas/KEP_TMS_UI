const StatusColor = (status, style) => {
  const className =
    status === "Submitted"
      ? "bg-secondary"
      : status === "ForApproval"
      ? "bg-primary"
      : status === "Approved"
      ? "bg-warning"
      : status === "Disapproved"
      ? "bg-danger"
      : status === "Closed"
      ? "bg-success"
      : "bg-default";

  return (<>
  <span className={`badge ${style} ${className}`}>{status === "ForApproval" ? "For Approval" : status} </span>
  </>);
};
export default StatusColor