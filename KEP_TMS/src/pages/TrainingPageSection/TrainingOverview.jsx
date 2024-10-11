import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import proptype from "prop-types";
import {
  faCalendar,
  faInfoCircle,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { SectionHeading } from "../../components/General/Section";
import StatusColor from "../../components/General/StatusColor";
import TrainingScheduleList from "../../components/trainingRequestFormComponents/TrainingScheduleList";
import DetailsOverview from "../../components/TrainingPageComponents/DetailsOverview";
import ApproverList from "../../components/List/ApproversList";
import { formatDateTime } from "../../utils/datetime/Formatting";
// import { useHistory } from "react-router-dom";

const TrainingOverview = ({ data }) => {
  const navigate = useNavigate();
  // const history = useHistory()
  return (
    <div className="card  p-3  w-100">
      <div>
        <h3 className="text-center theme-color m-0">
          New {data?.trainingType?.name} Training Request
          <span
            className="ms-3 text-secondary h6 mb-0 btn border-0"
            title="Edit Request"
            onClick={() => navigate("/KEP_TMS/Request/Update/" + data?.id)}
          >
            {/* <i className="pi pi-pencil"></i> Edit */}
          </span>
        </h3>
        <h6 className="text-muted text-center mb-3">Request ID: {data?.id}</h6>
        <div className="position-absolute end-0 top-0 ">
          <Button type="button" onClick={()=>history.back()} label="back" icon="pi pi-arrow-right" text />
        </div>
        <div className="h6 d-flex flex-md-wrap flex-column flex-lg-row gap-lg-3 gap-1 pb-3 justify-content-md-around border-bottom">
          <span> Requestor: {data.requestor?.fullname}</span>
          <span> Badge No: {data.requestor?.employeeBadge}</span>
          <span> Department: {data.requestor?.departmentName}</span>
          <span> Date: {formatDateTime(data?.createdDate)}</span>
          <span>Status: {StatusColor({status:data?.status?.name, class:"p-2 px-3 ",showStatus:true})}</span>
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
      <TrainingScheduleList schedules={data?.trainingDates} />

      <br />


      <br />
      <div className="">
        <SectionHeading
          title="Approvers"
          icon={<FontAwesomeIcon icon={faUsers} />}
        />
        <ApproverList data={data} />
      </div>
    </div>
  );
};
TrainingOverview.propTypes = {
  data: proptype.object,
  requestor: proptype.object,
};
export default TrainingOverview;
