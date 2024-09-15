const StatusColor = (status) => {
  const style =
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
  <span className={`badge ${style}`}>{status}</span>
  </>);
};
export default StatusColor