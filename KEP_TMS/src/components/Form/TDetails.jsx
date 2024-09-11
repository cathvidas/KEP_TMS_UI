import { Row } from "react-bootstrap";
import { FormFieldItem } from "./FormElements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { SectionHeading } from "../General/Section";
import proptype from "prop-types"
import { useState } from "react";
import { GetAllTrainingCategories, GetAllTrainingPrograms } from "../../services/trainingServices";
const TrainingDetailsContainer = ({ onChange, state }) => {
  const [programs, setPrograms] = useState(null);
  const [categories, setCategories] = useState(null);
  const handleOnChange = () => {
    console.log(programs + ", " + categories)
    onChange({
      ...state ,
      programs: programs,
    })
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
              onChange={(e) => setPrograms(e.value)}
            />
          }
        />
        <FormFieldItem
          col="col-6"
          label={"Category"}
          FieldComponent={<Select options={GetAllTrainingCategories()} 
          name="TCategories"
              onChange={(e) => setCategories(e.value)}
          />}
        />
        <FormFieldItem
          col="col-12"
          label={"Objective"}
          FieldComponent={
            <textarea
              className="form-control"
              placeholder="Training objective"
              onChange={handleOnChange}
            ></textarea>
          }
        />
        <FormFieldItem
          label={"Venue"}
          FieldComponent={
            <input
              type="text"
              className="form-control"
              placeholder="Training Venue"
            />
          }
        />
      </Row>
    </>
  );
};
TrainingDetailsContainer.propTypes ={
  onChange: proptype.func,
}
export default TrainingDetailsContainer;
