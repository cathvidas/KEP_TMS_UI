import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TMS_Header from "../components/General/Header";
import { SectionBanner, SectionTitle } from "../components/General/Section";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/General/Layout";
import StatusCard from "../components/General/StatusCard";
import RTable from "../components/General/Table";
import { SessionGetRole } from "../services/sessions";

const RequestList =()=>{
    const Content = () => 
      (
        <>
          <TMS_Header
            title="Training Request"
            IconComponent={<FontAwesomeIcon icon={faStickyNote} />}
          />
          <div className="w-100 overflow-hidden">
            <SectionBanner
              title="Training Requests List"
              subtitle={
                "Easily access and manage your training requests. Review the status, update details, and plan your learning activities."
              }
            />
            <div className="g-2 flex mb-2">
            <StatusCard variant={"success"} placeholder="Approved Requests" value={{external: 0, internal:0}}/>
            <StatusCard variant={"warning"} placeholder="Pending Requests" value={{external: 0, internal:0}}/>
            <StatusCard variant={"danger"} placeholder="Declined Requests" value={{external: 0, internal:0}}/>
            </div>
            <SectionTitle title="Recent Training Requests"/>
            <RTable userType={SessionGetRole()}/>
          </div>
        </>
      );
    return(<>
    <Layout BodyComponent={Content}/></>)
}
export default RequestList