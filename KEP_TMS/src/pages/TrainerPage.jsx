import { statusCode } from "../api/constants"
import Layout from "../components/General/Layout"
import { SectionBanner } from "../components/General/Section"
import TRequestTable from "../components/General/TRequestTable"
import SkeletonBanner from "../components/Skeleton/SkeletonBanner"
import SkeletonDataTable from "../components/Skeleton/SkeletonDataTable"
import trainingRequestHook from "../hooks/trainingRequestHook"
import { SessionGetEmployeeId } from "../services/sessions"


const TrainerPage =()=>{
  const {data, loading} = trainingRequestHook.useParticipantTrainings(SessionGetEmployeeId(),'trainer');
  const updatedData = data?.filter(item=> item?.status?.id === statusCode.APPROVED || item?.status?.id === statusCode.PUBLISHED)
    const Content =() =>(<div className="p-3">
      {loading ? <><SkeletonBanner/><SkeletonDataTable/></>:<>
      <SectionBanner title="Assigned Trainings" subtitle="List of Trainings Assigned to you"/>

      <TRequestTable data={updatedData} headingTitle="Training List" allowEdit={false}/></>}
      </div>
        
    )
    return(<>
    <Layout BodyComponent={Content} header={{title: "TrainerPage" , icon: <i className="pi pi-clipboard"></i>}}/></>)
}
export default TrainerPage