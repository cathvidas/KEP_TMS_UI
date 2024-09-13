import { Row } from "react-bootstrap";
import { FormFieldItem } from "./FormElements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { SectionHeading } from "../General/Section";
import proptype from "prop-types";
import { useEffect, useState } from "react";
import {
  GetAllTrainingCategories,
  GetAllTrainingPrograms,
} from "../../services/trainingServices";
const TrainingDetailsContainer = ({
  onChange,
  state,
  handleResponse,
  formData,
  setFormdata,
}) => {
  const [data, setData] = useState(formData);
  const [programs, setPrograms] = useState({
    label: "",
    value: "",
  });
  const [categories, setCategories] = useState(null);
  const [venue, setVenue] = useState({ Venue: null });

  useEffect(() => {
    setData(data);
  }, [data]);
  const handleOnChange = (name, value) => {
    setData((obj) => ({ ...obj, [name]: value }));
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
              value={{value: programs.value, label: programs.label}}
              onChange={(e) => setPrograms({value: e.value, label: e.label})}
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
TrainingDetailsContainer.propTypes = {
  onChange: proptype.func,
  handleResponse: proptype.func,
  formData: proptype.object,
  setFormdata: proptype.func
};
export default TrainingDetailsContainer;
