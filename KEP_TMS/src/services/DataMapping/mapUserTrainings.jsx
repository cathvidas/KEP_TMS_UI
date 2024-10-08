import { statusCode } from "../../api/constants";

const mapUserTrainings = (data, id)=>{
  const entity = {
    attended: [],
    facilitated: [],
    ongoing: [],
    requested: [],
  };
  data?.forEach((item) => {
    if(item?.requestorBadge === id){
        entity.requested.push(item);
    }
    const isParticipant = item?.trainingParticipants?.find((participant) => participant?.employeeBadge === id);
    if(isParticipant){
        entity.attended.push(item);
        if(item?.status?.id !== statusCode.CLOSED){
            entity.ongoing.push(item);
        }
    }
    const isFacilitator = item?.trainingFacilitators?.find((facilitator) => facilitator?.facilitatorBadge === id);
    if(isFacilitator){
        entity.facilitated.push(item);
    }
  });
  return entity;
}
export default mapUserTrainings;