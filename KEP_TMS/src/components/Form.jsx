import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { ActionButton, NavigationButton } from "./General/Button";
import { useCallback, useEffect, useRef, useState } from "react";
import { Card, Col, Form } from "react-bootstrap";
import { FormStep } from "./Form/FormElements";
import TrainingDetailsContainer from "./Form/TDetails";
import ScheduleContainer from "./Form/TSchedule";
import TrainingParticipant from "./Form/TParticipants";
import TrainingCost from "./Form/TrainingCost";
import TrainingSummary from "./Form/TSummary";
import proptype from "prop-types";
import { TrainingDates, TrainingRequest } from "../services/insertData";
import { insertTrainingRequest } from "../services/trainingServices";
import { actionDelay, actionFailed, actionSuccessful, confirmAction } from "../services/sweetalert";
import { InsertFormattedTrainingRequestData } from "../services/formatData";
import { useNavigate } from "react-router-dom";

export const FormContainer = () => {
  var details = {};
  var trainingSchedules = {trainingDates: []};
  const [formData, setFormData] = useState(TrainingRequest);
  const navigate = useNavigate();
  const handleResponse = useCallback((data) => {
    details = data;
    console.log(data)
  }, [details]);
  
  
  const handleTrainingDates= useCallback((data) => {
    details.trainingDates = data;
    trainingSchedules.trainingDates = data;
  })
  
  const FormStepTrainingDetails = () => (
    <>
      <TrainingDetailsContainer
        handleResponse={handleResponse}
        formData={formData}
      />
      <ScheduleContainer
      formData={formData}
      handleResponse={handleTrainingDates}
      />
    </>
  );
  const [index, setIndex] = useState(0);

  const changeFormContent = (state) => {
    setFormData((prev) =>({...prev, ...details}));
    setIndex(state);
  };


  const handleFormSubmission = async () => {
    try{
      const formmatedData = InsertFormattedTrainingRequestData(formData);
      console.log(formmatedData)
      const response = await insertTrainingRequest(formmatedData);
      if(response.isSuccess ===true){
        actionSuccessful("Congratulations", "success ra gyd haysst")
        setTimeout(() => {
          navigate("/KEP_TMS/RequestList")
        }, 5000);
      }else{
        actionFailed("HUHU", response.message)
      }
      console.log(response)

    }catch(error){

      actionFailed("HUHU", error)
    }
  }
  const ContentList = [
    <FormStepTrainingDetails key={1} />,
    <TrainingParticipant
      key={"2"}
      formData={formData}
      handleResponse={handleResponse}
    />,
    <TrainingCost
      key={"3"}
      formData={formData}
      handleResponse={handleResponse}
    />,
    <TrainingSummary
      key={"4"}
      formData={formData}
    />,
  ];
  return (
    <Card>
      <Card.Body>
        <Form method="POST">
          <FormHeader active={index} />
          {ContentList[index]}
          <Col className="col-12 col-md-7 "></Col>
          <br />
          <NavigationButton
            state={index}
            leftButton={{
              placeholder: "back",
              onClick: changeFormContent,
              state: index <= 0 ? true : false,
            }}
            RightButton={{
              placeholder: index == ContentList.length-1 ?"Submit":"next",
              onClick:index == ContentList.length-1 ?()=>confirmAction(handleFormSubmission) : changeFormContent,
              state: index < ContentList.length ? false : true,
            }}
          />
        </Form>
      </Card.Body>
    </Card>
  );
};

export const FormHeader = ({ active }) => {
  const changeState = (step) => {
    if (active == step) {
      return "active";
    } else if (step < active) {
      return "success";
    } else {
      return "";
    }
  };
  return (
    <>
      <div className="pb-3 border-bottom">
        <div className="d-flex align-items-center gap-2 gap-lg-5 flex-wrap">
          <FormStep step={1} title="Details" state={changeState(0)} />
          <FontAwesomeIcon icon={faGreaterThan} />
          <FormStep step={2} title="Participants" state={changeState(1)} />
          <FontAwesomeIcon icon={faGreaterThan} />
          <FormStep step={3} title="Cost" state={changeState(2)} />
          <FontAwesomeIcon icon={faGreaterThan} />
          <FormStep step={4} title="Summary" state={changeState(3)} />
        </div>
      </div>
    </>
  );
};
FormHeader.propTypes = {
  active: proptype.number.isRequired,
};
