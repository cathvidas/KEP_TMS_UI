import { Card, Col, Form, Row } from "react-bootstrap";
import proptype from "prop-types";
import { useEffect, useState } from "react";
import StatusChart from "../General/StatusChart";
import { Button } from "primereact/button";
import { formatDateTime } from "../../utils/datetime/Formatting";
import getPassingScore from "../../utils/common/getPassingScore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadTear, faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import examService from "../../services/examService";
import handleResponseAsync from "../../services/handleResponseAsync";
import { confirmAction } from "../../services/sweetalert";
const ExamDetails = ({ handleClose, traineeExam, examDetail, isAdmin , refreshData}) => {
  const [mappedDetail, setMappedDetail] = useState({});
  const [viewLogs, setViewLogs] = useState(false);
  useEffect(() => {
    const list = [];
    traineeExam?.map((item) => {
      const questions = item?.traineeExamQuestion?.map((e) =>
        getExamItem(e.examQuestionId, e.traineeAnswers[0]?.answerOptionId)
      );
      list.push({ examDetail: item, questions: questions });
    });
    setMappedDetail({ title: examDetail?.title, examList: list });
  }, [traineeExam, examDetail]);
  const getExamItem = (questionId, answerId) => {
    const question = examDetail?.examQuestions?.find(
      (q) => q?.id === questionId
    );
    const answer = question?.answerOptions?.find((a) => a?.id === answerId);
    return {
      question,
      answer,
    };
  };
  const forRetake = mappedDetail?.examList?.[0]?.examDetail;
  const updateRetake = (id, retake) => {
    confirmAction({
      title: retake ? "Allow Retake":"Disable Retake",
      text: `Are you sure you want to ${retake ? "let": "disallow"} this participant retake this exam?`,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      onConfirm: () => 
        handleResponseAsync(
          () => examService.updateTraineeExamRetake(id, retake),
          null,null,
          ()=>refreshData()
        )
    });
  };
  return (
    <>
      <Card className={!handleClose && "border-0"}>
        <Card.Body>
          <div className="flex">
            <div className="me-auto">
            <h4 className="theme-color m-0">{mappedDetail?.title}</h4>
</div>
            {isAdmin && (
              <div>
                <span className="fw-bold">Total takes: {mappedDetail?.examList?.length}</span>
                {mappedDetail?.examList?.length > 0 &&
                <div className="flex">
                <Form.Check
                  checked={forRetake?.forRetake}
                  type="switch"
                  id="disabled-retake-switch"
                  onChange={(e) =>
                    updateRetake(forRetake?.id, e.target.checked)
                  }
                />
                <label
                  className="float-right m-0  "
                  label={
                    !forRetake?.forRetake ? "Allow retake" : "Disable retake"
                  }
                  htmlFor="disabled-retake-switch"
                >
                  {!forRetake?.forRetake ? "Allow retake" : "Disable retake"}
                </label></div>}
              </div>
            )}
            {handleClose && (
              <Button
                className="float-right py-1  ms-auto rounded-circle"
                text
                icon="pi pi-times"
                type="button"
                onClick={handleClose}
              />
            )}
          </div>
          <hr />
          {mappedDetail?.examList?.length > 0 ? mappedDetail?.examList?.map((traineeExamItem, i) => (
            <>
              {((!viewLogs && i === 0) || viewLogs) && (
                <Row>
                  <Col className="col-md-3 border-end">
                    <div>
                      <StatusChart
                        series={
                          (traineeExamItem?.examDetail?.totalScore /
                            examDetail?.questionLimit) *
                          100
                        }
                        label="Exam score"
                        value={`${traineeExamItem?.examDetail?.totalScore}/${examDetail?.questionLimit}`}
                        color={
                          traineeExamItem?.examDetail?.totalScore >=
                          getPassingScore(
                            examDetail?.questionLimit,
                            examDetail.passingRate
                          )
                            ? "#00a76f"
                            : "#dc3545"
                        }
                      />
                    </div>
                    {traineeExamItem?.examDetail?.totalScore >=
                    getPassingScore(
                      examDetail?.questionLimit,
                      examDetail.passingRate
                    ) ? (
                      <h4 className="theme-color text-center">
                        <FontAwesomeIcon icon={faFaceSmile} /> Passed{" "}
                      </h4>
                    ) : (
                      <h4 className="text-danger text-center">
                        {" "}
                        <FontAwesomeIcon icon={faFaceSadTear} /> Failed{" "}
                      </h4>
                    )}
                    <p className="text-muted text-center">
                      Passing score is{" "}
                      {getPassingScore(
                        examDetail?.questionLimit,
                        examDetail.passingRate
                      )}
                    </p>
                    <br />
                    <h6>Exam Title: {mappedDetail?.title}</h6>
                    <p>
                      Submitted:{" "}
                      {formatDateTime(traineeExamItem?.examDetail?.createdDate)}
                    </p>
                  </Col>
                  <Col className="px-4">
                    <h5>Exam Detail</h5>
                    {traineeExamItem?.questions?.map((item, index) => (
                      <>
                        <h6>{`${index + 1}. ${item?.question?.content}`}</h6>
                        {isAdmin &&
                          item?.question?.answerOptions?.map((opt, index) => (
                            <div key={index} className="form-check flex">
                              <input
                                id={`formCheck-${index + 1}`}
                                className={`form-check-input ${
                                  !item?.answer?.isCorrect && "red"
                                }`}
                                type="radio"
                                checked={opt?.id === item?.answer?.id}
                                readOnly
                              />
                              <label
                                className="form-check-label "
                                htmlFor={`formCheck-${index + 1}`}
                                // style={{fontSize: "1.1rem"}}
                                style={{ color: "#2f2f2f", fontSize: "1.1rem" }}
                              >
                                {opt?.content}
                                {opt?.id === item?.answer?.id && (
                                  <>
                                    {" "}
                                    <i
                                      className={`${
                                        item?.answer?.isCorrect
                                          ? "pi pi-check theme-color"
                                          : "pi pi-times text-danger"
                                      }`}
                                    />
                                  </>
                                )}
                              </label>
                            </div>
                          ))}
                        {isAdmin ? (
                          !item?.answer?.isCorrect && (
                            <p className="text-muted">
                              Answer: &nbsp;
                              {
                                item?.question?.answerOptions?.find(
                                  (e) => e.isCorrect
                                )?.content
                              }{" "}
                              &nbsp;
                            </p>
                          )
                        ) : (
                          <p>
                            <i
                              className={`${
                                item?.answer?.isCorrect
                                  ? "pi pi-check theme-color"
                                  : "pi pi-times text-danger"
                              }`}
                            />{" "}
                            {item?.answer?.content ?? "No answer"}
                          </p>
                        )}
                        <br />
                      </>
                    ))}
                  </Col>
                </Row>
              )}
              <div className="text-center">
                {i === 0 && mappedDetail?.examList?.length > 1 && (
                  <Button
                    type="button"
                    text
                    label={`${viewLogs ? "Hide" : "View"} previous take`}
                    icon={`pi pi-eye${viewLogs ? "" : "-slash"}`}
                    onClick={() => setViewLogs(!viewLogs)}
                  />
                )}
              </div>
              {i < mappedDetail?.examList?.length - 1 && viewLogs && <hr />}
            </>
          )): <div className="text-center py-5">
            Haven&apos;t taken the exam yet
            </div>}
        </Card.Body>
      </Card>
    </>
  );
};
ExamDetails.propTypes = {
  traineeExam: proptype.array,
  examDetail: proptype.object,
  show: proptype.bool,
  handleClose: proptype.func,
  isAdmin: proptype.bool,
  refreshData: proptype.func,
};
export default ExamDetails;
