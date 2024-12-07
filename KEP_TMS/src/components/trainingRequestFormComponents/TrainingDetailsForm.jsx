import { Row } from "react-bootstrap";
import { FormFieldItem } from "./FormElements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { SectionHeading } from "../General/Section";
import proptype from "prop-types";
import { useEffect, useState } from "react";
import programHook from "../../hooks/programHook";
const TrainingDetailsForm = ({ handleResponse, formData , error, categories}) => {
  const [details, setDetails] = useState(formData);
  const [options, setOptions] = useState({ programs: [], categories: [] });
  const [errors, setErrors] = useState(error);
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    size: 10,
    value: "",
  });
  const programs = programHook.usePagedPrograms(pageConfig.page,
    pageConfig.size,
    pageConfig.value)
  useEffect(() => {
    const mappedPrograms = programs?.data?.results?.filter(item=> item?.statusName === "Active")?.map(({ id, name }) => ({
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
  }, [programs?.data?.results, categories?.data]);
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
          error={errors?.trainingProgram}
          col="col-md-6"
          label={"Program"}
          FieldComponent={
            <Select
            onInputChange={(e) =>
              setPageConfig((prev) => ({ ...prev, value: e }))
            }
            onMenuScrollToBottom={() =>
              setPageConfig((prev) => ({ ...prev, size: prev.size + 10 }))
            }
            isLoading={programs?.loading ? true : false}
              options={options.programs}
              name="TProgram"              
              value={details?.trainingProgram?.id ? {
                label: details?.trainingProgram?.name,
                value: details?.trainingProgram?.id,
              }: ""}
              onChange={(e) => handleOnChange("trainingProgram", {id: e.value, name: e.label})}
            />
          }
        />
        <FormFieldItem
          required
          error={errors?.trainingCategory}
          col="col-md-6"
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
