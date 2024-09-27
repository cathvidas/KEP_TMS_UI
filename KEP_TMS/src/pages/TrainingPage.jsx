import { useParams } from "react-router-dom";
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
const TrainingPage = () => {
  const { id, page } = useParams();
  const { data, error, loading } = trainingRequestHooks.useTrainingRequest(
    parseInt(id)
  );
  const [currentPage, setCurrentContent] = useState(0);
  const pageContent = [
    <>
      <TrainingOverview data={data} />
    </>,
    <>
      <ModuleView />
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
        <TraineeMenu reqId={parseInt(id)} />
        {loading ? (
          <SkeletonBanner />
        ) : error ? (
          "Error while processing your request"
        ) : (
          <div
            className={`border-start p-3 pb-5 flex-grow-1`}
            style={{ minHeight: "calc(100vh - 50px)" }}
          >
            {pageContent[currentPage]}
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
