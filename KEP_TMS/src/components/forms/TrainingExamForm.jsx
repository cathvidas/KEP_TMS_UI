import proptype from "prop-types";
import { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { Button } from "primereact/button";
import { FormFieldItem } from "../trainingRequestFormComponents/FormElements";
import ErrorTemplate from "../General/ErrorTemplate";
const TrainingExamForm = ({
  handleOnChange,
  defaultData,
  setDefaultData,
  formDetail,
  setFormDetail

}) => {
  const [option, setOption] = useState({ content: "", isCorrect: false });
  const [details, setDetails] = useState({ content: "", answerOptions: [] });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setDetails(defaultData?.defaultData);
  }, [defaultData]);
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
    const answer = details?.answerOptions?.filter((x) => x.isCorrect === true);
    if (answer?.length === 0 && validForm) {
      formErrors.answer = "Please select the correct answer.";
      validForm = false;
    }
    if (!validForm) {
      setErrors(formErrors);
    } else {
      setErrors({});

      const oldData = JSON.parse(localStorage.getItem("examDetails"));
      const examQuestions = oldData?.examQuestion ?? [];
      if(formDetail?.buttonFunction != null){
        formDetail.buttonFunction(details);
      }else{
      if (defaultData?.index != null) {
        examQuestions[defaultData?.index] = { ...examQuestions[defaultData?.index], ...details };
      } else {
        examQuestions?.push(details);
      }
      localStorage.setItem(
        "examDetails",
        JSON.stringify({ ...oldData, examQuestion: examQuestions })
      );}
      handleOnChange();
      setDetails({ content: "", answerOptions: [] });
      setOption({ content: "", isCorrect: false });
      setFormDetail({...formDetail, showForm: false});
      setDefaultData();
    }
  };

  const handleAddOption = () => {
    if (option?.content) {
      const newOptions = details?.answerOptions ?? [];
      newOptions.push(option);
      setDetails({
        ...details,
        answerOptions: newOptions,
      });
      setOption({ content: "", isCorrect: false });
      setErrors({ ...errors, option: "" });
    } else {
      setErrors({ ...errors, option: "Please input an option" });
    }
  };
  const setCorrectAnswer = (index) => {
    const updatedData = details?.answerOptions?.map((item, i) => {
      if (i === index) {
        return { ...item, isCorrect: true };
      } else {
        return { ...item, isCorrect: false };
      }
    });
    setDetails({ ...details, answerOptions: updatedData });
  };
  return (
    <>
      <Modal show={formDetail?.showModal} onHide={() => {setFormDetail({...formDetail, showModal: false}); setDefaultData()
      }}>
        <Modal.Header className="border-0" closeButton>
          <Modal.Title className={`h5 theme-color`}>{`${defaultData ? "Update" : "Add"} Item`} </Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-0">
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
              required
              FieldComponent={
                <>
                  {details?.answerOptions?.map((x, index) => {
                    return (
                      <div key={`option-${index}`} className="form-check flex">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={x?.isCorrect}
                          onChange={() => setCorrectAnswer(index)}
                        />
                        <label className="">{x?.content}</label>
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
                    value={option.content}
                    onChange={(e) =>
                      setOption({ content: e.target.value, isCorrect: false })
                    }
                    placeholder={`Option ${details?.answerOptions?.length ? details?.answerOptions?.length + 1 : 1}`}
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
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button
            type="button"
            label="Cancel"
            onClick={() => {setFormDetail({...formDetail, showModal: false});  setDefaultData()}}
            className="p-button-text rounded"
          />
          <Button
            type="button"
            label="Save"
            icon="pi pi-save"
            onClick={validateForm}
            className="rounded"
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};
TrainingExamForm.propTypes = {
  reqId: proptype.number.isRequired,
  showForm: proptype.bool,
  handleOnChange: proptype.func,
  defaultData: proptype.object,
  setShowForm: proptype.func,
  setDefaultData: proptype.func,
  formDetail: proptype.object,
  setFormDetail: proptype.func
};
export default TrainingExamForm;
