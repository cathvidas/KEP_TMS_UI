import { Button } from "primereact/button";
import { Modal } from "react-bootstrap";

const ExamConfirmDialog = ({})=>{
   

    return(<> 
    <Modal show={false} onHide={close} size={"md"}  >
        <Modal.Header className="border-0" closeButton>
          {/* <Modal.Title className={`h5 `}>ugsadgusd</Modal.Title> */}
        </Modal.Header>
        <Modal.Body className="py-0 px-5">

            <h5 className="text-center">Are you sure you want to take the exam now?</h5>
            <p>Once  you start the exam, you will not be able to go back to the previous page.
                <br/>
                <br />
                You will have 12 minutes to complete the exam.
                <br/>
                Do you want to proceed?
            </p>

        </Modal.Body>
        <Modal.Footer className="border-0 d-flex justify-content-center">
          
        <Button label="Not now" icon="pi pi-times" onClick={close} className="p-button-text rounded" />
        <Button label="Proceed" icon="pi pi-check"  className="rounded"  />
   
        </Modal.Footer>
      </Modal>

    </>)
}
export default ExamConfirmDialog