import { Button } from "primereact/button";
import { ButtonGroup } from "primereact/buttongroup";
import { useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import EmptyState from "../trainingRequestFormComponents/EmptyState";
import proptype from "prop-types";
import { FormFieldItem } from "../trainingRequestFormComponents/FormElements";
import ExamQuestionForm from "./ModalForms/ExamQuestionForm";
import { SessionGetEmployeeId } from "../../services/sessions";
import { actionFailed, actionSuccessful, confirmAction } from "../../services/sweetalert";
import handleResponseAsync from "../../services/handleResponseAsync";
import examService from "../../services/examService";
const ExamForm = ({ defaultData, handleRefresh, reqId, closeForm }) => {
  const [data, setData] = useState({ title: "", examQuestion: [] });
  const [isUpdate, setIsUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  console.log( defaultData,data)
  useEffect(() => {
    if (defaultData) {
      setData(defaultData);
      setIsUpdate(true);
    } else {
      setIsUpdate(false);
    }
  }, [defaultData]);
  const handleSaveQuestion = (e) => {
    setData((prev) => ({ ...prev, examQuestion: [...prev.examQuestion, e] }));
  };
  const handleUpdateQuestion = (e) => {
    const updatedData = data?.examQuestion?.map((item, index) => {
      if (index === e.index) {
        return { ...item, ...e.data };
      }
      return item;
    });
    setData({ ...data, examQuestion: updatedData });
    setShowModal(false);
  };
  const removeExamQuestion = (index) => {
    setData((prev) => ({
      ...prev,
      examQuestion: prev.examQuestion.filter((_, i) => i !== index),
    }));
  };
  
  const uploadExam = () => {
    const updatedData = {
      ...data,
      trainingRequestId: reqId,
      createdBy: SessionGetEmployeeId(),
    };
    confirmAction({
      title: "Save Exam",
      text: "Are you sure you want to upload this exam?",
      onConfirm: () => {
        handleResponseAsync(
          () => examService.createExam(updatedData),
          (e) => {
            actionSuccessful("Success!", e?.message);
            handleRefresh();
          },
          (e) => actionFailed("Error!", e.message),
        );
      },
    });
  };
  const updateExam = () => {
    const updatedData = {
      ...data,
      examQuestions: data.examQuestion,
      trainingRequestId: reqId,
      updatedBy: SessionGetEmployeeId(),
    };
    confirmAction({
      title: "Update Exam",
      text: "Are you sure you want to update this exam?",
      onConfirm: () => {
        handleResponseAsync(
          () => examService.updateExam(updatedData),
          (e) => {
            actionSuccessful("Success!", e?.message);
            handleRefresh();
          },
          (e) => actionFailed("Error!", e.message),
        );
      },
    });
  };
  return (
    <>
      <Card className="rounded shadow-sm card border overflow-hidden">
        {/* <h4 className="theme-bg2 p-2 px-3">{data?.title}</h4> */}
        <Card.Header className="flex">
          <div>
            <h4 className="card-title">Exam Form</h4>
            <div className="card-subtitle mb-2 text-muted">
              {isUpdate ? "Edit Exam" : "Add New Exam"}
            </div>
          </div>
          <Button text type="button" icon="pi pi-times" className="ms-auto" onClick={closeForm} />
        </Card.Header>
        <Card.Body>
          <FormFieldItem
            label="Exam title"
            FieldComponent={
              <Form.Control
                type="text"
                placeholder="Exam Title"
                value={data?.title ?? ""}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            }
          />
          <FormFieldItem
            label="Exam Questions"
            FieldComponent={
              <>
                {data?.examQuestion?.length > 0 ? (
                  <>
                    <span className="flex  px-3 justify-content-between">
                      <span className="text-muted">
                        {`${data?.examQuestion?.length} items`}{" "}
                      </span>
                      <Button
                        type="button"
                        icon="pi pi-plus"
                        size="small"
                        className="theme-btn rounded py-1"
                        label="Add question"
                        onClick={() => {
                          setShowModal(true);
                          setSelectedQuestion(null);
                        }}
                      />
                    </span>
                    <Row className="row-cols-lg-2  p-3 g-2 row-cols-1">
                      {data?.examQuestion?.map((x, index) => {
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
                                    onClick={() => {
                                      setSelectedQuestion({
                                        index: index,
                                        data: x,
                                      });
                                      setShowModal(true);
                                    }}
                                  />
                                  <Button
                                    type="button"
                                    text
                                    size="small"
                                    severity="danger"
                                    icon="pi pi-trash"
                                    className="p-0 rounded"
                                    style={{ width: "1.5rem" }}
                                    onClick={() => removeExamQuestion(index)}
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
                  </>
                ) : (
                  <EmptyState
                    placeholder="No Questions added yet, please click to add"
                    action={() => setShowModal(true)}
                  />
                )}
              </>
            }
          />
          
            <div className="text-end p-3 border-top">
              <Button
                icon={isUpdate ? "pi pi-trash" : "pi pi-eraser"}
                label={isUpdate ? "Remove":"Reset"}
                severity={isUpdate ? "danger" : ""}
                text
                className="rounded py-1"
                type="button"
                  onClick={() => setData({})}
              />
              <Button
                icon={isUpdate ? "pi pi-pen-to-square" : "pi pi-save"}
                label={isUpdate ? "Update Exam" : "Save Exam"}
                className="rounded ms-2 py-1"
                type="button"
                  onClick={isUpdate ? updateExam : uploadExam}
              />
            </div>
          
        </Card.Body>
      </Card>
      <ExamQuestionForm
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        handleSaveQuestion={handleSaveQuestion}
        defaultData={selectedQuestion}
        handleUpdateQuestion={handleUpdateQuestion}
      />
    </>
  );
};
ExamForm.propTypes = {
  defaultData: proptype.object,
  handleRefresh: proptype.func,
  reqId: proptype.number, 
  closeForm: proptype.func

};
export default ExamForm;
