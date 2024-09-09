import TrainingScheduleList from "../Form/TScheduleList"
import { DetailItem, Heading } from "./DetailItem"
import proptype from "prop-types";

const TScheduleOverview =({schedule, startdate, endDate})=>{
    return(<>
        <Heading value="DATES AND SCHEDULES" />
        <div className="mb-2 d-flex gap-5">
          <DetailItem
            label="Start Date"
            value={startdate ? startdate : "N/A"}
          />
          <DetailItem
            label="End Date"
            value={endDate ? endDate : "N/A"}
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