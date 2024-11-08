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
import mappingHook from "../../hooks/mappingHook";
const ApproverList = ({data, activityTitle, activityType, emailFormat}) => {
  
  const mappedApprovers = mappingHook.useMappedActivityRoute(data?.approvers, data?.routings)
  const [visible, setVisible] = useState(false);  
  const actionBodyTemplate = (rowData) => (
    <div>
      {
      (rowData?.status?.statusId === statusCode.FORAPPROVAL && rowData?.detail?.employeeBadge === SessionGetEmployeeId()) ?
      <>
      <ApproverAction reqId={data?.data?.id} onFinish={()=>window.location.reload()} />
      </> :
      <Button
        type="button"
        icon="pi pi-envelope"
        text
        disabled={rowData?.status?.statusId !== statusCode.FORAPPROVAL}
        onClick={() => setVisible(true)}
      />}
    </div>
  );
  const statusTemplate = (rowData) => emailFormat ? getStatusById(rowData?.status?.statusId):
    StatusColor({status: getStatusById(rowData?.status?.statusId), class:"p-2 px-3 ", showStatus: true});

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
        {activityType === ActivityType.REQUEST && !emailFormat &&
        <Column header="Action" body={actionBodyTemplate}></Column>}
      </DataTable>
      <EmailForm handleShow={visible} handleClose={() => setVisible(false)} activityTitle={activityTitle} activityId={data?.id} activityType={activityType}
      activityData={data}
      />
    </>
  );
};
ApproverList.propTypes = {
  data: proptype.object,
  activityTitle: proptype.string,
  activityType: proptype.number,
  emailFormat: proptype.bool,
  routeData: proptype.array,
};
export default ApproverList;
