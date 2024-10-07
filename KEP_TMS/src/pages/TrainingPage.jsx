import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/General/Layout";
import TraineeMenu from "../components/menus/TraineeMenu";
import trainingRequestHooks from "../hooks/trainingRequestHook";
import TrainingOverview from "./TrainingPageSection/TrainingOverview";
import SkeletonBanner from "../components/Skeleton/SkeletonBanner";
import { useEffect, useState } from "react";
import ModuleView from "./TrainingPageSection/ModuleView";
import ExamView from "./TrainingPageSection/ExamView";
import ParticipantsView from "./TrainingPageSection/ParticipantsView";
import TraineeReportView from "./TrainingPageSection/TraineeReportView";
import PendingView from "./TrainingPageSection/PendingsView";
import MenuContainer from "../components/menus/MenuContainer";
import { SessionGetEmployeeId, SessionGetRole } from "../services/sessions";
import { statusCode } from "../api/constants";
import MenuItemTemplate from "../components/General/MenuItemTemplate";
import { Badge } from "react-bootstrap";
const TrainingPage = () => {
  const { id, page } = useParams();
  const { data, error, loading } = trainingRequestHooks.useTrainingRequest(
    parseInt(id)
  );
  const [currentContent, setCurrentContent] = useState(0);
  const pageContent = [
    <>
      <TrainingOverview data={data} />
    </>,
    <>
      <ModuleView reqId={data.id} />
    </>,
    <>
      <ExamView />
    </>,
    <>
      <ParticipantsView data={data?.trainingParticipants} />
    </>,
      <>
      <TraineeReportView data={data}/>
      </>,
      <>
      <PendingView data={data}/>
      </>
  ];
  const navigate = useNavigate()
  const items = [
    {
      label: "Menu",
      items: [
        {separator: true,
          template: MenuItemTemplate
        },
        {
          label: "Overview",
          icon: "pi pi-info-circle",
          command: () => navigate(`/KEP_TMS/Training/${id}`),
          template: MenuItemTemplate,
          active: currentContent === 0 ? true : false
        },
        ...(data?.status?.id === statusCode.FORAPPROVAL ?    [{
          label: "Modules",
          icon: "pi pi-folder",
          command: () => navigate(`/KEP_TMS/Training/${id}/Modules`),
          template: MenuItemTemplate,
          active: currentContent === 1 ? true : false
        },
        {
          label: "Exam",
          icon: "pi pi-list-check",
          command: () => navigate(`/KEP_TMS/Training/${id}/Exams`),
          template: MenuItemTemplate,
        }]: []),
     
        (SessionGetEmployeeId() === data.requestorBadge
          ? {
              label: "Participants",
              icon: "pi pi-users",
              command: () => navigate(`/KEP_TMS/Training/${id}/Participants`),
              template: MenuItemTemplate,
              active: currentContent === 3 ? true : false
            }
          : []),
        {
          label: "Reports",
          icon: "pi pi-address-book",
          command: () => navigate(`/KEP_TMS/Training/${id}/Report`),
          template: MenuItemTemplate,
          active: currentContent === 4 ? true : false,
          notifBadge: data?.status?.id === statusCode.SUBMITTED ? true : false
        },
        (SessionGetRole() === "Admin" ||  SessionGetRole() === "SuperAdmin"?
        {
          label: "Pendings",
          icon: "pi pi-bookmark",
          command: () => navigate(`/KEP_TMS/Training/${id}/Pendings`),
        }:[]),
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
    }else if (page === "Report") {
      setCurrentContent(4);
    } else if (page === "Pendings") {
      setCurrentContent(5);
    } else {
      setCurrentContent(0);
    }
  }, [page]);
  const bodyContent = () => {
    return (
      <div className={`d-flex g-0`}>
        
        <MenuContainer itemList={items}/>
        {/* <TraineeMenu reqId={parseInt(id)} /> */}
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
