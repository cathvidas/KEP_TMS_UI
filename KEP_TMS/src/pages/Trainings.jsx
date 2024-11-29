import { useEffect, useState } from "react";
import Layout from "../components/General/Layout";
import TrainingRequestList from "../components/List/TrainingRequestList";
import SkeletonDataTable from "../components/Skeleton/SkeletonDataTable";
import trainingRequestHook from "../hooks/trainingRequestHook";
import { SessionGetEmployeeId } from "../services/sessions";
import { useNavigate, useParams } from "react-router-dom";
import MenuContainer from "../components/menus/MenuContainer";
import MenuItemTemplate from "../components/General/MenuItemTemplate";
import { APP_DOMAIN } from "../api/constants";
import activityLogHook from "../hooks/activityLogHook";
import PendingTaskList from "../components/List/PendingTaskList";

const Trainings = () => {
  const {page} = useParams();
  const [currentContent, setCurrentContent] = useState(0);
  const navigate = useNavigate();
  const pendings =  activityLogHook.useUserPendingTaskList(SessionGetEmployeeId())
  const {data,loading } = trainingRequestHook.useTrainingRequestByTraineeId(SessionGetEmployeeId());
  const trainerAssignedData = trainingRequestHook.useParticipantTrainings(
    SessionGetEmployeeId(),
    "trainer"
  );
  useEffect(() =>{
    if (page?.toUpperCase() === "TOCOMPLY") {
      setCurrentContent(1)
    }
    else {
      setCurrentContent(0)
    }
  }, [page,data, trainerAssignedData])
  const items =[{
    items: [
      {
        label: "Trainings",
        icon: "pi pi-address-book",
        command: () => navigate(`${APP_DOMAIN}/Trainings`),
        template: MenuItemTemplate,
        count: data?.length,
        active: currentContent === 0 ? true : false,
      },
      {
        label: "To Comply",
        icon: "pi pi-file-edit",
        command: () => navigate(`${APP_DOMAIN}/Trainings/ToComply`),
        template: MenuItemTemplate,
        count: pendings?.data?.length,
        active: currentContent === 1 ? true : false,
      },
    ]
  }]
  const Content = () => (
    <>
      <div className={`d-flex g-0`}>
        <MenuContainer fullHeight itemList={items} />

        <div className={`p-3 pb-5 flex-grow-1`} style={{ minHeight: "100vh" }}>
          {currentContent === 0 &&
            (loading ? (
              <SkeletonDataTable />
            ) : (
              <TrainingRequestList
                data={data}
                headingTitle={`Enrolled Trainings`}
                isTrainee
                allowEdit={false}
              />
            ))}
          {currentContent === 1 &&
            (pendings?.loading ? (
              <SkeletonDataTable />
            ) : (
              <PendingTaskList data={pendings?.data} />
            ))}
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
          hide: true
        }}
      />
    </>
  );
};
export default Trainings;
