import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"

const ApproverList = ({datalist})=>{
    console.log(datalist)
    return(<>
     <DataTable
              value={datalist}
              size="small"
              scrollable
              scrollHeight="flex"
              
              stripedRows
              dataKey={"id"}
              rows={10}
            ><Column header="No" body={(_, { rowIndex }) => rowIndex + 1} />
              <Column field="FullName" header="Name"></Column>
              <Column
                field="EmployeeBadge"
                header="Badge No"
              ></Column>
              <Column
                field="Department"
                header="Department"
              ></Column>
              <Column
                header="Total Time"
              ></Column>
              {/* <Column header="Action" body={actionBodyComponent}></Column> */}
            </DataTable></>)
}
export default ApproverList