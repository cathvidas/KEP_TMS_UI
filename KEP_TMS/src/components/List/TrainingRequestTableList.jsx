import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { mapTRequestToTableData } from "../../services/DataMapping/TrainingRequestData";
import StatusColor from "../General/StatusColor";
import proptype from "prop-types";
import ExportBtn from "../General/ExportBtn";
import { Dropdown } from "react-bootstrap";
import { statusCode } from "../../api/constants";
import countData from "../../utils/countData";
import {
  formatCurrency,
  formatDateOnly,
} from "../../utils/datetime/Formatting";
import { checkTrainingIfOutDated } from "../../services/inputValidation/validateTrainingSchedules";

const TrainingRequestTableList = ({
  data,
  filter,
  headingTitle,
  handleActionFilter,
  allowEdit = true,
  isAdmin,
  isRequestor,
  isTrainee,
  isFacilitator,
}) => {
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
  const checkTrainingDates = (rowData) => {
    const detail = data?.find((item) => item.id == rowData.id);
    return (
      checkTrainingIfOutDated(detail) &&
      (detail?.status?.id === statusCode.SUBMITTED ||
        detail?.status?.id === statusCode.FORAPPROVAL ||
        detail?.status?.id === statusCode.APPROVED)
    );
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
          onClick={() =>
            handleButtonClick(
              data.id,
              checkTrainingDates(data) || isFacilitator
                ? "TrainingRequest"
                : data.status == "Published" || data.status == "Submitted"
                ? "Training"
                : "TrainingRequest"
            )
          }
        />
        {allowEdit && (
          <Button
            type="button"
            icon="pi pi-pencil"
            size="small"
            className="rounded"
            text
            onClick={() => handleButtonClick(data.id, "Request/Update")}
          />
        )}
        {isAdmin && (
          <Button
            type="button"
            icon="pi pi-check-circle"
            size="small"
            className="rounded"
            severity="help"
            text
            onClick={() => handleButtonClick(data.id, "TrainingMonitoring")}
          />
        )}
      </div>
    );
  };
  const approverColumnTemplate = (rowData) => {
    const isOutDated = checkTrainingDates(rowData);
    return (
      <>
        <div>
          {isOutDated && (
            <div className="text-danger flex gap-1">
              <i className="rounded pi pi-info-circle d-block"></i>Outdated
            </div>
          )}
          <span>
            {" "}
            {StatusColor({
              status: rowData.status,
              class: "p-1",
              style: { fontSize: "0.55rem" },
              showStatus: false,
            })}
          </span>
          <span>
            {" "}
            {rowData.status == "ForApproval"
              ? "For " + rowData.approverPosition + " Approval"
              : rowData.status == "Approved"
              ? "Awaiting Trainer Action"
              : rowData.status == "Submitted"
              ? "Awaiting for trainee effectiveness"
              : rowData.status}
          </span>
          <br />
          <b>
            {rowData.status == "Submitted"
              ? `${countData(
                  rowData.trainingParticipants,
                  "effectivenessId",
                  4
                )}/${rowData.totalParticipants} submitted`
              : rowData.status == "Published"
              ? ""
              : `- ${
                  rowData.status == "Approved"
                    ? rowData?.facilitatorName
                    : rowData.approverFullName
                }`}
          </b>
        </div>
      </>
    );
  };
  const traineeStatusTemplate = (rowData) => (
    <>
      <div>
        {rowData.status == "Published" && (
          <div className=" flex gap-1 text-secondary">Ongoing</div>
        )}
        {rowData.status == "Submitted" && (
          <div className="text-secondary  gap-1">
            <i className="rounded pi pi-info-circle "></i> Pending Effectiveness
            Report
          </div>
        )}
      </div>
    </>
  );

  const options = [
    { value: null, label: "All" },
    // { value: statusCode.FORAPPROVAL, label: "ForApproval" },
    // { value: statusCode.SUBMITTED, label: "Submitted" },
    // { value: statusCode.APPROVED, label: "Approved" },
    { value: statusCode.DISAPPROVED, label: "Disapproved" },
    { value: statusCode.CLOSED, label: "Closed" },
    { value: statusCode.PUBLISHED, label: "Published" },
    { value: "Pending", label: "Pending" },
    { value: "Outdated", label: "Outdated" },
  ];
  const renderHeader = () => {
    return (
      <div className="flex flex-wrap gap-2 align-items-center">
        <span className="me-auto flex">
          <h6 className="m-0">
            {headingTitle ? headingTitle : "Training Request List"}
          </h6>
          {filter && (
            <div className="position-relative">
              <Dropdown>
                <Dropdown.Toggle
                  variant="default"
                  className="border-0 p-0  rounded-0 btn   custom-dropdown-toggle"
                >
                  {StatusColor({
                    status: filter.label ?? "Filter",
                    class: "p-2 badge-lg btn rounded-pill px-3",
                    showStatus: true,
                  })}
                </Dropdown.Toggle>

                <Dropdown.Menu
                  align="end"
                  className="overflow-auto"
                  style={{ maxHeight: "300px" }}
                >
                  {options.map((option, index) => (
                    <span key={index}>
                      <Dropdown.Item
                        className={
                          filter?.value === option.value ? "active" : ""
                        }
                        onClick={() => handleActionFilter(option)}
                      >
                        {option.label}
                      </Dropdown.Item>
                    </span>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </span>
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search ms-1" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
            className="rounded-pill"
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
          emptyMessage="No data found."
          className="customTable"
          sortMode="multiple"
        >
          <Column field="id" header="Id" sortable></Column>
          <Column field="requestorBadge" header="BadgeNo" sortable></Column>
          <Column
            field="requestorName"
            header="Requestor Name"
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
          {(isAdmin || isRequestor || isFacilitator) && (
            <Column
              field="approverPosition"
              header="Current Status"
              sortable
              style={{ minWidth: "12rem" }}
              body={approverColumnTemplate}
            ></Column>
          )}
          {isTrainee && (
            <Column
              field="approverPosition"
              header="Remarks"
              sortable
              style={{ minWidth: "12rem" }}
              body={traineeStatusTemplate}
            ></Column>
          )}

          {/* <Column
              field="status"
              header="Overall Status"
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
TrainingRequestTableList.propTypes = {
  filter: proptype.object,
  data: proptype.array,
  headingTitle: proptype.string,
  handleActionFilter: proptype.func,
  allowEdit: proptype.bool,
  isAdmin: proptype.bool,
  isRequestor: proptype.bool,
  isFacilitator: proptype.bool,
  isTrainee: proptype.bool,
};
export default TrainingRequestTableList;
