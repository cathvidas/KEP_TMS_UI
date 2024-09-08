import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormsectionHeading } from "./FormElements";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import proptype from "prop-types";
import TrainingScheduleList from "./TScheduleList";
import { UserList } from "../List/UserList";
import EmptyState from "./EmptyState";
import { GetEmployees } from "../../services/getApis";

const TrainingSummary = ({ details, schedule, participants }) => {
  const DetailItem = ({ label, value }) => (
    <p className="m-0 d-flex gap-2">
      <span className="fw-bold text-muted">{label}: </span>{" "}
      {value ? value : "N/A"}
    </p>
  );
  const Heading = ({ value }) => <h6 className="text-uppercase">{value}</h6>;
  return (
    <>
      <FormsectionHeading
        title="Training Summary"
        icon={<FontAwesomeIcon icon={faInfoCircle} />}
      />
      <Heading value="Details" />
      <DetailItem
        label="Program"
        value={details?.program ? details.program.category : "N/A"}
      />
      <DetailItem
        label="Category"
        value={details?.program ? details.program.category : "N/A"}
      />
      <DetailItem
        label="Objective"
        value={details?.program ? details.program.category : "N/A"}
      />
      <DetailItem
        label="Venue"
        value={details?.program ? details.program.category : "N/A"}
      />
      <DetailItem
        label="Provider"
        value={details?.program ? details.program.category : "N/A"}
      />

      <br />
      <Heading value="DATES AND SCHEDULES" />
      <div className="mb-2 d-flex gap-5">
        <DetailItem
          label="Start Date"
          value={details?.program ? details.program.category : "N/A"}
        />
        <DetailItem
          label="End Date"
          value={details?.program ? details.program.category : "N/A"}
        />
      </div>
      <TrainingScheduleList schedules={schedule} />
      <br />
      <Heading value="participants" />
      {GetEmployees()?.length > 0 ? (
        <>
          <small className="text-muted">
            {GetEmployees()?.length} participants{" "}
          </small>
          <UserList leadingElement={true} col="3" userlist={GetEmployees()} />
        </>
      ) : (
        <EmptyState placeholder="No participants added" />
      )}
      <br />
      <Heading value="facilitator" />
      {participants?.length > 0 ? (
        <UserList userlist={participants} />
      ) : (
        <EmptyState placeholder="No facilitator added" />
      )}
      <br />
      <Heading value="training cost" />
      <DetailItem label="Training Fee" value={details?.program ? details.program.category : "N/A"} />
      <DetailItem label="Total Training Cost" value={details?.program ? details.program.category : "N/A"} />
    </>
  );
};
TrainingSummary.propTypes = {
  details: proptype.object,
  schedule: proptype.array,
  participants: proptype.array,
};
export default TrainingSummary;
