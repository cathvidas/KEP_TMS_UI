import { useEffect, useState } from "react";
import { SampleExamQuestionaire } from "../../services/getApis";
import { FormFieldItem } from "../../components/trainingRequestFormComponents/FormElements";
import { Col, Modal, Row } from "react-bootstrap";
import { SectionHeading } from "../../components/General/Section";
import EmptyState from "../../components/trainingRequestFormComponents/EmptyState";
import { ButtonGroup } from "primereact/buttongroup";
import { Button } from "primereact/button";
import TrainingExamForm from "../../components/forms/TrainingExamForm";
import proptype from "prop-types";
import { ModalContainer } from "../../components/Modal/ModalContainer";

const RandomizeExam = () => {
  const exam = SampleExamQuestionaire().sort(() => Math.random() - 0.5);
  return exam;
};
const ExamSection = ({ data }) => {
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [examData, setExamData] = useState({});

  useEffect(() => {
    refreshData();
  }, []);
  const refreshData = () => {
    const details = JSON?.parse(localStorage.getItem("examDetails"));
    setExamData(details);
  };
  const saveInitialDetail = () => {
    if (examData != null) {
      localStorage.setItem("examDetails", JSON.stringify(examData));
      setShowModal(false);
      setShowForm(true);
      refreshData();
    }
  };
  console.log(examData);
  return (
    <>
      <SectionHeading
        title="Questionnaire"
        icon={<i className="pi pi-question-circle"></i>}
      />
      <div className="rounded shadow-sm card border overflow-hidden">
        <h4 className="theme-bg2 p-2 px-3">{examData?.title}</h4>
        {showForm && (
          <div className="p-3">
          <TrainingExamForm
            reqId={data?.id}
            handleOnChange={refreshData}
            showForm={() => setShowForm(false)}
          />
          </div>
        )}
        {examData?.title ? (
          <>
            <span className="flex  px-3 justify-content-between">
              <span className="text-muted">
                {`${examData?.examQuestion?.length} items`}{" "}
              </span>
              {!showForm && (
                <Button
                  type="button"
                  icon="pi pi-plus"
                  size="small"
                  className="theme-btn rounded py-1"
                  label="Add new item"
                  onClick={() => setShowForm(true)}
                />
              )}
            </span>
            <Row className="row-cols-lg-2  p-3 g-2 row-cols-1">
              {examData?.examQuestion?.map((x, index) => {
                return (
                  <Col key={`item-${index}`}>
                    <div className="overflow-hidden border rounded">
                      <div className="theme-bg-light p-2 px-3 d-flex align-items-center justify-content-between">
                        <small className="text-muted fw-bold text-uppercase">
                          Question #{index + 1}
                        </small>
                        <ButtonGroup>
                          <Button
                            type="button"
                            text
                            size="small"
                            icon="pi pi-pencil"
                            severity="secondary"
                            className="p-0 rounded"
                            style={{ width: "1.5rem" }}
                          />
                          <Button
                            type="button"
                            text
                            size="small"
                            severity="danger"
                            icon="pi pi-trash"
                            className="p-0 rounded"
                            style={{ width: "1.5rem" }}
                          />
                        </ButtonGroup>{" "}
                      </div>
                      <div className="px-3 py-2">
                        <p className="m-0">{x.content}</p>
                        {x?.answerOptions?.map((y, i) => {
                          return (
                            <div key={i} className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={y.isCorrect}
                                disabled
                              />
                              <label className="">{y.content}</label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
            <div className="text-end p-3 border-top">
              <Button 
              icon="pi pi-trash"
              label="Delete"
              severity="danger"
              className="rounded"
              />
              <Button 
              icon="pi pi-upload"
              label="Upload Exam"
              className="rounded ms-2"
              />
            </div>
          </>
        ) : (
          <EmptyState
            placeholder="No Questions added yet, please click to add"
            action={() => setShowModal(true)}
          />
        )}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header className="border-0" closeButton>
          <Modal.Title className={`h5 theme-color`}>Add Exam</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-0">
          <FormFieldItem
            label={"Exam Title"}
            FieldComponent={
              <>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  value={examData.title}
                  onChange={(e) =>
                    setExamData({ ...examData, title: e.target.value })
                  }
                />
              </>
            }
          />
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button
            type="button"
            label="Cancel"
            onClick={() => setShowModal(false)}
            className="p-button-text rounded"
          />
          <Button
            type="button"
            label="Save"
            icon="pi pi-save"
            onClick={saveInitialDetail}
            className="rounded"
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};
ExamSection.propTypes = {
  data: proptype.object,
};
export default ExamSection;
