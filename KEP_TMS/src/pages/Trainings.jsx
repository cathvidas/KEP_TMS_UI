import Layout from "../components/General/Layout"
import { SectionBanner, SectionTitle } from "../components/General/Section"
import TRequestTable from "../components/General/TRequestTable"

const Trainings =()=>{
    const Content =() =>(<div className="p-3">
   
      <SectionBanner title="Trainings" subtitle="List of Trainings"/>
      <SectionTitle
        title={"Recent Trainings"}
        Action={{ Link: "#i", Text: "View All" }}
      />
      <TRequestTable filterType={"forApproval"}/></div>
        
    )
    return(<>
    <Layout BodyComponent={Content} header={{title: "Trainings" , icon: <i className="pi pi-clipboard"></i>}}/></>)
}
export default Trainings