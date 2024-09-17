import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Header from "../components/General/Header"
import Layout from "../components/General/Layout"
import { faClipboardList } from "@fortawesome/free-solid-svg-icons"
import { SectionBanner, SectionTitle } from "../components/General/Section"
import RTable from "../components/General/Table"

const ForApproval =()=>{
    const Content =() =>(<>
    
    <Header
        title="For Approvals"
        IconComponent={<FontAwesomeIcon icon={faClipboardList}/>}
      />
      <SectionBanner title="For Approvals" subtitle="List of Trainings waiting for Approval"/>
      <SectionTitle
        title={"Recent Trainings"}
        Action={{ Link: "#i", Text: "View All" }}
      />
      <RTable userType={"forapproval"} /></>
        
    )
    return(<>
    <Layout ActionComponent={Content}/></>)
}
export default ForApproval