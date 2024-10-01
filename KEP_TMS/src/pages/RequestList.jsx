import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/General/Layout";
import TRequestTable from "../components/General/TRequestTable";
import trainingRequestHook from "../hooks/trainingRequestHook";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const RequestList =()=>{
  const {data, error, loading } = trainingRequestHook.useAllTrainingRequests();
  const [requests, setRequests] = useState([]);
  const {type} = useParams();
  useEffect(()=>{
const updatedList = data.filter((request)=>request?.status?.name === type);
    setRequests(updatedList);
  }, [type, data])
  console.log(data)
    const Content = () => 
      (
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
            <TRequestTable userType={"user"} data={data} />
          </div>
        </>
      );
    return(<>
    <Layout BodyComponent={Content} header={{title: "Training Request" , icon: <FontAwesomeIcon icon={faStickyNote} />}}/></>)
}
export default RequestList