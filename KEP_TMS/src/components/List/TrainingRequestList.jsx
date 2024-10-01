import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { mapTRequestToTableData } from "../../services/DataMapping/TrainingRequestData";

const TrainingRequestTable = ({data}) =>{
    return(<>
    
    <DataTable
              value={mapTRequestToTableData(data)}
              stripedRows
              size="small"
              tableStyle={{ minWidth: "50rem" }}
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25, 50]}
              dataKey="id"
              filters={filters}
              header={header}
              emptyMessage="No data found."
              sortMode="multiple"
            >
              <Column field="id" header="Id" sortable></Column>

              <Column field="requestorBadge" header="BadgeNo" sortable></Column>
              <Column
                field="requestorName"
                header="Requestor"
                sortable
              ></Column>
              <Column field="type" header="Type" sortable></Column>
              <Column field="program" header="Program" sortable></Column>
              <Column field="category" header="Category" sortable></Column>
              <Column field="provider" header="Provider" sortable></Column>
              <Column field="venue" header="Venue" sortable></Column>
              <Column
                field="startDate"
                header="Start Date"
                sortable
                style={{ width: "8%" }}
                body={(rowData) => {
                  return formatDateOnly(rowData.startDate);
                }}
              ></Column>
              <Column
                field="endDate"
                header="End Date"
                sortable
                style={{ width: "8%" }}
                body={(rowData) => {
                  return formatDateOnly(rowData.endDate);
                }}
              ></Column>
              <Column
                field="totalFee"
                header="Total Fee"
                sortable
                style={{ width: "8%" }}
                body={(product) => {
                  return formatCurrency(product?.totalFee);
                }}
              ></Column>
              <Column
                field="approverPosition"
                header="Current Approver"
                sortable
                style={{ minWidth: "12rem" }}
                body={approverColumnTemplate}
              ></Column>
              {/* <Column
              field="status"
              header="Status"
              sortable
              body={(rowData) => {
                return StatusColor(rowData.status);
              }}
            ></Column> */}
              <Column field="id" header="Action" body={actionTemplate}></Column>
            </DataTable>
            </>)
}
export default TrainingRequestTable;