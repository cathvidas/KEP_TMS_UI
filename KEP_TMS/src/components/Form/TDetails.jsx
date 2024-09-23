import { Row } from "react-bootstrap";
import { FormFieldItem } from "./FormElements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { SectionHeading } from "../General/Section";
import proptype from "prop-types";
import { useEffect, useState } from "react";
import {
  getTrainingCategories,
  getTrainingPrograms,
} from "../../api/trainingServices";
const TrainingDetailsContainer = ({ handleResponse, formData , error}) => {
  const [details, setDetails] = useState(formData);
  const [options, setOptions] = useState({ programs: [], categories: [] });
  const [errors, setErrors] = useState(error);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    setErrors(error);
  },[error])
  useEffect(()=>{
    setDetails(formData);
  },[formData])
  //Get program and categories options
  useEffect(() => {
    const getOptions = async () => {
      try {
        setLoading(true);
        const programsOption = await getTrainingPrograms();
        const categoriesOption = await getTrainingCategories();
        const mappedPrograms = programsOption.map(({ id, name }) => ({
          label: name,
          value: id,
        }));
        const mappedCategories = categoriesOption.data.map(({ id, name }) => ({
          label: name,
          value: id,
        }));
        setOptions({
          programs: mappedPrograms,
          categories: mappedCategories,
        });
       // setSelectedOption({programs: mappedPrograms[0], categories: mappedCategories[0]});
        setLoading(false);
      } catch (error) {
        console.error("Error fetching training options:", error);
      }
    };
    getOptions();
  }, []);

  //Pass data to parent component
  useEffect(() => {
    handleResponse(details);
  }, [details, handleResponse]);

  //Emtpty field validation
  const handleOnChange = (name, value) => {
    console.log(value)
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
            isLoading={loading ? true : false}
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
              isLoading={loading ? true : false}
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
TrainingDetailsContainer.propTypes = {
  handleResponse: proptype.func,
  formData: proptype.object,
  error: proptype.object,
};
export default TrainingDetailsContainer;
