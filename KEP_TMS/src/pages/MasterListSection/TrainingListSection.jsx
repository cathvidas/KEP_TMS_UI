import { SectionBanner } from "../../components/General/Section";
import trainingRequestHook from "../../hooks/trainingRequestHook";
import TRequestTable from '../../components/General/TRequestTable'
import SkeletonBanner from "../../components/Skeleton/SkeletonBanner";
import SkeletonDataTable from "../../components/Skeleton/SkeletonDataTable";
import proptype from "prop-types"
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TrainingListSection = ({trainingType}) => {
    const { data, error, loading } = trainingRequestHook.useAllTrainingRequests(
      0,
      trainingType
    );
    const [selectedData, setSelectedData] = useState();
    return (<>
    {loading ? <><SkeletonBanner/><SkeletonDataTable/></>:<>
    <SectionBanner title="Training List"/>
    <TRequestTable  data={data} isAdmin /></>}

    </>)
}

TrainingListSection.propTypes = {
  trainingType: proptype.number.isRequired
}
export default TrainingListSection;