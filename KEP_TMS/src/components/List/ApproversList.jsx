import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import proptype from "prop-types";
import getStatusById from "../../utils/status/getStatusById";
import { Button } from "primereact/button";
import EmailForm from "../forms/ModalForms/EmailForm";
import { useState } from "react";
import { statusCode, UserTypeValue } from "../../api/constants";
import { SessionGetEmployeeId, SessionGetRole } from "../../services/sessions";
import { formatDateTime } from "../../utils/datetime/Formatting";
import mappingHook from "../../hooks/mappingHook";
import ApproverRouteForm from "../forms/ModalForms/ApproverRouteForm";
const ApproverList = ({data, activityType, hasEmailForm, optionColumn, reloadData}) => {
  const [routeForm, setRouteForm] = useState(false);
  const mappedApprovers = mappingHook.useMappedActivityRoute(data?.approvers, data?.routings)
  const [visible, setVisible] = useState(false);  
  const [emailRecipient, setEmailRecipient] = useState({});  
  const [selectedApprover, setSelectedApprover] = useState(null);  
  const actionBodyTemplate = (rowData) => (
    <div>
      {
      (rowData?.status?.statusId === statusCode.FORAPPROVAL && rowData?.detail?.employeeBadge === SessionGetEmployeeId()) ?
      <>
      {optionColumn}
      </> :<>
      <Button
        type="button"
        icon="pi pi-envelope"
        text
        disabled={rowData?.status?.statusId !== statusCode.FORAPPROVAL || SessionGetRole() !== UserTypeValue.ADMIN}
        onClick={() => {setVisible(true);
          setEmailRecipient(rowData?.detail);
        }}
      />
      <Button
        type="button"
        icon="pi pi-directions"
        title="Route Approvers"
        text
        disabled={rowData?.status?.statusId === statusCode.APPROVED || rowData?.status?.statusId === statusCode.ROUTED ||rowData?.status?.statusId === statusCode.PENDING || SessionGetRole() !== UserTypeValue.ADMIN}
        onClick={() => {setRouteForm(true);
          setSelectedApprover(rowData?.detail);
        }}
      />
      </>}
    </div>
  );
  const statusTemplate = (rowData) => rowData?.status?.statusId === statusCode.DISAPPROVED ? <span>Reviewed</span> : <span>{getStatusById(rowData?.status?.statusId)}</span>
  return (
    <>
      <DataTable
        value={mappedApprovers ?? []}
        size="small"
        scrollable
        scrollHeight="flex"
        stripedRows
        dataKey={"id"}
        rows={10}
      >
        <Column header="No" body={(_, { rowIndex }) => rowIndex + 1} />
        <Column field="fullname" header="Name" body={(rowData)=><>{rowData?.detail?.fullname}</>}></Column>
        {/* <Column field="employeeBadge" header="Badge No"></Column> */}
        <Column
          field="position"
          header="Title"
          body={(rowData) => <>{rowData?.detail?.position + " Approval"}</>}
        ></Column>
        <Column header="Status" body={statusTemplate}></Column>
        <Column
          header="Approved Date"
          body={(rowData) => (
            <>
              {rowData?.status?.updatedDate
                ? formatDateTime(rowData?.status?.updatedDate)
                : "N/A"}
            </>
          )}
        ></Column>
        {hasEmailForm &&
        <Column header="Action" body={actionBodyTemplate}></Column>}
      </DataTable>
      {hasEmailForm &&
      <EmailForm handleShow={visible} handleClose={() => setVisible(false)} recipient={emailRecipient} 
      />}
      {routeForm && <ApproverRouteForm onFinish={reloadData} activityId={data?.id} closeForm={()=>setRouteForm(false)} showForm={routeForm} activityType={activityType} currentApprover={selectedApprover}/>}
    </>
  );
};
ApproverList.propTypes = {
  data: proptype.object,
  activityTitle: proptype.string,
  activityType: proptype.number,
  routeData: proptype.array,
  activityLogs: proptype.array,
  hasEmailForm: proptype.bool,
  optionColumn: proptype.any,
  emailFormTemplate: proptype.any,
  reloadData: proptype.func,
};
export default ApproverList;
