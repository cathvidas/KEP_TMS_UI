import proptype from "prop-types";
import { useEffect, useState } from "react";
import { Card, CardBody, Form } from "react-bootstrap";
import { Button } from "primereact/button";
import { FormFieldItem } from "../trainingRequestFormComponents/FormElements";
import ErrorTemplate from "../General/ErrorTemplate";
const TrainingExamForm = ({ reqId, handleOnChange, showForm }) => {
  const [option, setOption] = useState("");
  const [questions, setQuestions] = useState([]);
  const [details, setDetails] = useState({ content: "", answerOptions: [] });
  const [errors, setErrors] = useState({});

  const handleRemoveOption = (index) => {
    const updatedFiles = { ...details };
    updatedFiles?.answerOptions.splice(index, 1);
    if (updatedFiles.answer === index) {
      updatedFiles.answer = null;
    }
    setDetails(updatedFiles);
  };
  const validateForm = () => {
    let formErrors = {};
    let validForm = true;
    if (!details.content) {
      formErrors.Question = "Question is required";
      validForm = false;
    }
    if (details?.answerOptions?.length < 4) {
      formErrors.option = "Please add at least four (4) options";
      validForm = false;
    }
    const answer = details?.answerOptions?.filter(
      (o, i) => i === details?.answer
    );
    if (answer?.length === 0 && validForm) {
      formErrors.answer = "Please select the correct answer.";
      validForm = false;
    }
    if (!validForm) {
      setErrors(formErrors);
    } else {
      setErrors({});
      const itemOptions = details?.answerOptions?.map((x, i) => ({
        content: x,
        isCorrect: i === details?.answer ? true : false,
      }));
      saveToLocalStorage(
        { content: details.content, answerOptions: itemOptions });
      setDetails({});
      setOption("");
    }
  };

  const saveToLocalStorage = (e) =>{
    const oldData = JSON.parse(localStorage.getItem("examDetails"));
    const examQuestions = oldData?.examQuestion ?? [];
    examQuestions?.push(e);
    localStorage.setItem("examDetails", JSON.stringify({...oldData, examQuestion: examQuestions}));
    handleOnChange();
  }
  const handleAddOption = () => {
    if (option) {
        const newOptions = details?.answerOptions ?? [];
        newOptions.push(option)
      setDetails({
        ...details,
        answerOptions: newOptions,
      });
      setOption("");
      setErrors({ ...errors, option: "" });
    } else {
      setErrors({ ...errors, option: "Please input an option" });
    }
  };
  return (
    <>
      <div className="mb-3 border rounded overflow-hidden">
        <div className="theme-bg-light theme-color p-2 px-3 flex justify-content-between">
          <h5 className="m-0">Add Item</h5>
          <Button icon="pi pi-times" type="button" text onClick={showForm}/>
        </div>
        <CardBody>
          <Form>
            {errors?.common && errors.common}
            <FormFieldItem
              label={"Question"}
              required
              error={errors.Question}
              FieldComponent={
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Question"
                  value={details?.content}
                  onChange={(e) =>
                    setDetails({ ...details, content: e.target.value })
                  }
                ></textarea>
              }
            />
            <FormFieldItem
              label={"Options"}
              FieldComponent={
                <>
                  {details?.answerOptions?.map((x, index) => {
                    return (
                      <div key={`option-${index}`} className="form-check flex">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={index === details.answer}
                          onChange={() =>
                            setDetails({
                              ...details,
                              answer: index,
                            })
                          }
                        />
                        <label className="">{x}</label>
                        <Button
                          type="button"
                          icon="pi pi-times"
                          severity="danger"
                          className="p-0"
                          text
                          onClick={() => handleRemoveOption(index)}
                        />
                      </div>
                    );
                  })}
                  {errors?.answer && <ErrorTemplate message={errors.answer} />}
                  <input
                    type="text"
                    className="form-control"
                    value={option}
                    onChange={(e) => setOption(e.target.value)}
                    placeholder={`Option ${details?.answerOptions?.length + 1}`}
                  />
                  {errors?.option && <ErrorTemplate message={errors.option} />}
                  <Button
                    icon="pi pi-plus"
                    label="Add Option"
                    className="rounded py-1 mt-2"
                    severity="secondary"
                    size="small"
                    type="button"
                    onClick={handleAddOption}
                  />
                </>
              }
            />
            <div className="text-end">
              <Button
                variant="primary"
                className="rounded"
                type="button"
                onClick={validateForm}
              >
                Save
              </Button>
            </div>
          </Form>
        </CardBody>
      </div>
    </>
  );
};
TrainingExamForm.propTypes = {
  reqId: proptype.number.isRequired,
  showForm: proptype.bool,
};
export default TrainingExamForm;
