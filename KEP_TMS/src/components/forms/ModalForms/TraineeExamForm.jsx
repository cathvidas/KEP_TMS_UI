import { useEffect, useRef, useState } from "react";
import { ExamItem } from "../../Exam/ExamItem";
import { Button } from "primereact/button";
import { Card } from "react-bootstrap";
import { formatSeconds } from "../../../utils/datetime/Formatting";
import proptype from "prop-types";
import randomizeList from "../../../utils/sorting/randomizeList";
const TraineeExamForm = ({ data }) => {
  const [count, setCount] = useState(0);
  const [startExam, setStartExam] = useState(true);
  const [randomizeItem, setRandomizeItem] = useState([]);
  const [time, setTime] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chosenAnswer, setChosenAnswer]= useState(null)
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    const items = data?.examQuestion?.map((item) => {
      return { ...item, answerOptions: randomizeList(item?.answerOptions) };
    });
    setRandomizeItem(randomizeList(items));
  }, [data]);
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (startExam) {
//         setTime((prevCount) => prevCount + 1);
//       }
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [startExam]);
  console.log(answers)
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       if (count < 3) {
  //         setCount((prevCount) => (prevCount + 1));
  //       }
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   }, [count]);
  const handleOnClickNextBtn = () => {
    const answer = randomizeItem[currentIndex]?.answerOptions?.find(
      (item) => item?.id === chosenAnswer
    );
    setAnswers((prev) => [
      ...prev,
      { questionId: randomizeItem[currentIndex]?.id, answer: answer },
    ]);
    if (randomizeItem?.length === currentIndex + 1) {
      calculateScore();
    }
  };
  const calculateScore = ()=>{
    const correctAnswers = answers.filter((item) => item.answer?.isCorrect === true);
    const score = (correctAnswers.length / answers.length) * 100;
    alert(`Your score is ${score}%`);
  }
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <Card>
        <Card.Body>
          <div className="flex flex-wrap justify-content-end gap-2 mb-3">
            <div>
              <h4 className="m-0">{data?.title}</h4>
              <small>{formatSeconds(time)}</small>
            </div>
            <Button
              outlined={activeIndex !== 0}
              rounded
              label="1"
              onClick={() => setActiveIndex(0)}
              className="rounded-circle ms-auto"
            />
            <Button
              outlined={activeIndex !== 1}
              rounded
              label="2"
              onClick={() => setActiveIndex(1)}
              className="rounded-circle"
            />
            <Button
              outlined={activeIndex !== 2}
              rounded
              label="3"
              onClick={() => setActiveIndex(2)}
              className="rounded-circle"
            />
          </div>
          <hr />
          <br />
          <ExamItem
            itemNo={2}
            question={randomizeItem[currentIndex]?.content}
            options={randomizeItem[currentIndex]?.answerOptions}
            onAnswer={(e)=>setChosenAnswer(e)}
          />
          <br />
          <div className="text-center">
            <Button
              icon="pi pi-arrow-right"
              label={`${randomizeItem?.length === currentIndex + 1 ? "Finish" : "Next"}`}
              size="small"
              className="m-auto rounded"
              type="button"
              onClick={handleOnClickNextBtn}
            />
          </div>
        </Card.Body>
        {/* <div className="radial-bar-chart">
            <h1>{count}</h1>
          </div> */}
      </Card>
    </>
  );
};

TraineeExamForm.propTypes = {
  data: proptype.object,
};
export default TraineeExamForm;
