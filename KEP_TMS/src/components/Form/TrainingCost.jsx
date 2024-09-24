import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormFieldItem } from "./FormElements";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";
import proptype from "prop-types";
import { useEffect, useState } from "react";
import { SectionHeading } from "../General/Section";
import Select from "react-select";
import { getAllTrainingProviders } from "../../api/trainingServices";
import { mapProviderListToOptionFormat } from "../../services/DataMapping/ProviderData";
import { FormatDate } from "../../utils/FormatDateTime";

const TrainingCost = ({formData, handleResponse}) => {  
  const [data, setFormData] = useState(formData);
    const [cost , setCost] = useState(data.trainingFee);
    const [totalCost , setTotalCost] = useState(0);
    const [providers, setProviders] = useState([]);
    const [withEarlyRate, setWithEarlyRate] = useState(false);
    console.log(data)
    useEffect(()=>{
      if(handleResponse!= null){
        handleResponse(data)
      }
      
    }, [data])
    useEffect(()=>{
      if(withEarlyRate){
      const date = new Date();
      const cutOffDate = date.toLocaleDateString('en-CA') ;
      setFormData((prev)=>({...prev, cutOffDate: cutOffDate}))}
      else{
      setFormData((prev)=>({...prev, cutOffDate: "", discountedRate: 0}))
      }
      
    }, [withEarlyRate])
  
    useEffect(()=>{
      const getProviders = async () => {
        try {
          const res = await getAllTrainingProviders();
          setProviders(mapProviderListToOptionFormat(res));
        } catch (err) {
          console.error(err);
        }
      };
      getProviders();
    }, [formData])
      
    console.log(data);
  useEffect(()=>{
      setTotalCost(data.trainingParticipants.length * cost);
      console.log(totalCost, cost)
      setFormData((prev)=>({...prev, trainingFee: cost, totalTrainingFee: totalCost}))
  }, [cost, totalCost])

  useEffect(()=>{
if(formData.discountedRate > 0){
  setWithEarlyRate(true)
}else{
  setWithEarlyRate(false)
}
  },[formData])

  return (
    <>
      <SectionHeading
        title="Training Provider"
        icon={<FontAwesomeIcon icon={faUsers} />}
      />
      <FormFieldItem
        label={"Training Provider"}
        col="col-12"
        FieldComponent={
          <Select
            value={providers.filter((x) => x.value === data.trainingProvider?.id)}
            options={providers}
            onChange={(e) =>
              setFormData((obj) => ({ ...obj, trainingProvider:{id: e.value , name: e.label}}))
            }
          />
        }
      />
      <div className="mt-4"></div>
      <SectionHeading
        title="Training Cost"
        icon={<FontAwesomeIcon icon={faUsers} />}
      />
      <Row>
        <Col className="col-12 col-md-4">
          <FormFieldItem
            label="Training Fee"
            col={"col-md-10"}
            FieldComponent={
              <input
                type="number"
                value={data.trainingFee}
                min="0"
                className="form-control"
                onChange={(e) => setCost(parseFloat(e.target.value))}
              />
            }
          />
          <FormFieldItem
            label="Total Training Fee"
            col={"col-md-10"}
            FieldComponent={
              <input
                type="number"
                value={data.totalTrainingFee}
                min="0"
                className="form-control"
                readOnly
              />
            }
          />
        </Col>
        <Col className="col-lg-6">
          <FormFieldItem
            label={"With early bird rate"}
            FieldComponent={
              <div className="d-flex gap-5">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    checked={withEarlyRate}
                    onChange={()=>setWithEarlyRate(true)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Yes
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    checked={!withEarlyRate}
                    onChange={()=>setWithEarlyRate(false)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    No
                  </label>
                </div>
              </div>
            }
          />
          {withEarlyRate  && 
          <Row>
          <FormFieldItem
            label={"Discounted rate"}
            col={"col-6"}
            FieldComponent={
              <input className="form-control" 
              type="number"
              min="0"
              value={data.discountedRate}
              onChange={(e)=>setFormData((prev)=>({...prev, discountedRate: parseFloat(e.target.value)}))}
              />
            }
          />
          <FormFieldItem
            label={"cut-off date"}
            col={"col-6"}
            FieldComponent={
              <input className="form-control" type="date"
              //defaultValue={"2023-12-12"}
              value={data.cutOffDate}
              onChange={(e)=>setFormData((prev)=>({...prev, cutOffDate: e.target.value}))}
              />
            }
          /></Row>}
        </Col>
      </Row>
    </>
  );
};
TrainingCost.propTypes={
 formData: proptype.object.isRequired,
 handleResponse: proptype.func,
}
export default TrainingCost;
