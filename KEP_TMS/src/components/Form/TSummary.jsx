import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import proptype from "prop-types";
import { UserList } from "../List/UserList";
import EmptyState from "./EmptyState";
import { GetEmployees } from "../../services/getApis";
import { SectionHeading } from "../General/Section";
import { DetailItem, Heading } from "../TrainingDetails/DetailItem";
import TDOverview from "../TrainingDetails/TDetOverview";
import TScheduleOverview from "../TrainingDetails/TSchedOverview";

const TrainingSummary = ({ details, schedule, participants }) => {

  return (
    <>
      <SectionHeading
        title="Training Summary"
        icon={<FontAwesomeIcon icon={faInfoCircle} />}
      />
      <TDOverview/>
      <br />
      <TScheduleOverview schedule={schedule}/>
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
