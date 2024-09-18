import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Banner from "../components/General/Banner";
import { SectionTitle } from "../components/General/Section";
import RTable from "../components/General/Table";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Layout from "../components/General/Layout";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);

  const Content = () => {
    return (
      <>
        <Banner  setShowModal={()=>setShowModal(true)} />
        <SectionTitle
          title={"Recent Trainings"}
          Action={{ Link: "#i", Text: "View All" }}
        />
        <RTable userType={"user"} />
      </>
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
