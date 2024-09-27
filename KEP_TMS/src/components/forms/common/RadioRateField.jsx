import { Rating } from "primereact/rating";
import { useState } from "react";
import proptype from "prop-types"
import { Col, Row } from "react-bootstrap";
const RatioRateField =({sequenceNo, label, onChange, defvalue, disabled=false, required=false})=>{
    const [value, setValue] = useState(null);
    return(
        <div className="d-flex align-items-center justify-content-between mb-1">
            <p className="m-0">{label}</p>
            <Rating value={value} onChange={(e) => setValue(e.value)} cancel={false} />
        </div>
    )

}

RatioRateField.propTypes={
    sequenceNo: proptype.string,
    label: proptype.string,
    onChange: proptype.func,
    defvalue: proptype.number,
    disabled: proptype.bool,
    required: proptype.bool
}
export default RatioRateField;