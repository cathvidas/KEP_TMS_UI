import { Col, Row } from "react-bootstrap";
import proptype from "prop-types";
import { Toast } from "../SweetToast";
import { useEffect, useState } from "react";
export const ExamItem = ({ itemNo, question, options, answer, onAnswer }) => {
  const [chosen, setChosen] = useState(null);
  useEffect(() => {
    setChosen(null);
  }, [answer]);

  const handleInputChange = (e) => {
    e.target.checked ? checkAnswer(e.target.value) : "";
  };
  const checkAnswer = (chosen) => {
    setChosen(chosen);
    var correct = false;
    if (chosen === answer) {
      Toast.fire({
        icon: "success",
        title: "Correct",
      });
      correct = true;
    } else {
      Toast.fire({
        icon: "error",
        title: "Wrong",
      });
      correct = false;
    }
    onAnswer(correct);
  };
  return (
    <>
      <form>
        <Row>
          <Col>
            <h6>{itemNo}</h6>
            <p>{question}</p>
            <div className="ps-3">
              {options.map((choice, index) => (
                <div key={index} className="form-check">
                  <input
                    id={`formCheck-${index + 1}`}
                    className="form-check-input"
                    type="checkbox"
                    value={choice}
                    checked={choice === chosen}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`formCheck-${index + 1}`}
                  >
                    {choice}
                  </label>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </form>
    </>
  );
};
ExamItem.propTypes = {
  itemNo: proptype.string.isRequired,
  question: proptype.string.isRequired,
  options: proptype.arrayOf(proptype.string).isRequired,
  answer: proptype.string.isRequired,
  onAnswer: proptype.func,
};
