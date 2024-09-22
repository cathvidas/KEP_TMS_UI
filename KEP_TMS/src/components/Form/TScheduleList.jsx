import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormatDate, FormatTime, formatTotalTime, getTotalTime } from "../../utils/FormatDateTime";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import proptype from 'prop-types'
import { Button } from "primereact/button";
import sortSchedules from "../../utils/SortSchedule";
import { DataTable } from "primereact/datatable";
import React from "react";
import { Column } from "primereact/column";

const TrainingScheduleList = ({schedules, onDelete}) => {
   schedules && sortSchedules(schedules)
const calculateTotalHours = ()=>{
  return schedules.reduce((total, schedule) => {
    const totalTime = getTotalTime(schedule.startTime, schedule.endTime);
    return total + totalTime;
  }, 0);
}
  const actionBodyComponent = (rowData, rowIndex) => (
    <div className="d-flex">
      <Button
      type="button"
        icon="pi pi-trash"
        severity="danger"
        className="rounded p-button-text"
        onClick={()=>onDelete(rowIndex.rowIndex)}
      />
    </div>
  );

  return (
    <>
      {schedules && schedules.length > 0 ? (
        <>
          <div className=" overflowX-auto" style={{ overflowX: "auto" }}>
            <DataTable
              value={schedules}
              size="small"
              scrollable
              scrollHeight="flex"
              
              stripedRows
              dataKey={"id"}
              rows={10}
            >
              <Column field="date" header="Date"></Column>
              <Column
                field="startTime"
                header="Start Time"
                body={(rowData) => <span>{FormatTime(rowData.startTime)}</span>}
              ></Column>
              <Column
                field="endTime"
                header="End Time"
                body={(rowData) => <span>{FormatTime(rowData.endTime)}</span>}
              ></Column>
              <Column
                header="Total Time"
                body={(rowData) => (
                  <span>
                    {formatTotalTime(
                      getTotalTime(rowData.startTime, rowData.endTime)
                    )}
                  </span>
                )}
              ></Column>
              <Column header="Action" body={actionBodyComponent}></Column>
            </DataTable>
            <label className="fw-semibold form-label">Total Hours:     <span className="ms-3">{formatTotalTime(calculateTotalHours())}</span></label>
        
          </div>
        </>
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
