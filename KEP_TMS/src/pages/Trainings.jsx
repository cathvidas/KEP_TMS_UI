import { useEffect, useState } from "react";
import Layout from "../components/General/Layout";
import TrainingRequestList from "../components/List/TrainingRequestList";
import SkeletonDataTable from "../components/Skeleton/SkeletonDataTable";
import { SessionGetEmployeeId } from "../services/sessions";
import { useNavigate, useParams } from "react-router-dom";
import MenuContainer from "../components/menus/MenuContainer";
import MenuItemTemplate from "../components/General/MenuItemTemplate";
import { APP_DOMAIN } from "../api/constants";
import activityLogHook from "../hooks/activityLogHook";
import PendingTaskList from "../components/List/PendingTaskList";
import ForEvaluationEffectiveness from "./ApproverPageSection/ForEvaluationEffectiveness";
import effectivenessHook from "../hooks/effectivenessHook";

const Trainings = () => {
  const { page } = useParams();
  const [trigger, setTrigger] = useState(0);
  const [currentContent, setCurrentContent] = useState(0);
  const navigate = useNavigate();
  const pendings = activityLogHook.useUserPendingTaskList(
    SessionGetEmployeeId()
  );
  const {data} = effectivenessHook.useEvaluatorAssignedEffectiveness(
    SessionGetEmployeeId(), trigger
  );
  const refreshData = () => {
    setTrigger(prev=>prev + 1);
  }
  useEffect(() => {
    if (page?.toUpperCase() === "TOCOMPLY") {
      setCurrentContent(1);
    } else if  (page?.toUpperCase() === "EFFECTIVENESSEVALUATION") {
      setCurrentContent(2);
    } else {
      setCurrentContent(0);
    }
  }, [page]);
  const items = [
    {
      items: [
        {
          label: "Trainings",
          icon: "pi pi-address-book",
          command: () => navigate(`${APP_DOMAIN}/Trainings`),
          template: MenuItemTemplate,
          // count: data?.length,
          active: currentContent === 0,
        },
        {
          label: "To Comply",
          icon: "pi pi-file-edit",
          command: () => navigate(`${APP_DOMAIN}/Trainings/ToComply`),
          template: MenuItemTemplate,
          count: pendings?.data?.length,
          active: currentContent === 1,
        },
        {
          label: "For Evaluation",
          //   icon: "pi pi-arrow-down-left-and-arrow-up-right-to-center",
          command: () => navigate("/KEP_TMS/Trainings/EffectivenessEvaluation"),
          active: currentContent === 2,
          template: MenuItemTemplate,
          badge: data?.length > 0 ?{value: data?.length}:false,
          disable: !(data?.length > 0 )
        },
      ],
    },
  ];
  const Content = () => (
    <>
      <div className={`d-flex g-0`}>
        <MenuContainer fullHeight itemList={items} />

        <div className={`p-3 pb-5 flex-grow-1`} style={{ minHeight: "100vh" }}>
          {currentContent === 0 && (
            <TrainingRequestList
              headingTitle={`Enrolled Trainings`}
              isTrainee
              allowEdit={false}
            />
          )}
          {currentContent === 1 &&
            (pendings?.loading ? (
              <SkeletonDataTable />
            ) : (
              <PendingTaskList data={pendings?.data} />
            ))}
            {currentContent === 2 &&
                <ForEvaluationEffectiveness key={3}  data={data} refreshData={refreshData}/>
            }
        </div>
      </div>
    </>
  );
  return (
    <>
      <Layout
        navReference={
          page?.toUpperCase() === "TRAINER" ? "Trainings/Trainer" : "Trainings"
        }
        BodyComponent={Content}
        header={{
          title:
            page?.toUpperCase() === "TRAINER"
              ? "Trainings/Trainer"
              : "Trainings",
          icon: <i className="pi pi-clipboard"></i>,
          hide: true,
        }}
      />
    </>
  );
};
export default Trainings;
