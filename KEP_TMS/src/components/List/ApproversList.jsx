import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import StatusColor from "../General/StatusColor";
import proptype from "prop-types";
import getStatusById from "../../utils/status/getStatusById";
import { Button } from "primereact/button";
import EmailForm from "../forms/ModalForms/EmailForm";
import { useState } from "react";
import { ActivityType, statusCode } from "../../api/constants";
import { SessionGetEmployeeId } from "../../services/sessions";
import ApproverAction from "../tableComponents/ApproverAction";
import { formatDateTime } from "../../utils/datetime/Formatting";
const ApproverList = ({data, activityTitle, activityType }) => {
  const [visible, setVisible] = useState(false);
  const getStatus = (employeeBadge) => {
    const status = data?.routings?.filter((x) => x.assignedTo === employeeBadge); // Get status for this employee
  
    if (status?.length > 0 && status[0]?.statusId && data?.status?.id !== statusCode.SUBMITTED) {
      return getStatusById(status[0]?.statusId);
    } 
    else {
        return "Pending";
    }
  };
  const getApprovedDate = (employeeBadge) => {
    const status = data?.routings?.find((x) => x.assignedTo === employeeBadge); 
    if (status?.statusId === statusCode.APPROVED) {
      return status?.updatedDate;
    }
  }
  const actionBodyTemplate = (rowData) => (
    <div>
      {
      (getStatus(rowData?.assignedTo) === "ForApproval" && rowData?.assignedTo === SessionGetEmployeeId()) ?
      <>
      <ApproverAction reqId={data?.id} onFinish={()=>window.location.reload()} />
      </> :
      <Button
        type="button"
        icon="pi pi-envelope"
        text
        disabled={getStatus(rowData.assignedTo) == "Pending" ? true : false}
        onClick={() => setVisible(true)}
      />}
    </div>
  );
  const statusTemplate = (rowData) =>
    StatusColor({status:getStatus(rowData.assignedTo), class:"p-2 px-3 ", showStatus: true});

  return (
    <>
      <DataTable
        value={data?.routings}
        size="small"
        scrollable
        scrollHeight="flex"
        stripedRows
        dataKey={"id"}
        rows={10}
      >
        <Column header="No" body={(_, { rowIndex }) => rowIndex + 1} />
        <Column field="fullname" header="Name" 
          body={(rowData) => <>{rowData?.assignedDetail?.fullname }</>}></Column>
        {/* <Column field="employeeBadge" header="Badge No"></Column> */}
        <Column
          field="position"
          header="Title"
          body={(rowData) => <>{rowData?.assignedDetail?.position + " Approval"}</>}
        ></Column>
        <Column header="Status" body={statusTemplate}></Column>
        <Column
          header="Approved Date"
          body={(rowData) => (
            <>
              {getApprovedDate(rowData.assignedTo)
                ? formatDateTime(getApprovedDate(rowData.assignedTo))
                : "N/A"}
            </>
          )}
        ></Column>
        {activityType === ActivityType.REQUEST && 
        <Column header="Action" body={actionBodyTemplate}></Column>}
      </DataTable>
      <EmailForm handleShow={visible} handleClose={() => setVisible(false)} activityTitle={activityTitle} activityId={data?.id} activityType={activityType}/>
    </>
  );
};
ApproverList.propTypes = {
  data: proptype.object,
  activityTitle: proptype.string,
  activityType: proptype.number,
};
export default ApproverList;
