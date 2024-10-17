import { Col, Row } from "react-bootstrap";
import proptype from "prop-types";
import { useEffect, useState } from "react";
export const ExamItem = ({ itemNo, question, options, onAnswer }) => {
  const [chosen, setChosen] = useState(null);
  useEffect(() => {
    onAnswer(chosen);
  }, [chosen]);
  return (
    <>
      <form>
        <Row>
          <Col className="col-10 m-auto ">
            <h5 className="text-center" style={{color: "#2f2f2f"}}>{question}</h5>
            <div className="m-auto" style={{width: "fit-content"}}>
              {options?.map((opt, index) => (
                <div key={index} className="form-check flex">
                  <input
                    id={`formCheck-${index + 1}`}
                    className="form-check-input"
                    type="radio"
                    checked={opt?.id === chosen?true: false}
                    onChange={() => setChosen(opt?.id)}
                  />
                  <label
                    className="form-check-label "
                    htmlFor={`formCheck-${index + 1}`}
                    // style={{fontSize: "1.1rem"}}
                    style={{color: "#2f2f2f", fontSize: "1.1rem"}}
                  >
                    {opt?.content}
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
