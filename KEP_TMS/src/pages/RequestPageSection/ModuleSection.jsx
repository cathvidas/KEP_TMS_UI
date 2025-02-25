import { useCallback, useEffect, useState } from "react";
import { SectionHeading } from "../../components/General/Section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import EmptyState from "../../components/trainingRequestFormComponents/EmptyState";
import { Col, Row } from "react-bootstrap";
import { Button } from "primereact/button";
import { ButtonGroup } from "primereact/buttongroup";
import UploadModuleForm from "../../components/forms/UploadModuleForm";
import proptype from "prop-types";
import SkeletonList from "../../components/Skeleton/SkeletonList";
import handleResponseAsync from "../../services/handleResponseAsync";
import moduleService from "../../services/moduleService";
import PDFViewer from "../../components/General/PDFViewer";
import { actionSuccessful, confirmAction } from "../../services/sweetalert";
import attachmentService from "../../services/attachmentService";
import ErrorTemplate from "../../components/General/ErrorTemplate";
import { formatDateTime } from "../../utils/datetime/Formatting";
import { CompareDateTimeWithToday } from "../../utils/datetime/dateComparison";
import { API_BASE_URL } from "../../api/constants";

const ModuleSection = ({ data }) => {
  const [showForm, setShowForm] = useState(false);
  const [moduleList, setModuleList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState({});
  const [selectedModule, setSelectedModule] = useState({});
  const [showPDF, setShowPDF] = useState(false);
  const refreshData = useCallback(() => {
    const getRequest = async () => {
      handleResponseAsync(
        () => moduleService.getModulesByRequestId(data?.id),
        (e) => setModuleList(e),
        (e) => setError(e?.message),
        () => setLoading(false)
      );
    };
    getRequest();
  }, [data?.id]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);
  const removeModule = (id) => {
    confirmAction({
      title: "Remove Module",
      text: "Are you sure you want to remove this module?",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      onConfirm: () =>
        handleResponseAsync(
          () => moduleService.deleteModule(id),
          () => actionSuccessful("Success", "Successfully removed the module"),
          null,
          () => refreshData()
        ),
    });
  };
  const removeAttachment = (id) => {
    confirmAction({
      title: "Remove Attachment",
      text: "Are you sure you want to remove this attachment?",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      onConfirm: () =>
        handleResponseAsync(
          () => attachmentService.deleteAttachment(id),
          null,
          null,
          () => {
            refreshData();
          }
        ),
    });
  };
  useEffect(() => {
    const newData = moduleList.find((item) => item.id === selectedModule?.id);
    setSelectedModule(newData);
  }, [moduleList, selectedModule]);
  return (
    <>
      <SectionHeading
        title="Modules"
        icon={<FontAwesomeIcon icon={faNoteSticky} />}
      />
      {loading ? (
        <SkeletonList />
      ) : error ? (
        <ErrorTemplate message={error} />
      ) : (
        <>
          {showForm ? (
            <UploadModuleForm
              requestData={data}
              reqId={data?.id}
              defaultValue={selectedModule?.id ? selectedModule : null}
              setShowForm={() => setShowForm(false)}
              handleRefresh={() => {
                refreshData();
                setShowForm(false);
              }}
              handleRemoveFile={(e) => removeAttachment(e)}
            />
          ) : moduleList?.length > 0 ? (
            <>
              <span className="d-flex mb-2 justify-content-between">
                <span className="text-muted">{moduleList.length} modules</span>

                <Button
                  type="button"
                  icon="pi pi-plus"
                  size="small"
                  className="theme-btn rounded py-1"
                  label="Add New"
                  onClick={() => {
                    setShowForm(true);
                    setSelectedModule(null);
                  }}
                />
              </span>
              <Row className="1 g-2 row-cols-1">
                {moduleList.map((x) => {
                  return (
                    <Col key={`module${x.id}`}>
                      <div className="shadow-sm overflow-hidden card">
                        <div className="theme-bg-light p-2 px-3 d-flex align-items-center justify-content-between">
                          <div>
                            <small className="text-muted fw-bold text-uppercase">
                              {x.name}
                            </small>
                            {x?.availableAt || x.unavailableAt ? (
                              <small className="d-block text-muted">
                                <i
                                  className="pi pi-clock"
                                  style={{ fontSize: "0.8rem" }}
                                ></i>{" "}
                                Duration:{" "}
                                {`${formatDateTime(
                                  x.availableAt
                                )} - ${formatDateTime(x.unavailableAt)} `}
                                {CompareDateTimeWithToday(x.availableAt)
                                  ?.isPast &&
                                CompareDateTimeWithToday(x.unavailableAt)
                                  ?.isFuture ? (
                                  <span
                                    className={`text-success rounded-pill px-2`}
                                  >
                                    <i
                                      className="pi pi-check-circle"
                                      style={{ fontSize: "0.8rem" }}
                                    ></i>{" "}
                                    Active
                                  </span>
                                ) : CompareDateTimeWithToday(x.unavailableAt)
                                    ?.isPast ? (
                                  <span
                                    className={`text-danger rounded-pill px-2`}
                                  >
                                    <i
                                      className="pi pi-times-circle"
                                      style={{ fontSize: "0.8rem" }}
                                    ></i>{" "}
                                    Expired
                                  </span>
                                ) : (
                                  <span
                                    className={`text-warning rounded-pill px-2`}
                                  >
                                    Inactive
                                  </span>
                                )}
                              </small>
                            ) : (
                              <span
                                className={`text-success rounded-pill px-2`}
                              >
                                <i
                                  className="pi pi-check-circle"
                                  style={{ fontSize: "0.8rem" }}
                                ></i>{" "}
                                Active
                              </span>
                            )}
                          </div>
                          <ButtonGroup>
                            <Button
                              type="button"
                              text
                              size="small"
                              icon="pi pi-pencil"
                              severity="secondary"
                              className="p-0 rounded"
                              onClick={() => {
                                setSelectedModule(x);
                                setShowForm(true);
                              }}
                            />
                            <Button
                              type="button"
                              text
                              size="small"
                              severity="danger"
                              icon="pi pi-trash"
                              className="p-0 rounded"
                              onClick={() => removeModule(x.id)}
                            />
                          </ButtonGroup>{" "}
                        </div>
                        <div className="px-4 p-2">
                          <div
                            dangerouslySetInnerHTML={{ __html: x.description }}
                          />
                          {/* <p className="m-0">{x.description}</p> */}
                          <div className="flex flex-wrap"></div>
                          {x?.attachments?.map((a) => (
                            <ButtonGroup className="me-2" key={`file${a.id}`}>
                              <Button
                                type="button"
                                text
                                size="small"
                                icon="pi pi-link"
                                label={a?.fileName}
                                onClick={() => {
                                  setSelected({
                                    ...a,
                                    url: `${API_BASE_URL+ a?.url}`,
                                  });
                                  setShowPDF(true);
                                }}
                              />
                              <Button
                                type="button"
                                text
                                severity="danger"
                                icon="pi pi-trash"
                                size="small"
                                onClick={() => removeAttachment(a.id)}
                              />
                            </ButtonGroup>
                          ))}
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
              <PDFViewer
                data={selected}
                handleShow={showPDF}
                handleClose={setShowPDF}
              />
            </>
          ) : (
            <>
              <br />
              <EmptyState
                placeholder="No modules added yet, please click to add"
                action={() => setShowForm(true)}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

ModuleSection.propTypes = {
  data: proptype.object,
};
export default ModuleSection;
