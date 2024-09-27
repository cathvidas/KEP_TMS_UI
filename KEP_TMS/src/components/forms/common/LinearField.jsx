import PropTypes from "prop-types";
import { useEffect, useState } from "react";
const LinearField = ({ label, name, defaultValue, onChange }) => {
  const [value, setValue] = useState({name: name, value: defaultValue});
  console.log(value)
  useEffect(() => {
    if (onChange != null) {
      onChange(value);
    }
  }, [value]);
  return (
    <div className="d-flex gap-2 align-items-end ">
      <label className="form-label m-0">{label}:</label>
      <input
        className="no-focus flex-grow-1 border-0 border-bottom"
        value={value.value}
        name={name}
        onChange={(e)=>setValue({...value, value: e.target.value})}
      />
    </div>
  );
};

LinearField.propTypes = {
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
};
export default LinearField;
