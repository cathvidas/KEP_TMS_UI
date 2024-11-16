import { useNavigate, useParams } from "react-router-dom";
import MenuContainer from "../components/menus/MenuContainer";
import Layout from "../components/General/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import ProgramListSection from "./MasterListSection/ProgramListSection";
import { useEffect, useState } from "react";
import CategoryListSection from "./MasterListSection/CategoryListSection";
import MenuItemTemplate from "../components/General/MenuItemTemplate";
import ProviderListSection from "./MasterListSection/ProviderListSection";
import TrainingListSection from "./MasterListSection/TrainingListSection";
import { TrainingType, UserTypeValue } from "../api/constants";
import { SessionGetRole } from "../services/sessions";
import NotFoundPage from "./NotFoundPage";

const MasterListPage = () => {
  const page = useParams();
  const [currentContent, setCurrentContent] = useState(0);
  const navigate = useNavigate();
  const items = [
    {
      items: [
        {
          label: "Category",
          icon: "pi pi-filter",
          template: MenuItemTemplate,
          active: currentContent === 0 ? true : false,
          command: () => navigate("/KEP_TMS/MasterList/Categories"),
        },
        {
          label: "Programs",
          icon: "pi pi-file-check",
          template: MenuItemTemplate,
          active: currentContent === 1 ? true : false,
          command: () => navigate("/KEP_TMS/MasterList/Programs"),
        },
        {
          label: "Providers",
          template: MenuItemTemplate,
          active: currentContent === 2 ? true : false,
          command: () => navigate("/KEP_TMS/MasterList/Providers"),
          icon: "pi pi-building",
        },
        {
          label: "External Trainers",
          template: MenuItemTemplate,
          active: currentContent === 5 ? true : false,
          command: () => navigate("/KEP_TMS/MasterList/ExternalTrainers"),
          icon: "pi pi-users",
        },
        // {
        //   label: "Training Type",
        //   template: MenuItemTemplate,
        //   icon: "pi pi-check-square",
        // },
      ],
    },
    {
      label: "Trainings",
      items: [
        {
          label: "Internal",
          icon: "pi pi-arrow-down-left-and-arrow-up-right-to-center",
          command: () => navigate("/KEP_TMS/MasterList/Training/Internal"),
          active: currentContent === 3 ? true : false,
          template: MenuItemTemplate,
        },
        {
          label: "External",
          icon: "pi pi-external-link",
          command: () => navigate("/KEP_TMS/MasterList/Training/External"),
          active: currentContent === 4 ? true : false,
          template: MenuItemTemplate,
        },
      ],
    },
  ];

  const pageContent = [
    <CategoryListSection key={0} />,
    <ProgramListSection key={1} />,
    <ProviderListSection key={2} />,
    <TrainingListSection key={3} trainingType={TrainingType.INTERNAL} />,
    <TrainingListSection key={4} trainingType={TrainingType.EXTERNAL} />,
  ];
  useEffect(() => {
    if (page.category === "Programs") {
      setCurrentContent(1);
    } else if (page.category === "Categories") {
      setCurrentContent(0);
    } else if (page.category === "Providers") {
      setCurrentContent(2);
    } else if (page.category === "ExternalTrainers") {
      setCurrentContent(5);
    } else if (page.category === "Training") {
      if (page.type === "Internal") {
        setCurrentContent(3);
      } else if (page.type === "External") {
        setCurrentContent(4);
      }
    } else {
      // navigate("/KEP_TMS/MasterList")
      setCurrentContent(0);
    }
  }, [page]);
  const Content = () => (
    <>
      <div className="d-flex ">
        <MenuContainer itemList={items} />
        <div
          className="flex-fill overflow-auto p-3"
          style={{ minHeight: "calc(100vh - 50px)" }}
        >
          {pageContent[currentContent]}
        </div>
      </div>
    </>
  );
  return (
    <>
    {SessionGetRole() === UserTypeValue.ADMIN || SessionGetRole() === UserTypeValue.SUPER_ADMIN ?
      <Layout
      navReference="MasterList"
        BodyComponent={Content}
        header={{
          title: "Master List",
          icon: <FontAwesomeIcon icon={faClipboardList} />,
        }}
      />
    : <NotFoundPage/>}</>
  );
};
export default MasterListPage;
