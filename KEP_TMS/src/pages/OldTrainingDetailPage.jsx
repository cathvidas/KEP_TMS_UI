import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import oldTrainingsHook from "../hooks/oldTrainingsHook";
import Layout from "../components/General/Layout";
import SkeletonForm from "../components/Skeleton/SkeletonForm";
import ErrorTemplate from "../components/General/ErrorTemplate";
import { SessionGetRole } from "../services/sessions";
import { ActivityType, APP_DOMAIN, OtherConstant, TrainingType, UserTypeValue } from "../api/constants";
import MenuContainer from "../components/menus/MenuContainer";
import OverviewSection from "./RequestPageSection/OverviewSection";
import MenuItemTemplate from "../components/General/MenuItemTemplate";
import MonitoringReportView from "./MonitoringPageSection/MonitoringReportView";
import PendingView from "./MonitoringPageSection/PendingsView";
import PrevPageBackButton from "../components/General/PrevPageBackButton";

const OldTrainingDetailPage = () => {
  const {type, page, id, section } = useParams();
  const navigate = useNavigate();
  const { data, error, loading } =  oldTrainingsHook.useOldTrainingRequestById(type?.toLocaleLowerCase() == "external" ? TrainingType.EXTERNAL : TrainingType.INTERNAL,
    parseInt(id),
  );
  const trainingForms = oldTrainingsHook.useOldTrainingForms(data?.id, type?.toLocaleLowerCase() == "external" ? TrainingType.EXTERNAL : TrainingType.INTERNAL, data?.trainingParticipants);
  const [currentContent, setCurrentContent] = useState(0);
  const hasAccess = SessionGetRole() === UserTypeValue.ADMIN;
  const pageBaseUrl = `${APP_DOMAIN}/OldTrainingDetail/${type}/${id}`;
  const items = [
    {
      items: [
        {
          label: "Detail",
          icon: "pi pi-info-circle",
          command: () => navigate(`${pageBaseUrl}`),
          template: MenuItemTemplate,
          active: currentContent === 0,
        },
      ],
    },
    {
      label: "Trainee Monitoring",
      items: [
        {
          label: "Effectiveness",
          icon: "pi pi-check-square",
          command: () =>
            navigate(`${pageBaseUrl}/Monitoring/Effectiveness`),
          template: MenuItemTemplate,
          active: currentContent === 5,
          disable: !(
            data?.durationInHours >= OtherConstant.EFFECTIVENESS_MINHOUR
          ),
        },
        {
          label: "Reports",
          icon: "pi pi-address-book",
          command: () =>
            navigate(`${pageBaseUrl}/Monitoring/Reports`),
          template: MenuItemTemplate,
          active: currentContent === 7,
        },
        {
          label: "Evaluation",
          icon: "pi pi-file-check",
          command: () =>
            navigate(`${pageBaseUrl}/Monitoring/Evaluations`),
          template: MenuItemTemplate,
          active: currentContent === 8,
        },
        {
          label: "Summary",
          icon: "pi pi-info-circle",
          command: () =>
            navigate(`${pageBaseUrl}/Monitoring/Summary`),
          template: MenuItemTemplate,
          active: currentContent === 9,
        },
      ],
    },
  ];
  const pageContent = [
    <OverviewSection
      key={0}
      data={data}
      // reloadData={refreshData}
      // showParticipants={isFacilitator || isAdmin || isApprover || isRequestor}
      showFacilitators
      showApprovers
      isAdmin={hasAccess}
      isOldSystem
      // logs={logs}
    />,
    <MonitoringReportView
      key={1}
      data={data}
      formData={trainingForms}
      reportType="effectivenessDetail"
      typeId={ActivityType.EFFECTIVENESS}
      hasApprover
      oldSystem
      // onRefresh={refreshData}
    />,
    <MonitoringReportView
      key={2}
      data={data}
      formData={trainingForms}
      reportType="reportDetail"
      typeId={ActivityType.REPORT}
      hasApprover
      oldSystem
      // onRefresh={refreshData}
    />,
    <MonitoringReportView
      key={3}
      data={data}
      formData={trainingForms}
      reportType="evaluationDetail"
      typeId={ActivityType.EVALUATION}
      oldSystem
    />,
    <PendingView
      key={4}
      data={data}
      formData={trainingForms}
      oldSystem
    />,
  ];
  useEffect(() => {
    const mainpage = page?.toUpperCase();
    const pageSection = section?.toUpperCase();
    if (mainpage === "MODULES") {
      setCurrentContent(1);
    } else if (mainpage === "EXAMS") {
      setCurrentContent(2);
    } else if (mainpage === "CERTIFICATE") {
      setCurrentContent(3);
    } else if (mainpage === "MONITORING") {
      if (pageSection === "EFFECTIVENESS") {
        setCurrentContent(1);
      } else if (pageSection === "EXAM") {
        setCurrentContent(6);
      } else if (pageSection === "REPORTS") {
        setCurrentContent(2);
      } else if (pageSection === "EVALUATIONS") {
        setCurrentContent(3);
      } else {
        setCurrentContent(4);
      }
    } else if (mainpage === "VIDEOS") {
      setCurrentContent(10);
    } else {
      setCurrentContent(0);
    }
  }, [section, page]);

  const bodyContent = () => {
    return (
      <>
        <div className={`d-flex g-0`}>
          <MenuContainer itemList={items} />
          <div
            className={` p-3 pb-5 flex-grow-1`}
            style={{ minHeight: "calc(100vh - 60px)" }}
          >
            {pageContent[currentContent]}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Layout
        BodyComponent={
          loading
            ? () => <SkeletonForm />
            : error
            ? () => <ErrorTemplate message={error} center className="py-5" />
            : hasAccess
            ? bodyContent
            : () => (
                <div className="d-flex w-100 h-100 justify-content-center align-items-center h1 opacity-50 text-muted">
                  Page Not Found
                </div>
              )
        }
        header={{
          title: hasAccess ? data?.trainingProgram?.name : "",
          hide: !(!loading && !error && hasAccess),
          headerComponent: <PrevPageBackButton className="ms-auto" text/>
          // icon: <i className="pi pi-lightbulb"></i>,
        }}
      />
    </>
  );
};
export default OldTrainingDetailPage;
