import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/General/Layout";
import trainingRequestHook from "../hooks/trainingRequestHook";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getStatusCode from "../utils/status/getStatusCode";
import SkeletonDataTable from "../components/Skeleton/SkeletonDataTable";
import { SessionGetEmployeeId, SessionGetRole } from "../services/sessions";
import { statusCode } from "../api/constants";
import TrainingRequestTableList from "../components/List/TrainingRequestTableList";
import trainingDetailsService from "../services/common/trainingDetailsService";
const RequestList = () => {
  const { type } = useParams();
  const isAdmin =
    SessionGetRole() == "Admin" || SessionGetRole() == "SuperAdmin"
      ? true
      : false;
  const { data, error, loading } = isAdmin
    ? trainingRequestHook.useAllTrainingRequests()
    : trainingRequestHook.useAllTrainingRequests(SessionGetEmployeeId());
  const [requests, setRequests] = useState();
  const [filter, setFilter] = useState({
    label: type,
    value: getStatusCode(type),
  });
  useEffect(() => {
    if (filter.label?.toUpperCase() === "OUTDATED") {
      let updatedList = [];
      data.forEach((item) => {
        if (
          trainingDetailsService.checkTrainingIfOutDated(item) &&
          (item?.status?.id === statusCode.SUBMITTED ||
            item?.status?.id === statusCode.FORAPPROVAL ||
            item?.status?.id === statusCode.APPROVED)
        ) {
          updatedList.push(item);
        }
      });
      setRequests(updatedList);
    } else if (filter.label === "Pending") {
      const updatedList = data.filter(
        (request) =>
          !trainingDetailsService.checkTrainingIfOutDated(request) &&
          (request?.status?.id === statusCode.FORAPPROVAL ||
            request?.status?.id === statusCode.SUBMITTED ||
            request?.status?.id === statusCode.APPROVED)
      );
      setRequests(updatedList);
    } else if (filter?.value) {
      const updatedList = data.filter(
        (request) => request?.status?.id === filter.value
      );
      setRequests(updatedList);
    } else {
      setRequests(data);
    }
  }, [filter.value, filter.label, type, data]);

  const Content = () => (
    <>
      <div className="p-3">
        {loading ? (
          error ? (
            <div className="text-center text-danger">
              Error: {error?.message}
            </div>
          ) : (
            <SkeletonDataTable />
          )
        ) : (
          <>
            {/* <div className="card flex justify-content-center"> */}
            {/* <MeterGroup values={values} max="200" /> */}
            {/* </div> */}
            <TrainingRequestTableList
              userType={"user"}
              data={requests}
              filter={filter}
              handleActionFilter={setFilter}
              isAdmin={isAdmin}
              isRequestor
            />
          </>
        )}
      </div>
    </>
  );
  return (
    <>
      <Layout
      navReference="RequestList"
        BodyComponent={Content}
        header={{
          title: "Training Request",
          icon: <FontAwesomeIcon icon={faStickyNote} />,
        }}
      />
    </>
  );
};
export default RequestList;
