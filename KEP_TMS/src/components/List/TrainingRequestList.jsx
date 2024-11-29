import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useRef, useState } from "react";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import proptype from "prop-types";
import ExportBtn from "../General/ExportBtn";
import { Paginator } from "primereact/paginator";
import {
  formatCurrency,
  formatDateOnly,
} from "../../utils/datetime/Formatting";
import { SessionGetEmployeeId } from "../../services/sessions";
import TraineeStatusTemplate from "../TrainingPageComponents/TraineeStatusColumn";
import RequestStatusColumn from "../TrainingPageComponents/RequestStatusColumn";
const TrainingRequestList = ({
  data,
  headingTitle,
  allowEdit = true,
  isAdmin,
  isRequestor,
  isTrainee,
  isFacilitator,
  enablePagination,
}) => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [paginatorConfig, setPaginatorConfig] = useState({
    first: 0,
    rows: 10,
    page: 1,
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const mapFilteredData = (e) => {
    const f = data?.filter((item) => e?.some(y => item.id === y.id));
    setFilteredData(f);
  };
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
          onClick={() => handleButtonClick(data.id, "TrainingDetail")}
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
      </div>
    );
  };
  const renderHeader = () => {
    return (
      <div className="flex flex-wrap gap-2 align-items-center">
        <span className="me-auto flex">
          <h6 className="m-0 theme-color" style={{ fontWeight: 600 }}>
            {headingTitle ? headingTitle : "Training Request List"}
          </h6>
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
        {isAdmin && <ExportBtn data={filteredData} />}
      </div>
    );
  };
  const header = renderHeader();
  const tableRef = useRef(null);
  return (
    <>
      <div className="">
        {data?.length > 0 ? (
          <>
            <DataTable
              ref={tableRef}
              value={data}
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
              onValueChange={(e) => mapFilteredData(e)}
            >
              <Column field="id" header="Id" sortable></Column>
              {isAdmin && (
                <Column
                  field="requesterName"
                  header="Requestor Name"
                  sortable
                ></Column>
              )}
              <Column field="type" header="Type" sortable body={(rowData)=>rowData?.trainingType?.name}></Column>
              <Column field="program" header="Program" sortable body={(rowData)=>rowData?.trainingProgram?.name}></Column>
              <Column field="category" header="Category" sortable body={(rowData)=>rowData?.trainingCategory?.name}></Column>
              <Column field="provider" header="Provider" sortable body={(rowData)=>rowData?.trainingProvider?.name ?? "N/A"}></Column>
              <Column field="venue" header="Venue" sortable></Column>
              <Column
                field="trainingStartDate"
                header="Start Date"
                sortable
                style={{ width: "8%" }}
                body={(rowData) => {
                  return formatDateOnly(rowData.trainingStartDate);
                }}
              ></Column>
              <Column
                field="trainingEndDate"
                header="End Date"
                sortable
                style={{ width: "8%" }}
                body={(rowData) => {
                  return formatDateOnly(rowData.trainingEndDate);
                }}
              ></Column>
              {(isAdmin || isRequestor) && (
                <Column
                  field="totalFee"
                  header="Total Fee"
                  sortable
                  style={{ width: "8%" }}
                  body={(rowData) => {
                    return formatCurrency(rowData?.totalTrainingFee);
                  }}
                ></Column>
              )}
              {(isAdmin || isRequestor) && 
              <Column
                field="createdDate"
                header="Created"
                sortable
                style={{ width: "8%" }}
                body={(rowData) => {
                  return formatDateOnly(rowData.createdDate);
                }}
              ></Column>}
              {(isAdmin || isRequestor || isFacilitator) && (
                <Column
                  field="approverPosition"
                  header="Current Status"
                  sortable
                  style={{ minWidth: "12rem" }}
                  body={(rowData) =><RequestStatusColumn value={rowData}/>}
                ></Column>
              )}
              {isTrainee && (
                <Column
                  field="approverPosition"
                  header="Status"
                  sortable
                  style={{ minWidth: "12rem" }}
                  body={(rowData)=><TraineeStatusTemplate traineeId={SessionGetEmployeeId()} value={rowData}/>}
                ></Column>
              )}
              <Column field="id" header="Action" body={actionTemplate}></Column>
            </DataTable>
            {enablePagination && (
              <Paginator
                first={paginatorConfig?.first ?? 1}
                pageLinkSize={5}
                rows={10}
                totalRecords={data?.length}
                rowsPerPageOptions={[10, 20, 30, 50, 100]}
                onPageChange={(e) =>
                  setPaginatorConfig((prev) => ({
                    ...prev,
                    first: e.first,
                    rows: e.rows,
                  }))
                }
              />
            )}
          </>
        ) : (
          <>
            <div className="text-center py-5">No data available</div>{" "}
          </>
        )}
      </div>
    </>
  );
};
TrainingRequestList.propTypes = {
  filter: proptype.object,
  data: proptype.array,
  headingTitle: proptype.string,
  handleActionFilter: proptype.func,
  allowEdit: proptype.bool,
  isAdmin: proptype.bool,
  isRequestor: proptype.bool,
  isFacilitator: proptype.bool,
  isTrainee: proptype.bool,
  enablePagination: proptype.bool,
};
export default TrainingRequestList;
