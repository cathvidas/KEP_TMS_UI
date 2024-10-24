import { Card, Col, Row } from "react-bootstrap";
import proptype from "prop-types";
import { useEffect, useState } from "react";
import StatusChart from "../General/StatusChart";
import { Button } from "primereact/button";
import { formatDateTime } from "../../utils/datetime/Formatting";
import getPassingScore from "../../utils/common/getPassingScore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadTear, faFaceSmile } from "@fortawesome/free-solid-svg-icons";
const ExamDetails = ({ handleClose, traineeExam, examDetail }) => {
  console.log(examDetail)
  const [mappedDetail, setMappedDetail] = useState({});
  useEffect(() => {
    const questions = traineeExam?.traineeExamQuestion?.map((item) =>
      getExamItem(item.examQuestionId, item.traineeAnswer[0]?.answerOptionId)
    );
    setMappedDetail({ title: examDetail?.title, examQuestion: questions });
  }, [traineeExam, examDetail]);
  
  const getExamItem = (questionId, answerId) => {
    const question = examDetail?.examQuestion?.find(
      (q) => q?.id === questionId
    );
    const answer = question?.answerOptions?.find((a) => a?.id === answerId);
    return {
      question,
      answer,
    };
  };
  return (
    <>
      <Card>
        <Card.Body>
          <div className="flex">
            <h4 className="theme-color m-0">{mappedDetail?.title}</h4>
            <Button
              className="float-right py-1  ms-auto rounded-circle"
              text
              icon="pi pi-times"
              type="button"
              onClick={handleClose}
            />
          </div>
          <hr />
          <Row>
            <Col className="col-md-3 border-end">
              <div>
                <StatusChart
                  series={
                    (traineeExam?.totalScore /
                      examDetail?.questionLimit) *
                    100
                  }
                  label="Exam score"
                  value={`${traineeExam?.totalScore}/${examDetail?.questionLimit}`}
                  color={
                    traineeExam?.totalScore >= getPassingScore(examDetail?.questionLimit)
                      ? "#00a76f"
                      : "#dc3545"
                  }
                />
              </div>
              {traineeExam?.totalScore >= getPassingScore(examDetail?.questionLimit)?
              <h4 className="theme-color text-center"><FontAwesomeIcon icon={faFaceSmile}/> Passed </h4>:
              <h4 className="text-danger text-center"> <FontAwesomeIcon icon={faFaceSadTear}/> Failed </h4>
              }
              <br />
              <h6>Exam Title: {mappedDetail?.title}</h6>
              <p>Duration: 30 minutes</p>
              {/* <p>Passing Score: 70%</p> */}
              <p>Submitted: {formatDateTime(traineeExam?.createdDate)}</p>
            </Col>
            <Col className="px-4">
              <h5>Exam Detail</h5>
              {mappedDetail?.examQuestion?.map((item, index) => (
                <>
                  <h6>{`${index+1}. ${item?.question?.content}`}</h6>
                  <p><i className={`${item?.answer?.isCorrect ? "pi pi-check theme-color" : "pi pi-times text-danger"}`}/>
                  {" "}{item?.answer?.content}</p>
                  <br />
                </>
              ))}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};
ExamDetails.propTypes = {
  traineeExam: proptype.object,
  examDetail: proptype.object,
  show: proptype.bool,
  handleClose: proptype.func,
};
export default ExamDetails;
