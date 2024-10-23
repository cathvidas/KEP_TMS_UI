import { Card, Form, Row } from "react-bootstrap";
import AutoCompleteField from "./common/AutoCompleteField";
import RateFieldItem from "./common/RateFieldItem";
import { TabPanel, TabView } from "primereact/tabview";
import proptype from "prop-types"
import { Rating } from "primereact/rating";
import { useEffect, useState } from "react";
import { SessionGetEmployeeId } from "../../services/sessions";
import evaluationConstant from "../../services/constants/evaluationConstant";
import { actionFailed, actionSuccessful, confirmAction } from "../../services/sweetalert";
import handleResponseAsync from "../../services/handleResponseAsync";
import evaluationService from "../../services/evaluationService";
import { Button } from "primereact/button";
import ErrorTemplate from "../General/ErrorTemplate";
import { formatDateTime } from "../../utils/datetime/Formatting";
import ActivityLog from "../General/ActivityLog";
const EvaluationForm = ({ data, userData,onFinish, defaultValue }) => {
  const [annotation, setAnnotation] = useState(evaluationConstant.annotation);
  const [contentMethodology, setContentMethodology] = useState(evaluationConstant.contentMethodology);
  const [programLogisticsRating, setProgramLogisticsRating] = useState(evaluationConstant.programLogisticsRating);
  const [facilitatorRating, setFacilitatorRating] = useState(evaluationConstant.facilitatorRating);
  const [overallRating, setOverallRating] = useState(evaluationConstant.overallRating);
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false);
  const getFacilitators = () => {
    let facilitators = "";
    data?.trainingFacilitators?.map((x) => {
      facilitators += `${x.fullname}  `;
    });
    return facilitators;
  };
  const getFormData = {
    id: 0,
    trainingRequestId: data.id,
    traineeBadge: SessionGetEmployeeId(),
    contentMethodology: contentMethodology,
    programLogisticsRating: programLogisticsRating,
    overallRating: overallRating,
    annotation: annotation,
    facilitatorRating: facilitatorRating,
    createdBy: SessionGetEmployeeId()
  }
  const handleOnChange = (value, name, field, setField) => {
    setField({ ...field, [name]: value });
  }
  const handlefacilitatorRating = (value, name, index) => {
    const updatedfacilitatorRating = [...facilitatorRating]; // Create a copy of the array
    updatedfacilitatorRating[index] = {
      ...updatedfacilitatorRating[index],
      [name]: value,
    }; // Update the content of the first element
    setFacilitatorRating(updatedfacilitatorRating);
  };
  const handleSubmit = () => {
    const isValid = validateForm();
    if (isValid) {
      confirmAction({
        onConfirm: () => {
          handleResponseAsync(
            () => evaluationService.createTrainingEvaluation(getFormData),
            (e) => {actionSuccessful("Success", e.message);
              window.location.reload();
            },
            (e) => actionFailed("Error", e.message),
            ()=>onFinish()
          )
        }
      })
    }
  }
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;
    if (contentMethodology.cmOne === 0 || contentMethodology.cmTwo === 0 || contentMethodology.cmThree === 0 || contentMethodology.cmFour === 0 || contentMethodology.cmFive === 0) {
      formErrors.contentMethodology = "Please rate all the fields"
      isValid = false;
    }
    if(!contentMethodology.cmSix){
      formErrors.cmSix = "This is a required field"
      isValid = false;
    }
    if(!contentMethodology.cmSeven){
      formErrors.cmSeven = "This is a required field"
      isValid = false;
    }
    if (programLogisticsRating.plrOne === 0 || programLogisticsRating.plrTwo === 0 || programLogisticsRating.plrThree === 0 || programLogisticsRating.plrFour === 0 ) {
      formErrors.programLogisticsRating = "Please rate all the fields"
      isValid = false;
    }
    
    let faciList = []
    data?.trainingFacilitators.map((faci, index)=>{
      if (facilitatorRating[index]?.frOne === 0) {
        faciList.push(faci.fullname)
      }
    })
    if(faciList.length !== 0){
      let errorMessage =" Please rate all the fields under faclitator(s): "
      faciList.forEach(element => {
        errorMessage += element + ", ";
      });
      formErrors.facilitatorRating = errorMessage;
      isValid = false;
    }
    if(overallRating === 0){
      formErrors.overallRating = "Please rate this field";
      isValid =  false;
    }
    if(!annotation){
      formErrors.annotation = "This field is required";
      isValid =  false;
    }
    setErrors(formErrors)
    return isValid;
  }
  useEffect(()=>{
    if(defaultValue){
      setContentMethodology(defaultValue?.contentMethodology);
      setProgramLogisticsRating(defaultValue?.programLogisticsRating);
      setAnnotation(defaultValue?.annotation);
      setOverallRating(defaultValue?.overallRating);
      setFacilitatorRating(defaultValue?.facilitatorsRating)
      setIsSubmitted(true)
    }
  },
[defaultValue])
console.log(defaultValue)
let newLogs = [];
newLogs.push({
  label: `Created by ${userData?.fullname ?? defaultValue?.auditTrail?.createdBy}`,
  date: formatDateTime(defaultValue?.createdDate),
});
  return (
    <Card.Body>
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
          <AutoCompleteField label="Date/Time" value={formatDateTime(defaultValue?.createdDate)} />
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
          {errors.contentMethodology && <ErrorTemplate message={errors.contentMethodology}/>}
          <RateFieldItem
            sequenceNo={1}
            label="The objectives of the training were met."
            value={contentMethodology?.cmOne}
            onChange={(e) => handleOnChange(e, "cmOne", contentMethodology, setContentMethodology)}
            readOnly={isSubmitted}
          />
          <RateFieldItem
            sequenceNo={2}
            label="The module was relevant to my present work or future professional career."
            value={contentMethodology?.cmTwo}
            onChange={(e) => handleOnChange(e, "cmTwo", contentMethodology, setContentMethodology)}
            readOnly={isSubmitted}
          />
          <RateFieldItem
            sequenceNo={3}
            label="The course content was highly related to the stated course learning objectives."
            value={contentMethodology?.cmThree}
            onChange={(e) => handleOnChange(e, "cmThree", contentMethodology, setContentMethodology)}
            readOnly={isSubmitted}
          />
          <RateFieldItem
            sequenceNo={4}
            label="The materials & training methods used in the program were clear, understandable and suitable."
            value={contentMethodology?.cmFour}
            onChange={(e) => handleOnChange(e, "cmFour", contentMethodology, setContentMethodology)}
            readOnly={isSubmitted}
          />
          <RateFieldItem
            sequenceNo={5}
            label="Ample time has been given for the module"
            value={contentMethodology?.cmFive}
            onChange={(e) => handleOnChange(e, "cmFive", contentMethodology, setContentMethodology)}
            readOnly={isSubmitted}
          />
          <hr />
        </Row>
        <Form.Group>
          <b>6. Which topics covered were most useful?<span className="form-label required"></span></b>
          <textarea
            className="form-control"
            name=""
            id=""
            placeholder="start writing here..."
            rows={4}
            value={contentMethodology?.cmSix ?? ""}
            readOnly={isSubmitted}
            onChange={(e) => handleOnChange(e.target.value, "cmSix", contentMethodology, setContentMethodology)}
          ></textarea>
          {errors.cmSix && <ErrorTemplate message={errors.cmSix}/>}
        </Form.Group>
        <Form.Group className="mt-2">
          <b>7. What activity or topic do you wish to add/ include and why?<span className="form-label required"></span></b>
          <textarea
            className="form-control"
            name=""
            id=""
            placeholder="start writing here..."
            rows={4}
            readOnly={isSubmitted}
            value={contentMethodology?.cmSeven ?? ""}
            onChange={(e) => handleOnChange(e.target.value, "cmSeven", contentMethodology, setContentMethodology)}
          ></textarea>
          {errors.cmSeven && <ErrorTemplate message={errors.cmSeven}/>}
        </Form.Group>
        <label className="form-label mt-3">PROGRAM LOGISTICS</label>
        {errors.programLogisticsRating && <ErrorTemplate message={errors.programLogisticsRating}/>}
        <RateFieldItem label="Handouts & other training materials"
          value={programLogisticsRating?.plrOne}
          readOnly={isSubmitted}
          onChange={(e) => handleOnChange(e, "plrOne", programLogisticsRating, setProgramLogisticsRating)} />
        <RateFieldItem label="Audio-visual presentation/multi-media resources"
          value={programLogisticsRating?.plrTwo}
          readOnly={isSubmitted}
          onChange={(e) => handleOnChange(e, "plrTwo", programLogisticsRating, setProgramLogisticsRating)} />
        <RateFieldItem label="Facilities (lay-out, temperature, etc.)"
          value={programLogisticsRating?.plrThree}
          readOnly={isSubmitted}
          onChange={(e) => handleOnChange(e, "plrThree", programLogisticsRating, setProgramLogisticsRating)} />
        <RateFieldItem label="Equipment & supplies"
          value={programLogisticsRating?.plrFour}
          readOnly={isSubmitted}
          onChange={(e) => handleOnChange(e, "plrFour", programLogisticsRating, setProgramLogisticsRating)} />
        <hr />
        <label className="form-label m-0">FACILITATOR/S: </label>
     

        {errors.facilitatorRating && <ErrorTemplate message={errors.facilitatorRating}/>}
        <TabView className="custom-tab">
          {data?.trainingFacilitators.map((faci, index) => {
            return (
              <TabPanel header={faci?.fullname} className="active" key={faci?.id}>
                <div>
                  <RateFieldItem label="Clarity of Presentation (delivery, platform skills, etc.)"
                    value={facilitatorRating[index]?.frOne}
                    readOnly={isSubmitted}
                    onChange={(e) => handlefacilitatorRating(e, "frOne", index)} />
                  <RateFieldItem label="Mastery of subject matter"
                    value={facilitatorRating[index]?.frTwo}
                    readOnly={isSubmitted}
                    onChange={(e) => handlefacilitatorRating(e, "frTwo", index)} />
                  <RateFieldItem label="Managing discussions"
                    value={facilitatorRating[index]?.frThree}
                    readOnly={isSubmitted}
                    onChange={(e) => handlefacilitatorRating(e, "frThree", index)} />
                  <RateFieldItem label="Motivates learning"
                    value={facilitatorRating[index]?.frFour}
                    readOnly={isSubmitted}
                    onChange={(e) => handlefacilitatorRating(e, "frFour", index)} />
                  <RateFieldItem label="Motivates learning"
                    value={facilitatorRating[index]?.frFive}
                    readOnly={isSubmitted}
                    onChange={(e) => handlefacilitatorRating(e, "frFive", index)} />
                  <RateFieldItem label="Balanced theory w/ real life applications/examples"
                    value={facilitatorRating[index]?.frSix}
                    onChange={(e) => handlefacilitatorRating(e, "frSix", index)} />
                  <RateFieldItem label="Clear & well organized lectures/activities (time management) 5"
                    value={facilitatorRating[index]?.frAverage}
                    readOnly={isSubmitted}
                    onChange={(e) => handlefacilitatorRating(e, "frAverage", index)} />
                </div>
              </TabPanel>)
          })}
        </TabView>
        <hr />
        {errors.overallRating && <ErrorTemplate message={errors.overallRating}/>}
        <div className="d-flex align-items-center justify-content-between mb-1">
          <p className="m-0 fw-bold">Overall Rating of the program:</p>
          <Rating cancel={false}
            value={overallRating}
            readOnly={isSubmitted}
            onChange={(e) => setOverallRating(e.value)}
          />
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
            readOnly={isSubmitted}
            value={annotation}
            onChange={(e) => setAnnotation(e.target.value)}
          ></textarea>
        {errors.annotation && <ErrorTemplate message={errors.annotation}/>}
        </Form.Group>
      </Form>
      <footer className="text-center mt-3 text-muted">Thank you for your time</footer>
      {data?.trainingParticipants?.some(x=>x.employeeBadge === SessionGetEmployeeId()) && !isSubmitted &&
      <div className="text-end mt-3">
        <Button
          type="button"
          icon="pi pi-eraser"
          label="Reset"
          className="rounded"
          severity="secondary"
          onClick={() => {
            setContentMethodology(evaluationConstant.contentMethodology);
            setProgramLogisticsRating(
              evaluationConstant.programLogisticsRating
            );
            setFacilitatorRating(evaluationConstant.facilitatorRating);
            setAnnotation(evaluationConstant.annotation);
            setOverallRating(evaluationConstant.overallRating);
          }}
        />
        <Button
          type="button"
          icon="pi pi-cloud-upload"
          label="Submit Form"
          className="rounded ms-2"
          severity="success"
          onClick={handleSubmit}
        />
      </div>}
      {isSubmitted && 
      <ActivityLog label="Activity Logs" items={newLogs} isDescending/>}
    </Card.Body>
  );
};

EvaluationForm.propTypes = {
  data: proptype.object,
  userData: proptype.object,
  courseId: proptype.string,
  defaultValue: proptype.object,
};
export default EvaluationForm;
