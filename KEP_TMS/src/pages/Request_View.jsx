import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RequestMenu } from "../components/TrainingDetails/Menu";
import { SectionHeading } from "../components/General/Section.jsx";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import TDOverview from "../components/TrainingDetails/TDetOverview.jsx";
import TScheduleOverview from "../components/TrainingDetails/TSchedOverview.jsx";
import { GetSchedule } from "../services/getApis.jsx";
import ExamContainer from "../components/Exam/ExamContainer.jsx";
import Header from "../components/General/Header.jsx";
import Layout from "../components/General/Layout.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTrainingRequestById } from "../services/trainingServices.jsx";
import { statusCode } from "../api/constants.jsx";
import { DetailItem, Heading } from "../components/TrainingDetails/DetailItem.jsx";
import StatusColor from "../components/General/StatusColor.jsx";
import TrainingParticipant from "../components/Form/TParticipants.jsx";
import { UserList } from "../components/List/UserList.jsx";
import EmptyState from "../components/Form/EmptyState.jsx";

const RequestView =  () => {
  const [data, setData] = useState({});
  const {id} = useParams();
  useEffect(()=>{
    const getRequest =async()=>{
      const details = await getTrainingRequestById(id);
      setData(details);
    }
    getRequest();
  }, [id])

console.log(data)
  const Content = () => {
    const pages = [
      <>
      <SectionHeading
        title="Overview"
        icon={<FontAwesomeIcon icon={faInfoCircle} />}
      />
      <div className="flex justify-content-between">
        <p>Here you can see the details of your training.</p>
        {StatusColor(data.status?.name)}</div>
        <TDOverview formData={data} /><br />
        <TScheduleOverview endDate={data.trainingEndDate} startdate={data.trainingStartDate} schedule={data.trainingDates} />
        <br />
      <Heading value="participants" />
      {data.trainingParticipants?.length > 0 ? (
        <>
          <small className="text-muted">
            {data.trainingParticipants.length} participants{" "}
          </small>
          <UserList
            leadingElement={true}
            col="3"
            userlist={data.trainingParticipants}
            property={"employeeBadge"}
          />
        </>
      ) : (
        <EmptyState placeholder="No participants added" />
      )}
      <br />
      <Heading value="facilitator" />
      {data.trainingFacilitators?.length > 0 ? (
        <UserList
          leadingElement={true}
          userlist={data.trainingFacilitators}
          property={"facilitatorBadge"}
        />
      ) : (
        <EmptyState placeholder="No facilitator added" />
      )}
      <br />
      <Heading value="training cost" />
      <DetailItem label="Training Fee" value={data.trainingFee} />
      <DetailItem label="Total Training Cost" value={data.totalTrainingFee} />
      </>, <>  <ExamContainer /></>
    ];
    const [currentContent, setCurrentContent] = useState(0);
    const handleChangeContent =(i)=>{
      setCurrentContent(i)
      
    }
    return (
      <>
        <Header title={"Training Detail"} />
        <div className="d-flex gap-3">
          {data.statusId === statusCode.APPROVED && 
          <RequestMenu action={handleChangeContent} current={currentContent}/>}
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
  
  return (
    <>
      <Layout ActionComponent={Content} />
    </>
  );
};
export default RequestView;
