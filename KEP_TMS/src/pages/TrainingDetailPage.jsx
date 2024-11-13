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

const TrainingDetailPage = () => {
  const [trigger, setTrigger] = useState(0);
  const { page, id, section } = useParams();

  const { data, error, loading } = trainingRequestHook.useTrainingRequest(
    parseInt(id),
    trigger
  );
  const refreshData = () => {
    setTrigger((prev) => prev + 1);
  };
  const isFacilitator = data?.trainingFacilitators?.some(
    (item) => item?.employeeBadge === SessionGetEmployeeId()
  );
  const isRequestor = data?.requestorBadge === SessionGetEmployeeId();
  const isApprover = data?.approvers?.some(
    (item) => item?.employeeBadge === SessionGetEmployeeId()
  );
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
  console.log(data, data?.requestor, logs);
  const traineeAccess =
    data?.status?.id === statusCode.PUBLISHED ||
    data?.status?.id === statusCode.CLOSED;
  const examList = examHook.useAllTraineeExamByRequest(data?.id);
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
    <TraineeReportView
      key={3}
      data={data}
      refreshData={refreshData}
      isTrainee={isTrainee}
    />,
    <TraineeCertificateView key={4} data={data} />,
    <MonitoringReportView
      key={5}
      data={data}
      formData={trainingForms}
      reportType="effectivenessDetail"
      typeId={ActivityType.EFFECTIVENESS}
      hasApprover
    />,
    <MonitoringReportView
      key={6}
      data={data}
      formData={trainingForms}
      reportType="examDetail"
      typeId={ActivityType.EXAM}
      examDetail={examList?.data}
    />,
    <MonitoringReportView
      key={7}
      data={data}
      formData={trainingForms}
      reportType="reportDetail"
      typeId={ActivityType.REPORT}
      hasApprover
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
          icon: "pi pi-folder",
          command: () => navigate(`/KEP_TMS/TrainingDetail/${id}/Modules`),
          template: MenuItemTemplate,
          active: currentContent === 1 ? true : false,
          disable: !(isAdmin || isFacilitator || (isTrainee && traineeAccess)),
        },
        {
          label: isAdmin || isFacilitator ? "Questionnaire" : "Exam",
          icon: "pi pi-list-check",
          command: () => navigate(`/KEP_TMS/TrainingDetail/${id}/Exams`),
          template: MenuItemTemplate,
          active: currentContent === 2 ? true : false,
          disable: !(isAdmin || isFacilitator || (isTrainee && traineeAccess)),
        },
        {
          label: "Reports",
          icon: "pi pi-address-book",
          command: () => navigate(`/KEP_TMS/TrainingDetail/${id}/Reports`),
          template: MenuItemTemplate,
          active: currentContent === 3 ? true : false,
          notifBadge:
            (data?.status?.id === statusCode.SUBMITTED &&
              isTrainee &&
              isTrainee?.effectivenessId === null) ||
            (data?.status?.id === statusCode.PUBLISHED &&
              isTrainee &&
              (isTrainee?.reportId === null ||
                isTrainee?.evaluationId === null) &&
              trainingDetailsService.checkIfTrainingEndsAlready(data))
              ? true
              : false,
          disable: !isTrainee,
        },
        {
          label: "Certificate",
          icon: "pi pi-file-arrow-up",
          command: () => navigate(`/KEP_TMS/TrainingDetail/${id}/Certificate`),
          template: MenuItemTemplate,
          active: currentContent === 4 ? true : false,
          disable: !(
            (isAdmin || isTrainee) &&
            trainingDetailsService.checkTrainingScheduleStatus(data)?.isEnd
          ),
        },
      ],
    },
    isAdmin
      ? {
          label: "Monitoring",
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
                data?.durationInHours >= OtherConstant.EFFECTIVENESS_MINHOUR
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
            },
            {
              label: "Reports",
              icon: "pi pi-address-book",
              command: () =>
                navigate(`/KEP_TMS/TrainingDetail/${id}/Monitoring/Reports`),
              template: MenuItemTemplate,
              active: currentContent === 7 ? true : false,
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
            },
            {
              label: "Summarry",
              icon: "pi pi-info-circle",
              command: () =>
                navigate(`/KEP_TMS/TrainingDetail/${id}/Monitoring/Summary`),
              template: MenuItemTemplate,
              active: currentContent === 9 ? true : false,
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
    } else if (mainpage === "REPORTS") {
      setCurrentContent(3);
    } else if (mainpage === "CERTIFICATE") {
      setCurrentContent(4);
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
    } else {
      setCurrentContent(0);
    }
  }, [section, page]);

  const handlePublish = (status) => {
    const newData = {
      ...validateTrainingRequestForm(data),
      statusId: status,
      updatedBy: SessionGetEmployeeId(),
    };
    const isPublish = status === statusCode.PUBLISHED;
    confirmAction({
      showLoaderOnConfirm: true,
      title: isPublish ? "Publish Training Request" : "Close Training Request",
      text: `Are you sure you want to ${
        isPublish ? "publish" : "close"
      } this training request?`,
      confirmButtonText: isPublish ? "Publish" : "Close Training",
      onConfirm: () => {
        handleResponseAsync(
          () => trainingRequestService.updateTrainingRequest(newData),
          () =>
            actionSuccessful(
              ` ${isPublish ? "Published" : "Closed"} successfully`,
              `Successfully ${
                isPublish ? "published" : "closed"
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
        {(traineeAccess ||
          (!trainingDetailsService.checkTrainingIfOutDated(data) &&
            ((data?.status?.id === statusCode.APPROVED &&
              (isFacilitator || isAdmin)) ||
              (data?.status?.id === statusCode.SUBMITTED &&
                (isTrainee || isAdmin))))) && (
          <MenuContainer
            itemList={items}
            action={
              data?.status?.id === statusCode.APPROVED &&
              (isAdmin || isFacilitator) ? (
                <Button
                  type="button"
                  label="Publish"
                  size="small"
                  severity="info"
                  className="rounded py-1"
                  onClick={() => handlePublish(statusCode.PUBLISHED)}
                />
              ) : data?.status?.id === statusCode.PUBLISHED && isAdmin ? (
                <Button
                  type="button"
                  label="Close Training"
                  size="small"
                  severity="success"
                  className="rounded py-1"
                  onClick={() => handlePublish(statusCode.CLOSED)}
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
          navReference={
            isRequestor
              ? "RequestList"
              : isFacilitator
              ? "FacilitatedTrainings"
              : isTrainee
              ? "Trainings"
              : "RequestList"
          }
          header={{
            title: data?.trainingProgram?.name,
            // hide: true
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
