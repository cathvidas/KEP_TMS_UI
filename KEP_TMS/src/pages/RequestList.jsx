import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SectionBanner, SectionTitle } from "../components/General/Section";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/General/Layout";
import ScalarMeasurement from "../components/General/ScalarMeasurement";
import TRequestTable from "../components/General/TRequestTable";
import trainingRequestHook from "../hooks/trainingRequestHook";
const RequestList =()=>{
  const {data, error, loading } = trainingRequestHook.useAllTrainingRequests();
  console.log(data)
    const Content = () => 
      (
        <>
          <div className="p-3">
            <SectionBanner
              title="Training Requests List"
              subtitle={
                "Easily access and manage your training requests. Review the status, update details, and plan your learning activities."
              }
            />
            <ScalarMeasurement/>
            <TRequestTable userType={"user"} data={data} />
          </div>
        </>
      );
    return(<>
    <Layout BodyComponent={Content} header={{title: "Training Request" , icon: <FontAwesomeIcon icon={faStickyNote} />}}/></>)
}
export default RequestList