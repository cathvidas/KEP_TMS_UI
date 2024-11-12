import { Card, Col, Modal, Row } from "react-bootstrap";
import proptype from "prop-types";
import { API_BASE_URL } from "../../api/constants";
import PDFViewer from "../General/PDFViewer";
import { useState } from "react";
import { Button } from "primereact/button";
const CertificateViewModal = ({ data, hideModalFunction, title, items }) => {
  const [showPDF, setShowPDF] = useState(false);
  const [selectedItem, setSlectedItem] = useState({});
  return (
    <>
      <Card className="my-3">
        <div className="text-end">
          <Button
            type="button"
            text
            onClick={hideModalFunction}
            icon="pi pi-times"
          />
        </div>
        <Card.Body>
          <h4 className="text-center">
            {data?.training?.trainingProgram?.name}
          </h4>
          {data?.certificate?.map((item) => (
            <>
              <hr />
              <h5 className="theme-color">
                <i className="pi pi-calendar"></i> &nbsp;
                {item?.detail}</h5>
              <Row className="row-cols-md-3 justify-content-center">
                {item?.attachments?.map((e) => (
                  <>
                      <Col>
                    {e?.fileType === ".pdf" ? (
                        <div
                          className="bg-light rounded flex flex-column p-3 cursor-pointer justify-content-center align-items-center"
                          // style={{ width: "fit-content" }}
                          onClick={() => {
                            setSlectedItem({
                              ...e,
                              url: API_BASE_URL+e?.url,
                            });
                            setShowPDF(true);
                          }}
                        >
                          <div className="position-relative">
                            <i
                              className="pi pi-file-pdf"
                              style={{ fontSize: "15rem", color: "#cb4949", }}
                            ></i>
                          </div>
                          <small className="text-muted">Click to view details</small>
                        </div>
                    ) : (
                      <img
                        src={`${API_BASE_URL}/Attachment/GetCertificateFile?attachmentId=${e?.id}`}
                        alt="Certificate"
                        width="100%"
                        height="100%"
                      />
                    )}
                    </Col>
                  </>
                ))}
              </Row>
              <br />
            </>
          ))}
        </Card.Body>
      </Card>

      <PDFViewer
        handleShow={showPDF}
        handleClose={() => setShowPDF(false)}
        data={selectedItem}
      />
    </>
  );
};
CertificateViewModal.propTypes = {
  data: proptype.object,
  items: proptype.array,
  showModal: proptype.bool,
  hideModalFunction: proptype.func,
};
export default CertificateViewModal;
