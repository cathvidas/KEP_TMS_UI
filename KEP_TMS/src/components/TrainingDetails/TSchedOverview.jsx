import { formatDateOnly, formatDateTime } from "../../utils/Formatting";
import TrainingScheduleList from "../trainingRequestFormComponents/TrainingScheduleList"
import { DetailItem, Heading } from "./DetailItem"
import proptype from "prop-types";

const TScheduleOverview =({schedule, startdate, endDate})=>{
    return(<>
        <div className="mb-2 d-flex gap-5">
          <DetailItem
            label="Start Date"
            value={startdate ? formatDateOnly(startdate) : "N/A"}
          />
          <DetailItem
            label="End Date"
            value={endDate ? formatDateOnly(endDate) : "N/A"}
          />
        </div>
        
        <TrainingScheduleList schedules={schedule} />
    </>)
}
TScheduleOverview.propTypes = {
  schedule: proptype.array,
  startdate: proptype.string,
  endDate: proptype.string
};
export default TScheduleOverview;