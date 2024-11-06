import { Card, Col, Modal, Row } from "react-bootstrap";
import proptype from "prop-types";
import { ApiConstant } from "../../api/constants";
import PDFViewer from "../General/PDFViewer";
import { useState } from "react";
const CertificateViewModal = ({
  showModal,
  hideModalFunction,
  title,
  items,
}) => {
  const [showPDF, setShowPDF] = useState(false);
  const [data, setData] = useState({});
  return (
    <>
      <Card>
        <Card.Body>
          <Row>
            {items?.map((e) => (
              <>
                {e?.fileType === ".pdf" ? (
                  //   <iframe
                  //     src={`${ApiConstant.BASE_URL}/Attachment/GetCertificateFile?attachmentId=${e?.id}#page=1&zoom=FitH&view=FitH&toolbar=0&nameddest=&page=pagenum`}
                  //     width="100%"
                  //     height="100%"
                  //     title="Certificate"
                  //   ></iframe>
                  <Col>
                    <div
                      className="bg-light rounded flex flex-column p-3 justify-content-center align-items-center"
                      style={{ width: "fit-content" }}
                      onClick={() => {
                        setData({...e, url: `${ApiConstant.BASE_URL}/Attachment/GetCertificateFile?attachmentId=${e?.id}`});
                        setShowPDF(true);
                      }}
                    >
                      <div className="position-relative">
                        <i
                          className="pi pi-file-pdf"
                          style={{ fontSize: "150px", color: "#ff0000" }}
                        ></i>
                      </div>
                      <p>{e?.details}</p>
                    </div>
                  </Col>
                ) : (
                  <img
                    src={`${ApiConstant.BASE_URL}/Attachment/GetCertificateFile?attachmentId=${e?.id}`}
                    alt="Certificate"
                    width="100%"
                    height="100%"
                  />
                )}
              </>
            ))}
          </Row>
        </Card.Body>
      </Card>

      <PDFViewer
        handleShow={showPDF}
        handleClose={() => setShowPDF(false)}
        data={data}
      />
    </>
  );
};
CertificateViewModal.propTypes = {
  title: proptype.string,
  items: proptype.array,
  showModal: proptype.bool,
  hideModalFunction: proptype.func,
};
export default CertificateViewModal;
