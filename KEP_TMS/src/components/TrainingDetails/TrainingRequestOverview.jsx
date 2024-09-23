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

const TrainingRequestOverview = ({data, requestor})=>{
    return(
        
      <div className="card p-3 overflo-hidden w-100">
      {data?.status?.id !== statusCode.APPROVED && 
        <div>
          <h3 className="text-center theme-color">
            New {data?.trainingType?.name} Training Request
          </h3>
          <div className="h6 d-flex gap-5 pb-4 justify-content-around border-bottom">
            <span> Requestor: {requestor.fullname}</span>
            <span> Badge No: {requestor.employeeBadge}</span>
            <span> Department: {requestor.departmentName}</span>
            <span> Date: {formatDateTime(data.createdDate)}</span>
          </div>
        </div>}
        <div className="flex justify-content-between">
        <SectionHeading
          title="Details"
          icon={<FontAwesomeIcon icon={faInfoCircle} />}
        />
          {StatusColor(data.status?.name, "p-2 px-3 ")}
        </div>
        <div className="d-flex justify-content-between pe-5">
          <TDOverview formData={data} />
        </div>
        <DetailItem
          label="Training Fee"
          value={formatCurrency(data.trainingFee)}
        />
        <DetailItem
          label="Total Training Cost"
          value={formatCurrency(data.totalTrainingFee)}
        />
        <DetailItem
          label="Discounted Rate"
          value={formatCurrency(data.discountedRate)}
        />
        <DetailItem
          label="Cut-off Date"
          value={formatDateOnly(data.cutOffDate)}
        />
        <br />
        <SectionHeading
          title="Dates and schedules"
          icon={<FontAwesomeIcon icon={faCalendar} />}
        />
        <TScheduleOverview
          endDate={data.trainingEndDate}
          startdate={data.trainingStartDate}
          schedule={data.trainingDates}
        />
        <br />
        <SectionHeading
          title="Participants"
          icon={<FontAwesomeIcon icon={faUsers} />}
        />
        {data.trainingParticipants?.length > 0 ? (
          <>
            <small className="text-muted">
              {data.trainingParticipants.length} participants{" "}
            </small>
            <UserList
              leadingElement={true}
              col="3"
              userlist={data.trainingParticipants}
              property={"name"}
            />
          </>
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
            <div className="pe-5 me-5">
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