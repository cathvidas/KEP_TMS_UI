import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PendingView from "./MonitoringPageSection/PendingsView";
import MonitoringReportView from "./MonitoringPageSection/MonitoringReportView";
import MenuItemTemplate from "../components/General/MenuItemTemplate";
import MenuContainer from "../components/menus/MenuContainer";
import SkeletonBanner from "../components/Skeleton/SkeletonBanner";
import Layout from "../components/General/Layout";
import trainingRequestHook from "../hooks/trainingRequestHook";
import { ActivityType } from "../api/constants";

const MonitoringPage = () => {
  const { id, page } = useParams();
  const { data, error, loading } = trainingRequestHook.useTrainingRequest(
    parseInt(id)
  );
  const trainingForms = trainingRequestHook.useAllParticipantsReports(data?.trainingParticipants ?? []) 
  const [currentContent, setCurrentContent] = useState(0);
  const pageContent = [
      <PendingView key={0} data={data} formData={trainingForms}/>,
      <MonitoringReportView key={2} data={data} formData={trainingForms} reportType="examDetail" />,
      <MonitoringReportView key={2} data={data} formData={trainingForms} reportType="effectivenessDetail" typeId={ActivityType.EFFECTIVENESS} hasApprover/>,
      <MonitoringReportView key={3} data={data} formData={trainingForms} reportType="reportDetail" typeId={ActivityType.REPORT} hasApprover/>,
      <MonitoringReportView key={4}data={data} formData={trainingForms} reportType="evaluationDetail" typeId={ActivityType.EVALUATION}/>,
  ];
  const navigate = useNavigate();
  const monitoringMenuItem = [  {
    label: "Menu",
    items: [     
      { separator: true, template: MenuItemTemplate },
      {
        label: "Overview",
        icon: "pi pi-info-circle",
        command: () => navigate(`/KEP_TMS/TrainingMonitoring/${id}`),
        template: MenuItemTemplate,
        active: currentContent === 0 ? true : false,
      },
      {
        label: "Exam",
        icon: "pi pi-clock",
        command: () => navigate(`/KEP_TMS/TrainingMonitoring/${id}/Exam`),
        template: MenuItemTemplate,
        active: currentContent === 1 ? true : false,
      },
      {
        label: "Effectiveness",
        icon: "pi pi-check-square",
        command: () => navigate(`/KEP_TMS/TrainingMonitoring/${id}/Effectiveness`),
        template: MenuItemTemplate,
        active: currentContent === 2 ? true : false,
        disable: data?.durationInHours >= 16 ? false: true
      },
    {
      label: "Reports",
      icon: "pi pi-address-book",
      command: () => navigate(`/KEP_TMS/TrainingMonitoring/${id}/Reports`),
      template: MenuItemTemplate,
      active: currentContent === 3 ? true : false,
    },
    {
      label: "Evaluation",
      icon: "pi pi-file-check",
      command: () => navigate(`/KEP_TMS/TrainingMonitoring/${id}/Evaluation`),
      template: MenuItemTemplate,
      active: currentContent === 4 ? true : false,
    }]}]
  useEffect(() => {
     if (page === "Exam") {
      setCurrentContent(1);
    } else if (page === "Effectiveness" ) {
      setCurrentContent(2);
    }else if (page === "Reports") {
      setCurrentContent(3);
    } else if (page === "Evaluation" ) {
      setCurrentContent(4);
    } else {
        setCurrentContent(0);
    }
  }, [page]);
  const bodyContent = () => {
    return (
      <div className={`d-flex g-0`}>
        
        <MenuContainer itemList={monitoringMenuItem}/>
        {loading ? (
          <SkeletonBanner />
        ) : error ? (
          "Error while processing your request"
        ) : (
          <div
            className={`border-start p-3 pb-5 flex-grow-1`}
            style={{ minHeight: "calc(100vh - 50px)" }}
          >
            {pageContent[currentContent]}
          </div>
        )}
      </div>
    );
  };
  return (
    <>
      <Layout
        BodyComponent={bodyContent}
        header={{
          title: "Training View",
          icon: <i className="pi pi-lightbulb"></i>,
        }}
      />
    </>
  );
};
export default MonitoringPage;
