import { Button, Col, Modal, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingCircleArrowRight,
  faBuildingCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const RequestModal = () => {
  return (
    <>
      <div className="modal fade" role="dialog" tabIndex="-1" id="TRtype">
        <Modal.Dialog role="document">
          <div className="modal-content">
            <Modal.Header
              className="border-0"
              style={{ background: "#f6fbf9" }}
            >
              <Button
                className="btn-close"
                type="button"
                aria-label="Close"
                data-bs-dismiss="modal"
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
                  <div className="text-center brand-hover d-flex flex-column align-items-center align-items-xl-center">
                    <Link className="text-decoration-none" to="NewRequest.html">
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
                  <div className="text-center brand-hover d-flex flex-column align-items-center align-items-xl-center">
                    <Link className="text-decoration-none" to="NewRequest.html">
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
          </div>
        </Modal.Dialog>
      </div>
    </>
  );
};
export default RequestModal;
