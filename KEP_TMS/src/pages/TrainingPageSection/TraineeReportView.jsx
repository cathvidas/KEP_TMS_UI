import { SectionHeading } from "../../components/General/Section";
import { useEffect, useRef, useState } from "react";
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
import { Toast } from "primereact/toast";
import { TabMenu } from "primereact/tabmenu";
const TraineeReportView = ({ data }) => {
  
  const toast = useRef(null);
  const [trigger, setTrigger] = useState(0);
  const userData = userHook.useUserById(SessionGetEmployeeId());
  const getUser = data?.trainingParticipants?.find((item) => item.employeeBadge === SessionGetEmployeeId());
  const effectiveness = getUser?.effectivenessId ? effectivenessHook.useEffectivenessById(getUser.effectivenessId, trigger):{};
  const report = getUser?.reportId  ? trainingReportHook.useTrainingReportById(getUser.reportId, trigger):{};
  const evaluation = getUser?.evaluationId? evaluationHook.useEvaluationById(getUser.evaluationId, trigger):{};
  const [formIndex, setFormIndex] = useState(0);
  const [reportStatus, setReportStatus] = useState({
    show: false,
    statusId: 0,
    summary: "s",
    detail: "sh",
    severity: "error"
  });
  const showSticky = () => {
    if (reportStatus.show) {
      toast.current?.clear();
      toast.current?.show({
        severity: reportStatus?.severity,
        summary: reportStatus?.summary,
        detail: reportStatus?.detail,
        sticky: true,
        content: reportStatus?.content
      });
    }
  };
 
  const handleOnFinish =()=>{
    alert(1)
    setTimeout(() => {
    setTrigger((prev)=>prev+1)
    }, 1000);
  }
  useEffect(()=>{
    if(effectiveness?.data){
      setFormIndex(1);
    }else if(effectiveness?.data || report?.data){
      setFormIndex(2);
    }
  },[effectiveness?.data, report?.data, evaluation?.data])
  useEffect(() => {
    if(formIndex === 0){
      // setReportStatus({
      //   show: true,
      //   statusId: statusCode.PUBLISHED,
      //   summary: "Effectiveness Form Submitted Successfully",
      //   detail: "Effectiveness Form submitted successfully",
      //   severity: "success",
      // });
    }
    else if (formIndex === 1) {
      // setReportStatus({
      //   show: true,
      //   statusId: statusCode.PUBLISHED,
      //   summary: "Training Report Submitted Successfully",
      //   detail: "Training Report submitted successfully",
      //   severity: "success",
      // });
    }else if(formIndex === 2) {
      // setReportStatus({
      //   show: true,
      //   statusId: statusCode.SUBMITTED,
      //   summary: "Training Evaluation Submitted Successfully",
      //   detail: "Training Report submitted successfully",
      //   severity: "success",
      // });
    }
  }, [formIndex]);
  const items = [
    {
        label: 'Effectiveness Form',
        icon: "pi pi-check",
        command: () => setFormIndex(0),
    },
    {
        label: 'Training Report',
        command: () => setFormIndex(1),
        activeIndex: true
    },
    {
        label: 'Evaluation Form',
        command: () => setFormIndex(2)
    },
];
console.log(formIndex)
  return (
    <div className="w-100 oveflow-hidden">
      { showSticky()}
      <SectionHeading title="Trainee Report" />
      <Card className="p overflow-hidden">
        <Card.Body className="mt-0">
      <TabMenu model={items} activeIndex={formIndex} onTabChange={(e)=>setFormIndex(e.index)}/>
     {
      formIndex === 0 && data?.durationInHours >= OtherConstant.EFFECTIVENESS_MINHOUR &&     
      <EffectivenessForm
      data={data}
      userData={userData?.data}
      formData={effectiveness?.data}
      onFinish={handleOnFinish}
      currentRouting={effectiveness?.data?.currentRouting}
      auditTrail={effectiveness?.data?.auditTrail?.length > 0 && effectiveness?.data?.auditTrail[0]}
    />
      }
      {
        formIndex === 1 && data?.status?.id === statusCode.PUBLISHED &&
        <TrainingReportForm
          data={data}
          userData={userData?.data}
          defaultValue={report?.data ?? null}
          onFinish={handleOnFinish}
          isSubmitted={report?.data ? true:false}
          currentRouting={report?.data?.currentRouting}
          auditTrail={report?.data?.auditTrail}
        />
      }
      {
        formIndex === 2 && data?.status?.id === statusCode.PUBLISHED &&
        <EvaluationForm
          data={data}
          userData={userData?.data}
          onFinish={handleOnFinish}
          defaultValue={evaluation?.data}
        />
      
     }</Card.Body>
      </Card>
      <Toast ref={toast} position="bottom-center" className="z-1" />
    </div>
  );
};
TraineeReportView.propTypes = {
  data: proptype.object,
};
export default TraineeReportView;
