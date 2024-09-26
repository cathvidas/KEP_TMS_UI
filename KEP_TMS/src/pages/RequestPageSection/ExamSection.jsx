import { useState } from "react";
import { SampleExamQuestionaire } from "../../services/getApis";
import { FormFieldItem } from "../../components/trainingRequestFormComponents/FormElements";
import { Col, Row } from "react-bootstrap";
import { SectionHeading } from "../../components/General/Section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNoteSticky, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { ExamItem } from "../../components/Exam/ExamItem";
import { ModalContainer } from "../../components/Modal/ModalContainer";
import EmptyState from "../../components/trainingRequestFormComponents/EmptyState";
import { ButtonGroup } from "primereact/buttongroup";
import { Button } from "primereact/button";

const RandomizeExam = () => {
  const exam = SampleExamQuestionaire().sort(() => Math.random() - 0.5);
  return exam;
};
const randoMizeOptions = (options) => {
  options = options.sort(() => Math.random() - 0.5);
  return options;
};
const ExamSection = () => {
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
          <textarea
            type="text"
            className="form-control"
            placeholder="Question"
          ></textarea>
        }
      />
      <br />
      <FormFieldItem
        label={"Options"}
        FieldComponent={
          <>
            <input type="text" className="form-control" placeholder="option" />
          </>
        }
      />
      <Button
        className="btn-sm mt-3 btn-info"
        onClick={() => setShowModal(true)}
      >
        Add Item
      </Button>
    </>
  );
  const question = SampleExamQuestionaire();
  var list = [1, 2, 3, 4, 5, 6];
  return (
    <div className="exam-container">
      {" "}
      <SectionHeading
        title="Questionnaire"
        icon={<i className="pi pi-question-circle"></i>}
      />
      <span className="d-flex mb-2 justify-content-between">
        <span className="text-muted">{list.length} modules</span>

        <Button
          type="button"
          icon="pi pi-plus"
          size="small"
          className="theme-btn rounded py-1"
          label="Add New"
          onClick={() => setShowModal(true)}
        />
      </span>
      <Row className="row-cols-lg-2 g-2 row-cols-1">
        {question.map((x, index) => {
          return (
            <Col key={x}>
              <div className="shadow-sm overflow-hidden card">
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
                      style={{width: "1.5rem"}}
                    />
                    <Button
                      type="button"
                      text
                      size="small"
                      severity="danger"
                      icon="pi pi-trash"
                      className="p-0 rounded"
                      style={{width: "1.5rem"}}
                    />
                  </ButtonGroup>{" "}
                </div>
                <div className="px-3 py-2">
                  <p className="m-0">{x.question}</p>
                  {x.options.map((x) => {
                    return (
                      <div key={index} className="form-check">
                        <input className="form-check-input" type="checkbox" disabled />
                        <label className="">{x}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
      <br />
      <EmptyState
        placeholder="No Questions added yet, please click to add"
        action={() => setShowModal(true)}
      />
      <ModalContainer
        variantStyle={"primary"}
        state={showModal}
        close={() => setShowModal(false)}
        heading="Add Questionaire"
        id="userlistModal"
        buttonText="Add"
        body={ModalContent}
      />
    </div>
  );
};

export default ExamSection;
