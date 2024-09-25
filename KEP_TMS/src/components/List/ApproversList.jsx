import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import getSeverity from "../../services/statusStyle";
import StatusColor from "../General/StatusColor";
import { getRoutingActivity } from "../../api/trainingServices";
import proptype from "prop-types";
import getStatusById from "../../services/getStatusById";
import { Button } from "primereact/button";
import EmailForm from "../forms/ModalForms/EmailForm";
import { useState } from "react";
  const ApproverList = ({ datalist, routing }) => {
    const [visible, setVisible] = useState(false);
  const getStatus = (employeeBadge) => {
    const status = routing.filter((x) => x.assignedTo === employeeBadge);
    if (status) {
      return getStatusById(status[0]?.statusId);
    } else {
      return "Pending";
    }
  };
  console.log(visible)
  const actionBodyTemplate = (rowData) => (
    <div>
      <Button
        type="button"
        icon="pi pi-envelope"
        text
        disabled={getStatus(rowData.employeeBadge) == "Pending" ? true : false}
        onClick={()=>setVisible(true)}
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
        //  tableStyle={{ minWidth: "30rem" }}
      >
        <Column header="No" body={(_, { rowIndex }) => rowIndex + 1} />
        <Column field="fullname" header="Name"></Column>
        <Column field="employeeBadge" header="Badge No"></Column>
        <Column field="departmentName" header="Department"></Column>
        <Column header="Approved Date" body={"N/A"}></Column>
        <Column header="Status" body={statusTemplate}></Column>
        <Column header="Action" body={actionBodyTemplate}></Column>
        {/* <Column header="Action" body={actionBodyComponent}></Column> */}
      </DataTable>
      <EmailForm handleShow={visible} handleClose={()=>setVisible(false)} />
    </>
  );
};
ApproverList.propTypes = {
  datalist: proptype.array.isRequired,
  routing: proptype.array.isRequired,
};
export default ApproverList;
