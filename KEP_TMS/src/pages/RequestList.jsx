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
import { statusCode } from "../api/constants";
import { MeterGroup } from 'primereact/metergroup';
const RequestList = () => {
  const { type } = useParams();
  const { data, error, loading } =
    SessionGetRole() == "Admin" || SessionGetRole() == "SuperAdmin"
      ? trainingRequestHook.useAllTrainingRequests()
      : trainingRequestHook.useAllTrainingRequests(SessionGetEmployeeId());
  const [requests, setRequests] = useState();
  const [filter, setFilter] = useState({
    label: type,
    value: getStatusCode(type),
  });
  useEffect(() => {
    if (filter?.value) {
      if(filter.label === "Pending"){
        const updatedList = data.filter(
          (request) => request?.status?.id === statusCode.FORAPPROVAL || request?.status?.id === statusCode.SUBMITTED
        );
        setRequests(updatedList);
      }else{
        const updatedList = data.filter(
          (request) => request?.status?.id === filter.value
        );
        setRequests(updatedList);}
    } else {
      setRequests(data);
    }
  }, [filter.value, type, data]);
  const values = [
    { label: 'Approved', color: '#34d399', value: 16 },
    { label: 'Published', color: '#fbbf24', value: 8 },
    { label: 'For Approval', color: '#60a5fa', value: 24 },
    { label: 'System', color: '#c084fc', value: 10 }
];
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
              <MeterGroup values={values} max="200" />
            {/* </div> */}
            <TRequestTable
              userType={"user"}
              data={requests}
              filter={filter}
              handleActionFilter={setFilter}
            />
          </>
        )}
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
