import { statusCode } from "../../api/constants";

const getStatusById = (id) => {
  const status =
    id === statusCode.ACTIVE
      ? "Active"
      : id === statusCode.INACTIVE
      ? "Inactive"
      : id === statusCode.SUBMITTED
      ? "Submitted"
      : id === statusCode.APPROVED
      ? "Approved"
      : id === statusCode.DISAPPROVED
      ? "Disapproved"
      : id === statusCode.CLOSED
      ? "Closed"
      : id === statusCode.TOUPDATE
      ? "ForUpdate"
      : id === statusCode.FORAPPROVAL
      ? "ForApproval"
      :  id === statusCode.DRAFTED
      ? "Drafted":
      "Pending";
  return status;
};

export default getStatusById;
