import { DetailItem, Heading } from "./DetailItem";
import proptype from "prop-types";
const TDOverview = ({ details }) => {
  return (
    <div>
      <Heading value="Details" />
      <DetailItem
        label="Program"
        value={details?.program ? details.program.category : "N/A"}
      />
      <DetailItem
        label="Category"
        value={details?.program ? details.program.category : "N/A"}
      />
      <DetailItem
        label="Objective"
        value={details?.program ? details.program.category : "N/A"}
      />
      <DetailItem
        label="Venue"
        value={details?.program ? details.program.category : "N/A"}
      />
      <DetailItem
        label="Provider"
        value={details?.program ? details.program.category : "N/A"}
      />
    </div>
  );
};
TDOverview.propTypes = {
  details: proptype.object,
};
export default TDOverview;
