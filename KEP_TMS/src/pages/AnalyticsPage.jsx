import { icon } from "@fortawesome/fontawesome-svg-core"
import Layout from "../components/General/Layout"
import TemplateDemo from "../components/General/TemplateDemo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear } from "@fortawesome/free-solid-svg-icons"

const content =()=>{
    return(
        <><TemplateDemo/>
        </>
    )
}

const AnalyticsPage =()=>{
    return(<>
    <Layout
    header={{title: "TEsting", icon: <FontAwesomeIcon icon={faGear}/>}} BodyComponent={content}/>
    </>)
}
export default AnalyticsPage