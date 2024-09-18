import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Header from "../components/General/Header"
import Layout from "../components/General/Layout"
import { faClipboardList } from "@fortawesome/free-solid-svg-icons"
import { SectionBanner, SectionTitle } from "../components/General/Section"
import RTable from "../components/General/Table"

const Trainings =()=>{
    const Content =() =>(<>
    
    <Header
        title="Trainings"
        IconComponent={<FontAwesomeIcon icon={faClipboardList}/>}
      />
      <SectionBanner title="Trainings" subtitle="List of Trainings"/>
      <SectionTitle
        title={"Recent Trainings"}
        Action={{ Link: "#i", Text: "View All" }}
      />
      <RTable /></>
        
    )
    return(<>
    <Layout BodyComponent={Content}/></>)
}
export default Trainings