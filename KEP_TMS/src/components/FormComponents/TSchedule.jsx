import { Col, Row } from "react-bootstrap"
import TrainingScheduleList from "./TScheduleList"
import { Form } from "react-bootstrap"
import proptype from 'prop-types'
import { FormFieldItem, FormsectionHeading } from "./FormElements"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendar } from "@fortawesome/free-solid-svg-icons"

const ScheduleContainer =({trainingSchedules, removeSechedule, schedData, handleInputChange, handleTrainingSched})=>{
    return(
        <>
        <Row className="mt-2">
          <FormsectionHeading
            title="Training Dates"
            icon={<FontAwesomeIcon icon={faCalendar} />}
          />
          <FormFieldItem
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
          />
        <div className="col col-12  flex-column gap-2 mt-3">
          <div className="d-flex justify-content-between align-items-center">
            <h6>Schedules: </h6>
          </div>
          <Row>
            <Col>
            <TrainingScheduleList schedules={trainingSchedules} onDelete={removeSechedule}/>
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
                    name="schedDate"
                    value={schedData.schedDate}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col className="col-md-3 ">
                  <Form.Label className="fw-semibold m-0">
                    Time In:
                  </Form.Label>
                </Col>
                <Col>
                  <input
                    className="form-control"
                    type="time"
                    name="timeIn"
                    value={schedData.timeIn}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>
              <Row className="mt-2">
                <Col className="col-md-3">
                  <Form.Label className="fw-semibold m-0">
                    Time Out:
                  </Form.Label>
                </Col>
                <Col>
                  <input
                    className="form-control"
                    type="time"
                    name="timeOut"
                    value={schedData.timeOut}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>
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
    )
}
ScheduleContainer.propTypes ={
    trainingSchedules: proptype.array.isRequired,
    removeSechedule: proptype.func.isRequired,
    schedData: proptype.object.isRequired,
    handleInputChange: proptype.func.isRequired,
    handleTrainingSched: proptype.func.isRequired
}
export default ScheduleContainer;