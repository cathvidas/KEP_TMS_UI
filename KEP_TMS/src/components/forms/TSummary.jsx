import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faUsers } from "@fortawesome/free-solid-svg-icons";
import proptype from "prop-types";
import { UserList } from "../List/UserList";
import EmptyState from "../trainingRequestFormComponents/EmptyState";
import { SectionHeading } from "../General/Section";
import DetailsOverview from "../TrainingPageComponents/DetailsOverview";
import TrainingScheduleList from "../trainingRequestFormComponents/TrainingScheduleList";
import { useEffect, useState } from "react";
import sortSchedules from "../../utils/SortSchedule";
import { TrainingType } from "../../api/constants";
import ExternalFacilitatorList from "../List/ExternalFacilitatorList";

const TrainingSummary = ({ formData }) => {
  const [updatedData, setUpdatedData] = useState(formData);
  useEffect(()=>{
    const startDate = sortSchedules(formData?.trainingDates)[0]?.date;
    const endDate = sortSchedules(formData?.trainingDates)[formData?.trainingDates?.length-1]?.date;
    setUpdatedData({...formData, trainingStartDate: startDate, trainingEndDate: endDate})
  }, [formData])
  return (
    <>
      <SectionHeading
        title="Training Summary"
        icon={<FontAwesomeIcon icon={faInfoCircle} />}
      />
      <DetailsOverview data={updatedData} />
      <br />    <SectionHeading
        title="Training Schedules"
        icon={<FontAwesomeIcon icon={faInfoCircle} />}
      />
      <TrainingScheduleList schedules={updatedData.trainingDates} />
      <br />
      <SectionHeading
        title="Training Participants"
        icon={<FontAwesomeIcon icon={faUsers} />}
      />
      {updatedData.trainingParticipants?.length > 0 ? (
        <>
          <small className="text-muted">
            {updatedData.trainingParticipants?.length} participants{" "}
          </small>
          <UserList
            leadingElement={true}
            col="3"
            userlist={updatedData.trainingParticipants}
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
      {formData?.trainingType?.id === TrainingType.EXTERNAL ? <>
      <ExternalFacilitatorList trainers={formData?.trainingFacilitators}/>
      </> :
      updatedData.trainingFacilitators?.length > 0 ? (
        <UserList
          leadingElement={true}
          userlist={updatedData.trainingFacilitators}
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
