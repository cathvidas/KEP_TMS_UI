import { statusCode } from "../../api/constants";

const getStatusCode = (stringStatus) => {
  const status = stringStatus?.toLowerCase();
  return status === "pending" || status === "forapproval"
    ? statusCode.FORAPPROVAL
    : status === "approved"
    ? statusCode.APPROVED
    : status === "disapproved"
    ? statusCode.DISAPPROVED
    : status === "submitted"
    ? statusCode.SUBMITTED
    : status === "closed"
    ? statusCode.CLOSED
    : status === "published"
    ? statusCode.PUBLISHED
    : 0;
};
export default getStatusCode;