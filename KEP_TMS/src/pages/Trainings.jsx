import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Header from "../components/General/Header"
import Layout from "../components/General/Layout"
import { faClipboardList } from "@fortawesome/free-solid-svg-icons"
import { SectionBanner, SectionTitle } from "../components/General/Section"
import RTable from "../components/General/Table"
import { icon } from "@fortawesome/fontawesome-svg-core"
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