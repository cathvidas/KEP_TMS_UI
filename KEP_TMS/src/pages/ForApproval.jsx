import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Header from "../components/General/Header"
import Layout from "../components/General/Layout"
import { faClipboardList } from "@fortawesome/free-solid-svg-icons"
import { SectionBanner, SectionTitle } from "../components/General/Section"
import RTable from "../components/General/Table"
import { icon } from "@fortawesome/fontawesome-svg-core"

const ForApproval =()=>{
    const Content =() =>(<>
    
      <SectionBanner title="For Approvals" subtitle="List of Trainings waiting for Approval"/>
      <SectionTitle
        title={"Recent Trainings"}
        Action={{ Link: "#i", Text: "View All" }}
      />
      <RTable userType={"forapproval"} /></>
        
    )
    return(<>
    <Layout BodyComponent={Content} header={{ title:"For Approvals", icon: <i className="pi pi-pen-to-square"></i>}}/></>)
}
export default ForApproval