import { useState } from "react";
import { ExamItem } from "./ExamItem";
import { SectionHeading } from "../General/Section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
// import { ModalContainer } from "../Modal/ModalContainer";
import { Button } from "react-bootstrap";
import { FormFieldItem } from "../trainingRequestFormComponents/FormElements";

const RandomizeExam = () => {
  // const exam = SampleExamQuestionaire().sort(() => Math.random() - 0.5);
  const exam = [];
  return exam;
};
const randoMizeOptions = (options) => {
  options = options.sort(() => Math.random() - 0.5);
  return options;
};
const ExamContainer = () => {
  const [showModal, setShowModal] = useState(false);
  const [exam] = useState(() => RandomizeExam());
  //const [exam] = useState(SampleExamQuestionaire);
  const [currentQuestion, setCurrentQuestion] = useState(exam[0]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  if (!exam || exam.length === 0 || index >= exam.length) {
    return (
      <div>
        Your score is {score} / {exam.length}
      </div>
    );
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
  const ModalContent = (
    <>
      <FormFieldItem
        label={"Question"}
        FieldComponent={
          <textarea type="text" className="form-control" placeholder="Question"></textarea> 
        }
      />
      <br />
      <FormFieldItem
        label={"Options"}
        FieldComponent={
          <>
            <input type="text" className="form-control" placeholder="option"/>
          </>
        }
      />
<Button className="btn-sm mt-3 btn-info" onClick={()=>setShowModal(true)}>Add Item</Button>
    </>
  );
  return (
    <div className="exam-container">
      <SectionHeading
        title="Exam"
        icon={<FontAwesomeIcon icon={faQuestion} />}
      />
      <h5>Questionnaire</h5>
      <ExamItem
        itemNo={`Question ${index + 1}`}
        question={currentQuestion.question}
        options={randoMizeOptions(currentQuestion.options)}
        answer={currentQuestion.answer}
        onAnswer={handleAnswer}
      />

<Button className="btn-sm mt-3" onClick={()=>setShowModal(true)}>Add Item</Button>
      {/* <ModalContainer
        variantStyle={"primary"}
        state={showModal}
        close={() => setShowModal(false)}
        // buttonAction={""}
        heading="Add Questionaire"
        id="userlistModal"
        buttonText="Add"
        body={ModalContent}
      /> */}
    </div>
  );
};

export default ExamContainer;
