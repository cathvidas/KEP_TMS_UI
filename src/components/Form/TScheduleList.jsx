import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormatDate, FormatTime } from "../../utils/FormatDateTime";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import proptype from 'prop-types'
import { Table } from "react-bootstrap";

const TrainingScheduleList = ({schedules, onDelete}) => {
    console.log(schedules.length)
  return (
    <>
      {schedules.length > 0 ? (
        <Table className="theme-table border m-0">
          <thead className="theme-bg">
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>End Start</th>
              <th>End Time</th>
              {onDelete && 
              <th></th>}
            </tr>
          </thead>
          <tbody>
            {schedules.map((sched, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{FormatDate(sched.schedDate)}</td>
                <td>{FormatTime(sched.timeIn)}</td>
                <td>{FormatTime(sched.timeOut)}</td>
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
