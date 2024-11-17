import { useEffect, useState } from "react";
import Layout from "../components/General/Layout";
import TrainingRequestList from "../components/List/TrainingRequestList";
import SkeletonBanner from "../components/Skeleton/SkeletonBanner";
import SkeletonDataTable from "../components/Skeleton/SkeletonDataTable";
import trainingRequestHook from "../hooks/trainingRequestHook";
import { SessionGetEmployeeId, SessionGetRole } from "../services/sessions";
import MenuItemTemplate from "../components/General/MenuItemTemplate";
import { useNavigate, useParams } from "react-router-dom";
import MenuContainer from "../components/menus/MenuContainer";
import { UserTypeValue } from "../api/constants";

const Trainings = () => {
  const { mappedData, loading } =
    trainingRequestHook.useTrainingRequestByTraineeId(SessionGetEmployeeId());
  const trainerAssignedData = trainingRequestHook.useParticipantTrainings(
    SessionGetEmployeeId(),
    "trainer"
  );
  const { page } = useParams();
  const navigate = useNavigate();
  const [currentContent, setCurrentContent] = useState(0);
  const [currentList, setCurrentList] = useState(0);
  const items = [
    {
      items: [
        {
          label: "Ongoing",
          icon: "pi pi-clock",
          command: () => navigate(`/KEP_TMS/Trainings/`),
          template: MenuItemTemplate,
          active: currentContent === 0 ? true : false,
          count: mappedData?.ongoing?.length,
        },
        {
          label: "Upcoming",
          icon: "pi pi-calendar-clock",
          command: () => navigate(`/KEP_TMS/Trainings/upcoming`),
          template: MenuItemTemplate,
          active: currentContent === 1 ? true : false,
          count: mappedData?.upcoming?.length,
        },
        {
          label: "Attended",
          icon: "pi pi-list-check",
          command: () => navigate(`/KEP_TMS/Trainings/attended`),
          template: MenuItemTemplate,
          active: currentContent === 2 ? true : false,
          count: mappedData?.attended?.length,
        },
      ],
    },
  ];
  useEffect(() => {
    if (
      SessionGetRole() === UserTypeValue.FACILITATOR
    ) {
      items.push({
        label: "Trainer Menu",
        items: [
          {
            label: "Ongoing",
            template: MenuItemTemplate,
            command: () => navigate(`/KEP_TMS/Trainings/trainer_ongoing`),
            icon: "pi pi-clock",
            active: currentContent === 3 ? true : false,
            count: trainerAssignedData?.mappedData?.ongoing?.length,
          },
          {
            label: "Upcoming",
            template: MenuItemTemplate,
            command: () => navigate(`/KEP_TMS/Trainings/trainer_upcoming`),
            icon: "pi pi-calendar-clock",
            active: currentContent === 4 ? true : false,
            count: trainerAssignedData?.mappedData?.upcoming?.length,
          },
          {
            label: "Facilitated",
            template: MenuItemTemplate,
            command: () => navigate(`/KEP_TMS/Trainings/facilitated`),
            icon: "pi pi-list-check",
            active: currentContent === 5 ? true : false,
            count: trainerAssignedData?.mappedData?.attended?.length,
          },
        ],
      });
    }
  },[trainerAssignedData]);
  useEffect(() => {
    const currentPage = page?.toUpperCase();
    if (currentPage === "ONGOING") {
      setCurrentContent(0);
      setCurrentList(mappedData?.ongoing);
    } else if (currentPage === "UPCOMING") {
      setCurrentContent(1);
      setCurrentList(mappedData?.upcoming);
    } else if (currentPage === "ATTENDED") {
      setCurrentList(mappedData?.attended);
      setCurrentContent(2);
    } else if (currentPage === "TRAINER_ONGOING") {
      setCurrentList(trainerAssignedData?.mappedData?.ongoing);
      setCurrentContent(3);
    } else if (currentPage === "TRAINER_UPCOMING") {
      setCurrentList(trainerAssignedData?.mappedData?.upcoming);
      setCurrentContent(4);
    } else if (currentPage === "FACILITATED") {
      setCurrentList(trainerAssignedData?.mappedData?.attended);
      setCurrentContent(5);
    } else {
      setCurrentContent(0);
      setCurrentList(mappedData?.ongoing);
    }
  }, [page, mappedData, trainerAssignedData]);
  const Content = () =>
    loading ? (
      <>
        <SkeletonBanner />
        <SkeletonDataTable />
      </>
    ) : (
      <>
        <div className={`d-flex g-0`}>
          <MenuContainer itemList={items} />
          <div
            className={`p-3 pb-5 flex-grow-1`}
            style={{ minHeight: "calc(100vh - 50px)" }}
          >
            <TrainingRequestList
              data={currentList}
              headingTitle={`${items[0]?.items[currentContent]?.label} Trainings`}
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
        navReference="Trainings"
        BodyComponent={Content}
        header={{
          title: "Trainings",
          icon: <i className="pi pi-clipboard"></i>,
        }}
      />
    </>
  );
};
export default Trainings;
