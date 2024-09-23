import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../components/General/Layout";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { SectionBanner } from "../components/General/Section";
import MasterListMenu from "../components/General/MasterListMenu";
import { useParams } from "react-router-dom";
import { getAllUsers } from "../api/UserAccountApi";
import { useEffect, useState } from "react";
import GeneralTable from "../components/General/GeneralTable";
import { Button } from "primereact/button";
import ProgramForm from "../components/Form/ModalForms/ProgramForm";
import {
  getAllTrainingRequests,
  getTrainingCategories,
  getTrainingPrograms,
} from "../api/trainingServices";
import { extractTrainingRequests } from "../services/ExtractData";
import SkeletonDataTable from "../components/Skeleton/SkeletonDataTable";
import SkeletonBanner from "../components/Skeleton/SkeletonBanner";
import CategoryForm from "../components/Form/ModalForms/CategoryForm";

const MasterList = () => {
  const page = useParams();
  const [error, setError] = useState();
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [dataType, setDataType] = useState("");
  const getUsersMasterList = () => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const users = await getAllUsers();
        setData(
          page.type === "Facilitators"
            ? users.filter((x) => x.roleName === "Facilitator")
            : page.type === "Users"
            ? users.filter((x) => x.roleName === "Trainee")
            : page.type === "Admin"
            ? users.filter((x) => x.roleName === "Admin")
            : page.type === "Approvers"
            ? users.filter((x) => x.roleName === "Approver")
            : users
        );
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    getUsers();
  };
  const getMasterList = () => {
    const getList = async () => {
      try {
        setLoading(true)
        const list =
          page.category === "Programs"
            ? await getTrainingPrograms()
            : page.category === "Categories" && (await getTrainingCategories());
        {
          list && setData(page.category === "Categories" ? list.data: list);
        }
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    getList();
  };
const getTrainingsMasterList = () =>{
  const getTrainings = async () => {
    try {
      setLoading(true);
      const trainings = await getAllTrainingRequests();
      const filtered = 
        page?.type === "Internal"
        ? trainings?.data.filter( (x) => x.trainingTypeName === "Internal"):
        page?.type === "External"
        ? trainings?.data.filter( (x) => x.trainingTypeName === "External"):
        trainings.data;
      setData(extractTrainingRequests(filtered));
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };
  getTrainings();
}
  useEffect(() => {
    setVisible(false)
    if (page.category === "Users") {
      getUsersMasterList();
    } else if (page.category === "Training") {
      getTrainingsMasterList();
    } else {
      getMasterList();
    }
  }, [page]);

  const actionButton = () => {
    return (
      <div className=" flex flex-wrap justify-content- gap-3">
        <Button
          type="button"
          icon="pi pi-plus"
          severity="success"
          className="rounded theme-bg"
          label={page?.type ?? page?.category}
          onClick={() => {setVisible(true)
            setSelectedData(null)
          }}
        />
      </div>
    );
  };
  const handleUpdate = (id) => {
    const selected = data.find((x) => x.id === id);
    setSelectedData(selected);
    setVisible(true);
  };
  const SwitchForm =()=>{
    switch (page.category) {
      case "Programs":
        return <ProgramForm handleShow={visible} handleClose={setVisible} selectedData={selectedData} />;
      case "Categories":
        return <CategoryForm handleShow={visible} handleClose={setVisible} selectedData={selectedData} />;
      case "Users":
        return <></>;
      case "Training":
        return <></>;
      default:
        return <></>;
    }
  }
  const Content = () => (
    <>
      <div className="d-flex ">
        <MasterListMenu />
        <div
          className="flex-fill overflow-auto border-start p-3"
          style={{ minHeight: "calc(100vh - 50px)" }}
        >
          {loading ? (
            <>
              <SkeletonBanner />
              {/* <SkeletonList /> */}
              <SkeletonDataTable />
            </>
          ) : (
            <>
              {" "}
              <SectionBanner
                title={page?.type ?? page?.category}
                subtitle="List of Training Programs"
                ActionComponents={actionButton}
              />{" "}
              <GeneralTable dataTable={data} handleUpdate={handleUpdate} dataType={page?.type?? page?.category} />
            </>
          )}
        </div>
      </div>

      {<SwitchForm/>}
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
export default MasterList;
