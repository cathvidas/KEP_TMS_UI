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
export const FormFieldItem = ({ col, label, FieldComponent }) => (
  <>
    <Col className={col ? col : ""}>
      <Form.Group>
        {label &&
        <Form.Label className="fw-semibold">{label}</Form.Label> }
        {FieldComponent && FieldComponent}
      </Form.Group>
    </Col>
  </>
);

export const FormsectionHeading = ({ title, icon }) => (
  <>
    <h5 className="my-2 text-uppercase theme-color">
      {icon && icon}
      &nbsp;{title}
    </h5>
  </>
);
FormFieldItem.propTypes = {
  col: proptype.string,
  label: proptype.string,
  FieldComponent: proptype.object,
};
FormStep.propTypes = {
  step: proptype.number,
  title: proptype.string.isRequired,
  state: proptype.string,
};
FormsectionHeading.propTypes = {
  title: proptype.string.isRequired,
  icon: proptype.object,
};