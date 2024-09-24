import { statusCode } from "../api/constants";

const getStatusById = (id) => {
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
      ? "ForApproval": 
      "Pending";
  return status;
};

export default getStatusById;
