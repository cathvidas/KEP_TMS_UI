import { Row } from "react-bootstrap";
import { FormFieldItem } from "./FormElements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { SectionHeading } from "../General/Section";
import proptype from "prop-types"
import { useEffect, useState } from "react";
import { GetAllTrainingCategories, GetAllTrainingPrograms } from "../../services/trainingServices";
const TrainingDetailsContainer = ({ onChange, state, handleResponse, formData }) => {
  const [programs, setPrograms] = useState(null);
  const [categories, setCategories] = useState(null);
  const [venue, setVenue] = useState({Venue: null});
console.log(formData)

  const handleOnChange = (e, value) => {
console.log(e, value)
    onChange(e, value.value)
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
              options={GetAllTrainingPrograms()}
              name="TProgram"
              defaultValue={formData?.categoryId}
              onChange={(e) => setPrograms(formData?.categoryId ?? e.value)}
            />
          }
        />
        <FormFieldItem
          col="col-6"
          label={"Category"}
          FieldComponent={
            <Select
              options={GetAllTrainingCategories()}
              onChange={(e) => handleOnChange("categoryId", e)}
              defaultValue={GetAllTrainingCategories()[formData.categoryId]}
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
              name="trainingObjectives"
              value={formData?.trainingObjectives}
              onChange={handleResponse}
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
              value={formData?.venue}
              onChange={handleResponse}
            />
          }
        />
      </Row>
    </>
  );
};
TrainingDetailsContainer.propTypes ={
  onChange: proptype.func,
  handleResponse: proptype.func,
  formData: proptype.object,
}
export default TrainingDetailsContainer;
