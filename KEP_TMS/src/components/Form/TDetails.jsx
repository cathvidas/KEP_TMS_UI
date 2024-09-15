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
} from "../../services/trainingServices";
const TrainingDetailsContainer = ({ handleResponse, formData }) => {
  const [details, setDetails] = useState(formData);
  const [options, setOptions] = useState({ programs: [], categories: [] });

  useEffect(() => {
    const getOptions = async () => {
      const programsOption = await getTrainingPrograms();
      const categoriesOption = await getTrainingCategories();
      setOptions({
        programs: programsOption.map(({ id, name }) => ({
          label: name,
          value: id,
        })),
        categories: categoriesOption.map(({ id, name }) => ({
          label: name,
          value: id,
        })),
      });
    };
    getOptions();
  }, []);
  useEffect(() => {
    handleResponse(details);
  }, [details, handleResponse]);

  const handleOnChange = (name, value) => {
    setDetails((obj) => ({ ...obj, [name]: value }));
  };

  return (
    <>
      <Row>
        <SectionHeading
          title="Training Details"
          icon={<FontAwesomeIcon icon={faCircleInfo} />}
        />
        <FormFieldItem
          col="col-6"
          label={"Program"}
          FieldComponent={
            <Select
              options={options.programs}
              name="TProgram"
              value={options.programs.filter(
                (x) => x.value === details.trainingProgramId
              )}
              onChange={(e) => handleOnChange("trainingProgramId", e.value)}
            />
          }
        />
        <FormFieldItem
          col="col-6"
          label={"Category"}
          FieldComponent={
            <Select
              options={options.categories}
              value={options.categories.filter(
                (x) => x.value === details.categoryId
              )}
              onChange={(e) => handleOnChange("categoryId", e.value)}
            />
          }
        />
        <FormFieldItem
          col="col-12"
          label={"Objective"}
          FieldComponent={
            <textarea
              className="form-control"
              placeholder="Training objective"
              value={details.trainingObjectives}
              name="trainingObjectives"
              onChange={(e) => {
                handleOnChange(e.target.name, e.target.value);
              }}
            ></textarea>
          }
        />
        <FormFieldItem
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
  onChange: proptype.func,
  handleResponse: proptype.func,
  formData: proptype.object,
  setFormdata: proptype.func,
};
export default TrainingDetailsContainer;
