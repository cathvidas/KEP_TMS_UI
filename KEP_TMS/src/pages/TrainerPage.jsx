import Layout from "../components/General/Layout"
import { SectionBanner } from "../components/General/Section"
import TRequestTable from "../components/General/TRequestTable"
import trainingRequestHook from "../hooks/trainingRequestHook"
import { SessionGetEmployeeId } from "../services/sessions"


const TrainerPage =()=>{
  const {data, error, loading} = trainingRequestHook.useParticipantTrainings(SessionGetEmployeeId(),'trainer');
  console.log(data)
    const Content =() =>(<div className="p-3">
   
      <SectionBanner title="Assigned Trainings" subtitle="List of Trainings Assigned to you"/>

      <TRequestTable data={data} headingTitle="Training List" allowEdit={false}/>
      </div>
        
    )
    return(<>
    <Layout BodyComponent={Content} header={{title: "TrainerPage" , icon: <i className="pi pi-clipboard"></i>}}/></>)
}
export default TrainerPage