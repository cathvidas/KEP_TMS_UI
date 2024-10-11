import { SectionBanner } from "../../components/General/Section";
import { useEffect, useRef, useState } from "react";
import {
  getTrainingRequestByApprover,
} from "../../api/trainingServices";
import { SessionGetEmployeeId } from "../../services/sessions";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getUserApi } from "../../api/userApi";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FilterMatchMode } from "primereact/api";
import StatusColor from "../../components/General/StatusColor";
import { mapForApprovalRequestToTableData } from "../../services/DataMapping/TrainingRequestData";
import { formatCurrency, formatDateOnly } from "../../utils/datetime/Formatting";
import ApproverAction from "../../components/tableComponents/ApproverAction";

const ForApprovalRequest = () => {
  const [request, setRequest] = useState([]);
  const [trigger, setTrigger] = useState(0);
  useEffect(() => {
    const getRequest = async () => {
      try {
        const res = await getTrainingRequestByApprover(SessionGetEmployeeId());
        const mappedData = mapForApprovalRequestToTableData(res);
        const updated = await Promise.all(
          mappedData.map(async (x) => {
            const user = await getUserApi(x.requestorId);
            // const approver = await getUserApi(x.currentApprover);
            return { ...x, requestorName: user.data.fullname };
          })
        );
        setRequest(updated);
      } catch (error) {
        console.error(error);
      }
    };
    getRequest();
  }, [trigger]);

  const dateStartTemplate = (rowData) => {
    return <div>{formatDateOnly(rowData.startDate)}</div>;
  };
  const dateEndTemplate = (rowData) => {
    return <div>{formatDateOnly(rowData.startDate)}</div>;
  };
  const totalFeeTemplate = (rowData) => {
    return <div>{formatCurrency(rowData.totalFee)}</div>;
  };
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const datatable = useRef(null);
  const exportCSV = (selectionOnly) => {
    datatable.current.exportCSV({ selectionOnly });
  };
  const renderHeader = () => {
    return (
      <div className="flex flex-wrap gap-2  align-items-center">
        <h6 className="m-0 me-auto">Recent Requests</h6>
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </IconField>
        <Button
          icon="pi pi-download"
          text
          className="rounded"
          onClick={() => exportCSV(false)}
        />
      </div>
    );
  };

  const refreshData= ()=>{
    setInterval(() => {
      setTrigger(trigger+1)
    }, 2000);
  }
  const actionTemplate = (data) => {
    return (
       <ApproverAction reqId={data.id} onFinish={refreshData} hasView/>
    );
  };
  const header = renderHeader();

  return (
    <div className="p-3">
    <SectionBanner
      title="For Approvals"
      subtitle="List of Trainings waiting for Approval"
    />
    <DataTable
      ref={datatable}
      header={header}
      value={request}
      stripedRows
      size="small"
      tableStyle={{ minWidth: "50rem" }}
      paginator
      rows={10}
      rowsPerPageOptions={[5, 10, 25, 50]}
      dataKey="id"
      filters={filters}
      emptyMessage="No data found."
      sortMode="multiple"
    >
      <Column field="id" header="Id"></Column>
      <Column field="requestorName" header="Requestor"></Column>
      <Column field="requestorId" header="Badge No"></Column>
      <Column field="program" header="Program Name"></Column>
      <Column field="category" header="Category"></Column>
      <Column field="provider" header="Provider"></Column>
      <Column field="venue" header="Venue"></Column>
      <Column
        field="startDate"
        header="Start Date"
        body={dateStartTemplate}
      ></Column>
      <Column
        field="endDate"
        header="End Date"
        body={dateEndTemplate}
      ></Column>
      <Column header="Total Fee" body={totalFeeTemplate}></Column>
      <Column
        field="status"
        header="Current Status"
        body={(rowData) => {
          return StatusColor({status: rowData.status,showStatus:true});
        }}
      ></Column>
      <Column field="id" header="Action" body={actionTemplate}></Column>
    </DataTable>
  </div>
  );
};
export default ForApprovalRequest;
