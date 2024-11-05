import PropTypes from "prop-types";
import { Col } from "react-bootstrap";
const AutoCompleteField = ({ label, value, className}) => {
  return (
    <Col className={`d-flex gap-2 align-items-center ${className}`}>
      <label className="form-label m-0">{label}:</label>
      <span className="flex-grow-1 d-block text-wrap border-0 border-bottom"
      > {value?? "N/A"}</span>

    </Col>
  );
};

AutoCompleteField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
};
export default AutoCompleteField;
