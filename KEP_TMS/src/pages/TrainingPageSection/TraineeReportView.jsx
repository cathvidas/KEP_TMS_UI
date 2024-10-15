import { Stepper } from "primereact/stepper";
import { SectionHeading } from "../../components/General/Section";
import { useRef } from "react";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";
import TrainingReportForm from "../../components/forms/TrainingReportForm";
import { Card } from "react-bootstrap";
import EvaluationForm from "../../components/forms/EvaluationForm";
import proptype from "prop-types";
import EffectivenessForm from "../../components/forms/EffectivenessForm";
import { SessionGetEmployeeId } from "../../services/sessions";
import userHook from "../../hooks/userHook";
import { statusCode } from "../../api/constants";
import effectivenessHook from "../../hooks/effectivenessHook";
import { useNavigate } from "react-router-dom";
import trainingReportHook from "../../hooks/trainingReportHook";
import evaluationHook from "../../hooks/evaluationHook";
const TraineeReportView = ({ data }) => {
  const userData = userHook.useUserById(SessionGetEmployeeId());
  const getUser = data?.trainingParticipants?.find((item) => item.employeeBadge === SessionGetEmployeeId());

 const effectiveness = getUser?.effectivenessId ? effectivenessHook.useEffectivenessById(getUser.effectivenessId):{};
  const report = getUser?.reportId  ? trainingReportHook.useTrainingReportById(getUser.reportId):{};
  const evaluation = getUser?.evaluationId? evaluationHook.useEvaluationById(getUser.evaluationId):{};
  const stepperRef = useRef();
  const navigate = useNavigate();
  const handleOnFinish =()=>{
    navigate(`/KEP_TMS/Training/${data?.id}/Reports`)
  }
  console.log(evaluation)
  return (
    <div className="w-100 oveflow-hidden">
      <SectionHeading title="Trainee Report" />
      <Card className="pt-2 overflow-hidden">
        <Stepper
          ref={stepperRef}
          // className=" flex-wrap"
          // style={{ flexBasis: "50rem" }}
          orientation="horizontal"
          // headerPosition="bottom"
        >
          {data?.durationInHours >= 16 &&
          <StepperPanel header="Training Effectiveness Form">
            <hr className="m-0"/>
            <EffectivenessForm data={data} userData={userData?.data} formData={effectiveness?.data} onFinish={handleOnFinish}/>
          </StepperPanel>}
          {data?.status?.id === statusCode.PUBLISHED &&
          <StepperPanel header="Training Report Form">
          <hr className="m-0"/>
            <TrainingReportForm data={data} userData={userData?.data} defaultValue={report?.data} onFinish={handleOnFinish}/>
          </StepperPanel>}     
          {data?.status?.id === statusCode.PUBLISHED &&
          <StepperPanel header="Evaluation Form">
          <hr className="m-0"/>
            <EvaluationForm data={data} userData={userData}  onFinish={handleOnFinish}/>
          </StepperPanel>
          
          }
        </Stepper>
      </Card>
    </div>
  );
};
TraineeReportView.propTypes = {
  data: proptype.object,
};
export default TraineeReportView;
