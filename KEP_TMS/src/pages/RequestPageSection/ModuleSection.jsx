import { useEffect, useState } from "react";
import { FormFieldItem } from "../../components/trainingRequestFormComponents/FormElements";
import { SectionHeading } from "../../components/General/Section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import EmptyState from "../../components/trainingRequestFormComponents/EmptyState";
import { ModalContainer } from "../../components/Modal/ModalContainer";
import { Col, Row } from "react-bootstrap";
import { Button } from "primereact/button";
import { ButtonGroup } from "primereact/buttongroup";
import UploadModuleForm from "../../components/forms/UploadModuleForm";
import proptype from "prop-types";
import moduleHook from "../../hooks/moduleHook";
import SkeletonList from "../../components/Skeleton/SkeletonList";
import handleResponseAsync from "../../services/handleResponseAsync";
import moduleService from "../../services/moduleService";

const ModuleSection = ({ data }) => {
  const [showForm, setShowForm] = useState(false);
  const [moduleList, setModuleList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    refreshData();
  }, []);
  const refreshData = () => {
    const getRequest = async () => {
      handleResponseAsync(
        () => moduleService.getModulesByRequestId(data.id),
        (e) => setModuleList(e),
        (e) => setError(e)
      );
      setLoading(false);
    };
    getRequest();
  };
  return (
    <>
      <SectionHeading
        title="Modules"
        icon={<FontAwesomeIcon icon={faNoteSticky} />}
      />
      {loading ? (
        <SkeletonList />
      ) : (
        <>
          {showForm ? (
            <UploadModuleForm
              reqId={data?.id}
              setShowForm={() => setShowForm(false)}
              handleRefresh={() => {
                setShowForm(false);
                refreshData();
              }}
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
                  onClick={() => setShowForm(true)}
                />
              </span>
              <Row className="row-cols-lg-2 g-2 row-cols-1">
                {moduleList.map((x) => {
                  return (
                    <Col key={x}>
                      <div className="shadow-sm overflow-hidden card">
                        <div className="theme-bg-light p-2 px-3 d-flex align-items-center justify-content-between">
                          <small className="text-muted fw-bold text-uppercase">
                            {x.name}
                          </small>
                          <ButtonGroup>
                            <Button
                              type="button"
                              text
                              size="small"
                              icon="pi pi-pencil"
                              severity="secondary"
                              className="p-0 rounded"
                            />
                            <Button
                              type="button"
                              text
                              size="small"
                              severity="danger"
                              icon="pi pi-trash"
                              className="p-0 rounded"
                            />
                          </ButtonGroup>{" "}
                        </div>
                        <div className="px-4 p-2">
                          <p className="m-0">{x.description}</p>
                          <Button
                            type="button"
                            icon="pi pi-link"
                            text
                            label="FileName"
                          />
                          <Button
                            type="button"
                            icon="pi pi-link"
                            text
                            label="FileName"
                          />
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
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
