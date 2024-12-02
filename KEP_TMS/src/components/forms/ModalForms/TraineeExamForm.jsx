import { useEffect, useState } from "react";
import { ExamItem } from "../../Exam/ExamItem";
import { Button } from "primereact/button";
import { Modal } from "react-bootstrap";
import { formatSeconds } from "../../../utils/datetime/Formatting";
import proptype from "prop-types";
import randomizeList from "../../../utils/sorting/randomizeList";
import StatusChart from "../../General/StatusChart";
import getPassingScore from "../../../utils/common/getPassingScore";
import { SessionGetEmployeeId } from "../../../services/sessions";
import handleResponseAsync from "../../../services/handleResponseAsync";
import examService from "../../../services/examService";
const TraineeExamForm = ({ data, examCount, closeForm, handleRefresh }) => {
  const [totalTime, setTotalTime] = useState(0);
  const [startExam, setStartExam] = useState(true);
  const [randomizeItem, setRandomizeItem] = useState([]);
  const [timer, setTimer] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chosenAnswer, setChosenAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState({ showScore: false, score: 0 });
  useEffect(() => {
    window.addEventListener("beforeunload", alertUser, false);
    return () => {
      window.removeEventListener("beforeunload", alertUser, false);
    };
  }, []);
  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "saguifc";
    return e.returnValue;
  };
  useEffect(() => {
    randomizeExamQuestions();
  }, [data]);
  const randomizeExamQuestions = () => {
    const items = data?.examQuestion?.map((item) => {
      return { ...item, answerOptions: randomizeList(item?.answerOptions) };
    });
    const limitQuestions = randomizeList(items).slice(0, data.questionLimit);
    setRandomizeItem(limitQuestions);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (startExam) {
        setTimer((prevCount) => prevCount + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [startExam]);

  const handleOnClickNextBtn = () => {
    const answer = randomizeItem[currentIndex]?.answerOptions?.find(
      (item) => item?.id === chosenAnswer
    );
    setChosenAnswer(null);
    const answerList = [
      ...answers,
      { questionId: randomizeItem[currentIndex]?.id, answer: answer },
    ];
    setAnswers(answerList);
    setCurrentIndex((prev) => prev + 1);
    if (randomizeItem?.length === currentIndex + 1) {
      calculateScore(answerList);
    }
  };
  const calculateScore = (list) => {
    setStartExam(false);
    setTotalTime(timer);
    const correctAnswers = list.filter(
      (item) => item.answer?.isCorrect === true
    );
    const aveScore = (correctAnswers.length / randomizeItem.length) * 100;
    setScore({
      showScore: true,
      score: correctAnswers.length,
      average: aveScore,
    });
    saveExam(list, correctAnswers.length);
  };
  const saveExam = (list, score) => {
    const mappedAnswer = list?.map((item) => {
      return {
        examQuestionId: item.questionId,
        traineeAnswer: [{ answerOptionId: item.answer?.id }],
      };
    });
    setStartExam(false);
    const newData = {
      examId: data.id,
      totalScore: score,
      traineeExamQuestion: mappedAnswer,
      traineeBadge: SessionGetEmployeeId(),
    };
    handleResponseAsync(
      () => examService.saveTraineeExam(newData),
      () => {
        sessionStorage.removeItem("examLog");
        handleRefresh();
        ("");
      }
    );
  };
  const retakeExam = () => {
    randomizeExamQuestions();
    setStartExam(true);
    setTimer(0);
    setCurrentIndex(0);
    setChosenAnswer(null);
    setAnswers([]);
    setScore({ showScore: false, score: 0 });
  };
  useEffect(() => {
    const correctAnswers = answers.filter(
      (item) => item.answer?.isCorrect === true
    );
    const updatedData = randomizeItem?.map((item) => {
      const ans = answers?.find((e) => e.questionId === item?.id);
      return {
        examQuestionId: item.id,
        traineeAnswer: [{ answerOptionId: ans ? ans.answer.id : null }],
      };
    });
    const newData = {
      examId: data.id,
      totalScore: correctAnswers?.length,
      traineeExamQuestion: updatedData,
      traineeBadge: SessionGetEmployeeId(),
    };
    if (startExam) {
      sessionStorage.setItem("examLog", JSON.stringify(newData));
    }
  }, [startExam, answers, randomizeItem]);
  return (
    <>
      <Modal show fullscreen>
        <Modal.Body>
          {/* <Card> */}
          {/* <Card.Body> */}
          <div className="flex flex-wrap justify-content-end gap-1 mb-3">
            <div className="me-auto">
              <h4 className="m-0">{data?.title}</h4>
              <small>{formatSeconds(timer)}</small>
            </div>
            <div className="flex flex-wrap justify-content-end gap-1">
              {randomizeItem?.map((_, index) => (
                <>
                  <Button
                    disabled={currentIndex > index}
                    outlined={currentIndex !== index}
                    rounded
                    size="small"
                    label={index + 1}
                    className="rounded-circle py-0 px-2"
                  />
                </>
              ))}
            </div>
          </div>
          <hr />

          <br />
          {!score.showScore ? (
            <>
              <ExamItem
                itemNo={2}
                question={randomizeItem[currentIndex]?.content}
                options={randomizeItem[currentIndex]?.answerOptions}
                onAnswer={(e) => setChosenAnswer(e)}
              />
              <br />
              {chosenAnswer != null && (
                <div className="text-center">
                  <Button
                    icon="pi pi-arrow-right"
                    label={`${
                      randomizeItem?.length === currentIndex + 1
                        ? "Finish"
                        : "Next"
                    }`}
                    size="small"
                    className="m-auto rounded"
                    type="button"
                    onClick={handleOnClickNextBtn}
                  />
                </div>
              )}
            </>
          ) : (
            <div className=" text-center">
              {score?.score >= getPassingScore(randomizeItem.length) ? (
                <>
                  <h1 className="theme-color">Congratulations!</h1>
                  <h6>You have completed the exam.</h6>
                </>
              ) : (
                <h1 className="text-danger">Sorry, you failed.</h1>
              )}
              <div style={{ width: "250px" }} className="m-auto">
                <StatusChart
                  series={score?.average}
                  label={"Your Score"}
                  value={`${score.score}/${randomizeItem?.length}`}
                  color={
                    score?.score >= getPassingScore(randomizeItem.length)
                      ? "#00a76f"
                      : "#dc3545"
                  }
                />
              </div>
              <h5>Total Time: {formatSeconds(totalTime, true)}</h5>
              <br />
              <Button
                type="button"
                className="me-2"
                label="Back"
                icon="pi pi-arrow-left"
                onClick={closeForm}
              />
              {score?.score < getPassingScore(randomizeItem.length) && (
                <Button
                  type="button"
                  label="retake"
                  icon="pi pi-refresh"
                  onClick={retakeExam}
                  disabled={examCount >= 3}
                />
              )}
            </div>
          )}
          {/* </Card.Body> */}
          {/* </Card> */}
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary"
          //  onClick={() => setShowDialog(false)}
           >
            Cancel
          </Button>
          <Button variant="primary" 
          // onClick={() => setShowExam(true)}
            >
            Take Exam
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

TraineeExamForm.propTypes = {
  data: proptype.object,
  examCount: proptype.number,
  closeForm: proptype.func,
  handleRefresh: proptype.func,
};
export default TraineeExamForm;
