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
import { Dropdown } from "react-bootstrap";
import { statusCode } from "../../api/constants";

const TRequestTable = ({ data, filter, headingTitle, handleActionFilter, allowEdit = true }) => {
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
          onClick={() => handleButtonClick(data.id, data.status == "Published" ? "Training":"TrainingRequest")}
        />
        {allowEdit && 
        <Button
          type="button"
          icon="pi pi-pencil"
          size="small"
          className="rounded"
          text
          onClick={() => handleButtonClick(data.id, "Request/Update")}
        />}
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
              : rowData.status == "Approved"
              ? "Awaiting Trainer Action"
              : rowData.status}
          </span>
          <br />
          <b>
            {
              rowData.status == "Published"
              ? "": 
            `- ${rowData.status == "Approved"
              ? rowData?.facilitatorName
              : rowData.approverFullName}`}
          </b>
        </div>
      </>
    );
  };
  const options = [
    { value: null, label: "All" },
    { value: statusCode.FORAPPROVAL, label: "ForApproval" },
    { value: statusCode.SUBMITTED, label: "Submitted" },
    { value: statusCode.APPROVED, label: "Approved" },
    { value: statusCode.DISAPPROVED, label: "Disapproved" },
    { value: statusCode.CLOSED, label: "Closed" },
    { value: statusCode.PUBLISHED, label: "Published" },
  ];
  const renderHeader = () => {
    return (
      <div className="flex flex-wrap gap-2 align-items-center">
        <span className="me-auto flex">
          <h6 className="m-0">
            {headingTitle ? headingTitle : "Training Request List"}
          </h6>
          {filter && 
          <div className="position-relative">
            <Dropdown>
              <Dropdown.Toggle
                variant="default"
                className="border-0 p-0  rounded-0 btn   custom-dropdown-toggle"
              >
                {StatusColor(
                  filter.label?? "Filter",
                  "p-2 badge-lg btn rounded-pill px-3",
                  {},
                  true
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu
                align="end"
                className="overflow-auto"
                style={{ maxHeight: "300px" }}
              >
                {options.map((option, index) => (
                  <span key={index}>
                    <Dropdown.Item
                      className={filter?.value === option.value ? "active" : ""}
                      onClick={()=>handleActionFilter(option)}
                    >
                      {option.label}
                    </Dropdown.Item>
                  </span>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>}
        </span>
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
            // emptyMessage="No data found."
            sortMode="multiple"
          >
            <Column field="id" header="Id" sortable></Column>

            <Column field="requestorBadge" header="BadgeNo" sortable></Column>
            <Column field="requestorName" header="Requestor" sortable></Column>
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
              header="Current Status"
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
      
      </div>
    </>
  );
};
TRequestTable.propTypes = {
  filter: proptype.object,
  data: proptype.array,
};
export default TRequestTable;
