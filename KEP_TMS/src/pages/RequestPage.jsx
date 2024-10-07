import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RequestMenu } from "../components/TrainingPageComponents/Menu.jsx";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/General/Layout.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { statusCode } from "../api/constants.jsx";
import OverviewSection from "./RequestPageSection/OverviewSection.jsx";
import ModuleSection from "./RequestPageSection/ModuleSection.jsx";
import ExamSection from "./RequestPageSection/ExamSection.jsx";
import trainingRequestHook from "../hooks/trainingRequestHook.jsx";
import TraineeReportView from "./TrainingPageSection/TraineeReportView.jsx";
import SkeletonList from "../components/Skeleton/SkeletonList.jsx";

const TrainingRequestPage = () => {
  const { id, page } = useParams();
  const { data, error, loading } = trainingRequestHook.useTrainingRequest(
    parseInt(id)
  );
  const Content = () => {
    const pages = [
      <>
        <OverviewSection data={data}/>
      </>,
      <>
        <ModuleSection data={data}/>
      </>,
      <>
        <ExamSection data={data}/>
      </>,
      <>
      <TraineeReportView/>
      </>
    ];
    const [currentContent, setCurrentContent] = useState();
    useEffect(() => {
      if (page === "Modules") {
        setCurrentContent(1);
      } else if (page === "Exams") {
        setCurrentContent(2);
      } else if (page === "Report"){
        setCurrentContent(3)
      }
       else {
        setCurrentContent(0);
      }
    }, [page]);
    return (
      <>
        <div className={`row g-0`}>
          {data.status?.id === statusCode.APPROVED && (
            <RequestMenu current={currentContent} reqId={data.id} />
          )}
          <div
            className={`${
              data.status?.id === statusCode.APPROVED && "border-start"
            } p-3 pb-5 col`}
            style={{ minHeight: "calc(100vh - 50px)" }}
          >
            {loading ? <SkeletonList/> : pages[currentContent]}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Layout
        BodyComponent={Content}
        header={{
          title: "Request Detail",
          icon: <FontAwesomeIcon icon={faFile} />,
        }}
      />
    </>
  );
};
export default TrainingRequestPage;
