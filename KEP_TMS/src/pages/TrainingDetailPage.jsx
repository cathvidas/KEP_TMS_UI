import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SessionGetEmployeeId, SessionGetRole } from "../services/sessions";
import {
  ActivityType,
  OtherConstant,
  statusCode,
  UserTypeValue,
} from "../api/constants";
import trainingRequestHook from "../hooks/trainingRequestHook";
import examHook from "../hooks/examHook";
import MenuItemTemplate from "../components/General/MenuItemTemplate";
import SkeletonBanner from "../components/Skeleton/SkeletonBanner";
import MenuContainer from "../components/menus/MenuContainer";
import Layout from "../components/General/Layout";
import { validateTrainingRequestForm } from "../services/inputValidation/validateTrainingRequestForm";
import { actionSuccessful, confirmAction } from "../services/sweetalert";
import handleResponseAsync from "../services/handleResponseAsync";
import trainingRequestService from "../services/trainingRequestService";
import { Button } from "primereact/button";
import SkeletonForm from "../components/Skeleton/SkeletonForm";
import OverviewSection from "./RequestPageSection/OverviewSection";
import ModuleView from "./TrainingPageSection/ModuleView";
import ExamView from "./TrainingPageSection/ExamView";
import TraineeReportView from "./TrainingPageSection/TraineeReportView";
import TraineeCertificateView from "./TrainingPageSection/TraineeCertificateView";
import MonitoringReportView from "./MonitoringPageSection/MonitoringReportView";
import PendingView from "./MonitoringPageSection/PendingsView";
import trainingDetailsService from "../services/common/trainingDetailsService";
import mappingHook from "../hooks/mappingHook";
import TrainingVideosList from "../components/List/TrainingVideosList";

