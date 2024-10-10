import { Row } from "react-bootstrap";
import { FormFieldItem } from "./FormElements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { SectionHeading } from "../General/Section";
import proptype from "prop-types";
import { useEffect, useState } from "react";
import programHook from "../../hooks/programHook";
import categoryHook from "../../hooks/categoryHook";
const TrainingDetailsForm = ({ handleResponse, formData , error, programs, categories}) => {
  const [details, setDetails] = useState(formData);
  const [options, setOptions] = useState({ programs: [], categories: [] });
  const [errors, setErrors] = useState(error);
  
  useEffect(() => {
    const mappedPrograms = programs?.data?.map(({ id, name }) => ({
      label: name,
      value: id,
    }));
    const mappedCategories = categories?.data.map(({ id, name }) => ({
      label: name,
      value: id,
    }));
    setOptions({
      programs: mappedPrograms,
      categories: mappedCategories,
    });
  }, [programs?.loading, categories?.loading]);
  useEffect(()=>{
    setErrors(error);
  },[error])
  useEffect(()=>{
    setDetails(formData);
  },[formData])

  useEffect(() => {
    handleResponse(details);
  }, [details]);

  //Emtpty field validation
  const handleOnChange = (name, value) => {
    setErrors({ ...errors, [name]: value ? "" : "This field is required." });
    setDetails((obj) => ({ ...obj, [name]: value }));
  };
  
  return (
    <>
      <Row className="">
        <SectionHeading
          title="Training Details"
          icon={<FontAwesomeIcon icon={faCircleInfo} />}
        />
        <FormFieldItem
          required
          error={errors?.trainingProgramId}
          col="col-6"
          label={"Program"}
          FieldComponent={
            <Select
            isLoading={programs?.loading ? true : false}
              options={options.programs}
              name="TProgram"              
              value={options.programs.filter(
                (x) => x.value === details.trainingProgram?.id
              )}
              onChange={(e) => handleOnChange("trainingProgram", {id: e.value, name: e.label})}
            />
          }
        />
        <FormFieldItem
          required
          error={errors?.categoryId}
          col="col-6"
          label={"Category"}
          FieldComponent={
            <Select
              isLoading={categories?.loading ? true : false}
              options={options.categories}              
              value={options.categories.filter(
                (x) => x.value === details.trainingCategory?.id
              )}
              onChange={(e) => handleOnChange("trainingCategory", {id:e.value, name:e.label})}
            />
          }
        />
        <FormFieldItem
          required
          error={errors?.trainingObjectives}
          col="col-12"
          label={"Objective"}
          FieldComponent={
            <textarea
              className="form-control"
              placeholder="Training objective"
              value={details.trainingObjectives}
              name="trainingObjectives"
              onChange={(e)=>handleOnChange(e.target.name, e.target.value)}
            ></textarea>
          }
        />
        <FormFieldItem
          required
          error={errors?.venue}
          label={"Venue"}
          FieldComponent={
            <input
              type="text"
              className="form-control"
              name="venue"
              placeholder="Venue"
              value={details.venue}              
              onChange={(e) => {
                handleOnChange(e.target.name, e.target.value);
              }}
            />
          }
        />
      </Row>
    </>
  );
};
TrainingDetailsForm.propTypes = {
  handleResponse: proptype.func,
  formData: proptype.object,
  error: proptype.object,
  programs: proptype.object,
  categories: proptype.object,
};
export default TrainingDetailsForm;
