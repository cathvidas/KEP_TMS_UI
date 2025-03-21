import proptype from "prop-types";
import TrainingRequestList from "../../components/List/TrainingRequestList";
import { TrainingType } from "../../api/constants";

const TrainingListSection = ({ trainingType }) => {
  return (
    <>
      <TrainingRequestList
        headingTitle={
          trainingType == TrainingType.INTERNAL
            ? "Internal Training Requests"
            : trainingType == TrainingType.EXTERNAL
            ? "External Training Requests"
            : ""
        }
        isAdmin
        trainingType={trainingType}
      />
    </>
  );
};

TrainingListSection.propTypes = {
  trainingType: proptype.number.isRequired,
};
export default TrainingListSection;
