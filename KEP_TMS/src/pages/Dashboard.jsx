import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Banner from "../components/GeneralComponents/Banner";
import TMS_Header from "../components/GeneralComponents/Header";
import RenderLayout from "../components/GeneralComponents/Layout";
import { SectionTitle } from "../components/GeneralComponents/Section";
import RTable from "../components/GeneralComponents/Table";
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
