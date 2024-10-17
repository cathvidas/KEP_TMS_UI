import { Stepper } from "primereact/stepper";
import { SectionHeading } from "../../components/General/Section";
import { useEffect, useRef, useState } from "react";
import { StepperPanel } from "primereact/stepperpanel";
import TrainingReportForm from "../../components/forms/TrainingReportForm";
import { Card } from "react-bootstrap";
import EvaluationForm from "../../components/forms/EvaluationForm";
import proptype from "prop-types";
import EffectivenessForm from "../../components/forms/EffectivenessForm";
import { SessionGetEmployeeId } from "../../services/sessions";
import userHook from "../../hooks/userHook";
import { OtherConstant, statusCode } from "../../api/constants";
import effectivenessHook from "../../hooks/effectivenessHook";
import trainingReportHook from "../../hooks/trainingReportHook";
import evaluationHook from "../../hooks/evaluationHook";
const TraineeReportView = ({ data }) => {
  const [trigger, setTrigger] = useState(0);
  const userData = userHook.useUserById(SessionGetEmployeeId());
  const getUser = data?.trainingParticipants?.find((item) => item.employeeBadge === SessionGetEmployeeId());
  const effectiveness = getUser?.effectivenessId ? effectivenessHook.useEffectivenessById(getUser.effectivenessId, trigger):{};
  const report = getUser?.reportId  ? trainingReportHook.useTrainingReportById(getUser.reportId, trigger):{};
  const evaluation = getUser?.evaluationId? evaluationHook.useEvaluationById(getUser.evaluationId, trigger):{};
  const stepperRef = useRef();
  const handleOnFinish =()=>{
    setTimeout(() => {
    setTrigger(trigger+1)
    }, 1000);
  }
  useEffect(()=>{
    if(effectiveness?.data){
      stepperRef.current?.nextCallback();
    }else if(effectiveness?.data || report?.data){
      stepperRef.current?.nextCallback();
    }
  },[effectiveness?.data, report?.data, evaluation?.data])
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
          {data?.durationInHours >= OtherConstant.EFFECTIVENESS_MINHOUR && (
            <StepperPanel header="Training Effectiveness Form">
              <hr className="m-0" />
              <EffectivenessForm
                data={data}
                userData={userData?.data}
                formData={effectiveness?.data}
                onFinish={handleOnFinish}
                currentRouting={effectiveness?.data?.currentRouting}
                auditTrail={effectiveness?.data?.auditTrail}
              />
            </StepperPanel>
          )}
          {data?.status?.id === statusCode.PUBLISHED && (
            <StepperPanel header="Training Report Form">
              <hr className="m-0" />
              <TrainingReportForm
                data={data}
                userData={userData?.data}
                defaultValue={report?.data}
                onFinish={handleOnFinish}
                isSubmitted={report?.data ? true:false}
                currentRouting={report?.data?.currentRouting}
                auditTrail={report?.data?.auditTrail}
              />
            </StepperPanel>
          )}
          {data?.status?.id === statusCode.PUBLISHED && (
            <StepperPanel header="Evaluation Form">
              <hr className="m-0" />
              <EvaluationForm
                data={data}
                userData={userData}
                onFinish={handleOnFinish}
              />
            </StepperPanel>
          )}
        </Stepper>
      </Card>
    </div>
  );
};
TraineeReportView.propTypes = {
  data: proptype.object,
};
export default TraineeReportView;
