import Banner from "../components/Banner";
import TMS_Header from "../components/Header";
import RenderLayout from "../components/Layout";
import RequestModal from "../components/RequestType";
import { SectionTitle } from "../components/Section";
import Sidebar from "../components/Sidebar";
import RTable from "../components/Table";

const Content=()=>{
    return(
    <>
    <TMS_Header title="das" />
    <Banner/>
    <SectionTitle title={"Recent Trainings"} ViewAll={"View All"}/>
    <RTable/>
    </>)
}
const Dashboard = () => {
  return (
    <>
      <RenderLayout ActionComponent={Content} />
    </>
  );
};
export default Dashboard;
