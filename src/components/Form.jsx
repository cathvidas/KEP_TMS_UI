import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { ActionButton, NavigationButton } from "./General/Button";
import { useEffect, useRef, useState } from "react";
import { Card, Col } from "react-bootstrap";
import { FormStep } from "./Form/FormElements";
import TrainingDetailsContainer from "./Form/TDetails";
import ScheduleContainer from "./Form/TSchedule";
import TrainingParticipant from "./Form/TParticipants";
import TrainingCost from "./Form/TrainingCost";
import TrainingSummary from "./Form/TSummary";

export const FormContainer = () => {
  const [participants, setParticipants] = useState([{ name: "" },{id: ""}]);
  const [trainingCost, setTrainingCost] = useState(0);
  
  const handleParticipants = (participants) => {
    setParticipants(participants);
  };
  const updateTrainingCost = (cost) => {
    setTrainingCost(cost);
  };
  const [trainingSchedules, setTrainingSchedules] = useState([{
    schedDate: "2024-12-12",
    timeIn: "20:12",
    timeOut: "09:7",
  }]);
  const [schedData, setSchedData] = useState({
    schedDate: "",
    timeIn: "",
    timeOut: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSchedData((obj) => ({ ...obj, [name]: value }));
  };
  const handleTrainingSched = () => {
    setTrainingSchedules((prevSchedules) => [...prevSchedules, schedData]);
    setSchedData({ schedDate: "", timeIn: "", timeOut: "" });
  };
  const removeSechedule = (index) => {
    const updatedSchedules = trainingSchedules.filter((item, i) => i !== index);
    setTrainingSchedules(updatedSchedules);
  };
  const FormStepTrainingDetails = () => (
    <>
      <TrainingDetailsContainer />
      <ScheduleContainer
        trainingSchedules={trainingSchedules}
        removeSechedule={removeSechedule}
        schedData={schedData}
        handleInputChange={handleInputChange}
        handleTrainingSched={handleTrainingSched}
      />
    </>
  );
  const [FormContent, setFormContent] = useState(
    // <TrainingCost totalCost={trainingCost} participants={participants} onInput={updateTrainingCost} />
     <TrainingSummary schedule={trainingSchedules}/>
    // <FormStepTrainingDetails/>
  );
  const changeFormContent = (content) => {
    setFormContent(content);
  };
  return (
    <Card>
      <Card.Body>
        <FormHeader />
        {FormContent}
        <Col className="col-12 col-md-7 "></Col>
        <br/>
        <NavigationButton leftButton={{placeholder: "back"}} RightButton={{placeholder: "next"}}/>
      </Card.Body>
    </Card>
  );
};
export const FormHeader = () => {
  return (
    <>
      <div className="pb-3 border-bottom">
        <div className="d-flex align-items-center gap-2 gap-lg-5 flex-wrap">
          <FormStep step={2} title="Details" state="success" />
          <FontAwesomeIcon icon={faGreaterThan} />
          <FormStep step={2} title="Details" state="active" />
          <FontAwesomeIcon icon={faGreaterThan} />
          <FormStep step={3} title="Details" />
          <FontAwesomeIcon icon={faGreaterThan} />
          <FormStep step={4} title="Details" />
        </div>
      </div>
    </>
  );
};
