import { Col, Row } from "react-bootstrap";
import TrainingScheduleList from "./TScheduleList";
import { Form } from "react-bootstrap";
import proptype from "prop-types";
import { FormFieldItem } from "./FormElements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { SectionHeading } from "../General/Section";
import { useEffect, useState } from "react";
import {TrainingDateValidations, ValidateSchedule } from "../../utils/TrainingDateValidation";
import { TrainingDates } from "../../services/insertData";

const ScheduleContainer = (
  {
 formData,
   handleResponse,
}
) => {

  const [trainingSchedules, setTrainingSchedules] = useState(formData.trainingDates);
  const [schedData, setSchedData] = useState(TrainingDates);
  const [error, setError] = useState();
  
  const handleInputChange=(e)=>{
    const { name, value, type } = e.target;
    setSchedData((obj) => ({...obj, [name]: type==="time"? value + ":00": value }));
    setError(null);
  }

  const handleTrainingSched = () => {
    // First, validate the schedule data
    const validate = ValidateSchedule(schedData);
  
    if (validate !== true) {
      // If validation fails, show the validation error
      setError(validate);
    } else if (TrainingDateValidations(trainingSchedules, schedData)) {
      // If there's a conflict in the schedule, set the error message
      setError("Conflicting schedule");
    } else {
      // If everything is valid, add the new schedule to the list
      setTrainingSchedules((prevSchedules) => [...prevSchedules, schedData]);
  
      // Clear the form/reset schedData
      setSchedData(TrainingDates);
    }
  };
  
 
  const removeSechedule = (index) => {
    const updatedSchedules = trainingSchedules.filter((item, i) => i !== index);
    setTrainingSchedules(updatedSchedules);
  };

  useEffect(()=>{
    handleResponse(trainingSchedules);
  }, [trainingSchedules, handleResponse])
  return (
    <>
      <Row className="mt-2">
        <SectionHeading
          title="Training Dates"
          icon={<FontAwesomeIcon icon={faCalendar} />}
        />
        {/* <FormFieldItem
          label={"Start Date"}
          FieldComponent={
            <input
              type="date"
              className="form-control"
              placeholder="Training Venue"
            />
          }
        />
        <FormFieldItem
          label={"End Date"}
          FieldComponent={
            <input
              type="date"
              className="form-control"
              placeholder="Training Venue"
            />
          }
        /> */}
        <div className="col col-12  flex-column gap-2 mt-3">
          <div className="d-flex justify-content-between align-items-center">
            <h6>Schedules: </h6>
          </div>
          <Row>
            <Col>
              <TrainingScheduleList
                schedules={trainingSchedules}
                onDelete={removeSechedule}
              />
            </Col>
            <Col className="col-md-5">
              <Row>
                <Col className="col-md-3">
                  <Form.Label className="fw-semibold m-0">Date:</Form.Label>
                </Col>
                <Col>
                  <input
                    className="form-control"
                    type="date"
                    name="date"
                    value={schedData?.date}
                    onChange={handleInputChange}
                    required
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col className="col-md-3 ">
                  <Form.Label className="fw-semibold m-0">Start Time:</Form.Label>
                </Col>
                <Col>
                  <input
                    className="form-control"
                    type="time"
                    name="startTime"
                    value={schedData?.startTime}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col className="col-md-3">
                  <Form.Label className="fw-semibold m-0">End Time:</Form.Label>
                </Col>
                <Col>
                  <input
                    className="form-control"
                    type="time"
                     name="endTime"
                    value={schedData?.endTime}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>
              {error && <span className="text-danger">{error} </span>}
              <div className="d-flex">
                <button
                  className="btn mt-2 ms-auto   btn-primary"
                  type="button"
                  style={{
                    color: "rgb(101,85,143)",
                    background: "rgba(101,85,143,0.12)",
                    borderStyle: "none",
                  }}
                  onClick={handleTrainingSched}
                >
                  <i className="icon ion-plus"></i>&nbsp;Add schedule
                </button>
              </div>
            </Col>
          </Row>
        </div>
      </Row>
    </>
  );
};
ScheduleContainer.propTypes = {
  formData: proptype.object,
  handleResponse: proptype.func,
};
export default ScheduleContainer;
