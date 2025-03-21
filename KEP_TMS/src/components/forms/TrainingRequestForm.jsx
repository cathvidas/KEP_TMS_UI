import { useCallback, useEffect, useRef, useState } from "react";
import { Card, Form } from "react-bootstrap";
import TrainingDetailsForm from "../trainingRequestFormComponents/TrainingDetailsForm";
import TrainingScheduleForm from "../trainingRequestFormComponents/TrainingScheduleForm";
import TrainingCostForm from "../trainingRequestFormComponents/TrainingCostForm";
import TrainingSummary from "./TSummary";
import { TrainingRequest } from "../../services/insertData";
import {
  actionFailed,
  actionSuccessful,
  confirmAction,
} from "../../services/sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import {
  SessionGetDepartment,
  SessionGetEmployeeId,
  SessionGetFullName,
  SessionGetRole,
} from "../../services/sessions";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";
import validateTrainingDetails from "../../services/inputValidation/validateTrainingDetails";
import { formatDateTime } from "../../utils/datetime/Formatting";
import { APP_DOMAIN, statusCode, TrainingType, UserTypeValue } from "../../api/constants";
import TrainingParticipantsForm from "../trainingRequestFormComponents/TrainingParticipantsForm";
import calculateTotalHours from "../../utils/datetime/calculateTotalHours";
import commonHook from "../../hooks/commonHook";
import { validateTrainingRequestForm } from "../../services/inputValidation/validateTrainingRequestForm";
import trainingRequestService from "../../services/trainingRequestService";
import trainingRequestHook from "../../hooks/trainingRequestHook";
import validateTrainingSchedules from "../../services/inputValidation/validateTrainingSchedules";
import handleResponseAsync from "../../services/handleResponseAsync";
import { SectionHeading } from "../General/Section";
import categoryHook from "../../hooks/categoryHook";
import userService from "../../services/userService";
import SkeletonForm from "../Skeleton/SkeletonForm";
import ErrorTemplate from "../General/ErrorTemplate";
import getStatusById from "../../utils/status/getStatusById";
export const TrainingRequestForm = () => {
  const trainingType = useParams().type;
  const requestId = useParams().id;
  const categories = categoryHook.useAllCategories(true);
  const departments = commonHook.useAllDepartments();
  const details = useRef({});
  const [isUpdate, setIsUpdate] = useState(false);
  var trainingSchedules = { trainingDates: [] };
  const [formData, setFormData] = useState(TrainingRequest);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    details: {},
    schedules: "",
    participants: "",
  });
  const handleResponse = useCallback((data) => {
    details.current = data;
  }, []);
  const getTrainingTypeId = () => {
    if(trainingType?.toUpperCase() === "UPDATE") {
      return details?.current?.trainingType?.id;
    }
    else if (trainingType?.toUpperCase() === "INTERNAL") {
      return TrainingType.INTERNAL;
    }
    else if (trainingType?.toUpperCase() === "EXTERNAL") {
      return TrainingType.EXTERNAL;
    }
  };
  const stepperRef = useRef(null);
  useEffect(() => {
    stepperRef.current?.setActiveStep(0);
  }, [trainingType]);
  const handleTrainingDates = useCallback(
    (data) => {
      details.current.trainingDates = data;
      trainingSchedules.trainingDates = data;
    },
    [details]
  );
  const handleFormSubmission = async (draft = false, data) => {
    try {
      const formmatedData = { ...validateTrainingRequestForm(data ? data : formData) };
      if (trainingType.toUpperCase() === "UPDATE" && requestId) {
        const updateData = {
          ...formmatedData,
          updatedBy: SessionGetEmployeeId(),
          isDraft: draft,
          statusId: !draft  && (formmatedData?.statusId === statusCode.DRAFTED || formmatedData?.statusId === statusCode.INACTIVE) ?
            calculateTotalHours(formmatedData?.trainingDates) >= 960 // 16 hours in minutes
              ? statusCode.SUBMITTED
              : statusCode.FORAPPROVAL : formmatedData?.statusId,
        };
        handleResponseAsync(
          () => trainingRequestService.updateTrainingRequest(updateData),
          () => {
            actionSuccessful(
              "Updated",
              `Training request successfully ${draft ? "saved" : "submitted"}.`
            );
            setTimeout(() => {
              navigate(draft ? "/KEP_TMS/RequestList/Draft" : "/KEP_TMS/TrainingDetail/" + formmatedData.id);
            }, 2500);
          }
        );
      } else {
        const updateData = {
          ...formmatedData,
          requesterBadge: SessionGetEmployeeId(),
          trainingTypeId: getTrainingTypeId(),
          statusId:
            calculateTotalHours(formmatedData?.trainingDates) >= 960
              ? statusCode.SUBMITTED
              : statusCode.FORAPPROVAL,
              isDraft: draft
        };
        
          handleResponseAsync(
            () => trainingRequestService.createTrainingRequest(updateData),
            (res) => {
              actionSuccessful(
                "Success",
                `Training request successfully ${draft ? "saved" : "submitted"}.`
              );
              setTimeout(() => {
                navigate(draft ? "/KEP_TMS/RequestList/Draft" : "/KEP_TMS/TrainingDetail/" + res?.data?.id);
              }, 2500);
            }
          );
       
      }
    } catch (error) {
      actionFailed("Error", error);
    }
  };
  const handleButtonOnClick = (index, isDraft) => {
    //detail and schedule validation
    if (index === 0) {
      const validateDates =
        details.current?.status?.id === statusCode.APPROVED ||
        details.current?.status?.id === statusCode.CLOSED
          ? false
          : true;
      const schedulesIsValid = validateTrainingSchedules(
        details.current?.trainingDates,
        validateDates
      );
      const { hasErrors, newErrors } = validateTrainingDetails(details.current);
      let detailsValid = !hasErrors;
      // Set errors for details
      if (!isDraft && (hasErrors || schedulesIsValid.hasErrors)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          details: newErrors,
          schedules: schedulesIsValid.newErrors,
        }));
      }

      // Proceed to next step only if both details and schedules are valid
      
      if ((detailsValid && !schedulesIsValid.hasErrors) || isDraft) {
        setFormData((prev) => ({ ...prev, ...details.current }));
        if (isDraft) {
          saveTrainingRequest({ ...formData, ...details.current });
        } else {
          stepperRef.current.nextCallback();
          setErrors((prevErrors) => ({
            ...prevErrors,
            details: {},
            schedules: "",
          }));
        }
      }
      //stepperRef.current.nextCallback();
    } 
    //participants validation
    else if (index === 1) {
      let hasErrors = false;
      let newErrors = { trainees: "", facilitators: "" };
      if (details.current.trainingParticipants?.length > 0) {
        <></>;
      } else {
        newErrors.trainees = "No participants added";
        hasErrors = true;
      }
      if (formData?.trainingType?.id === TrainingType.INTERNAL) {
        if (details.current.trainingFacilitators?.length > 0) {
          <></>;
        } else {
          newErrors.facilitators = "No facilitator/s added";
          hasErrors = true;
        }
      }
      setErrors({ ...errors, participants: newErrors });
      if (!hasErrors || isDraft) {
        setFormData((prev) => ({ ...prev, ...details.current }));
        if (isDraft) {
          saveTrainingRequest({ ...formData, ...details.current });
        } else {
        stepperRef.current.nextCallback();
        setErrors((prevErrors) => ({
          ...prevErrors,
          participants: {},
        }));}
      }
    } 
    //external details and cost validation
    else if (index === 2) {
      let hasError = false;
      let newErrors = {};
      if (!details?.current?.trainingProvider?.id) {
        newErrors.provider = "Please select a training provider";
        hasError = true;
      } if (getTrainingTypeId() === TrainingType.EXTERNAL) {
        if (!(details.current.trainingFacilitators?.length > 0)) {
          newErrors.facilitators = "No facilitators selected";
          hasError = true;
        } 
      }
      setErrors({ ...errors, provider: newErrors });
      if (!hasError || isDraft) {
        setFormData((prev) => ({ ...prev, ...details.current }));
        if (isDraft) {
          saveTrainingRequest({ ...formData, ...details.current });
        } else {
        stepperRef.current.nextCallback();
        setErrors((prevErrors) => ({
          ...prevErrors,
          provider: "",
        }));}
      }
    }else{
      saveTrainingRequest({ ...formData, ...details.current });
    }
  };
  const trainingRequestData = trainingRequestHook.useTrainingRequest(
    requestId ?? 0
  );
  // Get request data if param is UPDATE
  useEffect(() => {
    if (trainingType.toUpperCase() === "UPDATE" && trainingRequestData?.data) {
      setFormData(trainingRequestData?.data);
      setIsUpdate(true);
    } else {
      setIsUpdate(false);
      setFormData({
        ...TrainingRequest,
        trainingType: { id: getTrainingTypeId() },
      });
    }
  }, [trainingType, trainingRequestData?.data, requestId]);
  const saveTrainingRequest = async (data) => {
    confirmAction({
      title: 'Save as Draft',
      text: 'Are you sure you want to save this training request as a draft?',
      confirmButtonText: 'Save',
      showLoaderOnConfirm: true,
      onConfirm:async ()=> await handleFormSubmission(true, data),
    })
  }
  const StepperButton = (button) => {
    return (
      <div className="flex pt-4 justify-content-between">
        {button.back && (
          <Button
            label="Back"
            severity="secondary"
            icon="pi pi-arrow-left"
            className="rounded"
            onClick={() => stepperRef.current.prevCallback()}
          />
        )}
        {(trainingType.toUpperCase() !== "UPDATE" || formData?.status?.id === statusCode.DRAFTED) &&
        <Button
          type="button"
          className="ms-auto rounded"
          label="Save"
          icon="pi pi-save"
          severity="warning"
          iconPos="right"
          title="save as draft"
          onClick={() => handleButtonOnClick(button.index, true)}
        />}
        {button.next && (
          <>
          <Button
            type="button"
            className={`${trainingType.toUpperCase() !== "UPDATE" || formData?.status?.id === statusCode.DRAFTED ? "" : "ms-auto"} rounded`}
            label="Next"
            icon="pi pi-arrow-right"
            iconPos="right"
            onClick={() => handleButtonOnClick(button.index)}
          /></>
        )}
        {button.submit && (
          <Button
            type="button"
            className="rounded"
            label="Submit"
            icon="pi pi-cloud-upload"
            iconPos="right"
            severity="success"
            onClick={() =>
              confirmAction({
                showLoaderOnConfirm: true,
                onConfirm: handleFormSubmission,
              })
            }
          />
        )}
      </div>
    );
  };
  useEffect(() =>{
    formData?.trainingFacilitators?.forEach((facilitator) => {
      if(facilitator?.facilitatorBadge && ! facilitator?.faciDetail){
        const getFacilitatorDetails = async () => {
        const faciDetail = await userService.getUserById(facilitator?.facilitatorBadge);
        facilitator.faciDetail = faciDetail;
        }
        getFacilitatorDetails()
      }
    })
  }, [formData?.trainingFacilitators])
  return (
    <>
      <Card>
        <Card.Body>
          {trainingRequestData?.loading ? (
            <SkeletonForm />
          ) : (
            <Form method="POST">
              <h3 className="text-center theme-color">
                {trainingType === "Update"
                  ? "Update " + formData?.trainingType?.name
                  : "New " + trainingType}{" "}
                Training Request
              </h3>
              {trainingType?.toUpperCase() === "UPDATE" &&
                formData.id !== 0 && (
                  <h6 className="text-muted text-center mb-3">
                    Request ID: {formData.id}
                  </h6>
                )}
              <div className="position-absolute end-0 top-0 ">
                <Button
                  type="button"
                  onClick={() => history.back()}
                  icon="pi pi-times"
                  text
                />
              </div>
              <div className="h6 d-flex gap-5 pb-4 justify-content-around border-bottom">
                <span>
                  {" "}
                  Requestor:{" "}
                  {isUpdate
                    ? formData?.requestor?.fullname
                    : SessionGetFullName()}
                </span>
                <span>
                  {" "}
                  Badge No:{" "}
                  {isUpdate
                    ? formData?.requestor?.employeeBadge
                    : SessionGetEmployeeId()}
                </span>
                <span>
                  {" "}
                  Department:{" "}
                  {isUpdate
                    ? formData?.requestor?.position
                    : SessionGetDepartment()}
                </span>
                <span>
                  {" "}
                  Date:{" "}
                  {isUpdate
                    ? formatDateTime(formData?.createdDate)
                    : formatDateTime(new Date())}
                </span>
              </div>
              {formData?.status?.id == statusCode.APPROVED ||
              formData?.status?.id == statusCode.CLOSED ? (<div className="text-center py-5">
                <ErrorTemplate
                  className={"py-4"}
                  center
                  message={`This training request has been ${getStatusById(
                    formData?.status?.id
                  )?.toLocaleUpperCase()} and cannot be edited.`}
                />
                <Button size="small" className="py-1 rounded mx-auto" label="View Request details" onClick={()=>navigate(`${APP_DOMAIN}/TrainingDetail/${formData?.id}`)}/>
                </div>
              ) : (
                <Stepper
                  linear
                  ref={stepperRef}
                  className="w-100"
                  style={{ flexBasis: "50rem" }}
                >
                  <StepperPanel header="Details">
                    <TrainingDetailsForm
                      handleResponse={handleResponse}
                      formData={formData}
                      error={errors?.details}
                      categories={categories}
                    />
                    <TrainingScheduleForm
                      formData={formData}
                      handleResponse={handleTrainingDates}
                      errors={errors?.schedules}
                    />
                    {<StepperButton next={true} index={0} />}
                  </StepperPanel>
                  <StepperPanel header="Participants">
                    <TrainingParticipantsForm
                      formData={formData}
                      handleResponse={handleResponse}
                      errors={errors?.participants}
                      departments={departments?.data}
                      trainingType={formData?.trainingType?.id}
                    />
                    {<StepperButton back={true} next={true} index={1} />}
                  </StepperPanel>
                  {formData?.trainingType?.id === TrainingType.EXTERNAL && (
                    <StepperPanel header="Cost">
                      <TrainingCostForm
                        formData={formData}
                        handleResponse={handleResponse}
                        errors={errors?.provider}
                      />
                      {<StepperButton back={true} next={true} index={2} />}
                    </StepperPanel>
                  )}
                  <StepperPanel header="Summary">
                    <TrainingSummary
                      formData={formData}
                      update={trainingType.toUpperCase() === "UPDATE"}
                    />
                    {getTrainingTypeId() === TrainingType.EXTERNAL &&
                      SessionGetRole() === UserTypeValue.ADMIN && (
                        <>
                          <SectionHeading
                            title="Has Training Agreement"
                            icon={<i className="pi pi-bookmark-fill"></i>}
                          />
                          <div className="d-flex gap-5">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                                checked={formData?.forTrainingAgreement}
                                onChange={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    forTrainingAgreement: true,
                                  }))
                                }
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
                                checked={!formData?.forTrainingAgreement}
                                onChange={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    forTrainingAgreement: false,
                                  }))
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault2"
                              >
                                No
                              </label>
                            </div>
                          </div>
                        </>
                      )}
                    {<StepperButton back={true} submit={true} />}
                  </StepperPanel>
                </Stepper>
              )}
            </Form>
          )}
        </Card.Body>
      </Card>
    </>
  );
};
