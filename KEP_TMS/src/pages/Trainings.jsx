import { useEffect, useState } from "react";
import Layout from "../components/General/Layout";
import TrainingRequestList from "../components/List/TrainingRequestList";
import SkeletonBanner from "../components/Skeleton/SkeletonBanner";
import SkeletonDataTable from "../components/Skeleton/SkeletonDataTable";
import trainingRequestHook from "../hooks/trainingRequestHook";
import { SessionGetEmployeeId } from "../services/sessions";
import { useParams } from "react-router-dom";

const Trainings = () => {
  const {page} = useParams();
  const [currentData, setCurrentData] = useState([]);
  const {data, loading } = page?.toUpperCase() === "TRAINER" ? trainingRequestHook.useParticipantTrainings(
    SessionGetEmployeeId(),
    "trainer"
  ) :
    trainingRequestHook.useTrainingRequestByTraineeId(SessionGetEmployeeId());
  const trainerAssignedData = trainingRequestHook.useParticipantTrainings(
    SessionGetEmployeeId(),
    "trainer"
  );
  useEffect(() =>{
    if (page?.toUpperCase() === "TRAINER") {
      setCurrentData(trainerAssignedData.data)
    }
    else {
      setCurrentData(data)
    }
  }, [page, data, trainerAssignedData])
  const Content = () =>
    loading ? (
      <>
        <SkeletonBanner />
        <SkeletonDataTable />
      </>
    ) : (
      <>
        <div className={`d-flex g-0`}>
          <div
            className={`p-3 pb-5 flex-grow-1`}
            style={{ minHeight: "calc(100vh - 50px)" }}
          >
            <TrainingRequestList
              data={currentData}
              headingTitle={`Enrolled Trainings`}
              isTrainee
              allowEdit={false}
            />
          </div>
        </div>
      </>
    );
  return (
    <>
      <Layout
        navReference={page?.toUpperCase() === "TRAINER" ? "Trainings/Trainer" : "Trainings"}
        BodyComponent={Content}
        header={{
          title:page?.toUpperCase() === "TRAINER" ? "Trainings/Trainer" :  "Trainings",
          icon: <i className="pi pi-clipboard"></i>,
        }}
      />
    </>
  );
};
export default Trainings;
