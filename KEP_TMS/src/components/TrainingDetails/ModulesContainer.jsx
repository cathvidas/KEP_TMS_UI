import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import EmptyState from "../Form/EmptyState"
import { SectionHeading } from "../General/Section"
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons"

const ModulesContainer = () =>{
    return(<>
    <SectionHeading title="Modules" icon={
        <FontAwesomeIcon icon={faNoteSticky}/>
    }/>
    <EmptyState placeholder="No modules added yet, please click to add"/>
    
    </>)
}
export default ModulesContainer