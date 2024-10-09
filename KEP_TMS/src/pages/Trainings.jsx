import Layout from "../components/General/Layout"
import { SectionBanner } from "../components/General/Section"
import TRequestTable from "../components/General/TRequestTable"
import trainingRequestHook from "../hooks/trainingRequestHook"
import { SessionGetEmployeeId } from "../services/sessions"


const Trainings =()=>{
  const {data, error, loading} = trainingRequestHook.useParticipantTrainings(SessionGetEmployeeId());
  console.log(data)
    const Content =() =>(<div className="p-3">
   
      <SectionBanner title="Assigned Trainings" subtitle="List of trainings assigned to you"/>

      <TRequestTable data={data} headingTitle="Training List" allowEdit={false}/>
      </div>
        
    )
    return(<>
    <Layout BodyComponent={Content} header={{title: "Trainings" , icon: <i className="pi pi-clipboard"></i>}}/></>)
}
export default Trainings