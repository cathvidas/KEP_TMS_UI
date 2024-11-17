import trainingRequestHook from "../../hooks/trainingRequestHook";
import SkeletonBanner from "../../components/Skeleton/SkeletonBanner";
import SkeletonDataTable from "../../components/Skeleton/SkeletonDataTable";
import proptype from "prop-types";
import TrainingRequestList from "../../components/List/TrainingRequestList";
import { TrainingType } from "../../api/constants";
import { useEffect, useState } from "react";

const TrainingListSection = ({ trainingType }) => {
  const [filteredData, setFilteredData] = useState([]);
  const { data, loading } = trainingRequestHook.useAllTrainingRequests();
  useEffect(() => {
    setFilteredData(
      data?.filter((item) => item?.trainingType?.id === trainingType)
    );
  }, [data, trainingType]);
  return (
    <>
      {loading ? (
        <>
          <SkeletonBanner />
          <SkeletonDataTable />
        </>
      ) : (
        <>
          <TrainingRequestList
            headingTitle={
              trainingType == TrainingType.INTERNAL
                ? "Internal Training Requests"
                : trainingType == TrainingType.EXTERNAL
                ? "External Training Requests"
                : ""
            }
            data={filteredData}
            isAdmin
          />
        </>
      )}
    </>
  );
};

TrainingListSection.propTypes = {
  trainingType: proptype.number.isRequired,
};
export default TrainingListSection;
