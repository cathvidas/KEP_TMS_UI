import proptype from 'prop-types'
import { Col, Form } from 'react-bootstrap';
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
export const FormFieldItem = ({ col, label, FieldComponent , required, error, subLabel }) => (
  <>
    <Col className={`col-12 ${col ? col : ""} mb-3`}>
      <Form.Group>
        {label && <>
        <Form.Label className={`fw-semibold  ${required && "required"}`}>{label}</Form.Label>
        {subLabel && <small className="ms-2 text-muted">{subLabel}</small>}
         </>}
        {FieldComponent && FieldComponent}
        {error &&  <small className="text-red">{error ?? ""}</small>}
      </Form.Group>
    </Col>
  </>
);


FormFieldItem.propTypes = {
  col: proptype.string,
  label: proptype.string,
  FieldComponent: proptype.object,
  required: proptype.bool,
  error: proptype.string,
  subLabel: proptype.string,
};
FormStep.propTypes = {
  step: proptype.number,
  title: proptype.string.isRequired,
  state: proptype.string,
};