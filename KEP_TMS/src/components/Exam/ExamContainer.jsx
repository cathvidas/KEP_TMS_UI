import proptype from "prop-types";
import TrainingExamForm from "../forms/TrainingExamForm";
import { Button } from "primereact/button";
import { ButtonGroup, Col, Row } from "react-bootstrap";
import EmptyState from "../trainingRequestFormComponents/EmptyState";
const ExamContainer = ({data})=>{
    const updateExamQuestion= ()=>{
        //update api
    }
    const removeExamQuestion = ()=>{
        //remove api
    }
    return (
      <>
            <div
              key={data}
              className="rounded shadow-sm card border overflow-hidden"
            >
              <h4 className="theme-bg2 p-2 px-3">{data?.title}</h4>
              {data?.examQuestion?.length > 0 ? (
                <>
                  <span className="flex  px-3 justify-content-between">
                    <span className="text-muted">
                      {`${data?.examQuestion?.length} datas`}{" "}
                    </span>
                    {!showForm && (
                      <Button
                        type="button"
                        icon="pi pi-plus"
                        size="small"
                        className="theme-btn rounded py-1"
                        label="Add question"
                        onClick={() => setShowForm(true)}
                      />
                    )}
                  </span>
                  <Row className="row-cols-lg-2  p-3 g-2 row-cols-1">
                    {data?.examQuestion?.map((x, index) => {
                      return (
                        <Col key={`data-${index}`}>
                          <div className="overflow-hidden border rounded">
                            <div className="theme-bg-light p-2 px-3 d-flex align-datas-center justify-content-between">
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
                                  onClick={() => {updateExamQuestion}}
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
                !showForm && (
                  <EmptyState
                    placeholder="No Questions added yet, please click to add"
                    action={() => setShowForm(true)}
                  />
                )
              )}
              <div className="text-end p-3 border-top">
                <Button
                  icon="pi pi-trash"
                  label="Delete"
                  severity="danger"
                  className="rounded py-1"
                  type="button"
                />
                <Button
                  icon="pi pi-upload"
                  label="Upload Exam"
                  className="rounded ms-2 py-1"
                  type="button"
                  //   onClick={uploadExam}
                />
              </div>
            </div>
      </>
    );
    
}

ExamContainer.propTypes={
    data:proptype.object
}
export default ExamContainer;