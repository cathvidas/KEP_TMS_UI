import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/General/Header";
import Layout from "../components/General/Layout";
import {
  faClipboardList,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  SectionBanner,
  SectionHeading,
  SectionTitle,
} from "../components/General/Section";
import RTable from "../components/General/Table";
import { MenuItem, RequestMenu } from "../components/TrainingDetails/Menu";
import { getAllTrainingRequests, getTrainingPrograms } from "../api/trainingServiceApi";

const MasterList = () => {
    const tablecolumn = ["Id", "Name", "Description", "Status"];
    const tabledata = [];
const programs = getTrainingPrograms();
programs.then((prog)=>{
    prog.map((data) =>{
        var item =[];
        item.push(data.id)
        item.push(data.name)
        item.push(data.description)
        item.push(data.statusName)
        tabledata.push(item)
    })
})


    const menulist = 
       [
        <MenuItem key={""} title="Program" state={true}/>,
        <MenuItem key={""} title="Requests" />,
        <MenuItem key={""} title="Reports" />,
        <MenuItem key={""} title="Settings" />,
        <MenuItem key={""} title="Help" />,
      ]
    
  const Content = () => (
    <>
      <Header
        title="Master List"
        IconComponent={<FontAwesomeIcon icon={faClipboardList} />}
      />

      <div className="d-flex gap-3">
        <RequestMenu menuList={menulist} />
        <div className="flex-fill">
          <SectionBanner title="Training Programs" subtitle="List of Training Programs" />
          <RTable columns={tablecolumn} rows={tabledata} />
        </div>
      </div>
    </>
  );
  return (
    <>
      <Layout ActionComponent={Content} />
    </>
  );
};
export default MasterList;
