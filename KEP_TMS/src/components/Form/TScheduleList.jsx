import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormatDate, FormatTime } from "../../utils/FormatDateTime";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import proptype from 'prop-types'
import { Table } from "react-bootstrap";
import sortSchedules from "../../utils/SortSchedule";

const TrainingScheduleList = ({schedules, onDelete}) => {
   schedules && sortSchedules(schedules)
   
  return (
    <>
      {schedules && schedules.length > 0 ? (
        <Table className="theme-table border m-0">
          <thead className="theme-bg">
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              {onDelete && 
              <th></th>}
            </tr>
          </thead>
          <tbody>
            {schedules.map((sched, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{FormatDate(sched.date)}</td>
                <td>{FormatTime(sched.startTime)}</td>
                <td>{FormatTime(sched.endTime)}</td>
                {onDelete && 
                <td className="text-danger">
                  <FontAwesomeIcon
                    icon={faTrash}
                    title="Remove"
                    style={{ cursor: "pointer" }}
                    onClick={() => onDelete(index)}
                  />
                </td>}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="h-100 bg-light d-flex align-items-center justify-content-center text-muted">
          No Schedules added yet!
        </div>
      )}
    </>
  );
};
TrainingScheduleList.propTypes={
    schedules: proptype.array,
    onDelete: proptype.func,
 };
export default TrainingScheduleList
