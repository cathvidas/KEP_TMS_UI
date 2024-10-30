import { FormatTime, formatTotalTime, getTotalTime } from "../../utils/datetime/FormatDateTime";
import proptype from 'prop-types'
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { formatDateOnly } from "../../utils/datetime/Formatting";
import calculateTotalHours from "../../utils/datetime/calculateTotalHours";

const TrainingScheduleList = ({schedules, onDelete, onUpdate}) => {
  const [schedData, setSchedData] = useState([]);
  useEffect(()=>{
    setSchedData(schedules);
  }, [schedules])
  const actionBodyComponent = (rowData, rowIndex) => (
    <div className="d-flex">
    <Button
    type="button"
      icon="pi pi-pencil"
      size="small"
      className="rounded p-button-text"
      onClick={()=>onUpdate(rowIndex.rowIndex)}
    />
    <Button
    type="button"
      icon="pi pi-trash"
      size="small"
      severity="danger"
      className="rounded p-button-text"
      onClick={()=>onDelete(rowIndex.rowIndex)}
    />
    </div>
  );

  return (
    <>
      {schedData && schedData?.length > 0 ? (
        <>
          <div className=" overflowX-auto" style={{ overflowX: "auto" }}>
            <DataTable
              value={schedData}
              size="small"
              scrollable
              stripedRows
              
           // tableStyle={{ minWidth: "30rem" }}
              //dataKey={(_, rowIndex.)}
              rows={10}
            >
            <Column field="date" header="No"
            body={
              (_, {rowIndex}) => <>{rowIndex+1}</>
            }></Column>
            <Column field="date" header="Date"
            body={
              (rowData) => <span>{formatDateOnly(rowData.date)}</span>
            }></Column>
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
              {onDelete && 
              <Column header="Action" body={actionBodyComponent}></Column>}
            </DataTable>
            <label className="fw-semibold form-label">Total Hours:     <span className="ms-3">{formatTotalTime(calculateTotalHours(schedules))}</span></label>
        
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
    onUpdate: proptype.func,
 };
export default TrainingScheduleList
