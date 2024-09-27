import { Rating } from "primereact/rating";
import { useState } from "react";
import proptype from "prop-types"
const RateFieldItem =({sequenceNo, label, onChange, defvalue, disabled=false, required=false})=>{
    const [value, setValue] = useState(null);
    return(
        <div className="d-flex align-items-center justify-content-between">
            <p><b>{sequenceNo}.</b> {label}</p>
            <Rating value={value} onChange={(e) => setValue(e.value)} cancel={false} />
        </div>
    )

}

RateFieldItem.propTypes={
    sequenceNo: proptype.string,
    label: proptype.string,
    onChange: proptype.func,
    defvalue: proptype.number,
    disabled: proptype.bool,
    required: proptype.bool
}
export default RateFieldItem;