import proptype from "prop-types"
import { SectionHeading } from "../../components/General/Section";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { useRef } from "react";
import { Button } from "primereact/button";
import ExamConfirmDialog from "../../components/Modal/ExamConfirmDialog";
const ExamView =({exams})=>{
    const stepperRef = useRef();
    return(<>
    <SectionHeading title="Exams" icon={<i className="pi pi-box"></i>}/>
    <Stepper linear ref={stepperRef} style={{ flexBasis: '50rem' }} orientation="vertical">
    <StepperPanel header="Header I">
        <div className="flex flex-column h-12rem">
            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content I</div>
        </div>
        <div className="flex py-4">
            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
        </div>
    </StepperPanel>
    <StepperPanel header="Header II">
        <div className="flex flex-column h-12rem">
            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content II</div>
        </div>
        <div className="flex py-4 gap-2">
            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
        </div>
    </StepperPanel>
    <StepperPanel header="Header III">
        <div className="flex flex-column h-12rem">
            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content III</div>
        </div>
        <div className="flex py-4">
            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
        </div>
    </StepperPanel>
</Stepper>
<ExamConfirmDialog/>
    </>)

}
ExamView.propTypes ={
    exam: proptype.array
}
export default ExamView;    