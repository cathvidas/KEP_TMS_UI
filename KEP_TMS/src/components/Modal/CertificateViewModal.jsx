import { ButtonGroup, Card, Col, Row } from "react-bootstrap";
import proptype from "prop-types";
import { API_BASE_URL } from "../../api/constants";
import PDFViewer from "../General/PDFViewer";
import { useState } from "react";
import { Button } from "primereact/button";
import {
  formatDateTime,
  GenerateTrainingDates,
} from "../../utils/datetime/Formatting";
import { SessionGetEmployeeId } from "../../services/sessions";
import AutoCompleteField from "../forms/common/AutoCompleteField";
import { confirmAction } from "../../services/sweetalert";
import handleResponseAsync from "../../services/handleResponseAsync";
import certificateService from "../../services/certificateService";
const CertificateViewModal = ({ data, hideModalFunction, onFinish, onUpdate }) => {
  const [showPDF, setShowPDF] = useState(false);
  const [selectedItem, setSlectedItem] = useState({});
  const removeCertificate = (id) => {
    confirmAction({
      title: "Delete Certificate",
      text: "Are you sure you want to delete this certificate?",
      onConfirm: () => {
        handleResponseAsync(
          () => certificateService.deleteCertificate(id),
          null,
          null,
          onFinish()
        );
      },
    });
  };
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
          {data?.training?.trainingProgram?.name && (
            <>
              <h4 className="text-center">
                {data?.training?.trainingProgram?.name}
              </h4>
              <p className="text-center mb-2">
                {data?.training?.trainingCategory?.name}
              </p>
              <Row>
                <AutoCompleteField
                  label={"Training ID"}
                  value={data?.training?.id}
                />
                <AutoCompleteField
                  label={"Training Type"}
                  value={data?.training?.trainingType?.name}
                />
                <AutoCompleteField
                  label={"Training Date/s"}
                  value={GenerateTrainingDates(data?.training?.trainingDates)}
                />
                <AutoCompleteField
                  label={"Total Hours"}
                  value={data?.training?.durationInHours}
                />
                <AutoCompleteField
                  label={"Training Provider"}
                  value={data?.training?.trainingProvider?.name}
                  className="col-12"
                />
                {/* <AutoCompleteField label={"Training Date/s"} value={`${formatDateOnly(data?.training?.trainingStartDate)} ${formatDateOnly(data?.training?.trainingStartDate) !== formatDateOnly(data?.training?.trainingEndDate) ? ' - '+formatDateOnly(data?.training?.trainingEndDate) : ''}`}/> */}
              </Row>{" "}
            </>
          )}
          {data?.certificate?.map((item) => (
            <>
              <hr />
              <div className="flex justify-content-between">
              <h5 className="theme-color">
                <i className="pi pi-info-circle"></i> &nbsp;
                {item?.detail}
              </h5>
              <ButtonGroup>
              <Button type="button" text icon="pi pi-pencil" label="Update" className="rounded" onClick={() => onUpdate(item)} />
              <Button type="button" text severity="danger" icon="pi pi-trash" label="Delete"className="rounded" onClick={() => removeCertificate(item?.id)} />
              </ButtonGroup> </div>
              <small>
                {SessionGetEmployeeId() === item?.createBy
                  ? "Uploaded on"
                  : "Uploaded By: -" + item?.createBy}{" "}
                {formatDateTime(item?.createDate)}
              </small>
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
                              url: API_BASE_URL + e?.url,
                            });
                            setShowPDF(true);
                          }}
                        >
                          <div className="position-relative">
                            <i
                              className="pi pi-file-pdf"
                              style={{ fontSize: "15rem", color: "#cb4949" }}
                            ></i>
                          </div>
                          <small className="text-muted">
                            Click to view details
                          </small>
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
  hideModalFunction: proptype.func,
  onFinish: proptype.func,
  onUpdate: proptype.func,
};
export default CertificateViewModal;
