import { SearchValueConstant } from "../api/constants";
import Layout from "../components/General/Layout";
import TrainingRequestList from "../components/List/TrainingRequestList";
import SkeletonBanner from "../components/Skeleton/SkeletonBanner";
import SkeletonDataTable from "../components/Skeleton/SkeletonDataTable";
import trainingRequestHook from "../hooks/trainingRequestHook";
import { SessionGetEmployeeId } from "../services/sessions";

const TrainerPage = () => {
  const { data, loading } =
    trainingRequestHook.usePagedTrainingRequest(1, 10, SearchValueConstant.FACILITATOR,
      SessionGetEmployeeId()
    );

  const Content = () => (
    <div className="p-3">
      {loading ? (
        <>
          <SkeletonBanner />
          <SkeletonDataTable />
        </>
      ) : (
        <>
          <TrainingRequestList
            data={data.results}
            headingTitle="Assigned Trainings to Facilitate"
            isFacilitator
            allowEdit={false}
          />
        </>
      )}
    </div>
  );
  return (
    <>
      <Layout
        navReference="FacilitatedTrainings"
        BodyComponent={Content}
        header={{
          title: "TrainerPage",
          icon: <i className="pi pi-clipboard"></i>,
          hide: true,
        }}
      />
    </>
  );
};
export default TrainerPage;
