import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import EmptyState from "../Form/EmptyState"
import { SectionHeading } from "../General/Section"
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons"
import { ModalContainer } from "../Modal/ModalContainer"
import { useState } from "react"
import { FormFieldItem } from "../Form/FormElements"

const ModulesContainer = () =>{
    const [showModal, setShowModal] = useState(false)
    const ModalContent = <>
    <FormFieldItem label={"Title"} FieldComponent={
        <input type="text" className="form-control" placeholder="Title"/>
    }/>
    <br/>
    <FormFieldItem label={"Attachment"} FieldComponent={
        <>
        <input type="file" className="form-control"/>
        </>
    }/>
    </>
    return(<>
    <SectionHeading title="Modules" icon={
        <FontAwesomeIcon icon={faNoteSticky}/>
    }/>
    <EmptyState placeholder="No modules added yet, please click to add" action={()=>setShowModal(true)}/>
    
    <ModalContainer
        variantStyle={"primary"}
        state={showModal}
        close={()=>setShowModal(false)}
       // buttonAction={""}
        heading="Add module"
        id="userlistModal"
        buttonText="Add"
        body={ModalContent}
      />
    </>)
}
export default ModulesContainer