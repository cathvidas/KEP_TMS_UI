import { Button } from "primereact/button";
import { Modal } from "react-bootstrap";
import proptype from "prop-types";
const ExamConfirmDialog = ({ handleShow, handleClose, handleOnclick }) => {
  return (
    <>
      <Modal show={handleShow} onHide={handleClose} size={"md"}>
        <Modal.Header className="border-0" closeButton>
        </Modal.Header>
        <Modal.Body className="py-0 px-5">
          <h5 className="text-center theme-color">
            Are you sure you want to take the exam now?
          </h5>
          <p>
            Once you start the exam, you will not be able to go back to the
            previous page.
            <br />
            <br />
            You will have 12 minutes to complete the exam.
            <br />
            Do you want to proceed?
          </p>
        </Modal.Body>
        <Modal.Footer className="border-0 d-flex justify-content-center">
          <Button
            label="Not now"
            icon="pi pi-times"
            onClick={handleClose}
            className="p-button-text rounded"
            severity="secondary"
          />
          <Button
            label="Proceed"
            icon="pi pi-check"
            className="rounded theme-bg"
            type="button"
            onClick={handleOnclick}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};
ExamConfirmDialog.propTypes = {
  handleShow: proptype.bool.isRequired,
  handleClose: proptype.func.isRequired,
  handleOnclick: proptype.func,
};
export default ExamConfirmDialog;
