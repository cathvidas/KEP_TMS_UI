import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { formatCurrency, formatDateOnly } from "../../utils/Formatting";
import { mapTRequestToTableData } from "../../services/DataMapping/TrainingRequestData";
import StatusColor from "./StatusColor";
import proptype from "prop-types";
import ExportBtn from "./ExportBtn";

const TRequestTable = ({ data, filterType }) => {
  // const [data, setData] = useState([]);

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
  const navigate = useNavigate();
  const handleButtonClick = (id, page) => {
    navigate(`/KEP_TMS/${page}/${id}`);
  };
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
          onClick={() => handleButtonClick(data.id, "TrainingRequest")}
        />
        <Button
          type="button"
          icon="pi pi-pencil"
          size="small"
          className="rounded"
          text
          onClick={() => handleButtonClick(data.id, "Request/Update")}
        />
        {/* <Button
      type="button"
        icon="pi pi-trash"
        size="small"
        className="rounded"
        severity="danger"
        text
        onClick={() => handleButtonClick(data.id)}
      /> */}
      </div>
    );
  };
  const approverColumnTemplate = (rowData) => {
    return (
      <>
        <div>
          <span>
            {" "}
            {StatusColor(rowData.status, "p-1", { fontSize: "0.55rem" }, false)}
          </span>
          <span>
            {" "}
            {rowData.status == "ForApproval"
              ? "For " + rowData.approverPosition + " Approval"
              : rowData.status}
          </span>
          <br />
          <b> - {rowData.approverFullName}</b>
        </div>
      </>
    );
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

        <ExportBtn data={data} />
      </div>
    );
  };
  const header = renderHeader();
  return (
    <>
    
        <div className="">
          {data?.length > 0 ? (
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
          ) : (
            "No recent requests"
          )}
        </div>
    </>
  );
};
TRequestTable.propTypes = {
  filterType: proptype.string,
  data: proptype.array
};
export default TRequestTable;
