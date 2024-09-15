import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormFieldItem } from "./FormElements";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { Row } from "react-bootstrap";
import proptype from "prop-types";
import { useEffect, useState } from "react";
import { SectionHeading } from "../General/Section";

const TrainingCost = ({formData, handleResponse}) => {  
  const [data, setFormData] = useState(formData);
    const [cost , setCost] = useState(data.trainingFee);
    const [totalCost , setTotalCost] = useState(0);
    console.log(data)
  useEffect(()=>{
    if(handleResponse!= null){
      handleResponse(data)
    }
    
  }, [data])
  
  useEffect(()=>{
      setTotalCost(data.trainingParticipants.length * cost);
      console.log(totalCost, cost)
      setFormData((prev)=>({...prev, trainingFee: cost, totalTrainingFee: totalCost}))
  }, [cost, totalCost])

  return (
    <>
      <div className="mt-4"></div>
      <SectionHeading
        title="Training Cost"
        icon={<FontAwesomeIcon icon={faUsers} />}
      />
      <Row>
        <FormFieldItem
        label="Training Fee"
          col="col-6"
          FieldComponent={<input type="number" value={data.trainingFee} min="0" className="form-control" onChange={(e)=>setCost(parseFloat(e.target.value))}/>}
        />
        <FormFieldItem
        label="Total Fee"
          col="col-6"
          FieldComponent={<input type="number" value={data.totalTrainingFee} min="0" className="form-control" readOnly/>}/>
       
      </Row>
    </>
  );
};
TrainingCost.propTypes={
 formData: proptype.object.isRequired,
 handleResponse: proptype.func,
}
export default TrainingCost;
