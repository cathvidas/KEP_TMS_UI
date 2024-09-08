import { Row } from "react-bootstrap"
import { FormFieldItem, FormsectionHeading } from "./FormElements"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import Select from "react-select";
const TrainingDetailsContainer =()=>{
    const options = [
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "vanilla", label: "Vanilla" },
    ];
    return (<>
    
    <Row>
          <FormsectionHeading
            title="Training Details"
            icon={<FontAwesomeIcon icon={faCircleInfo} />}
          />
          <FormFieldItem
            col="col-6"
            label={"Program"}
            FieldComponent={<Select options={options} />}
          />
          <FormFieldItem
            col="col-6"
            label={"Category"}
            FieldComponent={<Select options={options} />}
          />
          <FormFieldItem
            col="col-12"
            label={"Objective"}
            FieldComponent={
              <textarea
                className="form-control"
                placeholder="Training objective"
              ></textarea>
            }
          />
          <FormFieldItem
            label={"Venue"}
            FieldComponent={
              <input
                type="text"
                className="form-control"
                placeholder="Training Venue"
              />
            }
          />
        </Row>
    </>)
}
export default TrainingDetailsContainer