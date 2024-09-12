import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RequestMenu } from "../components/TrainingDetails/Menu";
import { SectionHeading } from "../components/General/Section.jsx";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import TDOverview from "../components/TrainingDetails/TDetOverview.jsx";
import TScheduleOverview from "../components/TrainingDetails/TSchedOverview.jsx";
import { GetSchedule, SampleStringList } from "../services/getApis.jsx";
import { TabHeader } from "../components/General/TabHeader.jsx";
import ExamContainer from "../components/Exam/ExamContainer.jsx";
import StatusCard from "../components/General/StatusCard.jsx";
import StatusChart from "../components/General/Chart.jsx";
import Header from "../components/General/Header.jsx";
import Layout from "../components/General/Layout.jsx";
import { useEffect, useState } from "react";

const Content = () => {
  const pages = [
    <>
      <SectionHeading
        title="Overview"
        icon={<FontAwesomeIcon icon={faInfoCircle} />}
      />
      <p>Here you can see the details of your training.</p>
      <TDOverview />
      <TScheduleOverview schedule={GetSchedule()} />
    </>, <>  <ExamContainer /></>
  ];
  var curIndex = 0;
  const [currentContent, setCurrentContent] = useState(0);
  const handleChangeContent =(i)=>{
    setCurrentContent(i)
    
  }
  return (
    <>
      <Header title={"Training Detail"} />
      <div className="d-flex gap-3">
        <RequestMenu action={handleChangeContent} current={currentContent}/>
        <div className="flex-fill">
          {pages[currentContent]}
          {/* <div className="float-right">
            <StatusChart data={24} />
          </div> */}

        </div>
      </div>
    </>
  );
};
const RequestView = () => {
  return (
    <>
      <Layout ActionComponent={Content} />
    </>
  );
};
export default RequestView;
