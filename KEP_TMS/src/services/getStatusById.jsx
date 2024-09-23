import { statusCode } from "../api/constants";

const getStatusById = (id) => {
    console.log(id)
  const status =
    id === statusCode.ACTIVE
      ? "Active"
      : id === statusCode.INACTIVE
      ? "Inactive"
      : id === statusCode.SUBMITTED
      ? "Submited"
      : id === statusCode.APPROVED
      ? "Approved"
      : id === statusCode.DISAPPROVED
      ? "Disapproved"
      : id === statusCode.CLOSED
      ? "Closed"
      : id === statusCode.FORAPPROVAL
      ? "ForApproval"
      : "Unknown";
  return status;
};

export default getStatusById;
