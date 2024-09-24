const StatusColor = (status, style) => {
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
      : "bg-default text-dark";

  return (<>
  <span className={`badge ${style} ${className}`}>{status === "ForApproval" ? "For Approval" : status} </span>
  </>);
};
export default StatusColor