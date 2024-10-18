import { Button } from "primereact/button";
import { Modal } from "react-bootstrap";
import proptype from "prop-types";
const ExamDialog = ({header, bodyContent, handleShow, handleClose, handleOnclick, footer }) => {
  return (
    <>
      <Modal show={handleShow} onHide={handleClose} size={"md"} centered>
        <Modal.Header className="border-0" closeButton>
        </Modal.Header>
        <Modal.Body className="py-0 px-5">
          <h5 className="text-center theme-color">
            {header}
          </h5>
          {bodyContent}
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
ExamDialog.propTypes = {
  handleShow: proptype.bool.isRequired,
  handleClose: proptype.func.isRequired,
  handleOnclick: proptype.func,
  header: proptype.string,
  bodyContent: proptype.node,
};
export default ExamDialog;
