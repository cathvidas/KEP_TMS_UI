import { useState } from "react";
import { SampleExamQuestionaire } from "../../services/getApis";
import { ExamItem } from "./ExamItem";

const RandomizeExam = () => {
  const exam = SampleExamQuestionaire().sort(() => Math.random() - 0.5);
  return exam;
};
const randoMizeOptions=(options)=>{
    options = options.sort(()=> Math.random() - 0.5);
    return options;
}
const ExamContainer = () => {
  const [exam] = useState(()=>RandomizeExam());
//const [exam] = useState(SampleExamQuestionaire);
const [currentQuestion, setCurrentQuestion] = useState(exam[0]);
console.log(currentQuestion)
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  if (!exam || exam.length === 0 || index >= exam.length) {
    return <div>Your score is  {score} / {exam.length}</div>;
  }
  const handleAnswer = (correct) => {
    if (correct) {
      setScore(score + 1);
    }
    if (index < exam.length) {
      setIndex(index + 1);
      setCurrentQuestion(exam[index + 1]);
        // setTimeout(()=>{
        //     setIndex(index + 1);
        //     setCurrentQuestion(exam[index + 1]);
        // }, 5000)
    } else {
      alert(`Your score is ${score}/${exam.length}`);
    }
  };
  return (
    <div className="exam-container">
      <h5>Questionnaire</h5>
      {console.log(exam[0])}
        <ExamItem
          itemNo={`Question ${index + 1}`}
          question={currentQuestion.question}
          options={randoMizeOptions(currentQuestion.options)}
          answer={currentQuestion.answer}
          onAnswer={handleAnswer}
        />
    </div>
  );
};

export default ExamContainer;
