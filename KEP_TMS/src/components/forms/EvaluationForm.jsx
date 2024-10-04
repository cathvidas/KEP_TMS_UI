import { Card, Form, Row } from "react-bootstrap";
import AutoCompleteField from "./common/AutoCompleteField";
import RateFieldItem from "./common/RateFieldItem";
import RatioRateField from "./common/RadioRateField";
import { TabPanel, TabView } from "primereact/tabview";
import proptype from "prop-types"
import { Rating } from "primereact/rating";
import { formatDateTime } from "../../utils/Formatting";
import { useState } from "react";
import { SessionGetEmployeeId } from "../../services/sessions";
import evaluationConstant from "../../services/constants/evaluationConstant";
const EvaluationForm = ({data, userData}) => {
  const [formData, setFormData] = useState();
  const [contentMethodology, setContentMethodology] = useState(evaluationConstant.contentMethodology);
  const [programLogisticsRating, setProgramLogisticsRating] = useState(evaluationConstant.programLogisticsRating);
  const [facilitatorRating, setFacilitatorRating] = useState(evaluationConstant.facilitatorRating);
  const [overallRating, setOverallRating] = useState(evaluationConstant.overallRating);
  const getFacilitators = () => {
    let facilitators = "";
    data?.trainingFacilitators?.map((x) => {
      facilitators += `${x.fullname}  `;
    });
    return facilitators;
  };
  const getFormData ={
    id: 0,
    trainingRequestId: data.id,
    traineeBadge: SessionGetEmployeeId(),
    contentMethodology: contentMethodology,
    programLogisticsRating: programLogisticsRating,
    overallRating: overallRating,
    annotation: "string",
    facilitatorRating: facilitatorRating,
    createdBy: SessionGetEmployeeId()
  }
  const handleOnChange = (e, field, setField) => {
    const { name, value } = e.target;
    setField({...field, [name]: value});
  }
  return (
    <Card.Body className="border-top">
      <div className="text-center  pb-3 mb-3 ">
        <h5 className="m-0">Training Evaluation</h5>
        <small className="text-muted">Knowles Electronics Philippines</small>
      </div>
      <Form>
        <Row>
          <AutoCompleteField
            label="Program Title"
            value={data?.trainingProgram?.name}
            className="col-12"
          />
          <AutoCompleteField
            label="Facilitator/s"
            value={getFacilitators()}
            className="col-12"
          />
          <AutoCompleteField label="Date/Time" value={formatDateTime()} />
          <AutoCompleteField label="Venue" value={data?.venue} />
        </Row>
        <br />
        <Row>
          <p>
            <b className="form-label">INSTRUCTIONS:</b> Please respond to EVERY
            item. In each instance, circle the response that represents your
            true opinion:
          </p>
          <label className="form-label">PROGRAM CONTENT AND METHODOLOGY</label>
          <ul className="ps-5">
            <li>
              <small>
                <b>SA (5) </b>You <b>strongly agree</b> with the statement.
              </small>
            </li>
            <li>
              <small>
                <b>A (4) </b>You <b>generally agree</b> with the statement but,
                have some reservations
              </small>
            </li>
            <li>
              <small>
                <b>U (3) </b>You are <b>undecided</b>.
              </small>
            </li>
            <li>
              <small>
                <b>D (2) </b>You <b>generally disagree</b> with the statement.
              </small>
            </li>
            <li>
              <small>
                <b>SD (1) </b>You <b>strongly disagree</b> with the statement.
              </small>
            </li>
          </ul>
          <hr />
          <RateFieldItem
            sequenceNo={1}
            label="The objectives of the training were met."
          />
          <RateFieldItem
            sequenceNo={2}
            label="The module was relevant to my present work or future professional career."
          />
          <RateFieldItem
            sequenceNo={3}
            label="The course content was highly related to the stated course learning objectives."
          />
          <RateFieldItem
            sequenceNo={4}
            label="The materials & training methods used in the program were clear, understandable and suitable."
          />
          <RateFieldItem
            sequenceNo={5}
            label="Ample time has been given for the module"
          />
          <hr />
        </Row>
        <Form.Group>
          <b>6. Which topics covered were most useful?</b>
          <textarea
            className="form-control"
            name=""
            id=""
            placeholder="start writing here..."
            rows={4}
          ></textarea>
        </Form.Group>
        <Form.Group className="mt-2">
          <b>7. What activity or topic do you wish to add/ include and why?</b>
          <textarea
            className="form-control"
            name=""
            id=""
            placeholder="start writing here..."
            rows={4}
          ></textarea>
        </Form.Group>
        <label className="form-label mt-3">PROGRAM LOGISTICS</label>
        <RatioRateField label="Handouts & other training materials" />
        <RatioRateField label="Audio-visual presentation/multi-media resources" />
        <RatioRateField label="Facilities (lay-out, temperature, etc.)" />
        <RatioRateField label="Equipment & supplies" />
        <hr />
        <label className="form-label m-0">FACILITATOR/S: </label>
        <TabView className="custom-tab">
            {data?.trainingFacilitators.map(faci=>{
                return(
                <TabPanel header={faci?.fullname} className="active" key={faci?.id}>
                  <div>
                    <RatioRateField label="Clarity of Presentation (delivery, platform skills, etc.)" />
                    <RatioRateField label="Mastery of subject matter" />
                    <RatioRateField label="Managing discussions" />
                    <RatioRateField label="Motivates learning" />
                    <RatioRateField label="Motivates learning" />
                    <RatioRateField label="Balanced theory w/ real life applications/examples" />
                    <RatioRateField label="Clear & well organized lectures/activities (time management) 5" />
                  </div>
                </TabPanel>)
            })}
        </TabView>
        <hr />
        <div className="d-flex align-items-center justify-content-between mb-1">
            <p className="m-0 fw-bold">Overall Rating of the program:</p>
            <Rating cancel={false} />
        </div>
        <hr />
        <Form.Group className="mt-2">
          <b>Comments on the module & other suggestions for Improvement:</b>
          <textarea
            className="form-control"
            name=""
            id=""
            placeholder="start writing here..."
            rows={4}
          ></textarea>
        </Form.Group>
      </Form>
      <footer className="text-center mt-3 text-muted">Thank you for your time</footer>
    </Card.Body>
  );
};

EvaluationForm.propTypes = {
    data: proptype.object,
    userData: proptype.object,
};
export default EvaluationForm;
