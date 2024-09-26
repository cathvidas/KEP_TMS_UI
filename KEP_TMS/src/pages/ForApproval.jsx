import Layout from "../components/General/Layout";
import { SectionBanner, SectionTitle } from "../components/General/Section";
import { useEffect, useRef, useState } from "react";
import {
  approveTrainingRequest,
  getTrainingRequestByApprover,
} from "../api/trainingServices";
import { SessionGetEmployeeId } from "../services/sessions";
import { mapForApprovalRequestToTableData } from "../services/DataMapping/TrainingRequestData";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { formatCurrency, formatDateOnly } from "../utils/Formatting";
import { getUserApi } from "../api/userApi";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FilterMatchMode } from "primereact/api";
import StatusColor from "../components/General/StatusColor";
import { useNavigate } from "react-router-dom";
import { statusCode } from "../api/constants";
import { actionFailed, actionSuccessful, confirmAction } from "../services/sweetalert";

const ForApproval = () => {
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
  const navigate = useNavigate();
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

  const handleApproveRequest = async (data) => {
    const newData = {
      requestId: data.id,
      employeeBadge: SessionGetEmployeeId(),
      statusId: data.statusId,
      updatedBy: SessionGetEmployeeId(),
    };

    try {
      const response = await approveTrainingRequest(newData);
      if (response.isSuccess) {
        actionSuccessful("Success", response?.message);
      }else{
        actionFailed("Error Approving Training Request", response?.message);
      }
    } catch (error) {
      actionFailed("Error Approving Training Request", error);
    }
    setInterval(() => {
      setTrigger(trigger+1)
    }, 2000);
  };
console.log(trigger)
  const actionTemplate = (data) => {
    return (
      <div className="d-flex">
        <Button
          type="button"
          icon="pi pi-eye"
          size="small"
          severity="success"
          className="rounded"
          text
          onClick={() => navigate(`/KEP_TMS/TrainingRequest/${data.id}`)}
        />
        <Button
          type="button"
          icon="pi pi-thumbs-up
"
          onClick={() =>
            confirmAction({
              title: "Approve Request",
              text: `Are you sure you want to approve this request?`,
              confirmButtonText: "Approve",
              cancelButtonText: "No",
              actionFunction: handleApproveRequest,
              param: { id: data.id, statusId: statusCode.FORAPPROVAL },
            })
          }
          size="small"
          className="rounded"
          text
        />
        <Button
          type="button"
          icon="pi pi-thumbs-down
"
          size="small"
          className="rounded"
          severity="danger"
          text
          onClick={() =>
            confirmAction({
              title: "Disapprove Request",
              text: `Are you sure you want to disapprove this request?`,
              confirmButtonText: "Disapproved",
              cancelButtonText: "No",
              confirmButtonColor: "#d33",
              actionFunction: handleApproveRequest,
              param: { id: data.id, statusId: statusCode.DISAPPROVED },
            })
          }
        />
      </div>
    );
  };
  const header = renderHeader();
  const Content = () => (
    <div className="p-3">
      <SectionBanner
        title="For Approvals"
        subtitle="List of Trainings waiting for Approval"
      />
      <SectionTitle
        title={"Recent Trainings"}
        Action={{ Link: "#i", Text: "View All" }}
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
            return StatusColor(rowData.status,"",{},true);
          }}
        ></Column>
        <Column field="id" header="Action" body={actionTemplate}></Column>
      </DataTable>
    </div>
  );
  return (
    <>
      <Layout
        BodyComponent={Content}
        header={{
          title: "For Approvals",
          icon: <i className="pi pi-pen-to-square"></i>,
        }}
      />
    </>
  );
};
export default ForApproval;
