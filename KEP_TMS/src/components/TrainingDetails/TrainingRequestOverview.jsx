import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { SectionHeading } from "../General/Section"
import StatusColor from "../General/StatusColor"
import TDOverview from "./TDetOverview"
import { DetailItem, Heading } from "./DetailItem"
import { formatCurrency, formatDateOnly, formatDateTime } from "../../utils/Formatting"
import TScheduleOverview from "./TSchedOverview"
import { UserList } from "../List/UserList"
import EmptyState from "../Form/EmptyState"
import ApproverList from "../List/ApproversList"
import { extractApproverDetails } from "../../services/ExtractData"
import proptype from "prop-types"
import { faCalendar, faInfoCircle, faUsers } from "@fortawesome/free-solid-svg-icons"
import { statusCode } from "../../api/constants"
import { mapUserListAsync } from "../../services/DataMapping/UserListData"
import { Col, Row } from "react-bootstrap"
import TrainingScheduleList from "../Form/TScheduleList"
import { useNavigate } from "react-router-dom"

const TrainingRequestOverview = ({data, requestor})=>{
  const navigate = useNavigate();
    return(
        
      <div className="card theme-bg-light p-3 overflo-hidden w-100">
      {data?.status?.id !== statusCode.APPROVED && 
        <div>
          <h3 className="text-center theme-color">
            New {data?.trainingType?.name} Training Request
          <span className="ms-3 text-secondary h6 btn border-0" title="Edit Request" onClick={()=>navigate("/KEP_TMS/Request/Update/" + data.id)}><i className="pi pi-pencil"></i> Edit</span>
          </h3>
          <div className="h6 d-flex flex-md-wrap flex-column flex-lg-row gap-lg-3 gap-1 pb-3 justify-content-md-around border-bottom">
            <span> Requestor: {requestor.fullname}</span>
            <span> Badge No: {requestor.employeeBadge}</span>
            <span> Department: {requestor.departmentName}</span>
            <span> Date: {formatDateTime(data.createdDate)}</span>
            <span>Status: {StatusColor(data.status?.name, "p-2 px-3 ")}</span>
          </div>
        </div>}
        <div className="flex justify-content-between">
        <SectionHeading
          title="Details"
          icon={<FontAwesomeIcon icon={faInfoCircle} />}
        />
        </div>
        <TDOverview data={data} />
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
        {data.status?.name == "ForApproval" && (
          <>
            <br />
            <div className="">
        <SectionHeading
          title="Approvers"
          icon={<FontAwesomeIcon icon={faUsers} />}
        />
              <ApproverList
                datalist={data.approvers}
                routing={data.routing}
              />
            </div>
          </>
        )}{" "}
      </div>
    )

}
TrainingRequestOverview.propTypes = {
    data: proptype.object,
    requestor: proptype.object
}
export default TrainingRequestOverview