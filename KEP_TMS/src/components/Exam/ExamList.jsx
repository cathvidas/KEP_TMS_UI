import proptype from "prop-types";
import TrainingExamForm from "../forms/TrainingExamForm";
import { Button } from "primereact/button";
import { ButtonGroup, Col, Row } from "react-bootstrap";
import EmptyState from "../trainingRequestFormComponents/EmptyState";
const ExamList = ({examList, showForm, setShowForm})=>{
    return(<>
        {examList && examList?.map(item=>{
            <div key={item} className="rounded shadow-sm card border overflow-hidden">
              <h4 className="theme-bg2 p-2 px-3">{item?.title}</h4>
              {showForm && (
                <div className="p-3">
                  {/* <TrainingExamForm
                    reqId={data?.id}
                    handleOnChange={refreshData}
                    showForm={showForm}
                    setShowForm={() => setShowForm(false)}
                    defaultData={defaultData}
                    setDefaultData={() => setDefaultData(null)}
                  /> */}
                </div>
              )}
              {item?.examQuestion?.length > 0 ? (
                <>
                  <span className="flex  px-3 justify-content-between">
                    <span className="text-muted">
                      {`${item?.examQuestion?.length} items`}{" "}
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
                    {item?.examQuestion?.map((x, index) => {
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
                                    setShowForm(true);
                                    setDefaultData({
                                      index: index,
                                      defaultData: examData?.examQuestion[index],
                                    });
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
        })}</>
        )
    
}

ExamList.propTypes={
    examList:proptype.object
}
export default ExamList;