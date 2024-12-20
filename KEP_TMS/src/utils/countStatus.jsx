import { OtherConstant, statusCode } from "../api/constants";
import trainingDetailsService from "../services/common/trainingDetailsService";
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
    outDatedRequests: 0
  };
  userRequest.forEach((item) => {
    count.total++;
    // if()
    if(trainingDetailsService.checkTrainingIfOutDated(item) &&( item?.status?.id === statusCode.SUBMITTED || item?.status?.id === statusCode.FORAPPROVAL|| item?.status?.id === statusCode.APPROVED)){
      count.outDatedRequests++;
    }
    // if (item?.status?.id === statusCode.APPROVED) {
    //   count.approved++;
    // } else
     if ((item.status.id === statusCode.FORAPPROVAL || item.status.id === statusCode.SUBMITTED || item?.status?.id === statusCode.APPROVED) && !trainingDetailsService.checkTrainingIfOutDated(item)) {
      count.pending++;
    } else if (item.status.id === statusCode.CLOSED) {
      count.closed++;
    } else if (item.status.id === statusCode.PUBLISHED) {
      count.published++;
    }else if (item.status.id === statusCode.DISAPPROVED) {
      count.rejected++;
    }
  });  
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
    if(isFacilitator &&((item?.status?.id === statusCode.APPROVED && !trainingDetailsService.checkTrainingIfOutDated(item)) || item?.status?.id === statusCode.PUBLISHED)){
      count.trainerAction++;
    }
    if(isParticipant  && ((item?.durationInHours >= OtherConstant.EFFECTIVENESS_MINHOUR && item?.status?.id === statusCode.SUBMITTED && !trainingDetailsService.checkTrainingIfOutDated(item))|| item?.status?.id === statusCode.PUBLISHED)){
      count.assignedTraining++;
    }
  });
  return count;
};
export default countStatus;
