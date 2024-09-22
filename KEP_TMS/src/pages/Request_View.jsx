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
import { getTrainingRequestApprovers, getTrainingRequestById } from "../services/trainingServices.jsx";
import { statusCode } from "../api/constants.jsx";
import {
  DetailItem,
  Heading,
} from "../components/TrainingDetails/DetailItem.jsx";
import StatusColor from "../components/General/StatusColor.jsx";
import { UserList } from "../components/List/UserList.jsx";
import EmptyState from "../components/Form/EmptyState.jsx";
import { getUserById } from "../api/UserAccountApi.jsx";
import ModulesContainer from "../components/TrainingDetails/ModulesContainer.jsx";
import ExportDemo from "../components/TablePrime.jsx";

const RequestView = () => {
  const [data, setData] = useState({});
  const [approvers, setApprovers] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const getRequest = async () => {
      try {
        const details = await getTrainingRequestById(id);
        const participants = await Promise.all(
          details.trainingParticipants.map(async ({ employeeBadge }) => {
            const username = await getUserById(employeeBadge);
            return {
              id: employeeBadge,
              name: username.data.fullname,
            };
          })
        );

        const facilitators = await Promise.all(
          details.trainingFacilitators.map(async ({ facilitatorBadge }) => {
            const username = await getUserById(facilitatorBadge);
            return {
              id: facilitatorBadge,
              name: username.data.fullname,
            };
          })
        );
        const updatedDetails = {
          ...details,
          trainingFacilitators: facilitators,
          trainingParticipants: participants,
        };
        setData(updatedDetails);
      } catch (err) {
        console.error(err);
      }
    };
    getRequest();
    const getApprovers = async () => {
      try {
        const tdata = {
          userBadge: data.requestorBadge,
          cost: data.totalTrainingFee,
          requestType: data.trainingTypeId,
        };
        const res = await getTrainingRequestApprovers(tdata);
        console.log(res.data)
        setApprovers(res.data);
      } catch (error) {
        console.error("Error fetching approvers:", error);
      }
    };
    getApprovers()
    
    // const ress= approvers.map((x) =>({
    //   id: x.employeeBadge,
    //   name: x.lastname + "," + x.firstname,
    // }))
  }, [data.trainingTypeId, data.requestorBadge, data.totalTrainingFee, id]);

  const Content = () => {
    const pages = [
      <>
        <SectionHeading
          title="Overview"
          icon={<FontAwesomeIcon icon={faInfoCircle} />}
        />
        <div className="flex justify-content-between">
          <p>Here you can see the details of your training.</p>
          {StatusColor(data.status?.name)}
        </div>
        <div className="d-flex justify-content-between pe-5">
          <TDOverview formData={data} />
        </div>
        <br />
        <TScheduleOverview
          endDate={data.trainingEndDate}
          startdate={data.trainingStartDate}
          schedule={data.trainingDates}
        />
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
              property={"name"}
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
            property={"name"}
          />
        ) : (
          <EmptyState placeholder="No facilitator added" />
        )}
        <br />
        <Heading value="training cost" />
        <DetailItem label="Training Fee" value={data.trainingFee} />
        <DetailItem label="Total Training Cost" value={data.totalTrainingFee} />
        
        {data.statusId == statusCode.FORAPPROVAL && (
            <>
            <br/>
              <div className="pe-5 me-5">
                <Heading value="approvers:" />
                <UserList
                //  userlist={approvers}
                  property={"username"}
                />
              </div>
            </>
          )}{" "}
      </>,
      <>
      <ModulesContainer/>
      <ExportDemo/></>,
      <>
        {" "}
        <ExamContainer />
      </>,
    ];
    const [currentContent, setCurrentContent] = useState(0);
    const handleChangeContent = (i) => {
      setCurrentContent(i);
    };
    return (
      <>
        <div className="d-flex">
          {data.statusName === "Approved" && (
            <RequestMenu
              action={handleChangeContent}
              current={currentContent}
            />
          )}
          <div className="border-start p-3 flex-fill" style={{minHeight: "calc(100vh - 50px)"}}>
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
      <Layout BodyComponent={Content} header={{title: "Request Detail", icon: <FontAwesomeIcon icon={faFile}/>}} />
    </>
  );
};
export default RequestView;
