import { useNavigate, useParams } from "react-router-dom";
import MenuContainer from "../components/menus/MenuContainer";
import Layout from "../components/General/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import ProgramListSection from "./MasterListSection/ProgramListSection";
import { useEffect, useState } from "react";
import SkeletonBanner from "../components/Skeleton/SkeletonBanner";
import CategoryListSection from "./MasterListSection/CategoryListSection";

const MasterListPage = () => {
  const page = useParams();
  const [currentContent, setCurrentContent] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const items = [
    {
      label: "Menu",
      items: [
        {
          label: "Programs",
          icon: "pi pi-cog",
          command: () => navigate("/KEP_TMS/MasterList/Programs"),
        },
        {
          label: "Category",
          icon: "pi pi-sign-out",
          command: () => navigate("/KEP_TMS/MasterList/Categories"),
        },
        { label: "Training Type", icon: "pi pi-sign-out" },
      ],
    },
    {
      label: "Trainings",
      items: [
        {
          label: "Internal",
          icon: "pi pi-cog",
          command: () => navigate("/KEP_TMS/MasterList/Training/Internal"),
        },
        {
          label: "External",
          icon: "pi pi-sign-out",
          command: () => navigate("/KEP_TMS/MasterList/Training/External"),
        },
      ],
    },
  ];

  const pageContent = [<ProgramListSection key={0} setLoading={setLoading} />,
    <CategoryListSection key={1} setLoading={setLoading}/>
  ];
  useEffect(() => {
    if (page.category === "Programs") {
      setCurrentContent(0);
    } else if (page.category === "Categories") {
      setCurrentContent(1);
    } else {
      setCurrentContent(0);
    }
  }, [page]);
  const Content = () => (
    <>
      <div className="d-flex ">
        <MenuContainer itemList={items} />
        <div
          className="flex-fill overflow-auto border-start p-3"
          style={{ minHeight: "calc(100vh - 50px)" }}
        >
            {/* {loading? <SkeletonBanner/> : pageContent[currentContent]} */}
            {/* {currentContent === 0 ?  <ProgramListSection/> : <></>} */}
          {pageContent[currentContent]}
        </div>
      </div>
    </>
  );
  return (
    <>
      <Layout
        BodyComponent={Content}
        header={{
          title: "Master List",
          icon: <FontAwesomeIcon icon={faClipboardList} />,
        }}
      />
    </>
  );
};
export default MasterListPage;
