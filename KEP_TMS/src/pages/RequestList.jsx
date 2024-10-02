import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/General/Layout";
import TRequestTable from "../components/General/TRequestTable";
import trainingRequestHook from "../hooks/trainingRequestHook";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getStatusCode from "../utils/status/getStatusCode";
import SkeletonDataTable from "../components/Skeleton/SkeletonDataTable";
import { SessionGetEmployeeId, SessionGetRole } from "../services/sessions";
const RequestList = () => {
  const { type } = useParams();
  const { data, error, loading } = SessionGetRole() == "Admin" || SessionGetRole() == "SuperAdmin"
      ? trainingRequestHook.useAllTrainingRequests() : trainingRequestHook.useAllTrainingRequests(SessionGetEmployeeId());
  const [requests, setRequests] = useState();
  const [filter, setFilter] = useState({label: type, value: getStatusCode(type)});
  useEffect(() => {
    if (filter?.value) {
      const updatedList = data.filter(
        (request) => request?.status?.id === filter.value
      );
      setRequests(updatedList);
    } else {
      setRequests(data);
    }
  }, [filter.value, type, data]);
  console.log(data);
  const Content = () => (
    <>
      <div className="p-3">
        {/* <SectionBanner
              title="Training Requests List"
              subtitle={
                "Easily access and manage your training requests. Review the status, update details, and plan your learning activities."
              }
            />
            <ScalarMeasurement/> */}
        {/* <TRequestTable userType={"user"} data={data.filter((x)=>x?.status?.name? === type )} /> */}
        {loading ? 
        <SkeletonDataTable/>:
        <TRequestTable userType={"user"} data={requests} filter={filter} handleActionFilter={setFilter}/>}
      </div>
    </>
  );
  return (
    <>
      <Layout
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
