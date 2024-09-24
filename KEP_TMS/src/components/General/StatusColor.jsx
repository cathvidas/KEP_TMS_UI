const StatusColor = (status, style) => {
  console.log(status, style)
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
      : status === "Pending"
      ? "bg-secondary text-dark"
      : "bg-default text-dark";

  return (<>
  <span className={`badge ${style} ${className}`}>{status === "ForApproval" ? "For Approval" : status} </span>
  </>);
};
export default StatusColor