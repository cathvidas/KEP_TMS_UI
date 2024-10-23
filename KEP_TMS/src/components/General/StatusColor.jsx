// const StatusColor = (status, style,customStyle, showStatus) => {
const StatusColor = (data) => {
  const className = data?.color
    ? `${data.color}`
    : data?.status === "Submitted"
    ? "bg-warning text-dark"
    : data?.status === "Inactive"
    ? "bg-danger"
    : data?.status === "ForApproval"
    ? "bg-primary"
    : data?.status === "Approved"
    ? "bg-success"
    : data?.status === "Disapproved" || data?.status === "Outdated"
    ? "bg-danger"
    : data?.status === "Closed"
    ? "bg-secondary"
    : data?.status === "Pending"
    ? "bg-warning text-dark"
    : data?.status === "Completed"
    ? "bg-danger text-white"
    : data?.status === "Published"
    ? "bg-success"
    : "theme-secondary text-dark";

  return (
    <>
      <span
        className={`badge ${data?.class} ${className}`}
        style={data?.style}
        onClick={data?.handleOnclick}
      >
        {data?.showStatus
          ? data?.status === "ForApproval"
            ? "For Approval"
            : data?.status === "Inactive"
            ? "Cancelled"
            : data?.status
          : ""}{" "}
      </span>
    </>
  );
};
export default StatusColor;
