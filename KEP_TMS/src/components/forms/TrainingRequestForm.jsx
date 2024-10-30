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
  SessionGetUserName,
} from "../../services/sessions";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";
import validateTrainingDetails from "../../services/inputValidation/validateTrainingDetails";
import { formatDateTime } from "../../utils/datetime/Formatting";
import { statusCode, TrainingType } from "../../api/constants";
import TrainingParticipantsForm from "../trainingRequestFormComponents/TrainingParticipantsForm";
import calculateTotalHours from "../../utils/datetime/calculateTotalHours";
import programHook from "../../hooks/programHook";
import categoryHook from "../../hooks/categoryHook";
import providerHook from "../../hooks/providerHook";
import commonHook from "../../hooks/commonHook";
import { validateTrainingRequestForm } from "../../services/inputValidation/validateTrainingRequestForm";
import trainingRequestService from "../../services/trainingRequestService";
import trainingRequestHook from "../../hooks/trainingRequestHook";
import validateTrainingSchedules from "../../services/inputValidation/validateTrainingSchedules";
import handleResponseAsync from "../../services/handleResponseAsync";
export const TrainingRequestForm = () => {
  const trainingType = useParams().type;
  const requestId = useParams().id;
  const programs = programHook.useAllPrograms();
  const categories = categoryHook.useAllCategories();
  const providers = providerHook.useAllProviders();
  const departments = commonHook.useAllDepartments();
  const details = useRef({});
  const [isUpdate, setIsUpdate] = useState(false);
  var trainingSchedules = { trainingDates: [] };
  const [formData, setFormData] = useState(TrainingRequest);
  const navigate = useNavigate();
  const handleResponse = useCallback((data) => {
    details.current = data;
  }, []);
  const getTrainingTypeId = () => {
    if (trainingType === "Internal") {
      return TrainingType.INTERNAL;
    }
    if (trainingType === "External") {
      return TrainingType.EXTERNAL;
    }
  };
  const handleTrainingDates = useCallback(
    (data) => {
      details.current.trainingDates = data;
      trainingSchedules.trainingDates = data;
    },
    [details]
  );
  const handleFormSubmission = async () => {
    try {
      const formmatedData = { ...validateTrainingRequestForm(formData) };
      if (trainingType.toUpperCase() === "UPDATE" && requestId) {
        const changeStatus = formData?.status?.id === statusCode.SUBMITTED || formData?.status?.id === statusCode.FORAPPROVAL || formData?.status?.id === statusCode.DISAPPROVED ;
        const updateData = {
          ...formmatedData,
          updatedBy: SessionGetEmployeeId(),
          statusId: changeStatus
            ? calculateTotalHours(formmatedData?.trainingDates) >= 960
              ? statusCode.SUBMITTED
              : statusCode.FORAPPROVAL
            : formmatedData?.statusId,
        };
        handleResponseAsync(
          () => trainingRequestService.updateTrainingRequest(updateData),
          () => {
            actionSuccessful(
              "updated",
              "training request successfully submitted."
            );
            setTimeout(() => {
              navigate("/KEP_TMS/TrainingRequest/" + formmatedData.id);
            }, 2500);
          }
        );
      } else {
        const updateData = {
          ...formmatedData,
          requestorBadge: SessionGetEmployeeId(),
          trainingTypeId: getTrainingTypeId(),
          statusId:
            calculateTotalHours(formmatedData?.trainingDates) >= 960
              ? statusCode.SUBMITTED
              : statusCode.FORAPPROVAL,
        };
        handleResponseAsync(
          () => trainingRequestService.createTrainingRequest(updateData),
          (res) => {
            actionSuccessful(
              "Success",
              "training request successfully submitted, please wait for approval"
            );
            setTimeout(() => {
              navigate("/KEP_TMS/TrainingRequest/" + res?.data?.id);
            }, 2500);
          }
        );
      }
    } catch (error) {
      actionFailed("Error", error);
    }
  };
  const stepperRef = useRef(null);
  const [errors, setErrors] = useState({
    details: {},
    schedules: "",
    participants: "",
  });
  const handleButtonOnClick = (index) => {
    if (index === 0) {
      const validateDates = details.current?.status?.id === statusCode.PUBLISHED || details.current?.status?.id === statusCode.CLOSED ? false: true;
      const schedulesIsValid = validateTrainingSchedules(details.current?.trainingDates, validateDates)
      const { hasErrors, newErrors } = validateTrainingDetails(details.current);
      let detailsValid = !hasErrors;
      // Set errors for details
      if (hasErrors || schedulesIsValid.hasErrors) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          details: newErrors,
          schedules: schedulesIsValid.newErrors,
        }));
      }

      // Proceed to next step only if both details and schedules are valid
      if (detailsValid && !schedulesIsValid.hasErrors) {
        setFormData((prev)=>({...prev, ...details.current}));
        stepperRef.current.nextCallback();
        setErrors((prevErrors) => ({
          ...prevErrors,
          details: {},
          schedules: "",
        }));
      }
      //stepperRef.current.nextCallback();
    } else if (index === 1) {
      let hasErrors = false;
      let newErrors = { trainees: "", facilitators: "" };
      if (details.current.trainingParticipants?.length > 0) {
        <></>;
      } else {
        newErrors.trainees = "Please add participants";
        hasErrors = true;
      }
      if (details.current.trainingFacilitators?.length > 0) {
        <></>;
      } else {
        newErrors.facilitators = "Please add facilitator";
        hasErrors = true;
      }
      setErrors({ ...errors, participants: newErrors });

      if (!hasErrors) {
        setFormData((prev)=>({...prev, ...details.current}));
        stepperRef.current.nextCallback();
        setErrors((prevErrors) => ({
          ...prevErrors,
          participants: {},
        }));
      }
    } else if (index === 2) {
      let hasError = false;
      let newErrors = {};
      if (!details?.current?.trainingProvider?.id) {
        newErrors.provider = "Please select a training provider";
        hasError = true;
      }
      setErrors({ ...errors, provider: newErrors.provider });
      if (!hasError) {
        setFormData((prev)=>({...prev, ...details.current}));
        stepperRef.current.nextCallback();
        setErrors((prevErrors) => ({
          ...prevErrors,
          provider: "",
        }));
      }
    }
  };

  const trainingRequestData = trainingRequestHook.useTrainingRequest(requestId ?? 0);
  // Get request data if param is UPDATE
  useEffect(() => {
    if (
      trainingType.toUpperCase() === "UPDATE" &&
      trainingRequestData?.data
    ) {
      setFormData(trainingRequestData?.data);
      setIsUpdate(true)
    }else{
      setIsUpdate(false)
      setFormData(TrainingRequest);
    }
  }, [trainingType,trainingRequestData?.data, requestId]);

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
        {button.next && (
          <Button
            type="button"
            className="ms-auto rounded"
            label="Next"
            icon="pi pi-arrow-right"
            iconPos="right"
            onClick={() => handleButtonOnClick(button.index)}
          />
        )}
        {button.submit && (
          <Button
            type="button"
            className="ms-auto rounded"
            label="Submit"
            icon="pi pi-arrow-right"
            iconPos="right"
            severity="success"
            onClick={() => confirmAction({
              showLoaderOnConfirm: true, onConfirm: handleFormSubmission })}
          />
        )}
      </div>
    );
  };
  return (
    <Card>
      <Card.Body>
        <Form method="POST">
          <h3 className="text-center theme-color">
            {trainingType === "Update" ? "Update " + formData?.trainingType?.name : "New " + trainingType}{" "}
            Training Request
          </h3>
          {trainingType?.toUpperCase() === "UPDATE" && formData.id !== 0 &&
          <h6 className="text-muted text-center mb-3">Request ID: {formData.id}</h6>}
          <div className="position-absolute end-0 top-0 ">
            <Button
              type="button"
              onClick={() => history.back()}
              icon="pi pi-times"
              text
            />
          </div>
          <div className="h6 d-flex gap-5 pb-4 justify-content-around border-bottom">
            <span> Requestor: {isUpdate ? formData?.requestor?.fullname : SessionGetUserName()}</span>
            <span> Badge No: {isUpdate ? formData?.requestor?.employeeBadge:SessionGetEmployeeId()}</span>
            <span> Department: {isUpdate ? formData?.requestor?.position: SessionGetDepartment()}</span>
            <span> Date: {isUpdate ? formatDateTime(formData?.createdDate) : formatDateTime(new Date())}</span>
          </div>
          <div className="">
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
                  programs={programs}
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
                />
                {<StepperButton back={true} next={true} index={1} />}
              </StepperPanel>
              <StepperPanel header="Cost">
                <TrainingCostForm
                  formData={formData}
                  handleResponse={handleResponse}
                  providersData={providers}
                  error={errors}
                />
                {<StepperButton back={true} next={true} index={2} />}
              </StepperPanel>
              <StepperPanel header="Summary">
                <TrainingSummary formData={formData} />
                {<StepperButton back={true} submit={true} />}
              </StepperPanel>
            </Stepper>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
