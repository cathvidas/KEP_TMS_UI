import { SectionBanner } from "../../components/General/Section";
import trainingRequestHook from "../../hooks/trainingRequestHook";
import SkeletonBanner from "../../components/Skeleton/SkeletonBanner";
import SkeletonDataTable from "../../components/Skeleton/SkeletonDataTable";
import proptype from "prop-types"
import TrainingRequestTableList from "../../components/List/TrainingRequestTableList";

const TrainingListSection = ({trainingType}) => {
    const { data, loading } = trainingRequestHook.useAllTrainingRequests(
      0,
      trainingType
    );
    return (<>
    {loading ? <><SkeletonBanner/><SkeletonDataTable/></>:<>
    <SectionBanner title="Training List"/>
    <TrainingRequestTableList  data={data} isAdmin /></>}

    </>)
}

TrainingListSection.propTypes = {
  trainingType: proptype.number.isRequired
}
export default TrainingListSection;