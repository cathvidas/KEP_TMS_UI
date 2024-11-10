import { OtherConstant, statusCode } from "../api/constants"
import Layout from "../components/General/Layout"
import { SectionBanner } from "../components/General/Section"
import TrainingRequestTableList from "../components/List/TrainingRequestTableList"
import SkeletonBanner from "../components/Skeleton/SkeletonBanner"
import SkeletonDataTable from "../components/Skeleton/SkeletonDataTable"
import trainingRequestHook from "../hooks/trainingRequestHook"
import trainingDetailsService from "../services/common/trainingDetailsService"
import { SessionGetEmployeeId } from "../services/sessions"


const Trainings =()=>{
  const {data, loading} = trainingRequestHook.useParticipantTrainings(SessionGetEmployeeId());
  const updatedData = data?.filter(item=> (item?.durationInHours >= OtherConstant.EFFECTIVENESS_MINHOUR && item?.status?.id === statusCode.SUBMITTED && (!trainingDetailsService.checkTrainingIfOutDated(item))) || item?.status?.id === statusCode.PUBLISHED);
    const Content =() =>(<div className="p-3">
   {loading ? <><SkeletonBanner/><SkeletonDataTable/></>:<>
      <SectionBanner title="Assigned Trainings" subtitle="List of trainings assigned to you"/>

      <TrainingRequestTableList data={updatedData} headingTitle="Training List" isTrainee allowEdit={false}/></>}
      </div>
        
    )
    return(<>
    <Layout navReference="Trainings" BodyComponent={Content} header={{title: "Trainings" , icon: <i className="pi pi-clipboard"></i>}}/></>)
}
export default Trainings