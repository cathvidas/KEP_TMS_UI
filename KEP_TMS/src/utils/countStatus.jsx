import { statusCode } from "../api/constants";
import { SessionGetEmployeeId } from "../services/sessions";

const countStatus = (data, userRequest) => {
  let count = {
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    cancelled: 0,
    closed: 0,
    published: 0,
    forApproval: 0,
    ongoing: 0,
    trainerAction: 0,
    assignedTraining: 0,
  };

  userRequest.forEach((item) => {
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
  console.log(data)
  data.forEach((item) => {  
    let isParticipant = false;
    let isFacilitator = false;
    item?.trainingParticipants?.map((x) => {
      if (x?.employeeBadge === SessionGetEmployeeId()) {
        isParticipant = true;
      }
      
    });
    item?.trainingFacilitators?.map((x) => {
      if (x?.facilitatorBadge === SessionGetEmployeeId()) {
        isFacilitator = true;
      }
      
    });
    if(isParticipant && item?.status?.id === statusCode.PUBLISHED){
      count.ongoing++;
    }
    if(isFacilitator ){
      count.trainerAction++;
    }
    // if(isFacilitator && (item?.status?.id === statusCode.APPROVED || item?.status?.id === statusCode.PUBLISHED)){
    //   count.trainerAction++;
    // }
    if(isParticipant){
      count.assignedTraining++;
    }
  });
  return count;
};
export default countStatus;
