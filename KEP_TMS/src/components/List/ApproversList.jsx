import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import StatusColor from "../General/StatusColor";
import proptype from "prop-types";
import getStatusById from "../../utils/status/getStatusById";
import { Button } from "primereact/button";
import EmailForm from "../forms/ModalForms/EmailForm";
import { useState } from "react";
const ApproverList = ({ datalist, routing }) => {
  console.log(routing)
  const [visible, setVisible] = useState(false);
  // const getStatus = (employeeBadge) => {
  //   const status = routing.filter((x) => x.assignedTo === employeeBadge);
  //    const others = datalist.filter((x)=>  !routing.some((y) => y.assignedTo === x.employeeBadge));
  //    const pending = status.filter((x)=> x.statusId === 4);
  //    console.log(pending)
  //   if (status) {
  //     return getStatusById(status[0]?.statusId);
  //   }else if(!pending && others){
  //     return getStatusById(4)
  //   } 
  //   else {
  //     return "Pending";
  //   }
  // };
  const getStatus = (employeeBadge) => {
    const status = routing.filter((x) => x.assignedTo === employeeBadge); // Get status for this employee
    const others = datalist.filter((x) => !routing.some((y) => y.assignedTo === x.employeeBadge)); // Get others who are not assigned
    const pending = status.find((x) => x.statusId === 4); // Check if any status is 'Pending'
  
    console.log(pending);
  
    if (status.length > 0 && status[0]?.statusId) {
      // If we found a status for the employee
      return getStatusById(status[0]?.statusId);
    } else if (!pending && others.length > 0) {
      // If no pending status and there are unassigned others
      return getStatusById(4); // Assuming 4 means "Pending"
    } else {
      return "Pending"; // Default if no conditions matched
    }
  };
  const actionBodyTemplate = (rowData) => (
    <div>
      <Button
        type="button"
        icon="pi pi-envelope"
        text
        disabled={getStatus(rowData.employeeBadge) == "Pending" ? true : false}
        onClick={() => setVisible(true)}
      />
    </div>
  );
  const statusTemplate = (rowData) =>
    StatusColor(getStatus(rowData.employeeBadge), "p-2 px-3 ", {}, true);

  return (
    <>
      <DataTable
        value={datalist}
        size="small"
        scrollable
        scrollHeight="flex"
        stripedRows
        dataKey={"id"}
        rows={10}
      >
        <Column header="No" body={(_, { rowIndex }) => rowIndex + 1} />
        <Column field="fullname" header="Name"></Column>
        <Column field="employeeBadge" header="Badge No"></Column>
        <Column field="departmentName" header="Department"></Column>
        <Column header="Approved Date" body={"N/A"}></Column>
        <Column header="Status" body={statusTemplate}></Column>
        <Column header="Action" body={actionBodyTemplate}></Column>
      </DataTable>
      <EmailForm handleShow={visible} handleClose={() => setVisible(false)} />
    </>
  );
};
ApproverList.propTypes = {
  datalist: proptype.array.isRequired,
  routing: proptype.array.isRequired,
};
export default ApproverList;
