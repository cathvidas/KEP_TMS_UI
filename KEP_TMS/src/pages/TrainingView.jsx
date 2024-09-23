import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RequestMenu } from "../components/TrainingDetails/Menu.jsx";
import { SectionHeading } from "../components/General/Section.jsx";
import { faFile, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import TDOverview from "../components/TrainingDetails/TDetOverview.jsx";
import TScheduleOverview from "../components/TrainingDetails/TSchedOverview.jsx";
import ExamContainer from "../components/Exam/ExamContainer.jsx";
import Layout from "../components/General/Layout.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoutingActivity, getTrainingRequestById } from "../api/trainingServices.jsx";
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
import { extractApproverDetails } from "../services/ExtractData.jsx";
import ApproverList from "../components/List/ApproversList.jsx";
import { formatCurrency, formatDateTime } from "../utils/Formatting.jsx";
import { ActivityType, statusCode } from "../api/constants.jsx";
import TrainingRequestOverview from "../components/TrainingDetails/TrainingRequestOverview.jsx";
import { mapUserListAsync } from "../services/DataMapping/UserListData.jsx";

const RequestView = () => {
  const [mappedData, setMappedData] = useState({});
  const [data, setData] = useState({});
  const { id } = useParams();
  const [requestor, setRequestor] = useState({});
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
        const routing = await getRoutingActivity(details.data.id, ActivityType.REQUEST);
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
  const Content = () => {
    const pages = [<><TrainingRequestOverview data={mappedData} requestor={requestor}/></>,
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
        <div className={`d-flex w-100`}>
          {mappedData.status?.id === statusCode.APPROVED && (
            <RequestMenu
              action={handleChangeContent}
              current={currentContent}
            />
          )}
          <div
            className={`${mappedData.status?.id === statusCode.APPROVED  && "border-start" } p-3 pb-5 flex-grow-1`}
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
