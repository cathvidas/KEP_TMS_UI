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

export const FormContainer = () => {
  const [formData, setFormData] = useState(TrainingRequest);
  const [trainingSchedules, setTrainingSchedules] = useState([]);
  const [schedData, setSchedData] = useState(TrainingDates);
  const [participants, setParticipants] = useState([{ name: "" }, { id: "" }]);
  const [trainingCost, setTrainingCost] = useState(0);
console.log(formData)
  const handleParticipants = (participants) => {
    setParticipants(participants);
  };
  const updateTrainingCost = (cost) => {
    setTrainingCost(cost);
  };
  const handleInputChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setSchedData((obj) => ({ ...obj, [name]: value }));
  };
  const handleResponse = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setFormData((obj) => ({ ...obj, [name]: value }));
  };
  const handleOnChange= (e, b) => {
    setFormData((obj) => ({ ...obj, [e]: b }));
  };

  const handleTrainingSched = () => {
    setTrainingSchedules((prevSchedules) => [...prevSchedules, schedData]);
    setSchedData({});
  };  
  const removeSechedule = (index) => {
    const updatedSchedules = trainingSchedules.filter((item, i) => i !== index);
    setTrainingSchedules(updatedSchedules);
  };
  const FormStepTrainingDetails = () => (
    <>
      <TrainingDetailsContainer onChange={handleOnChange} handleResponse={handleResponse} formData={formData} />
      <ScheduleContainer
        trainingSchedules={trainingSchedules}
        removeSechedule={removeSechedule}
        schedData={schedData}
        handleInputChange={handleInputChange}
        handleTrainingSched={handleTrainingSched}
      />
    </>
  );
  const ContentList = [
    <FormStepTrainingDetails key={1} />,
    <TrainingParticipant
      key={"2"}
      participants={participants}
      onInput={handleParticipants}
    />,
    <TrainingCost
      key={"3"}
      totalCost={trainingCost}
      participants={participants}
      onInput={updateTrainingCost}
    />,
    <TrainingSummary
      key={"4"}
      schedule={trainingSchedules}
      participants={participants}
    />,
  ];
  const [index, setIndex] = useState(0);

  const changeFormContent = (state) => {
    setIndex(state);
  };
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
              placeholder: "next",
              onClick: changeFormContent,
              state: index < ContentList.length - 1 ? false : true,
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
