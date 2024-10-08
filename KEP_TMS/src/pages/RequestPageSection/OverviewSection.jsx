import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  formatDateTime,
} from "../../utils/Formatting";
import proptype from "prop-types";
import {
  faCalendar,
  faInfoCircle,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { SectionHeading } from "../../components/General/Section";
import ApproverList from "../../components/List/ApproversList";
import StatusColor from "../../components/General/StatusColor";
import TrainingScheduleList from "../../components/trainingRequestFormComponents/TrainingScheduleList";
import { UserList } from "../../components/List/UserList";
import EmptyState from "../../components/trainingRequestFormComponents/EmptyState";
import DetailsOverview from "../../components/TrainingPageComponents/DetailsOverview";
import { statusCode } from "../../api/constants";
// import { useHistory } from "react-router-dom";

const OverviewSection = ({ data }) => {
  const navigate = useNavigate();
  // const history = useHistory()
  return (
    <div className="card p-3 overflo-hidden w-100">
      <div>
        <h3 className="text-center theme-color m-0">
          New {data?.trainingType?.name} Training Request
          <span
            className="ms-3 text-secondary h6 mb-0 btn border-0"
            title="Edit Request"
            onClick={() => navigate("/KEP_TMS/Request/Update/" + data.id)}
          >
            <i className="pi pi-pencil"></i> Edit
          </span>
        </h3>
        <h6 className="text-muted text-center mb-3">Request ID: {data.id}</h6>
        <div className="position-absolute end-0 top-0 ">
          <Button type="button" onClick={()=>history.back()}  icon="pi pi-times" text />
        </div>
        <div className="h6 d-flex flex-md-wrap flex-column flex-lg-row gap-lg-3 gap-1 pb-3 justify-content-md-around border-bottom">
          <span> Requestor: {data.requestor.fullname}</span>
          <span> Badge No: {data.requestor.employeeBadge}</span>
          <span> Department: {data.requestor.departmentName}</span>
          <span> Date: {formatDateTime(data.createdDate)}</span>
          <span>Status: {StatusColor({status:data.status?.name, class: "p-2 px-3 ",showStatus:true})}</span>
        </div>
      </div>
      <div className="flex justify-content-between">
        <SectionHeading
          title="Details"
          icon={<FontAwesomeIcon icon={faInfoCircle} />}
        />
      </div>
      <DetailsOverview data={data} />
      <br />
      <SectionHeading
        title="Training Schedules"
        icon={<FontAwesomeIcon icon={faCalendar} />}
      />
      <TrainingScheduleList schedules={data.trainingDates} />

      <br />
      <SectionHeading
        title="Participants"
        icon={<FontAwesomeIcon icon={faUsers} />}
      />
      {data.trainingParticipants?.length > 0 ? (
        <div className="w-100 overflow-hidden">
          <small className="text-muted">
            {data.trainingParticipants.length} participants{" "}
          </small>
          <UserList
            leadingElement={true}
            col="3"
            userlist={data.trainingParticipants}
            property={"name"}
            allowEffectiveness
          />
        </div>
      ) : (
        <EmptyState placeholder="No participants added" />
      )}
      <br />
      <SectionHeading
        title="Facilitator"
        icon={<FontAwesomeIcon icon={faUsers} />}
      />
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
  
      <div className="">
        <SectionHeading
          title="Approvers"
          icon={<FontAwesomeIcon icon={faUsers} />}
        />
        <ApproverList datalist={data.approvers} routing={data.routing} requestStatus={data.status.id}/>
      </div>
    </div>
  );
};
OverviewSection.propTypes = {
  data: proptype.object,
  requestor: proptype.object,
};
export default OverviewSection;
