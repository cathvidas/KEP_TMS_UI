import { Card, Col, Form, Row, Table } from "react-bootstrap";
import AutoCompleteField from "./common/AutoCompleteField";
import proptype from "prop-types";
import {
  formatDateOnly,
  formatDateTime,
} from "../../utils/datetime/Formatting";
import { useCallback, useEffect, useState, useRef } from "react";
import { Rating } from "primereact/rating";
import {
  actionFailed,
  actionSuccessful,
  confirmAction,
} from "../../services/sweetalert";
import { Button } from "primereact/button";
import handleResponseAsync from "../../services/handleResponseAsync";
import effectivenessService from "../../services/effectivenessService";
import ErrorTemplate from "../General/ErrorTemplate";
import effectivenessConstant from "../../services/constants/effectivenessConstant";
import { SessionGetEmployeeId, SessionGetRole } from "../../services/sessions";
import getStatusById from "../../utils/status/getStatusById";
import validateTrainingEffectiveness from "../../services/inputValidation/validateTrainingEffectiveness";
import "../../assets/css/effectivenessForm.css";
import { ActivityType, statusCode, UserTypeValue } from "../../api/constants";
import handleGeneratePdf from "../../services/common/handleGeneratePdf";
import ApproverList from "../List/ApproversList";
import ActivityList from "../List/ActivityList";
import getStatusCode from "../../utils/status/getStatusCode";
import mappingHook from "../../hooks/mappingHook";
import ActivityStatus from "../General/ActivityStatus";
import commonHook from "../../hooks/commonHook";
import { checkIfActualPerformanceRated, checkIfEvaluatedActualPerformanceRated } from "../../hooks/activityLogHook";
import trainingDetailsService from "../../services/common/trainingDetailsService";
import userHook from "../../hooks/userHook";
const EffectivenessForm = ({
  data,
  evaluate,
  userData,
  formData,
  onFinish,
  currentRouting,
  auditTrail,
  isAdmin,
}) => {
  const [errors, setErrors] = useState({});
  const [showLogs, setShowLogs] = useState(false);
  const [actualPerfRating, setActualPerfRating] = useState({isRated: false, isRating: false, toBeRated: true});
  const [evaluatedActualPerfRating, setEvaluatedActualPerfRating] = useState({isRated: false, isRating: false, toBeRated: true});
  const [annotation, setAnnotation] = useState("");
  const [performanceCharacteristics, setPerformanceCharacteristics] = useState([
    effectivenessConstant.performanceCharacteristics, 
    effectivenessConstant.performanceCharacteristics,
     effectivenessConstant.performanceCharacteristics,
  ]);
  const [projectPerformanceEvaluation, setProjectPerformanceEvaluation] =
    useState([effectivenessConstant.projectPerformanceEvaluation,
      effectivenessConstant.projectPerformanceEvaluation,
      effectivenessConstant.projectPerformanceEvaluation
    ]);
  const isTrainingEnd = trainingDetailsService.checkIfTrainingEndsAlready(data);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    if (formData) {
      populateData();
      setIsSubmitted(true);
      setShowLogs(true);
    }
  }, [formData]);
  const populateData = ()=>{
    const effectivenessData = formData;
    setAnnotation(effectivenessData?.annotation);
    setPerformanceCharacteristics(
      effectivenessData?.performanceCharacteristics?.map(
        ({ content, id, rating, effectivenessId }) => ({
          content,
          id,
          rating,
          effectivenessId,
        })
      ) ?? [effectivenessConstant.performanceCharacteristics]
    );
    let mappedProjectEval = 
    effectivenessData?.projectPerformanceEvaluation?.map(
      ({
        actualPerformance,
        content,
        effectivenessId,
        evaluatedActualPerformance,
        id,
        performanceBeforeTraining,
        projectedPerformance,
      }) => ({
        actualPerformance,
        content,
        effectivenessId,
        evaluatedActualPerformance,
        id,
        performanceBeforeTraining,
        projectedPerformance,
      })
    ) ?? [effectivenessConstant.projectPerformanceEvaluation]
    if(mappedProjectEval.length < 3){
      while(mappedProjectEval.length < 3){
        mappedProjectEval.push(effectivenessConstant.projectPerformanceEvaluation)
      }
    }
    setProjectPerformanceEvaluation(
      mappedProjectEval
    );
  }
  const getFormData = {
    employeeBadge: SessionGetEmployeeId(),
    trainingProgramId: data?.trainingProgram?.id,
    trainingTypeId: data?.trainingType?.id,
    totalTrainingHours: data?.durationInHours,
    evaluationDate: formatDateOnly(new Date(), "dash"),
    trainingRequestId: data?.id,
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
  }, [data?.trainingEndDate]);
  const mappedTrainingEffectiveness = (data) => {
    const projPerf = data.projectPerformanceEvaluation.filter(item => item?.actualPerformance != null || 
      item?.performanceBeforeTraining != null ||
      item?.projectedPerformance != null ||
      item?.evaluatedActualPerformance != null || item?.content
    )?.map(item => {
      return {
        ...item, performanceBeforeTraining: item?.performanceBeforeTraining ?? 0,
        projectedPerformance: item?.projectedPerformance ?? 0,
      }
    })
    const perfChar = data?.performanceCharacteristics?.filter(item => item?.rating != null || item?.content)?.map(item => {
      return {
        ...item, rating: item?.rating ?? 0,
      }
    })
    return {...data, projectPerformanceEvaluation: projPerf, performanceCharacteristics: perfChar}
  }
  const handleSubmit = (isUpdate) => {
    const { formErrors, isValid } = validateTrainingEffectiveness(
      getFormData,
      performanceCharacteristics,
      projectPerformanceEvaluation,
      isTrainingEnd,
      !actualPerfRating.toBeRated,
    );
    setErrors(formErrors);
    if (isValid) {
      const validatedData =  mappedTrainingEffectiveness(getFormData);
      confirmAction({
        showLoaderOnConfirm: true,
        title: isUpdate ? "Update Form" : "Confirm Submission",
        message: `Are you sure you want to ${
          isUpdate ? "update" : "submit"
        } this form?`,
        confirmButtonText: isUpdate ? "Update" : "Submit",
        cancelButtonText: "Cancel",
        onConfirm: () =>
          handleResponseAsync(
            () =>
              isUpdate
                ? effectivenessService.updateTrainingEffectiveness({
                    ...validatedData,
                    updatedBy: SessionGetEmployeeId(),
                    id: formData.id,
                    statusId:
                      getStatusCode(formData?.statusName) ===
                      statusCode.DISAPPROVED
                        ? statusCode.FORAPPROVAL
                        : getStatusCode(formData?.statusName),
                  })
                : effectivenessService.createTrainingEffectiveness(validatedData),
            (e) => {
              actionSuccessful("Success!", e?.message);
              onFinish();
            },
            (e) => actionFailed("Error!", e.message)
          ),
      });
    }
  };
  const EvaluateEffectiveness = () => {
    const { formErrors, isValid } = validateTrainingEffectiveness(
      getFormData,
      performanceCharacteristics,
      projectPerformanceEvaluation,
      false,
      false,
      evaluate
    );
    setErrors(formErrors);
    if (isValid) {
      confirmAction({
        showLoaderOnConfirm: true,
        title: "Submit Evaluation",
        message: `Are you sure you want to submit this form?`,
        confirmButtonText: "Submit",
        cancelButtonText: "Cancel",
        onConfirm: () =>
          handleResponseAsync(
            () =>
              effectivenessService.updateTrainingEffectiveness({
                ...getFormData,
                updatedBy: SessionGetEmployeeId(),
                id: formData.id,
                statusId: statusCode.CLOSED,
              }),
            (e) => {
              actionSuccessful("Success!", e?.message);
              onFinish();
            },
            (e) => actionFailed("Error!", e.message)
          ),
      });
    }
  };
  useEffect(() => {
    if (
      isTrainingEnd &&
      new Date(data?.trainingEndDate) <=
        new Date(new Date().setMonth(new Date().getMonth() - 6))
    ) {
      setActualPerfRating((prev) => ({
        ...prev,
        isRated: checkIfActualPerformanceRated(formData),
        toBeRated: false,
      }));
    } else {
      setActualPerfRating((prev) => ({
        ...prev,
        isRated: false,
        toBeRated: true,
      }));
    }
    if (SessionGetEmployeeId() === formData?.evaluatorBadge && evaluate) {
      setEvaluatedActualPerfRating((prev) => ({
        ...prev,
        isRating: !checkIfEvaluatedActualPerformanceRated(formData),
        toBeRated: false,
      }));
    } else {
      setEvaluatedActualPerfRating((prev) => ({
        ...prev,
        isRating: false,
        toBeRated: !(
          new Date(data?.trainingEndDate) <=
          new Date(new Date().setMonth(new Date().getMonth() - 6))
        ),
      }));
    }
  }, [data, formData, evaluate]);
  const activityLogs = mappingHook.useMappedActivityLogs(formData, userData);
  const reportTemplateRef = useRef();
  const performanceRatingDate =
    mappingHook.useEffectivenessPerformanceRatingDate(formData, auditTrail);
   const evaluator = userHook.useUserById(formData?.evaluatorBadge)?.data
  return (
    <>
      <Card.Body>
        {isSubmitted && (
          <div className=" flex flex-wrap justify-content-between  mb-2">
            <div className="flex">
              <i className="pi pi-check-circle text-success"></i>
              Submitted: {formatDateTime(formData?.createdDate) ?? "N/A"}
            </div>
            <div>
              Status: &nbsp;
              <ActivityStatus status={currentRouting?.statusId} /> -{" "}
              {currentRouting?.assignedDetail?.fullname}
            </div>
          </div>
        )}

        <Form>
          <div ref={reportTemplateRef} style={{ height: "fit-content" }}>
            <div className="text-center  pb-3 mb-3 ">
              <h5
                className="m-0 w-100 title"
                style={{ fontFamily: "sans-serif" }}
              >
                TRAINING EFFECTIVENESS MONITORING FORM
              </h5>
              <small className="text-muted">
                Knowles Electronics Philippines
              </small>
              {isSubmitted && (
                <p className="hideExport">
                  Effectiveness Report # {formData.id}
                </p>
              )}
            </div>
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
                value={
                  commonHook.useFormattedFacilitatorList(
                    data?.trainingFacilitators
                  )?.data
                }
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
                Part I and II to be filled out by the trainee with the
                concurrence of the immediate manager BEFORE the training
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
              <Table className="table-bordered custom-table m-0">
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
                  {performanceCharacteristics?.map((_, index) => (
                    <>
                      <tr
                        key={`character${index}`}
                        className="position-relative performanceTable"
                      >
                        <th scope="row" className="text-center">
                          {index + 1}
                        </th>
                        <td>
                          <textarea
                            className="no-focus w-100 border-0"
                            name="content"
                            value={
                              performanceCharacteristics[index]?.content ?? ""
                            }
                            onChange={(e) =>
                              handlePerfCharacterOnChange(e, index)
                            }
                            readOnly={isSubmitted && !isUpdate}
                          ></textarea>
                        </td>
                        <td style={{ verticalAlign: "middle" }}>
                          <Rating
                            className="justify-content-center"
                            value={performanceCharacteristics[index]?.rating}
                            name="rating"
                            onChange={(e) =>
                              handlePerfCharacterOnChange(e, index, true)
                            }
                            cancel={
                              performanceCharacteristics[index]?.rating > 0 &&
                              (isUpdate || !isSubmitted)
                            }
                            readOnly={isSubmitted && !isUpdate}
                          />
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </Table>
              <div className="flex hideExport">
                {errors?.performanceCharacteristics && (
                  <ErrorTemplate message={errors?.performanceCharacteristics} />
                )}
              </div>
            </Form.Group>
            <br />
            <Form.Group>
              <b>
                II. List the Projects/Task/Assignment the trainee is currently
                undertaking or will be undertaking where the Knowledge and
                skills developed from training will be applied.
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
                  <span className="flex-grow-1 border-0 border-bottom">
                    {isSubmitted ? evaluator?.fullname : userData?.superiorName ?? "N/A"}
                  </span>
                </Col>
              </Row>
              <Table className="table-bordered custom-table mt-2 m-0">
                <thead>
                  <tr>
                    <th
                      colSpan={2}
                      className="theme-bg-light text-muted text-center"
                      style={{
                        minWidth: "10rem",
                        width: "100%",
                        verticalAlign: "middle",
                      }}
                    >
                      Project / Task / Assignment
                    </th>
                    <td
                      className="theme-bg-light text-muted text-center"
                      style={{ verticalAlign: "middle" }}
                    >
                      <b> Performance Before Training </b> &#x28;to be filled up
                      before the training by the employee&#x29;
                    </td>
                    <td
                      className="theme-bg-light text-muted text-center"
                      style={{ verticalAlign: "middle" }}
                    >
                      <b> Projected Performance </b> &#x28;to be filled up
                      before the training by the employee&#x29;
                    </td>
                    <td
                      className="theme-bg-light text-muted text-center"
                      style={{ verticalAlign: "middle" }}
                    >
                      <b> Actual Performance </b> &#x28;to be filled up 6 months after
                      the training by the employee&#x29;
                    </td>
                    <td
                      className="theme-bg-light text-muted text-center"
                      style={{ verticalAlign: "middle" }}
                    >
                      <b>
                        {" "}
                        Actual Performance evaluated by the immediate manager </b> &#x28;to be filled up by the manager 6 months after
                        the employee&apos;s training&#x29;
                     
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {projectPerformanceEvaluation?.map((_, index) => (
                    <tr
                      key={`evaluation${index}`}
                      className="position-relative performanceTable"
                    >
                      <th scope="row" className="text-center">
                        {index + 1}
                      </th>
                      <td>
                        <textarea
                          className="no-focus w-100 border-0"
                          name="content"
                          value={
                            projectPerformanceEvaluation[index]?.content ?? ""
                          }
                          onChange={(e) =>
                            handlePerfEvaluationOnChange(e, index)
                          }
                          readOnly={isSubmitted && !isUpdate}
                        ></textarea>
                      </td>
                      <td
                        className="text-center"
                        style={{ verticalAlign: "middle" }}
                      >
                        <Rating
                          className="justify-content-center"
                          value={
                            projectPerformanceEvaluation[index]
                              ?.performanceBeforeTraining
                          }
                          name="performanceBeforeTraining"
                          onChange={(e) =>
                            handlePerfEvaluationOnChange(e, index, true)
                          }
                          cancel={
                            projectPerformanceEvaluation[index]
                              ?.performanceBeforeTraining > 0 &&
                            (isUpdate || !isSubmitted)
                          }
                          readOnly={isSubmitted && !isUpdate}
                        />
                        <small className="mt-1 d-block">
                          {projectPerformanceEvaluation[index]?.content ? (
                            isSubmitted ? (
                              formatDateOnly(
                                performanceRatingDate?.creatorAudit
                              )
                            ) : (
                              projectPerformanceEvaluation[index]
                                ?.performanceBeforeTraining > 0 &&
                              formatDateOnly(new Date())
                            )
                          ) : (
                            <></>
                          )}
                        </small>
                      </td>
                      <td
                        className="text-center"
                        style={{ verticalAlign: "middle" }}
                      >
                        <Rating
                          className="justify-content-center"
                          value={
                            projectPerformanceEvaluation[index]
                              ?.projectedPerformance
                          }
                          name="projectedPerformance"
                          onChange={(e) =>
                            handlePerfEvaluationOnChange(e, index, true)
                          }
                          cancel={
                            projectPerformanceEvaluation[index]
                              ?.projectedPerformance > 0 &&
                            (isUpdate || !isSubmitted)
                          }
                          readOnly={isSubmitted && !isUpdate}
                        />
                        <small className="mt-1 d-block">
                          {projectPerformanceEvaluation[index]?.content ? (
                            isSubmitted ? (
                              formatDateOnly(
                                performanceRatingDate?.creatorAudit
                              )
                            ) : (
                              projectPerformanceEvaluation[index]
                                ?.projectedPerformance > 0 &&
                              formatDateOnly(new Date())
                            )
                          ) : (
                            <></>
                          )}
                        </small>
                      </td>
                      <td
                        className="text-center"
                        style={{ verticalAlign: "middle" }}
                      >
                        <Rating
                          className="justify-content-center"
                          value={
                            projectPerformanceEvaluation[index]
                              ?.actualPerformance
                          }
                          name="actualPerformance"
                          onChange={(e) =>
                            handlePerfEvaluationOnChange(e, index, true)
                          }
                          readOnly={
                            !(
                              ((isUpdate || actualPerfRating.isRating) &&
                                projectPerformanceEvaluation[index]?.content) ||
                              !isSubmitted
                            )
                          }
                          cancel={
                            projectPerformanceEvaluation[index]
                              ?.actualPerformance > 0 &&
                            (isUpdate ||
                              !isSubmitted ||
                              actualPerfRating.isRating)
                          }
                          disabled={actualPerfRating.toBeRated}
                        />
                        <small className="mt-1 d-block">
                          {projectPerformanceEvaluation[index]?.content ? (
                            isSubmitted &&
                            performanceRatingDate?.evaluatorAudit ? (
                              formatDateOnly(
                                performanceRatingDate?.evaluatorAudit
                              )
                            ) : (
                              projectPerformanceEvaluation[index]
                                ?.actualPerformance > 0 &&
                              formatDateOnly(new Date())
                            )
                          ) : (
                            <></>
                          )}
                          {(!actualPerfRating.isRated  && !actualPerfRating.toBeRated) &&
                            isSubmitted && formData?.createdBy == SessionGetEmployeeId() &&
                            projectPerformanceEvaluation[index]
                              ?.actualPerformance === null &&
                            projectPerformanceEvaluation[index]?.content && (
                              <span className="text-danger">Please Rate</span>
                            )}
                        </small>
                      </td>
                      <td
                        className="text-center"
                        style={{ verticalAlign: "middle" }}
                      >
                        <Rating
                          className="justify-content-center"
                          value={
                            projectPerformanceEvaluation[index]
                              ?.evaluatedActualPerformance
                          }
                          name="evaluatedActualPerformance"
                          onChange={(e) =>
                            handlePerfEvaluationOnChange(e, index, true)
                          }
                          cancel={
                            projectPerformanceEvaluation[index]
                              ?.evaluatedActualPerformance > 0 && evaluatedActualPerfRating.isRating
                          }
                          readOnly={!evaluatedActualPerfRating.isRating}
                          disabled={evaluatedActualPerfRating.toBeRated}
                        />
                        <small className="mt-1 d-block">
                          {isSubmitted && performanceRatingDate?.evaluatorAudit
                            ? formatDateOnly(
                                performanceRatingDate?.evaluatorAudit
                              )
                            : projectPerformanceEvaluation[index]
                                ?.evaluatedActualPerformance > 0 &&
                              formatDateOnly(new Date())}
                                       
                            {evaluatedActualPerfRating.isRating &&
                            isSubmitted &&
                            !(projectPerformanceEvaluation[index]
                              ?.evaluatedActualPerformance > 1) &&
                            projectPerformanceEvaluation[index]?.content && (
                              <span className="text-danger">Please Rate</span>
                            )}
                        </small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="flex hideExport">
                {errors?.projectPerformanceEvaluation && (
                  <ErrorTemplate
                    message={errors?.projectPerformanceEvaluation}
                  />
                )}
              </div>
            </Form.Group>
            <br />
            <Form.Group>
              <b>III. Comments / Remarks</b>
              <i> &#x28;to be filled up after the training&#x29; :</i>
              <ErrorTemplate message={(!isUpdate && isSubmitted && isTrainingEnd && !formData?.annotation && formData?.createdBy == SessionGetEmployeeId()) ? "Please fill up this field" : ""} />
              <textarea
                className="form-control"
                rows={3}
                value={annotation}
                placeholder="Comments/Remarks"
                disabled={ !(
                 (isTrainingEnd || formData?.annotation)
                )}
                readOnly={
                  !(
                    ((isSubmitted && isUpdate) || !isSubmitted) && isTrainingEnd
                  )
                }
                onChange={(e) => setAnnotation(e.target.value)}
              ></textarea>
              <ErrorTemplate message={errors?.annotation} />
            </Form.Group>
          </div>

          <>
            <div className="flex mt-3">
              {(data?.trainingParticipants?.some(
                (x) => x.employeeBadge === SessionGetEmployeeId()
              ) ||
                isAdmin) &&
                isSubmitted && (
                  <>
                    <Button
                      type="button"
                      label={`${showLogs ? "Hide" : "Show"} Activities`}
                      icon={`${showLogs ? "pi pi-eye-slash" : "pi pi-eye"}`}
                      className="rounded"
                      text
                      onClick={() => setShowLogs(!showLogs)}
                    />
                    <Button
                      type="button"
                      label="Download"
                      icon="pi pi-download"
                      className="rounded me-auto"
                      text
                      severity="help"
                      onClick={() =>
                        handleGeneratePdf(reportTemplateRef.current)
                      }
                    />
                  </>
                )}

              {data?.trainingParticipants?.some(
                (x) => x.employeeBadge === SessionGetEmployeeId()
              ) && (
                <>
                  {(formData?.statusName ==
                    getStatusById(statusCode.DISAPPROVED) ||(!actualPerfRating.isRated && !actualPerfRating.toBeRated) || (!isUpdate && isSubmitted && isTrainingEnd && !formData?.annotation) && isSubmitted ) && formData?.createdBy === SessionGetEmployeeId() && (
                    <Button
                      type="button"
                      icon={!(isUpdate || actualPerfRating.isRating) && "pi pi-pencil"}
                      label={(isUpdate || actualPerfRating.isRating) ? "Cancel" : "Edit"}
                      className="rounded ms-auto"
                      severity="secondary"
                      text={isUpdate || actualPerfRating.isRating}
                      onClick={() => {
                        if(formData?.statusName ==
                          getStatusById(statusCode.DISAPPROVED)|| (isTrainingEnd && isSubmitted)){
                        setIsUpdate(!isUpdate);}
                        if(!actualPerfRating.isRated && isSubmitted){
                          setActualPerfRating((prev) => ({
                            ...prev,
                            isRating: !actualPerfRating.isRating,
                          }));
                        }
                        populateData();
                      }}
                    />
                  )}
                  {(!isSubmitted || isUpdate || actualPerfRating.isRating) && (
                  <>
                    {!isSubmitted && (
                      <Button
                        type="button"
                        icon="pi pi-eraser"
                        label="Reset"
                        className="rounded ms-auto"
                        severity="secondary"
                        onClick={() => {
                          setPerformanceCharacteristics([
                            effectivenessConstant.performanceCharacteristics,
                            effectivenessConstant.performanceCharacteristics,
                            effectivenessConstant.performanceCharacteristics,
                          ]);
                          setProjectPerformanceEvaluation([
                            effectivenessConstant.projectPerformanceEvaluation,
                            effectivenessConstant.projectPerformanceEvaluation,
                            effectivenessConstant.projectPerformanceEvaluation,
                          ]);
                        }}
                      />
                    )}
                    <Button
                      type="button"
                      icon={"pi pi-cloud-upload"}
                      label={"Submit"}
                      className="rounded ms-2"
                      severity="success"
                      onClick={
                        isUpdate || actualPerfRating.isRating
                          ? () => handleSubmit(true)
                          : () => handleSubmit(false)
                      }
                    />
                  </>
                  )}</>
              )}
              {evaluatedActualPerfRating.isRating && (
                <Button
                  type="button"
                  icon={"pi pi-pencil"}
                  label={"Submit Evaluation"}
                  className="rounded ms-auto"
                  severity="success"
                  onClick={EvaluateEffectiveness}
                />
              )}
            </div>
          </>
        </Form>
        {/* <ActivityLog label="Activity Logs" items={logs} isDescending /> */}
        {isSubmitted && showLogs && (
          <>
            <hr />
            <h6 className="theme-color" style={{ fontWeight: 600 }}>
              Routes
            </h6>
            <ApproverList
              data={formData}
              activityTitle="Training Effectiveness"
              activityType={ActivityType.REPORT}
              hasEmailForm={
                SessionGetRole() === UserTypeValue.ADMIN ||
                SessionGetRole() === UserTypeValue.SUPER_ADMIN
              }
              emailFormTemplate={reportTemplateRef}
              reloadData={onFinish}
            />
            <hr />
            <ActivityList data={activityLogs} label={"Activities"} />
          </>
        )}
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
  isAdmin: proptype.bool,
  evaluate: proptype.bool,
};
export default EffectivenessForm;
