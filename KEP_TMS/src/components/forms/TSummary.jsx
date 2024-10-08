import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faUsers } from "@fortawesome/free-solid-svg-icons";
import proptype from "prop-types";
import { UserList } from "../List/UserList";
import EmptyState from "../trainingRequestFormComponents/EmptyState";
import { SectionHeading } from "../General/Section";
import DetailsOverview from "../TrainingPageComponents/DetailsOverview";
import TrainingScheduleList from "../trainingRequestFormComponents/TrainingScheduleList";

const TrainingSummary = ({ formData, handleResponse }) => {
  console.log(formData)
  return (
    <>
      <SectionHeading
        title="Training Summary"
        icon={<FontAwesomeIcon icon={faInfoCircle} />}
      />
      <DetailsOverview data={formData} />
      <br />
      <TrainingScheduleList schedules={formData.trainingDates} />
      <br />
      <SectionHeading
        title="Training Participants"
        icon={<FontAwesomeIcon icon={faUsers} />}
      />
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
      <SectionHeading
        title="Training Facilitator/s"
        icon={<FontAwesomeIcon icon={faUsers} />}
      />
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
    </>
  );
};
TrainingSummary.propTypes = {
  formData: proptype.object,
  handleResponse: proptype.func,
};
export default TrainingSummary;
