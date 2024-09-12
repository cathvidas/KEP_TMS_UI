import { Button, Col, Modal, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingCircleArrowRight,
  faBuildingCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import proptypes from "prop-types";

const RequestModal = ({ showModal, setShowModal }) => {
  console.log(showModal);
  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header className="border-0" style={{ background: "#f6fbf9" }}>
          <Button
            className="btn-close"
            type="button"
            onClick={() => setShowModal(false)}
          ></Button>
        </Modal.Header>
        <Modal.Body
          className="modal-body text-center pt-0 pb-5 rounded-bottom"
          style={{ background: "#f6fbf9" }}
        >
          <h4 className="modal-title" style={{ color: "rgb(2,84,45)" }}>
            Request new training?
          </h4>
          <p>Please select category</p>
          <Row className="gy-4 mt-3">
            <Col>
              <div className="text-center text-theme-hover d-flex flex-column align-items-center align-items-xl-center">
                <Link to="/KEP_TMS/NewRequest" className="text-decoration-none">
                  {" "}
                  <FontAwesomeIcon
                    icon={faBuildingCircleCheck}
                    style={{ color: "rgb(0,153,81)", fontSize: "50px" }}
                  />
                  <h4 style={{ color: "rgb(90,138,120)" }}>Internal</h4>
                </Link>
              </div>
            </Col>
            <Col>
              <div className="text-center text-theme-hover d-flex flex-column align-items-center align-items-xl-center">
                <Link className="text-decoration-none" to="/KEP_TMS/NewRequest">
                  <FontAwesomeIcon
                    icon={faBuildingCircleArrowRight}
                    style={{ color: "rgb(0,153,81)", fontSize: "50px" }}
                  />
                  <h4 style={{ color: "rgb(90,138,120)" }}>External</h4>
                </Link>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};
RequestModal.propTypes = {
  showModal: proptypes.bool,
  setShowModal: proptypes.func,
};
export default RequestModal;
