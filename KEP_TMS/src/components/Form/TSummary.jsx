import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import proptype from "prop-types";
import { UserList } from "../List/UserList";
import EmptyState from "./EmptyState";
import { SectionHeading } from "../General/Section";
import { DetailItem, Heading } from "../TrainingDetails/DetailItem";
import TDOverview from "../TrainingDetails/TDetOverview";
import TScheduleOverview from "../TrainingDetails/TSchedOverview";

const TrainingSummary = ({ formData, handleResponse }) => {
  console.log(formData)
  return (
    <>
      <SectionHeading
        title="Training Summary"
        icon={<FontAwesomeIcon icon={faInfoCircle} />}
      />
      <TDOverview formData={formData} />
      <br />
      <TScheduleOverview schedule={formData.trainingDates} />
      <br />
      <Heading value="participants" />
      {formData.trainingParticipants.length > 0 ? (
        <>
          <small className="text-muted">
            {formData.trainingParticipants.length} participants{" "}
          </small>
          <UserList
            leadingElement={true}
            col="3"
            userlist={formData.trainingParticipants}
            property={"name"}
          />
        </>
      ) : (
        <EmptyState placeholder="No participants added" />
      )}
      <br />
      <Heading value="facilitator" />
      {formData.trainingFacilitators.length > 0 ? (
        <UserList
          leadingElement={true}
          userlist={formData.trainingFacilitators}
          property={"name"}
        />
      ) : (
        <EmptyState placeholder="No facilitator added" />
      )}
      <br />
      <Heading value="training cost" />
      <DetailItem label="Training Fee" value={formData.trainingFee} />
      <DetailItem label="Total Training Cost" value={formData.totalTrainingFee} />
    </>
  );
};
TrainingSummary.propTypes = {
  formData: proptype.object,
  handleResponse: proptype.func,
};
export default TrainingSummary;
