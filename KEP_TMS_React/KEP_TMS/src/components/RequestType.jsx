import { Button, Col, Modal, Row } from "react-bootstrap";

const RequestModal = () => {
  return (
    <>
      <div className="modal fade" role="dialog" tabIndex="-1" id="TRtype">
        <Modal.Dialog role="document">
          <div className="modal-content">
            <Modal.Header className="border-0" style={{background: '#f6fbf9'}}>
              <Button
                className="btn-close"
                type="button"
                aria-label="Close"
                data-bs-dismiss="modal"
              ></Button>
            </Modal.Header>
            <Modal.Body
              className="modal-body text-center pb-5 rounded-bottom"
              style={{background: '#f6fbf9'}}
            >
              <h4 className="modal-title" style={{color: 'rgb(2,84,45)'}}>
                Request new training?
              </h4>
              <p>Please select category</p>
              <Row className="gy-4">
                <Col>
                  <a className="text-decoration-none" href="NewRequest.html">
                    <div className="text-center d-flex flex-column align-items-center align-items-xl-center">
                      <div className="bs-icon-xl bs-icon-circle d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon xl">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          className="bi bi-building"
                          style={{color: 'rgb(0,153,81)'}}
                        >
                          <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"></path>
                          <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z"></path>
                        </svg>
                      </div>
                      <div className="px-3">
                        <h4 style={{color: 'rgb(90,138,120)'}}>Internal</h4>
                      </div>
                    </div>
                  </a>
                </Col>
                <Col>
                  <a className="text-decoration-none" href="NewRequest.html">
                    <div className="text-center d-flex flex-column align-items-center align-items-xl-center">
                      <div className="bs-icon-xl bs-icon-circle d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon xl">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          className="bi bi-globe-central-south-asia"
                          style={{color: 'rgb(0,153,81)'}}
                        >
                          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M4.882 1.731a.482.482 0 0 0 .14.291.487.487 0 0 1-.126.78l-.291.146a.721.721 0 0 0-.188.135l-.48.48a1 1 0 0 1-1.023.242l-.02-.007a.996.996 0 0 0-.462-.04 7.03 7.03 0 0 1 2.45-2.027Zm-3 9.674.86-.216a1 1 0 0 0 .758-.97v-.184a1 1 0 0 1 .445-.832l.04-.026a1 1 0 0 0 .152-1.54L3.121 6.621a.414.414 0 0 1 .542-.624l1.09.818a.5.5 0 0 0 .523.047.5.5 0 0 1 .724.447v.455a.78.78 0 0 0 .131.433l.795 1.192a1 1 0 0 1 .116.238l.73 2.19a1 1 0 0 0 .949.683h.058a1 1 0 0 0 .949-.684l.73-2.189a1 1 0 0 1 .116-.238l.791-1.187A.454.454 0 0 1 11.743 8c.16 0 .306.084.392.218.557.875 1.63 2.282 2.365 2.282a.61.61 0 0 0 .04-.001 7.003 7.003 0 0 1-12.658.905Z"></path>
                        </svg>
                      </div>
                      <div className="px-3">
                        <h4 style={{color: 'rgb(90,138,120)'}}>External</h4>
                      </div>
                    </div>
                  </a>
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
