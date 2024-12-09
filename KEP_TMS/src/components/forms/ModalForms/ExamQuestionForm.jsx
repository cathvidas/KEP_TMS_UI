import proptype from "prop-types";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "primereact/button";
import { FormFieldItem } from "../../trainingRequestFormComponents/FormElements";
import ErrorTemplate from "../../General/ErrorTemplate";
const ExamQuestionForm = ({
  showModal,
  closeModal,
  defaultData,
handleSaveQuestion,
handleUpdateQuestion
}) => {
  const [option, setOption] = useState({ content: "", isCorrect: false });
  const [details, setDetails] = useState({ content: "", answerOptions: [] });
  const [errors, setErrors] = useState({});
  const [isUpdate, setIsUpdate] = useState(false)
  useEffect(() => {
    if (defaultData) {
      setDetails(defaultData?.data);
      setIsUpdate(true);
    } else {
      setIsUpdate(false);
    }
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
    if (details?.answerOptions?.length < 3) {
      formErrors.option = "Add at least two (3) options";
      validForm = false;
    }
    const answer = details?.answerOptions?.filter((x) => x.isCorrect === true);
    if (answer?.length === 0 && validForm) {
      formErrors.answer = "Select the correct answer.";
      validForm = false;
    }
    if (!validForm) {
      setErrors(formErrors);
    } else {
      if(isUpdate){
        handleUpdateQuestion({index: defaultData?.index, data:details})
      }else{
      handleSaveQuestion(details)}
      removeFormData();
    }
  };

  const removeFormData = ()=>{
    setDetails({ content: "", answerOptions: [] });
    setOption({ content: "", isCorrect: false });
    setErrors({});
  }
  const handleAddOption = () => {
    if (option?.content) {
      const newOptions = details?.answerOptions ?? [];
      option.content = option.content.trim();
      const isExist = newOptions.find((x) => x.content === option.content);
      if (!isExist) {
        newOptions.push(option);
        setDetails({
          ...details,
          answerOptions: newOptions,
        });
        setOption({ content: "", isCorrect: false });
        setErrors({ ...errors, option: "" });
        
      }else{
        setErrors({ ...errors, option: "Option already exist" });
      }
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
      <Modal show={showModal} >
        <Modal.Header className="border-0" closeButton>
          <Modal.Title className={`h5 theme-color`}>{`${defaultData ? "Update" : "Add"} Item`} </Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-0">
          {/* <Form> */}
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
                  cols={3}
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
                          id={`option${index}`}
                          onChange={() => setCorrectAnswer(index)}
                        />
                        <label htmlFor={`option${index}`} className="">{x?.content}</label>
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
          {/* </Form> */}
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button
            type="button"
            label="Close"
            onClick={() => {closeModal();  removeFormData()}}
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
ExamQuestionForm.propTypes = {
  showModal: proptype.bool,
  handleSaveQuestion: proptype.func,
  defaultData: proptype.object,
  closeModal: proptype.func,
  handleUpdateQuestion: proptype.func
};
export default ExamQuestionForm;
