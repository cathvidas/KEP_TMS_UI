import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/General/Layout";
import trainingRequestHooks from "../hooks/trainingRequestHook";
import SkeletonBanner from "../components/Skeleton/SkeletonBanner";
import { useEffect, useState } from "react";
import ModuleView from "./TrainingPageSection/ModuleView";
import ExamView from "./TrainingPageSection/ExamView";
import TraineeReportView from "./TrainingPageSection/TraineeReportView";
import PendingView from "./MonitoringPageSection/PendingsView";
import MenuContainer from "../components/menus/MenuContainer";
import { SessionGetEmployeeId, SessionGetRole } from "../services/sessions";
import { statusCode } from "../api/constants";
import MenuItemTemplate from "../components/General/MenuItemTemplate";
import MonitoringReportView from "./MonitoringPageSection/MonitoringReportView";
import OverviewSection from "./RequestPageSection/OverviewSection";
import trainingRequestHook from "../hooks/trainingRequestHook";
import activityLogHook from "../hooks/activityLogHook";
import ActivityLogView from "./TrainingPageSection/ActivityLogView";
const TrainingPage = () => {
  const { id, page } = useParams();
  const { data, error, loading } = trainingRequestHooks.useTrainingRequest(
    parseInt(id)
  );
  const isFacilitator = data?.trainingFacilitators?.some(
    (item) => item?.employeeBadge === SessionGetEmployeeId()
  );
  const isAdmin =
    SessionGetRole() === "Admin" || SessionGetRole() === "SuperAdmin"
      ? true
      : false;
  const isTrainee = data?.trainingParticipants?.find(
    (user) => user.employeeBadge === SessionGetEmployeeId()
  );
  const [currentContent, setCurrentContent] = useState(0);
  const trainingForms = trainingRequestHook.useAllParticipantsReports(
    data?.trainingParticipants ?? []
  );

  const logs = activityLogHook.useTrainingRequestActivityLogs(
    data,
    trainingForms?.data
  );
  const pageContent = [
    <OverviewSection
      key={0}
      data={data}
      showParticipants={isFacilitator === true ? isFacilitator : isAdmin}
      showFacilitators={isAdmin}
      showApprovers={isAdmin}
    />,
    <ModuleView key={1} reqId={data.id} />,
    <ExamView key={2} />,
    <PendingView key={3} data={data} formData={trainingForms} />,
    <TraineeReportView key={4} data={data} />,
    <MonitoringReportView key={5} data={data} />,
    <ActivityLogView key={6} logs={logs} />,
  ];
  useEffect(() => {
    if (data?.status?.id === statusCode.SUBMITTED) {
      const hasPendings = trainingForms?.data?.some(
        (item) =>
          item?.effectivenessDetail?.currentRouting?.statusId !=
          statusCode.APPROVED
      );
      if (!hasPendings) {
        // const reponse =  trainingRequestService.updateTrainingRequest({...mapTrainingRequestDetails(data), statusId: ""})
      }
    }
  }, [trainingForms?.data]);
  const navigate = useNavigate();
  const items = [
    {
      label: "Menu",
      items: [
        { separator: true, template: MenuItemTemplate },
        {
          label: "Overview",
          icon: "pi pi-info-circle",
          command: () => navigate(`/KEP_TMS/Training/${id}`),
          template: MenuItemTemplate,
          active: currentContent === 0 ? true : false,
        },
        {
          label: "Modules",
          icon: "pi pi-folder",
          command: () => navigate(`/KEP_TMS/Training/${id}/Modules`),
          template: MenuItemTemplate,
          active: currentContent === 1 ? true : false,
          disable: data?.status?.id !== statusCode.PUBLISHED ? true : false,
        },
        {
          label: "Exam",
          icon: "pi pi-list-check",
          command: () => navigate(`/KEP_TMS/Training/${id}/Exams`),
          template: MenuItemTemplate,
          active: currentContent === 2 ? true : false,
          disable: data?.status?.id !== statusCode.PUBLISHED ? true : false,
        },
        {
          label: "Participants",
          icon: "pi pi-users",
          command: () => navigate(`/KEP_TMS/Training/${id}/Participants`),
          template: MenuItemTemplate,
          active: currentContent === 3 ? true : false,
          disable:
            isAdmin || SessionGetEmployeeId() === data.requestorBadge
              ? false
              : true,
        },
        {
          label: "Reports",
          icon: "pi pi-address-book",
          command: () => navigate(`/KEP_TMS/Training/${id}/Reports`),
          template: MenuItemTemplate,
          active: currentContent === 4 ? true : false,
          notifBadge:
            (data?.status?.id === statusCode.SUBMITTED &&
              isTrainee &&
              isTrainee?.effectivenessId === null) ||
            (data?.status?.id === statusCode.PUBLISHED &&
              isTrainee &&
              (isTrainee?.reportId === null ||
                isTrainee?.evaluationId === null))
              ? true
              : false,
          disable: !isTrainee,
        },
        {
          label: "Activity Log",
          icon: "pi pi-address-book",
          command: () => navigate(`/KEP_TMS/Training/${id}/Logs`),
          template: MenuItemTemplate,
          active: currentContent === 6 ? true : false,
          disable: !isAdmin,
        },
      ],
    },
  ];
  useEffect(() => {
    if (page === "Modules") {
      setCurrentContent(1);
    } else if (page === "Exams") {
      setCurrentContent(2);
    } else if (page === "Participants") {
      setCurrentContent(3);
    } else if (page === "Reports") {
      setCurrentContent(4);
    } else if (page === "Pendings") {
      setCurrentContent(5);
    } else if (page === "Effectiveness") {
      setCurrentContent(5);
    } else if (page === "Evaluation") {
      setCurrentContent(5);
    } else if (page === "Logs") {
      setCurrentContent(6);
    } else {
      setCurrentContent(0);
    }
  }, [page]);
  const bodyContent = () => {
    return (
      <div className={`d-flex g-0`}>
        <MenuContainer itemList={items} />
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
export default TrainingPage;
