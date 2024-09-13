import { useEffect, useState } from "react";
import { DetailItem, Heading } from "./DetailItem";
import proptype from "prop-types";
import { getTrainingRequestById } from "../../api/trainingServiceApi";
const TDOverview = ({ id }) => {
  const [details, setDetails] = useState({});

  useEffect(() => {
    const res = getTrainingRequestById(parseInt(id));
    res.then((data) => {
      setDetails(data);
    });
  }, [id]);
  console.log(details);
  return (
    <div>
      <Heading value="Details" />
      <DetailItem
        label="Program"
        value={details?.trainingProgram ? details.trainingProgram?.name : "N/A"}
      />
      <DetailItem
        label="Category"
        value={details?.trainingCategory ? details?.trainingCategory?.name : "N/A"}
      />
      <DetailItem
        label="Objective"
        value={details?.trainingObjectives ? details.trainingObjectives  : "N/A"}
      />
      <DetailItem
        label="Venue"
        value={details?.venue ??  "N/A"}
      />
      <DetailItem
        label="Provider"
        value={details?.trainingProvider?.name ?? "N/A"}
      />
    </div>
  );
};
TDOverview.propTypes = {
  id: proptype.number,
};
export default TDOverview;
