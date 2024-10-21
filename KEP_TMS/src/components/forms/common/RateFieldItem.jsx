import { Rating } from "primereact/rating";
import proptype from "prop-types"
import ErrorTemplate from "../../General/ErrorTemplate";
const RateFieldItem = ({ sequenceNo, label, onChange, value, error,disabled = false, required = false, readOnly = false }) => {
    return (
        <>
        <div className="d-flex gap-2 align-items-center justify-content-between">
            <p className="m-0">
                {sequenceNo && 
                <b>{sequenceNo}. </b>}
                {label}</p>
            <Rating value={value} onChange={(e) => onChange(e.value)} cancel={false} readOnly={readOnly} disabled={disabled} required={required} />
        </div>
        {error && <ErrorTemplate message={error}/>}
        </>
    )

}

RateFieldItem.propTypes = {
    sequenceNo: proptype.string,
    label: proptype.string,
    onChange: proptype.func,
    defvalue: proptype.number,
    disabled: proptype.bool,
    required: proptype.bool,
    readOnly: proptype.bool,
    error: proptype.string,
    value: proptype.string,
}
export default RateFieldItem;