import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import proptype from "prop-types";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { ActionButton } from "./Button";
import React, { useState } from "react";
import Select from "react-select";
import { Card, Col, Form, Row } from "react-bootstrap";

const TextareaField = ({ type, placeholder, name, value, id }) => (
  <textarea
  type={type && type}
  className="form-control"
  placeholder={placeholder && placeholder}
  name={name && name}
  value={value && value}
  id={id && id}
  ></textarea>
);
const SelectField = ({ defaultValue , options}) => {
  const [selected, setSelected] = useState(defaultValue ? defaultValue:"");
  const handleOnChange = (e) =>{
    setSelected(e)
  }
    <select className="form-select" value={selected} onChange={handleOnChange}> 
      <optgroup label="This is a group">
      {options && options.map((option, index)=>(
            React.cloneElement(option, {key:index})
          ))}
        {/* <option value="12">
          This is item 1
        </option>
        <option value="13">This is item 2</option>
        <option value="14">This is item 3</option> */}
      </optgroup>
    </select>
};
const FormFieldItem = ({ label, FieldComponent }) => (
  <>
    <Col>
      <Form.Group>
        <Form.Label className="fw-semibold">{label}</Form.Label>
        {FieldComponent && FieldComponent}
      </Form.Group>
    </Col>
  </>
);
export const FormContainer = () => {

 const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

  return (
    <Card>
      <Card.Body>
        <FormHeader />
        <Row className="my-3">
          <Col className="col-md-7 border-end">
            <Row className="row-cols-1 gy-3">
              <FormFieldItem
                label={"Objective"}
                FieldComponent={      
                <input
                  type="text"
                  className="form-control"
                  placeholder="Training Venue"
                />
                }
              />
              <FormFieldItem
                label={"Program"}
                FieldComponent={      
                <input
                  type="text"
                  className="form-control"
                  placeholder="Training Venue"
                />
                }
              />
              <FormFieldItem
                label={"Program"}
                FieldComponent={
                  <TextareaField type="text" placeholder="Enter Program" />
                }
              />
              <FormFieldItem
                label={"Select"}
                FieldComponent={    
                <Select
                options={options}
                />
                }
              />
              <div className="col">
                <div className="form-group">
                  <label className="form-label fw-semibold">Objective</label>
                  <textarea
                    className="form-control"
                    placeholder="Training objective"
                  ></textarea>
                </div>
              </div>
              
              <FormFieldItem
                label={"Program"}
                FieldComponent={      
                <input
                  type="text"
                  className="form-control"
                  placeholder="Training Venue"
                />
                }
              />
            </Row>
          </Col>
          <Col>
            <h6 className="text-uppercase">Training dates</h6>
            <Row className="g-2">   
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
              <div className="col col-12 d-flex flex-column gap-2 mt-5">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="m-0">Schedules</h6>
                  <button
                    className="btn btn-primary"
                    type="button"
                    style={{
                      color: "rgb(101,85,143)",
                      background: "rgba(101,85,143,0.12)",
                      borderStyle: "none",
                    }}
                  >
                    <i className="icon ion-plus"></i>&nbsp;Add item
                  </button>
                </div>
                <Row>
                  <Col className="m-0 col-md-3">
                    <label className="col-form-label fw-semibold">Date</label>
                  </Col>
                  <Col className="col-md-9">
                    <input className="form-control" type="date" />
                  </Col>
                </Row>
                <Row>
                  <Col className="m-0 col-md-3">
                    <label className="col-form-label fw-semibold">
                      Start Time
                    </label>
                  </Col>
                  <Col className="col col-md-9">
                    <input className="form-control" type="time" />
                  </Col>
                </Row>
                <Row>
                  <Col className="m-0 col-md-3">
                    <label className="col-form-label fw-semibold">
                      End Time
                    </label>
                  </Col>
                  <div className="col col-md-9">
                    <input className="form-control" type="time" />
                  </div>
                </Row>
              </div>
            </Row>
          </Col>
        </Row>
        <div className="d-flex flex-shrink-0 justify-content-end">
          <ActionButton
            title="Next"
            actionLink="/Newrequest"
            variant={{ brand: "next-btn", size: "btn-sm" }}
          />
        </div>
        <div className="modal fade" role="dialog" tabIndex="-1" id="modal-1">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Modal Title</h4>
                <button
                  className="btn-close"
                  type="button"
                  aria-label="Close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className="modal-body">
                <p>The content of your modal.</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-light"
                  type="button"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button className="btn btn-primary" type="button">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
export const FormHeader = () => {
  return (
    <>
      <div className="pb-3 border-bottom">
        <div className="d-flex align-items-center gap-2 gap-lg-5 flex-wrap">
          <FormStep step={2} title="Details" state="success" />
          <FontAwesomeIcon icon={faGreaterThan} />
          <FormStep step={2} title="Details" state="active" />
          <FontAwesomeIcon icon={faGreaterThan} />
          <FormStep step={3} title="Details" />
          <FontAwesomeIcon icon={faGreaterThan} />
          <FormStep step={4} title="Details" />
        </div>
      </div>
    </>
  );
};
export const FormStep = ({ step, title, state }) => {
  var style =
    state == "success"
      ? "formStep-success"
      : state == "active"
      ? "formStep-active"
      : "bg-light text-secondary";
  return (
    <>
      <div
        className="d-flex align-items-center"
        style={{ width: "fit-content" }}
      >
        <span
          className={`d-flex justify-content-center me-2  rounded-circle align-items-center p-2 bs-icon-sm bs-icon-circle bs-icon ${style}`}
        >
          <span style={{ lineHeight: "0.7rem" }}>{step}</span>
        </span>
        <span className="fw-bold">{title}</span>
      </div>
    </>
  );
};
FormStep.propTypes = {
  step: proptype.number,
  title: proptype.string.isRequired,
  state: proptype.string,
};
