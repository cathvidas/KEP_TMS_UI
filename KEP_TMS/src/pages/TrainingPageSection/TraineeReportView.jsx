import { Stepper } from "primereact/stepper";
import { SectionHeading } from "../../components/General/Section";
import { useRef } from "react";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";
import TrainingReportForm from "../../components/forms/TrainingReportForm";
import { Card } from "react-bootstrap";
import EvaluationForm from "../../components/forms/EvaluationForm";
import proptype from "prop-types"
import EffectivenessForm from "../../components/forms/EffectivenessForm";
import { SessionGetEmployeeId } from "../../services/sessions";
import userHook from "../../hooks/userHook";
const TraineeReportView = ({data}) => {
  const userData = userHook.useUserById(SessionGetEmployeeId());
  const stepperRef = useRef();
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
            onClick={() => stepperRef.current.nextCallback()}
          />
        )}
      </div>
    );
  };
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
        <StepperPanel header="Training Effectiveness Form">
          <EffectivenessForm data={data} userData={userData}/>
          {<StepperButton back={true} next={true} index={2} />}
        </StepperPanel>
          <StepperPanel header="Training Report Form">
            <TrainingReportForm data={data} userData={userData}/>
            {<StepperButton next={true} index={0} />}
          </StepperPanel>
          <StepperPanel header="Evaluation Form">
            <EvaluationForm data={data} userData={userData}/>
            {<StepperButton back={true} next={true} index={1} />}
          </StepperPanel>
        </Stepper>
      </Card>
    </div>
  );
};
TraineeReportView.propTypes = {
  data: proptype.object
}
export default TraineeReportView;
