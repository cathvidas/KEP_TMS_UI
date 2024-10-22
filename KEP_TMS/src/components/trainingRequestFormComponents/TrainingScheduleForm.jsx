import { Col, Row } from "react-bootstrap";
import TrainingScheduleList from "./TrainingScheduleList";
import { Form } from "react-bootstrap";
import proptype from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { SectionHeading } from "../General/Section";
import { useEffect, useState } from "react";
import {
  TrainingDateValidations,
  ValidateSchedule,
} from "../../utils/TrainingDateValidation";
import { TrainingDates } from "../../services/insertData";
import { formatTotalTime, getTotalTime } from "../../utils/datetime/FormatDateTime";
import { formatDateOnly } from "../../utils/datetime/Formatting";
import ErrorTemplate from "../General/ErrorTemplate";

const TrainingScheduleForm = ({ formData, handleResponse, errors }) => {
  const [trainingSchedules, setTrainingSchedules] = useState(
    formData.trainingDates
  );
  const [schedData, setSchedData] = useState(TrainingDates);
  const [error, setError] = useState();
  useEffect(() => {
    setError(errors?.schedules);
  }, [errors]);

  useEffect(() => {
    handleResponse(trainingSchedules);
  }, [trainingSchedules]);

  useEffect(() => {
    setTrainingSchedules(formData.trainingDates);
  }, [formData.trainingDates]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setSchedData((obj) => ({
      ...obj,
      [name]: type === "time" ? value + ":00" : value,
    }));
  };

  useEffect(() => {
    if (schedData.startTime && schedData.endTime) {
      const total = getTotalTime(schedData.startTime, schedData.endTime);
      if (total < 1) {
        setError("Start time must be earlier than end time");

        setSchedData({ ...schedData, totalTime: "" });
      } else {
        setError(null);
        const formatted = formatTotalTime(total);
        setSchedData({ ...schedData, totalTime: formatted });
      }
    }
  }, [schedData.startTime, schedData.endTime]);
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
      setError("");
      // Clear the form/reset schedData
      setSchedData(TrainingDates);
    }
  };

  const removeSchedule = (index) => {
    const updatedSchedules = trainingSchedules.filter((item, i) => i !== index);
    setTrainingSchedules(updatedSchedules);
  };

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
            <label className="fw-semibold required form-label">
              Schedules:{" "}
            </label>
          </div>
          <Row className="g-3">
            <Col className="col-md-12 col-lg-7">
              <TrainingScheduleList
                schedules={trainingSchedules}
                onDelete={removeSchedule}
              />
              {errors?.trainingSchedules?.length > 0 &&
              errors?.trainingSchedules?.map(err=>{
                return (
              <ErrorTemplate key={err?.index} message={err?.value}/>
                )
              })}
            </Col>
            <Col className="col-12 col-lg-5">
              <Row>
                <Col className="col-12 col-md-3">
                  <Form.Label className="fw-semibold m-0">Date:</Form.Label>
                </Col>
                <Col>
                  <input
                    className="form-control"
                    type="date"
                    name="date"
                    min={formatDateOnly(new Date(), 'dash')}
                    value={schedData?.date}
                    onChange={handleInputChange}
                    // required
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col className="col-12 col-md-3 ">
                  <Form.Label className="fw-semibold m-0">
                    Start Time:
                  </Form.Label>
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
                <Col className="col-12 col-md-3">
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
              {schedData.totalTime && (
                <>
                  <label className="col-md-3 form-label fw-semi-bold me-1">
                    Total Time:
                  </label>
                  <span className="text-success">{schedData.totalTime}</span>
                </>
              )}
              {error && <small className="text-red">{error} </small>}
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
TrainingScheduleForm.propTypes = {
  formData: proptype.object,
  handleResponse: proptype.func,
  errors: proptype.string,
};
export default TrainingScheduleForm;
  