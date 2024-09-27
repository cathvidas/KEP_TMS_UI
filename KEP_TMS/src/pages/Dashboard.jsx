import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Banner from "../components/General/Banner";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Layout from "../components/General/Layout";
import TRequestTable from "../components/General/TRequestTable";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);

  const Content = () => {
    return (
      <div className="p-3">
        <Banner  setShowModal={()=>setShowModal(true)} />
        <TRequestTable filterType={"UserRole"} />
      </div>
    );
  };

  return (
    <Layout
      header={{ title: "Dashboard", icon: <FontAwesomeIcon icon={faHouse} /> }}
      BodyComponent={() => <Content />}
      showModalAction={showModal}
      returnAction={setShowModal}
    />
  );
};

export default Dashboard;
