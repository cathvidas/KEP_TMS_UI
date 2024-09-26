import { useParams } from "react-router-dom";
import Layout from "../components/General/Layout";
import TraineeMenu from "../components/menus/TraineeMenu";
import trainingRequestHooks from "../hooks/trainingRequestHook";
import TrainingOverview from "./TrainingPageSection/TrainingOverview";
import SkeletonBanner from "../components/Skeleton/SkeletonBanner";
const TrainingPage = () => {
  const param = useParams();
  const { data, error, loading } = trainingRequestHooks.useTrainingRequest(parseInt(param.id));

  const bodyContent = () => {
    return (
      <div className={`row g-0`}>
        <TraineeMenu />
        {loading ? <SkeletonBanner/>: error ? "Error while processing your request":
        <div
          className={`border-start p-3 pb-5 col`}
          style={{ minHeight: "calc(100vh - 50px)" }}
        >
          <TrainingOverview data={data}/>
        </div>}
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
