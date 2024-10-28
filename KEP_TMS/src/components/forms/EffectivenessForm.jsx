import { Card, Col, Form, Row, Table } from "react-bootstrap";
import AutoCompleteField from "./common/AutoCompleteField";
import proptype from "prop-types";
import { formatDateOnly, formatDateTime } from "../../utils/datetime/Formatting";
import { useCallback, useEffect, useState } from "react";
import { Rating } from "primereact/rating";
import { actionFailed, actionSuccessful, confirmAction } from "../../services/sweetalert";
import { Button } from "primereact/button";
import handleResponseAsync from "../../services/handleResponseAsync";
import effectivenessService from "../../services/effectivenessService";
import ErrorTemplate from "../General/ErrorTemplate";
import effectivenessConstant from "../../services/constants/effectivenessConstant";
import { SessionGetEmployeeId } from "../../services/sessions";
import StatusColor from "../General/StatusColor";
import getStatusById from "../../utils/status/getStatusById";
import ActivityLog from "../General/ActivityLog";
import activityLogHook from "../../hooks/activityLogHook";
import validateTrainingEffectiveness from "../../services/inputValidation/validateTrainingEffectiveness";
import "../../assets/css/effectivenessForm.css"
const EffectivenessForm = ({ data, userData, formData , onFinish, currentRouting, auditTrail}) => {
  const [isAfter, setIsAfter] = useState(false);
  const [errors, setErrors] = useState({});
  const [annotation, setAnnotation] = useState("");
  const [performanceCharacteristics, setPerformanceCharacteristics] = useState(
    [effectivenessConstant.performanceCharacteristics]
  );
  const [projectPerformanceEvaluation, setProjectPerformanceEvaluation] =
    useState([effectivenessConstant.projectPerformanceEvaluation]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  useEffect(() => {
    if (formData) {
      const effectivenessData = formData;
      setAnnotation(effectivenessData?.annotation);
      setPerformanceCharacteristics(
        effectivenessData?.performanceCharacteristics ??
          [effectivenessConstant.performanceCharacteristics]
      );
      setProjectPerformanceEvaluation(
        effectivenessData?.projectPerformanceEvaluation ??
        [effectivenessConstant.projectPerformanceEvaluation]
      );
      setIsSubmitted(true);
    }
  }, [formData]);
  const getFacilitators = () => {
    let facilitators = "";
    data?.trainingFacilitators?.map((x) => {
      facilitators += `${x.fullname}  `;
    });
    return facilitators;
  };
  const getFormData = {
    employeeBadge: SessionGetEmployeeId(),
    trainingProgramId: data?.trainingProgram?.id,
    trainingTypeId: data?.trainingType?.id,
    totalTrainingHours: data?.durationInHours,
    evaluationDate: formatDateOnly(new Date(), "dash"),
    trainingRequestId: data.id,
    annotation: annotation,
    EvaluatorBadge: userData?.superiorBadge,
    performanceCharacteristics: performanceCharacteristics,
    projectPerformanceEvaluation: projectPerformanceEvaluation,
    createdBy: SessionGetEmployeeId(),
  };
  const handlePerfCharacterOnChange = (e, index) => {
    const { name, value } = e.target;
    const updatedCharacteristics = [...performanceCharacteristics];
    updatedCharacteristics[index] = {
      ...updatedCharacteristics[index],
      [name]: value,
    };
    setPerformanceCharacteristics(updatedCharacteristics);
  };

  const handlePerfEvaluationOnChange = (e, index) => {
    const { name, value } = e.target;
    const updatedEvaluation = [...projectPerformanceEvaluation];
    updatedEvaluation[index] = {
      ...updatedEvaluation[index],
      [name]: value,
    };
    setProjectPerformanceEvaluation(updatedEvaluation);
  };
  const getAfterTrainingDate = useCallback(() => {
    var date = new Date(data?.trainingEndDate);
    return formatDateOnly(date.setMonth(date.getMonth() + 6));
  },[data?.trainingEndDate]);

  const handleSubmit = () => {
    const {formErrors,isValid} = validateTrainingEffectiveness(getFormData, performanceCharacteristics, projectPerformanceEvaluation, isAfter);
    setErrors(formErrors);
    if (isValid) {
      confirmAction({
        title: "Confirm Submission",
        message: "Are you sure you want to submit this form?",
        confirmButtonText: "Submit",
        cancelButtonText: "Cancel",
        onConfirm: () =>
          handleResponseAsync(
            () => effectivenessService.createTrainingEffectiveness(getFormData),
            (e) => {
              actionSuccessful("Success!", e?.message);
              onFinish();
            },
            (e) => actionFailed("Error!", e.message),
          ),
      });
    }
  };
  useEffect(()=>{
    setIsAfter(getAfterTrainingDate() >= formatDateOnly(new Date(), "dash"));
  },[getAfterTrainingDate])
const logs = activityLogHook.useReportsActivityLog(formData, userData);
  return (
    <>
      <Card.Body>
        {isSubmitted && (
          <div className=" flex justify-content-between  mb-2">
            <div>
              Submitted:{" "}
              {formatDateTime(auditTrail?.createdDate)}
            </div>
            <div>
              Status: &nbsp;
              {StatusColor({
                status: getStatusById(currentRouting?.statusId),
                class: "p-1",
                showStatus: true,
              })}
              <b> - {currentRouting?.assignedDetail?.fullname}</b>
            </div>
          </div>
        )}
        <div className="text-center  pb-3 mb-3 ">
          <h5 className="m-0">TRAINING EFFECTIVENESS MONITORING FORM</h5>
          <small className="text-muted">Knowles Electronics Philippines</small>
        </div>
        <Form>
          <Row>
            <AutoCompleteField
              label="Name of Employee"
              value={userData?.fullname}
              className="col-6"
            />
            <AutoCompleteField
              label="Badge No"
              value={userData?.employeeBadge}
            />
            <AutoCompleteField
              label="Position"
              value={userData?.position}
              className="col-6"
            />
            <AutoCompleteField
              label="Department"
              value={userData?.departmentName}
            />
            <AutoCompleteField
              label="Training / Program"
              value={data?.trainingProgram?.name}
              className="col-12"
            />
            <AutoCompleteField
              label="Facilitator/s"
              value={getFacilitators()}
              className="col-12"
            />
            <AutoCompleteField
              label="Training Date/s"
              value={`${formatDateOnly(
                data?.trainingStartDate
              )} - ${formatDateOnly(data?.trainingEndDate)}`}
              className="col-6"
            />
            <AutoCompleteField
              label="Total Training Hours"
              value={data?.durationInHours?.toString()}
            />
            <AutoCompleteField
              label="Training Category"
              value={data?.trainingCategory?.name}
              className="col-12"
            />
          </Row>
          <br />
          <small>
            <b>
              Part I and II to be filled out by the trainee with the concurrence
              of the immediate manager BEFORE the training
            </b>
          </small>
          <br />
          <label>
            <b>Rating Scale:</b>{" "}
          </label>
          <Form.Group>
            <b>
              I. What are the specific performance characteristics that you
              would like to develop by attending this training?
            </b>
            <Table className="table-bordered m-0">
              <thead>
                <tr>
                  <th
                    colSpan={2}
                    className="theme-bg-light text-muted text-center"
                  >
                    Performance Characteristics
                  </th>
                  <th className="theme-bg-light text-muted text-center">
                    Self-assessment/ Rating
                  </th>
                  {/* <th></th> */}
                </tr>
              </thead>
              <tbody>
                {performanceCharacteristics?.map((_, index) => (<>
                  <tr key={`character${index}`} className="position-relative performanceTable">
                    <th scope="row" className="text-center">{index + 1}</th>
                    <td>
                      <textarea
                        className="no-focus w-100 border-0"
                        name="content"
                        value={performanceCharacteristics[index]?.content ?? ""}
                        onChange={(e) => handlePerfCharacterOnChange(e, index)}
                        readOnly={isSubmitted}
                      ></textarea>
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <Rating
                        className="justify-content-center"
                        value={performanceCharacteristics[index]?.rating}
                        name="rating"
                        onChange={(e) => handlePerfCharacterOnChange(e, index)}
                        cancel={false}
                        readOnly={isSubmitted}
                      />
                    </td>
                  {performanceCharacteristics?.length > 1 && !isSubmitted &&
                    <Button type="button" style={{display: "none"}} icon="pi pi-trash" text 
                    className="perf-button position-absolute end-0 top-50 translate-middle-y me-3 text-danger " severity="danger"
                    onClick={()=>setPerformanceCharacteristics((prev) => [...prev].filter((_, i) => i!== index))}
                    />}
                  </tr>
                   
                   </>
                ))}
              </tbody>
            </Table>
            <div className="flex">
            {errors?.performanceCharacteristics && (
              <ErrorTemplate message={errors?.performanceCharacteristics} />
            )}
            {performanceCharacteristics?.length < 3 && !isSubmitted &&
            <Button type="button" text icon="pi pi-plus" label="Add row" className="ms-auto"
             onClick={()=>setPerformanceCharacteristics([...performanceCharacteristics, effectivenessConstant.performanceCharacteristics])} />
            }</div>
          </Form.Group>
          <br />
          <Form.Group>
            <b>
              II. List the Projects/Task/Assignment the trainee is currently
              undertaking or will be undertaking where the Knowledge and skills
              developed from training will be applied.
            </b>
            <Row>
              <Col className={`d-flex gap-2 align-items-end`}>
                <label className="fw-bold" style={{ fontSize: "0.8rem" }}>
                  Target Date of Evaluation{" "}
                  <i> (specify date - 6 months after the training):</i>
                </label>
                <span className="flex-grow-1 border-0 border-bottom">
                  {getAfterTrainingDate().toString()}
                </span>
              </Col>
              <Col className={`d-flex gap-2 align-items-end`}>
                <label className="fw-bold" style={{ fontSize: "0.8rem" }}>
                  Evaluator:
                </label>
                <span className="flex-grow-1 border-0 border-bottom">{userData?.superiorName} - {userData?.superiorBadge}</span>
              </Col>
            </Row>
            <Table className="mt-2 table-bordered m-0">
              <thead>
                <tr>
                  <th
                    colSpan={2}
                    className="theme-bg-light text-muted text-center"
                    style={{ minWidth: "20rem" }}
                  >
                    Project / Task / Assignment
                  </th>
                  <td className="theme-bg-light text-muted text-center">
                    <b> Performance Before Training </b> &#x28;to be filled up
                    before the training&#x29;
                  </td>
                  <td className="theme-bg-light text-muted text-center">
                    <b> Projected Performance </b> &#x28;to be filled up before
                    the training&#x29;
                  </td>
                  <td className="theme-bg-light text-muted text-center">
                    <b> Actual Performance </b> &#x28;to be filled up after the
                    training&#x29;
                  </td>
                  <td className="theme-bg-light text-muted text-center">
                    <b>
                      {" "}
                      Actual Performance evaluated by the immediate manager &
                      date
                    </b>
                  </td>
                </tr>
              </thead>
              <tbody>
                {projectPerformanceEvaluation?.map((_,index) => (
                  <tr key={`evaluation${index}`} className="position-relative performanceTable">
                    <th scope="row">{index + 1}</th>
                    <td>
                      <textarea
                        className="no-focus w-100 border-0"
                        name="content"
                        value={
                          projectPerformanceEvaluation[index]?.content ?? ""
                        }
                        onChange={(e) => handlePerfEvaluationOnChange(e, index)}
                        readOnly={isSubmitted}
                      ></textarea>
                    </td>
                    <td className="text-center" style={{ verticalAlign: "middle" }}>
                      <Rating
                        className="justify-content-center"
                        value={
                          projectPerformanceEvaluation[index]
                            ?.performanceBeforeTraining
                        }
                        name="performanceBeforeTraining"
                        onChange={(e) => handlePerfEvaluationOnChange(e, index)}
                        cancel={false}
                        readOnly={isSubmitted}
                      />
                      <small className="mt-1 d-block">{isSubmitted ? formatDateTime(auditTrail?.createdDate): projectPerformanceEvaluation[index]
                            ?.performanceBeforeTraining !== 0 && formatDateTime(new Date())}</small>
                    </td>
                    <td className="text-center" style={{ verticalAlign: "middle" }}>
                      <Rating
                        className="justify-content-center"
                        value={
                          projectPerformanceEvaluation[index]
                            ?.projectedPerformance
                        }
                        name="projectedPerformance"
                        onChange={(e) => handlePerfEvaluationOnChange(e, index)}
                        cancel={false}
                        readOnly={isSubmitted}
                      />
                      <small className="mt-1 d-block">{isSubmitted ? formatDateTime(auditTrail?.createdDate): projectPerformanceEvaluation[index]?.projectedPerformance !== 0 && formatDateTime(new Date())}</small>
                    </td>
                    <td className="text-center" style={{ verticalAlign: "middle" }}>
                      <Rating
                        className="justify-content-center"
                        value={
                          projectPerformanceEvaluation[index]?.actualPerformance
                        }
                        name="actualPerformance"
                        onChange={(e) => handlePerfEvaluationOnChange(e, index)}
                        cancel={false}
                        disabled={!isAfter}
                      />
                      <small className="mt-1 d-block">{isSubmitted ?  "": projectPerformanceEvaluation[index]?.actualPerformance !== 0 && formatDateTime(new Date())}</small>
                   
                    </td>
                    <td className="text-center" style={{ verticalAlign: "middle" }}>
                      <Rating
                        className="justify-content-center"
                        value={
                          projectPerformanceEvaluation[index]
                            ?.evaluatedActualPerformance
                        }
                        name="evaluatedActualPerformance"
                        onChange={(e) => handlePerfEvaluationOnChange(e, index)}
                        cancel={false}
                        disabled={!isAfter}
                      />
                      <small className="mt-1 d-block">{isSubmitted ? "": projectPerformanceEvaluation[index]?.evaluatedActualPerformance !== 0 && formatDateTime(new Date())}</small>
                   
                    </td>    
                    {projectPerformanceEvaluation?.length > 1  && !isSubmitted &&
                    <Button type="button" style={{display: "none"}} icon="pi pi-trash" text 
                    className="perf-button position-absolute end-0 top-50 translate-middle-y me-3 text-danger " severity="danger"
                    onClick={()=>setProjectPerformanceEvaluation((prev) => [...prev].filter((_, i) => i!== index))}
                    />}
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="flex">
            {errors?.projectPerformanceEvaluation && (
              <ErrorTemplate message={errors?.projectPerformanceEvaluation} />
            )}
            {projectPerformanceEvaluation?.length < 3 && !isSubmitted &&
            <Button type="button" text icon="pi pi-plus" label="Add row" className="ms-auto"
             onClick={()=>setProjectPerformanceEvaluation([...projectPerformanceEvaluation, effectivenessConstant.projectPerformanceEvaluation])} />}
             </div>
        
           
          </Form.Group>
          <br />
          <Form.Group>
            <b>III. Comments / Remarks</b>
            <i> &#x28;to be filled up after the training&#x29; :</i>
            <textarea
              className="form-control"
              rows={3}
              placeholder="Comments/Remarks"
              disabled={!isAfter}
            ></textarea>
          </Form.Group>
          {isSubmitted &&
          <>
          <br />
          <ActivityLog label="Activity Logs" items={logs} isDescending/></>}
          {data?.trainingParticipants?.some(
            (x) => x.employeeBadge === SessionGetEmployeeId()
          ) &&
            !isSubmitted && (
              <div className="text-end mt-3">
                <Button
                  type="button"
                  icon="pi pi-eraser"
                  label="Reset"
                  className="rounded"
                  severity="secondary"
                  onClick={() => {
                    setPerformanceCharacteristics(
                      [effectivenessConstant.performanceCharacteristics]
                    );
                    setProjectPerformanceEvaluation(
                      [effectivenessConstant.projectPerformanceEvaluation]
                    );
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
              </div>
            )}
        </Form>
      </Card.Body>
    </>
  );
};
EffectivenessForm.propTypes = {
  data: proptype.object,
  userData: proptype.object,
  formData: proptype.object,
  onFinish: proptype.func,
  currentRouting: proptype.object,
  auditTrail: proptype.object,

};
export default EffectivenessForm;
