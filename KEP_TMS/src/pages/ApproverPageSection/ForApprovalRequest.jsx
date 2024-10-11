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
import CommonTable from "../../components/General/CommonTable";

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
  
  const actionTemplate = (data) => {
    return (
       <ApproverAction reqId={data.id} onFinish={refreshData} hasView/>
    );
  };
  const columnItems = [
    {
      field: "id",
      header: "Id",
    },
    {
      field: "requestorName",
      header: "Requestor",
    },
    {
      field: "requestorId",
      header: "Badge No",
    },
    {
      field: "program",
      header: "Program",
    },
    {
      field: "category",
      header: "Category",
    },
    {
      field: "provider",
      header: "Provider",
    },
    {
      field: "venue",
      header: "Venue",
    },
    {
      field: "startDate",
      header: "Start Date",
      body: (rowData) => <>{formatDateOnly(rowData.startDate)}</>
    },
    {
      field: "endDate",
      header: "End Date",
      body: (rowData) => <>{formatDateOnly(rowData.endDate)}</>
    },
    {
      field: "endDate",
      header: "Total Fee",
      body: (rowData) => <>{formatCurrency(rowData.totalFee)}</>
    },
    {
      field: "endDate",
      header: "Total Fee",
      body: (rowData) => <>{StatusColor({status: rowData.status,showStatus:true})}</>
    },
    {
      field: "",
      header: "Action",
       body: actionTemplate
    },
  ];
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
  const header = renderHeader();

  return (
    <div className="p-3">
    <SectionBanner
      title="For Approvals"
      subtitle="List of Trainings waiting for Approval"
    />
    <CommonTable dataTable={request} columnItems={columnItems} tableName="Training Requests"/>
  </div>
  );
};
export default ForApprovalRequest;
