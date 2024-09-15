import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Banner from "../components/General/Banner";
import { SectionTitle } from "../components/General/Section";
import RTable from "../components/General/Table";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import proptypes from "prop-types";
import Header from "../components/General/Header";
import Layout from "../components/General/Layout";

const Content = ({ showModal, setShowModal }) => {
  const icon = <FontAwesomeIcon icon={faHouse} />;
  return (
    <>
      <Header
        title="Dashboard"
        IconComponent={icon}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <Banner showModal={showModal} setShowModal={setShowModal} />
      <SectionTitle
        title={"Recent Trainings"}
        Action={{ Link: "#i", Text: "View All" }}
      />
      <RTable userType={"user"} />
    </>
  );
};
Content.propTypes = {
  showModal: proptypes.bool,
  setShowModal: proptypes.func,
};

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Layout
      ActionComponent={() => (
        <Content showModal={showModal} setShowModal={setShowModal} />
      )}
      showModal={showModal}
      setShowModal={setShowModal}
    />
  );
};

export default Dashboard;
