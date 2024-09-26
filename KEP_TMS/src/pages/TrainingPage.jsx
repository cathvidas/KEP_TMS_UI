import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RequestMenu } from "../components/TrainingPageComponents/Menu.jsx";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/General/Layout.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getRoutingActivity,
  getTrainingRequestById,
} from "../api/trainingServices.jsx";
import { getUserApi } from "../api/userApi.jsx";
import { ActivityType, statusCode } from "../api/constants.jsx";
import { mapUserListAsync } from "../services/DataMapping/UserListData.jsx";
import OverviewSection from "./RequestPageSection/OverviewSection.jsx";
import ModuleSection from "./RequestPageSection/ModuleSection.jsx";
import ExamSection from "./RequestPageSection/ExamSection.jsx";

const TrainingPage = () => {
  const [mappedData, setMappedData] = useState({});
  const [data, setData] = useState({});
  const { id, page } = useParams();
  const [requestor, setRequestor] = useState({});
  const [approved, setApproved] = useState(false);
  useEffect(() => {
    const getRequest = async () => {
      try {
        const details = await getTrainingRequestById(parseInt(id));
        setData(details);
        const participants = await mapUserListAsync(
          details?.data?.trainingParticipants,
          "employeeBadge"
        );
        const facilitators = await mapUserListAsync(
          details?.data?.trainingFacilitators,
          "facilitatorBadge"
        );
        const approvers = await mapUserListAsync(
          details?.data?.approvers,
          "employeeBadge"
        );
        const requestor = await getUserApi(details.data.requestorBadge);
        setRequestor(requestor?.data);
        const routing = await getRoutingActivity(
          details.data.id,
          ActivityType.REQUEST
        );
        const updatedDetails = {
          ...details.data,
          trainingFacilitators: facilitators,
          trainingParticipants: participants,
          approvers: approvers,
          routing: routing,
        };
        setMappedData(updatedDetails);
      } catch (err) {
        console.error(err);
      }
    };
    getRequest();
  }, [id]);

  const checkIfThereISTillApprovers = () => {
    const availableApprovers = mappedData.approvers?.filter(
      (x) => !mappedData.routing?.some((y) => x.employeeBadge === y.assignedTo)
    );
    return availableApprovers;
  };

  useEffect(() => {
    const app = checkIfThereISTillApprovers();
    if (app?.lenght === 0) {
      setApproved(true);
    }
  }, [mappedData]);
  const Content = () => {
    const pages = [
      <>
        <OverviewSection data={mappedData} requestor={requestor} />
      </>,
      <>
        <ModuleSection />
      </>,
      <>
        <ExamSection/>
      </>,
    ];
    const [currentContent, setCurrentContent] = useState();
    useEffect(()=>{
      if(page === "Modules"){
        setCurrentContent(1)
      }else if(page === "Exams"){
        setCurrentContent(2)
      }else{
        setCurrentContent(0)
      }
    },[page])
    console.log(id, page)
    return (
      <>
        <div className={`row g-0`}>
          {mappedData.status?.id === statusCode.APPROVED && (
            <RequestMenu
              current={currentContent}
              reqId={mappedData.id}
            />
          )}
          <div
            className={`${
              mappedData.status?.id === statusCode.APPROVED && "border-start"
            } p-3 pb-5 col`}
            style={{ minHeight: "calc(100vh - 50px)" }}
          >
            {pages[currentContent]}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Layout
        BodyComponent={Content}
        header={{
          title: "Request Detail",
          icon: <FontAwesomeIcon icon={faFile} />,
        }}
      />
    </>
  );
};
export default TrainingPage;
