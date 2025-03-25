import proptype from "prop-types";
import TrainingRequestList from "../../components/List/TrainingRequestList";
import OldTrainingRequestList from "../../components/List/OldTrainingRequestList";
import { TrainingType } from "../../api/constants";
import { TabPanel, TabView } from "primereact/tabview";

const TrainingListSection = ({ trainingType }) => {
  return (
    <>
      <TabView className="custom-tab">
        <TabPanel header={"New Trainings"}>
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
        </TabPanel>
        <TabPanel header={"Old Trainings"}>
          <OldTrainingRequestList
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
        </TabPanel>
      </TabView>
    </>
  );
};

TrainingListSection.propTypes = {
  trainingType: proptype.number.isRequired,
};
export default TrainingListSection;
