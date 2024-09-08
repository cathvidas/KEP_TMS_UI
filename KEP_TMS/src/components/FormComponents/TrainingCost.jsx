import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormFieldItem, FormsectionHeading } from "./FormElements";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { Row } from "react-bootstrap";
import proptype from "prop-types";
import { useState } from "react";

const TrainingCost = ({totalCost, participants, onInput}) => {  
    const [cost , setCost] = useState(totalCost);
    console.log(totalCost)
    
  const computeTotalCost = (e) => {
    const cost = parseFloat(e.target.value);
    let totalCost = participants.length * cost;
    onInput(totalCost);
    setCost(totalCost);
  };
//     const handleInputChange = (e) => {
//     const cost = parseFloat(e.target.value);
//     if (!isNaN(cost)) {
//       onInput(cost);
//       setCost(cost);
//     }
//   };
  return (
    <>
      <div className="mt-4"></div>
      <FormsectionHeading
        title="Training Cost"
        icon={<FontAwesomeIcon icon={faUsers} />}
      />
      <Row>
        <FormFieldItem
        label="Training Fee"
          col="col-6"
          FieldComponent={<input type="number" min="0" className="form-control" onChange={computeTotalCost}/>}
        />
        <FormFieldItem
        label="Total Fee"
          col="col-6"
          FieldComponent={<input type="number" value={cost} min="0" className="form-control" readOnly/>}/>
       
      </Row>
    </>
  );
};
TrainingCost.propTypes={
    onInput: proptype.func.isRequired,
 totalCost: proptype.number.isRequired,
 participants: proptype.array.isRequired,
}
export default TrainingCost;
