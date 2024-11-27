import { TrainingType } from "../../api/constants";
import { UserList } from "./UserList";
import ExternalFacilitatorList from "./ExternalFacilitatorList";
import proptype from "prop-types"
import SkeletonDataTable from "../Skeleton/SkeletonDataTable";
import commonHook from "../../hooks/commonHook";
const TrainingFacilitatorList = ({requestData})=>{
  const internalfaci = requestData?.trainingType?.id === TrainingType.INTERNAL ? commonHook.useMappedInternalFacilitatorList(requestData?.trainingFacilitators):[];
  return (
    <>
      {requestData?.trainingType?.id === TrainingType.INTERNAL && (
        internalfaci?.loading ? <SkeletonDataTable/> : 
        <UserList
          leadingElement={true}
          userlist={internalfaci?.data}
          property={"name"}
        />
      )}
      {requestData?.trainingType?.id === TrainingType.EXTERNAL && (
        <ExternalFacilitatorList trainers={requestData?.trainingFacilitators} property={"externalFacilitatorId"}/>
      )}
    </>
  );
}
TrainingFacilitatorList.propTypes = {
  requestData: proptype.object.isRequired,
}
export default TrainingFacilitatorList;