const TrainingDetailPage = () => {
  const [trigger, setTrigger] = useState(0);
  const { page, id, section } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const [formtype, setFormType] = useState(null);
  const { data, error, loading } = trainingRequestHook.useTrainingRequest(
    parseInt(id),
    trigger
  );
  const refreshData = () => {
    setTrigger((prev) => prev + 1);
  };
  const isFacilitator = data?.trainingFacilitators?.some(
    (item) => item?.facilitatorBadge === SessionGetEmployeeId()
  );
  const isRequestor = data?.requesterBadge === SessionGetEmployeeId();
  const isApprover = data?.approvers?.some(
    (item) => item?.employeeBadge === SessionGetEmployeeId()
  );
  useEffect(() => {
    if (
      ((data?.status?.id === statusCode.APPROVED ||
        data?.status?.id === statusCode.CLOSED) &&
        (isFacilitator || isTrainee)) ||
      isAdmin || (data?.status?.id === statusCode.SUBMITTED && isTrainee)
    ) {
      setShowMenu(true);
    }
  }, [data]);
  const isAdmin =
    SessionGetRole() === UserTypeValue.ADMIN ||
    SessionGetRole() === UserTypeValue.SUPER_ADMIN;
  const isTrainee = data?.trainingParticipants?.find(
    (user) => user.employeeBadge === SessionGetEmployeeId()
  );
  const [currentContent, setCurrentContent] = useState(0);
  const trainingForms = trainingRequestHook.useAllParticipantsReports(
    data?.trainingParticipants ?? []
  );
  const logs = mappingHook.useMappedActivityLogs(data, data?.requestor);
  const examList = examHook.useAllTraineeExamByRequest(data?.id, trigger);
  const navigate = useNavigate();
  const pageContent = [
    <OverviewSection
      key={0}
      data={data}
      reloadData={refreshData}
      showParticipants={isFacilitator || isAdmin || isApprover || isRequestor}
      showFacilitators
      showApprovers={isAdmin || isRequestor || isApprover}
      isAdmin={isAdmin}
      userReports={
        isTrainee
          ? trainingForms?.data?.find(
              (item) =>
                item?.userDetail?.employeeBadge === SessionGetEmployeeId()
            )
          : null
      }
      logs={logs}
    />,
    <ModuleView
      key={1}
      reqData={data}
      isEditor={isAdmin || isFacilitator}
      isTrainee={isTrainee ? true : false}
    />,
    <ExamView
      key={2}
      reqData={data}
      isEditor={isAdmin || isFacilitator}
      isTrainee={isTrainee ? true : false}
    />,
    <TraineeCertificateView key={3} data={data} isAdmin={isAdmin} />,
    <TraineeReportView
      key={4}
      data={data}
      refreshData={refreshData}
      isTrainee={isTrainee}
      activityType={formtype}
    />,
    <MonitoringReportView
      key={5}
      data={data}
      formData={trainingForms}
      reportType="effectivenessDetail"
      typeId={ActivityType.EFFECTIVENESS}
      hasApprover
      onRefresh={refreshData}
    />,
    <MonitoringReportView
      key={6}
      data={data}
      formData={trainingForms}
      reportType="examDetail"
      typeId={ActivityType.EXAM}
      examDetail={examList?.data}
      onRefresh={refreshData}
    />,
    <MonitoringReportView
      key={7}
      data={data}
      formData={trainingForms}
      reportType="reportDetail"
      typeId={ActivityType.REPORT}
      hasApprover
      onRefresh={refreshData}
    />,
    <MonitoringReportView
      key={8}
      data={data}
      formData={trainingForms}
      reportType="evaluationDetail"
      typeId={ActivityType.EVALUATION}
    />,
    <PendingView
      key={9}
      data={data}
      formData={trainingForms}
      examDetail={examList?.data}
    />,
    <TrainingVideosList requestId={data?.id} key={10} />,
    // <ActivityLogView key={7} logs={logs} />,
  ];
  const items = [
    {
      label: isAdmin ? "Detail" : "",
      items: [
        {
          label: "Overview",
          icon: "pi pi-info-circle",
          command: () => navigate(`/KEP_TMS/TrainingDetail/${id}`),
          template: MenuItemTemplate,
          active: currentContent === 0 ? true : false,
        },
        {
          label: "Modules",
          icon: "pi pi-book",
          command: () => navigate(`/KEP_TMS/TrainingDetail/${id}/Modules`),
          template: MenuItemTemplate,
          active: currentContent === 1 ? true : false,
          disable: !(isAdmin || isFacilitator || isTrainee),
        },
        {
          label: "Videos",
          icon: "pi pi-video",
          command: () => navigate(`/KEP_TMS/TrainingDetail/${id}/Videos`),
          template: MenuItemTemplate,
          active: currentContent === 10 ? true : false,
          disable: !(isAdmin || isFacilitator || isTrainee),
        },
        {
          label: isAdmin || isFacilitator ? "Questionnaire" : "Exam",
          icon: "pi pi-list-check",
          command: () => navigate(`/KEP_TMS/TrainingDetail/${id}/Exams`),
          template: MenuItemTemplate,
          active: currentContent === 2,
          disable: !(isAdmin || isFacilitator || isTrainee),
        },
        {
          label: "Certificate",
          icon: "pi pi-upload",
          command: () => navigate(`/KEP_TMS/TrainingDetail/${id}/Certificate`),
          template: MenuItemTemplate,
          active: currentContent === 3 ? true : false,
          disable: !(
            (isAdmin || isTrainee) &&
            trainingDetailsService.checkTrainingScheduleStatus(data)?.isEnd
          ),
        },
      ],
    },
    isTrainee
      ? {
          label: "Forms",
          items: [
            {
              label: "Effectiveness",
              command: () =>
                navigate(`/KEP_TMS/TrainingDetail/${id}/Form/Effectiveness`),
              template: MenuItemTemplate,
              active:
                currentContent === 4 && formtype === ActivityType.EFFECTIVENESS,
              notifBadge:
                data?.status?.id === statusCode.SUBMITTED &&
                isTrainee?.effectivenessId === null,
              disable:
                data?.durationInHours < OtherConstant.EFFECTIVENESS_MINHOUR,
            },
            {
              label: "Training Report",
              command: () =>
                navigate(`/KEP_TMS/TrainingDetail/${id}/Form/Report`),
              template: MenuItemTemplate,
              active: currentContent === 4 && formtype === ActivityType.REPORT,
              notifBadge:
                isTrainee?.reportId === null &&
                trainingDetailsService.checkIfTrainingEndsAlready(data),
            },
            {
              label: "Evaluation",
              command: () =>
                navigate(`/KEP_TMS/TrainingDetail/${id}/Form/Evaluation`),
              template: MenuItemTemplate,
              active:
                currentContent === 4 && formtype === ActivityType.EVALUATION,
              notifBadge:
                isTrainee?.evaluationId === null &&
                trainingDetailsService.checkIfTrainingEndsAlready(data),
            },
          ],
        }
      : [],
    isAdmin || (isFacilitator && examList?.data?.length > 0)
      ? {
          label: "Trainee Monitoring",
          items: [
            {
              label: "Effectiveness",
              icon: "pi pi-check-square",
              command: () =>
                navigate(
                  `/KEP_TMS/TrainingDetail/${id}/Monitoring/Effectiveness`
                ),
              template: MenuItemTemplate,
              active: currentContent === 5 ? true : false,
              disable:
                data?.durationInHours >= OtherConstant.EFFECTIVENESS_MINHOUR &&
                isAdmin
                  ? false
                  : true,
            },
            {
              label: "Exam",
              icon: "pi pi-clock",
              command: () =>
                navigate(`/KEP_TMS/TrainingDetail/${id}/Monitoring/Exam`),
              template: MenuItemTemplate,
              active: currentContent === 6 ? true : false,
              disable: examList?.data?.length > 0 ? false : true,
            },
            {
              label: "Reports",
              icon: "pi pi-address-book",
              command: () =>
                navigate(`/KEP_TMS/TrainingDetail/${id}/Monitoring/Reports`),
              template: MenuItemTemplate,
              active: currentContent === 7 ? true : false,
              disable: !isAdmin,
            },
            {
              label: "Evaluation",
              icon: "pi pi-file-check",
              command: () =>
                navigate(
                  `/KEP_TMS/TrainingDetail/${id}/Monitoring/Evaluations`
                ),
              template: MenuItemTemplate,
              active: currentContent === 8 ? true : false,
              disable: !isAdmin,
            },
            {
              label: "Summary",
              icon: "pi pi-info-circle",
              command: () =>
                navigate(`/KEP_TMS/TrainingDetail/${id}/Monitoring/Summary`),
              template: MenuItemTemplate,
              active: currentContent === 9 ? true : false,
              disable: !isAdmin,
            },
          ],
        }
      : [],
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
    } else if (mainpage === "FORM") {
      if (pageSection === "EFFECTIVENESS") {
        setCurrentContent(4);
        setFormType(ActivityType.EFFECTIVENESS);
      } else if (pageSection === "REPORT") {
        setCurrentContent(4);
        setFormType(ActivityType.REPORT);
      } else if (pageSection === "EVALUATION") {
        setCurrentContent(4);
        setFormType(ActivityType.EVALUATION);
      }
    } else if (mainpage === "MONITORING") {
      if (pageSection === "EFFECTIVENESS") {
        setCurrentContent(5);
      } else if (pageSection === "EXAM") {
        setCurrentContent(6);
      } else if (pageSection === "REPORTS") {
        setCurrentContent(7);
      } else if (pageSection === "EVALUATIONS") {
        setCurrentContent(8);
      } else {
        setCurrentContent(9);
      }
    } else if (mainpage === "VIDEOS") {
      setCurrentContent(10);
    }else {
      setCurrentContent(0);
    }
  }, [section, page]);

  const handlePublish = (status) => {
    const newData = {
      ...validateTrainingRequestForm(data),
      statusId: status,
      updatedBy: SessionGetEmployeeId(),
    };
    const toRoute = status === statusCode.FORAPPROVAL;
    confirmAction({
      showLoaderOnConfirm: true,
      title: toRoute ? "Route to Approvers" : "Close Training Request",
      text: `Are you sure you want to ${
        toRoute ? "change the status to 'For Approval' and route to approvers" : "close"
      } this training request?`,
      confirmButtonText: toRoute ? "Yes" : "Close Training",
      onConfirm: () => {
        handleResponseAsync(
          () => trainingRequestService.updateTrainingRequest(newData),
          () =>
            actionSuccessful(
              ` ${toRoute ? "Routed" : "Closed"} successfully`,
              `Successfully ${
                toRoute ? "routed" : "closed"
              }  training request`
            ),
          (error) =>
            console.error("Error publishing training request: ", error),
          () => setTrigger((prev) => prev + 1)
        );
      },
    });
  };
  const bodyContent = () => {
    return (
      <div className={`d-flex g-0`}>
        {showMenu && data?.status?.id != statusCode.DRAFTED && data?.status?.id != statusCode.INACTIVE && !loading &&(
          <MenuContainer
            itemList={items}
            action={
              (data?.status?.id === statusCode.APPROVED) && isAdmin ? (
                <Button
                  type="button"
                  label={data?.status?.id === statusCode.APPROVED ? "Close Training" : "Route to Approvers"}
                  size="small"
                  severity={data?.status?.id === statusCode.APPROVED ? "success" : "help"}
                  className="rounded py-1"
                  onClick={() => handlePublish(data?.status?.id === statusCode.APPROVED ? statusCode.CLOSED : statusCode.FORAPPROVAL)}
                />
              ) : (
                <></>
              )
            }
          />
        )}
        <div
          className={` p-3 pb-5 flex-grow-1`}
          style={{ minHeight: "calc(100vh - 60px)" }}
        >
          {loading ? (
            <SkeletonBanner />
          ) : error ? (
            "Error while processing your request"
          ) : (
            pageContent[currentContent]
          )}
        </div>
      </div>
    );
  };
  return (
    <>
      {isTrainee || isFacilitator || isAdmin || isRequestor || isApprover ? (
        <Layout
          BodyComponent={bodyContent}
          header={{
            title: data?.trainingProgram?.name,
            hide: !showMenu,
            // icon: <i className="pi pi-lightbulb"></i>,
          }}
        />
      ) : (
        <Layout
          BodyComponent={() =>
            loading ? (
              <SkeletonForm />
            ) : (
              <div className="d-flex w-100 h-100 justify-content-center align-items-center h1 opacity-50 text-muted">
                Page Not Found
              </div>
            )
          }
          header={{
            title: "",
            hide: true,
          }}
        />
      )}
    </>
  );
};
export default TrainingDetailPage;
