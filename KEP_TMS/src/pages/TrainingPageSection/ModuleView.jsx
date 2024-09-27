import { Col, Row } from "react-bootstrap";
import { SectionHeading } from "../../components/General/Section";
import proptype from "prop-types"
import ModuleItem from "../../components/TrainingPageComponents/ModuleItem";
const ModuleView = ({modules})=>{
    return(<>
    <SectionHeading title="Modules" icon={<i className="pi pi-folder"></i>}/>
    <Row>
        {modules?.map(item =>{
            return(
                <Col key={item?.id}>
                    <ModuleItem module={item}/>
                </Col>
            )
        })}
    </Row>
    </>) 
}
ModuleView.propTypes = {
    modules: proptype.array,
 
}
export default ModuleView;