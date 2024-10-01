import { statusCode } from "../api/constants";

const countStatus = (data) => {
  let count = {
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    cancelled: 0,
    closed: 0,
    published: 0,
    forApproval: 0
  };

  data.forEach((item) => {
    count.total++;
    // if()
    if (item?.status?.id === statusCode.APPROVED) {
      count.approved++;
    } else if (item.status.id === statusCode.FORAPPROVAL) {
      count.pending++;
    } else if (item.status.id === statusCode.CLOSED) {
      count.closed++;
    } else if (item.status.id === statusCode.PUBLISHED) {
      count.published++;
    }
  });
  return count;
};
export default countStatus;
