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
import {
  performanceCharacteristicsArray,
  projectPerformanceEvaluationArray,
} from "../../services/constants/effectivenessConstant";
import { SessionGetEmployeeId } from "../../services/sessions";
import StatusColor from "../General/StatusColor";
import getStatusById from "../../utils/status/getStatusById";
const EffectivenessForm = ({ data, userData, formData , onFinish, currentRouting, auditTrail}) => {
  const [isAfter, setIsAfter] = useState(false);
  const [errors, setErrors] = useState({});
  const [annotation, setAnnotation] = useState("");
  const [performanceCharacteristics, setPerformanceCharacteristics] = useState(
    performanceCharacteristicsArray
  );
  const [projectPerformanceEvaluation, setProjectPerformanceEvaluation] =
    useState(projectPerformanceEvaluationArray);
  const [isSubmitted, setIsSubmitted] = useState(false);
  useEffect(() => {
    if (formData) {
      const effectivenessData = formData;
      setAnnotation(effectivenessData?.annotation);
      setPerformanceCharacteristics(
        effectivenessData?.performanceCharacteristics ??
          performanceCharacteristicsArray
      );
      setProjectPerformanceEvaluation(
        effectivenessData?.projectPerformanceEvaluation ??
          projectPerformanceEvaluationArray
      );
      setIsSubmitted(true);
    }
  }, [formData]);
  const numItems = [0, 1, 2];
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
    const isValid = validateForm();
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
              setInterval(() => {
                window.location.reload();
              }, 1000);
            },
            (e) => actionFailed("Error!", e.message),
          ),
      });
    }
  };
  const validateForm = () => {
    let formErrors = {};
    let validForm = true;
    let validCharacteristic = true;
    let validEvaluation = true;
    if (!getFormData.evaluationDate) {
      formErrors.evaluationDate = "Evaluation Date is required";
      validForm = false;
    }
    if (!getFormData.annotation && isAfter) {
      formErrors.annotation = "Annotation is required";
      validForm = false;
    }
    if (!getFormData.performanceCharacteristics.length && validCharacteristic) {
      formErrors.performanceCharacteristics =
        "At least three performance characteristic is required";
      validCharacteristic = false;
    } else {
      numItems.forEach((i) => {
        // console.log(performanceCharacteristics.rating[i] )
        if (!performanceCharacteristics[i]?.content && validCharacteristic) {
          formErrors.performanceCharacteristics = `Performance characteristic ${
            i + 1
          } is required`;
          validCharacteristic = false;
        }
        if (
          performanceCharacteristics[i]?.rating === 0 &&
          validCharacteristic
        ) {
          formErrors.performanceCharacteristics = `Rating for Performance characteristic ${
            i + 1
          } is required`;
          validCharacteristic = false;
        }
      });
    }
    if (!getFormData.projectPerformanceEvaluation.length) {
      formErrors.projectPerformanceEvaluation =
        "At least three project performance evaluation is required";
      validForm = false;
    } else {
      numItems.forEach((i) => {
        if (!projectPerformanceEvaluation[i].content) {
          formErrors.projectPerformanceEvaluation = `Project Performance Evaluation ${
            i + 1
          } content is required`;
          validForm = false;
        }
        if (projectPerformanceEvaluation[i].performanceBeforeTraining === 0) {
          formErrors.projectPerformanceEvaluation = `Performance before training for Project Performance Evaluation ${
            i + 1
          } is required`;
          validForm = false;
        }
        if (projectPerformanceEvaluation[i].projectedPerformance === 0) {
          formErrors.projectPerformanceEvaluation = `Projected performance for Project Performance Evaluation ${
            i + 1
          } is required`;
          validForm = false;
        }
        if (isAfter) {
          if (projectPerformanceEvaluation[i].actualPerformance === 0) {
            formErrors.projectPerformanceEvaluation = `Actual performance for Project Performance Evaluation ${
              i + 1
            } is required`;
            validForm = false;
          }
          if (
            projectPerformanceEvaluation[i].evaluatedActualPerformance === 0
          ) {
            formErrors.projectPerformanceEvaluation = `Evaluated actual performance for Project Performance Evaluation ${
              i + 1
            } is required`;
            validForm = false;
          }
        }
      });
    }
    if (!validForm || !validEvaluation) {
      validForm = false;
    }
    setErrors(formErrors);
    return validForm;
  };
  useEffect(()=>{
    setIsAfter(getAfterTrainingDate() >= formatDateOnly(new Date(), "dash"));
  },[getAfterTrainingDate])
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
                </tr>
              </thead>
              <tbody>
                {numItems.map((item) => (
                  <tr key={`character${item}`}>
                    <th scope="row">{item + 1}</th>
                    <td>
                      <textarea
                        className="no-focus w-100 border-0"
                        name="content"
                        value={performanceCharacteristics[item]?.content ?? ""}
                        onChange={(e) => handlePerfCharacterOnChange(e, item)}
                        readOnly={isSubmitted ? true : false}
                      ></textarea>
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <Rating
                        className="justify-content-center"
                        value={performanceCharacteristics[item]?.rating}
                        name="rating"
                        onChange={(e) => handlePerfCharacterOnChange(e, item)}
                        cancel={false}
                        readOnly={isSubmitted ? true : false}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {errors?.performanceCharacteristics && (
              <ErrorTemplate message={errors?.performanceCharacteristics} />
            )}
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
                {numItems.map((item) => (
                  <tr key={`evaluation${item}`}>
                    <th scope="row">{item + 1}</th>
                    <td>
                      <textarea
                        className="no-focus w-100 border-0"
                        name="content"
                        value={
                          projectPerformanceEvaluation[item]?.content ?? ""
                        }
                        onChange={(e) => handlePerfEvaluationOnChange(e, item)}
                        readOnly={isSubmitted ? true : false}
                      ></textarea>
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <Rating
                        className="justify-content-center"
                        value={
                          projectPerformanceEvaluation[item]
                            ?.performanceBeforeTraining
                        }
                        name="performanceBeforeTraining"
                        onChange={(e) => handlePerfEvaluationOnChange(e, item)}
                        cancel={false}
                        readOnly={isSubmitted ? true : false}
                      />
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <Rating
                        className="justify-content-center"
                        value={
                          projectPerformanceEvaluation[item]
                            ?.projectedPerformance
                        }
                        name="projectedPerformance"
                        onChange={(e) => handlePerfEvaluationOnChange(e, item)}
                        cancel={false}
                        readOnly={isSubmitted ? true : false}
                      />
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <Rating
                        className="justify-content-center"
                        value={
                          projectPerformanceEvaluation[item]?.actualPerformance
                        }
                        name="actualPerformance"
                        onChange={(e) => handlePerfEvaluationOnChange(e, item)}
                        cancel={false}
                        disabled={!isAfter}
                      />
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <Rating
                        className="justify-content-center"
                        value={
                          projectPerformanceEvaluation[item]
                            ?.evaluatedActualPerformance
                        }
                        name="evaluatedActualPerformance"
                        onChange={(e) => handlePerfEvaluationOnChange(e, item)}
                        cancel={false}
                        disabled={!isAfter}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {errors?.projectPerformanceEvaluation && (
              <ErrorTemplate message={errors?.projectPerformanceEvaluation} />
            )}
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
                      performanceCharacteristicsArray
                    );
                    setProjectPerformanceEvaluation(
                      projectPerformanceEvaluationArray
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
