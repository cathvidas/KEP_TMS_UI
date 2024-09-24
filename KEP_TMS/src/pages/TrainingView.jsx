import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RequestMenu } from "../components/TrainingDetails/Menu.jsx";
import { faFile, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import ExamContainer from "../components/Exam/ExamContainer.jsx";
import Layout from "../components/General/Layout.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getRoutingActivity,
  getTrainingRequestById,
} from "../api/trainingServices.jsx";
import { getUserById } from "../api/UserAccountApi.jsx";
import ModulesContainer from "../components/TrainingDetails/ModulesContainer.jsx";
import ExportDemo from "../components/TablePrime.jsx";
import { ActivityType, statusCode } from "../api/constants.jsx";
import TrainingRequestOverview from "../components/TrainingDetails/TrainingRequestOverview.jsx";
import { mapUserListAsync } from "../services/DataMapping/UserListData.jsx";

const RequestView = () => {
  const [mappedData, setMappedData] = useState({});
  const [data, setData] = useState({});
  const { id } = useParams();
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
        const requestor = await getUserById(details.data.requestorBadge);
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
        <TrainingRequestOverview data={mappedData} requestor={requestor} />
      </>,
      <>
        <ModulesContainer />
        <ExportDemo />
      </>,
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
        <div className={`row g-0`}>
          {mappedData.status?.id === statusCode.APPROVED && (
            <RequestMenu
              action={handleChangeContent}
              current={currentContent}
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
export default RequestView;
