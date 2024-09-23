import { useCallback, useEffect, useRef, useState } from "react";
import { Card, Form } from "react-bootstrap";
import TrainingDetailsContainer from "./Form/TDetails";
import ScheduleContainer from "./Form/TSchedule";
import TrainingParticipant from "./Form/TParticipants";
import TrainingCost from "./Form/TrainingCost";
import TrainingSummary from "./Form/TSummary";
import { TrainingRequest } from "../services/insertData";
import {
  getTrainingRequestById,
  insertTrainingRequest,
  updateTrainingRequest,
} from "../api/trainingServices";
import {
  actionFailed,
  actionSuccessful,
  confirmAction,
} from "../services/sweetalert";
import { InsertFormattedTrainingRequestData } from "../services/formatData";
import { useNavigate, useParams } from "react-router-dom";
import {
  SessionGetDepartment,
  SessionGetEmployeeId,
  SessionGetUserName,
} from "../services/sessions";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";
import validateTrainingDetails from "../services/inputValidation/validateTrainingDetails";
import { mapUserListAsync } from "../services/DataMapping/UserListData";
import { formatDateTime } from "../utils/Formatting";
export const FormContainer = () => {
  const trainingType = useParams().type;
  const requestId = useParams().id;
  var details = {};
  var trainingSchedules = { trainingDates: [] };
  const [formData, setFormData] = useState(TrainingRequest);
  const navigate = useNavigate();
  const handleResponse = useCallback(
    (data) => {
      details = data;
    },
    [details]
  );
  const handleTrainingDates = useCallback((data) => {
    details.trainingDates = data;
    trainingSchedules.trainingDates = data;
  });
  const handleFormSubmission = async () => {
    try {
      const formmatedData = InsertFormattedTrainingRequestData(formData);
      if(trainingType.toUpperCase() === "UPDATE" && requestId ){
        const updateData = {...formmatedData, updatedBy: SessionGetEmployeeId()}
        const response = await updateTrainingRequest(updateData);
        if (response.isSuccess === true) {
          actionSuccessful(
            "updated",
            "training request successfully submitted, please wait for approval"
          );
          setTimeout(() => {
            navigate("/KEP_TMS/TrainingView/" + formmatedData.id);
          }, 2500);
        } else {
          actionFailed("Error", response.message);
        }
      }else{
        const updateData = {...formmatedData, createdBy: SessionGetEmployeeId()}
      const response = await insertTrainingRequest(updateData);
      if (response.isSuccess === true) {
        actionSuccessful(
          "Success",
          "training request successfully submitted, please wait for approval"
        );
        setTimeout(() => {
          navigate("/KEP_TMS/RequestList");
        }, 2500);
      } else {
        actionFailed("Error", response.message);
      }}
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
      const { hasErrors, newErrors } = validateTrainingDetails(details);
      let schedulesValid = false;
      let detailsValid = !hasErrors;
      // Check if schedules are valid
      if (details.trainingDates?.length > 0) {
        schedulesValid = true;
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          schedules: "Please add schedules",
        }));
      }
      console.log(details);

      // Set errors for details
      if (hasErrors) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          details: newErrors,
        }));
      }

      // Proceed to next step only if both details and schedules are valid
      if (detailsValid && schedulesValid) {
        setFormData(details);
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
      if (details.trainingParticipants?.length > 0) {
        <></>;
      } else {
        newErrors.trainees = "Please add participants";
        hasErrors = true;
      }
      if (details.trainingFacilitators?.length > 0) {
        <></>;
      } else {
        newErrors.facilitators = "Please add facilitator";
        hasErrors = true;
      }
      setErrors({ ...errors, participants: newErrors });

      if (!hasErrors) {
        setFormData(details);
        stepperRef.current.nextCallback();
        setErrors((prevErrors) => ({
          ...prevErrors,
          participants: {},
        }));
      }
    } else if (index === 2) {
      setFormData(details);
      stepperRef.current.nextCallback();
    }
  };

  //Get request data if param is UPDATE
  useEffect(() => {
    console.log(trainingType, requestId);
    if (trainingType.toUpperCase() === "UPDATE" && requestId) {
      const getRequest = async () => {
        try {
          const res = await getTrainingRequestById(requestId);
         const participants = await mapUserListAsync(res?.data?.trainingParticipants, "employeeBadge")
         const facilitators = await mapUserListAsync(res?.data.trainingFacilitators, "facilitatorBadge")
          if (res.data != null) {
            setFormData({...res?.data, trainingParticipants: participants, trainingFacilitators: facilitators});
          }
        } catch (err) {
          console.error(err);
        }
      };
      
      getRequest();
    }
  }, [trainingType]);
  
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
            onClick={() =>
              confirmAction({ actionFunction: handleFormSubmission })
            }
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
            New {trainingType} Training Request
          </h3>
          <div className="h6 d-flex gap-5 pb-4 justify-content-around border-bottom">
            <span> Requestor: {SessionGetUserName()}</span>
            <span> BadgeId: {SessionGetEmployeeId()}</span>
            <span> Department: {SessionGetDepartment()}</span>
            <span> Date: {formatDateTime(new Date())}</span>
          </div>
          <div className="">
            <Stepper
              linear
              ref={stepperRef}
              className="w-100"
              style={{ flexBasis: "50rem" }}
            >
              <StepperPanel header="Details">
                <TrainingDetailsContainer
                  handleResponse={handleResponse}
                  formData={formData}
                  error={errors?.details}
                />
                <ScheduleContainer
                  formData={formData}
                  handleResponse={handleTrainingDates}
                  errors={errors?.schedules}
                />
                {<StepperButton next={true} index={0} />}
              </StepperPanel>
              <StepperPanel header="Participants">
                <TrainingParticipant
                  formData={formData}
                  handleResponse={handleResponse}
                  errors={errors?.participants}
                />
                {<StepperButton back={true} next={true} index={1} />}
              </StepperPanel>
              <StepperPanel header="Cost">
                <TrainingCost
                  formData={formData}
                  handleResponse={handleResponse}
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
