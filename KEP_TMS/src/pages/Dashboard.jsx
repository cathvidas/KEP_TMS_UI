import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Banner from "../components/Banner";
import TMS_Header from "../components/Header";
import RenderLayout from "../components/Layout";
import { SectionTitle } from "../components/Section";
import RTable from "../components/Table";
import { faHouse } from "@fortawesome/free-solid-svg-icons";


const Content = () => {
  const icon = (<FontAwesomeIcon icon={faHouse}/>);
  return (
    <>
      <TMS_Header title="Dashboard" IconComponent={icon} />
      <Banner />
      <SectionTitle
        title={"Recent Trainings"}
        Action={{ Link: "#i", Text: "View All" }}
      />
      <RTable />
    </>
  );
};

const Dashboard = () => {
  return (
    <>
      <RenderLayout ActionComponent={Content} />
    </>
  );
};
export default Dashboard;
