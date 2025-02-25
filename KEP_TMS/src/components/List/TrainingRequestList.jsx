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
import { formatDateOnly } from "../../utils/datetime/Formatting";
import { SessionGetEmployeeId } from "../../services/sessions";
import TraineeStatusTemplate from "../TrainingPageComponents/TraineeStatusColumn";
import RequestStatusColumn from "../TrainingPageComponents/RequestStatusColumn";
import { mapTRequestToTableData } from "../../services/DataMapping/TrainingRequestData";
import { SearchValueConstant, statusCode } from "../../api/constants";
import trainingRequestHook from "../../hooks/trainingRequestHook";
import { Paginator } from "primereact/paginator";
import getStatusById from "../../utils/status/getStatusById";
import SkeletonDataTable from "../Skeleton/SkeletonDataTable";
import ErrorTemplate from "../General/ErrorTemplate";
import ExportDataForm from "../forms/ModalForms/ExportDataForm";
const TrainingRequestList = ({
  headingTitle,
  allowEdit = true,
  isAdmin,
  isRequestor,
  isTrainee,
  isFacilitator,
  requestStatus,
  trainingType
}) => {
  const [paginatorConfig, setPaginatorConfig] = useState({
    first: 0,
    rows: 10,
    page: 1,
    value: "",
  });
  const { data, error, loading } = (isAdmin && (requestStatus !== statusCode.DRAFTED))
    ? trainingRequestHook.usePagedTrainingRequest(
        paginatorConfig.page,
        paginatorConfig.rows,
        requestStatus ? SearchValueConstant.REQ_STATUS : paginatorConfig.value,
        requestStatus ? getStatusById(requestStatus) : null,
        requestStatus ? paginatorConfig.value : null
      )
    : (isRequestor || isFacilitator)
    ? trainingRequestHook.usePagedTrainingRequest(
        paginatorConfig.page,
        paginatorConfig.rows,
       isRequestor ? SearchValueConstant.REQUESTER : SearchValueConstant.FACILITATOR,
        SessionGetEmployeeId(),
        requestStatus ? getStatusById(requestStatus) : paginatorConfig.value,
        requestStatus ? paginatorConfig.value : null
      )
    : trainingRequestHook.usePagedTrainingRequest(
        paginatorConfig.page,
        paginatorConfig.rows,
        SearchValueConstant.PARTICIPANT,
        SessionGetEmployeeId(),
        paginatorConfig.value
      );
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  // const [filteredData, setFilteredData] = useState(data);
  // const mapFilteredData = (e) => {
  //   const f = data?.filter((item) => e?.some(y => item.id === y.id));
  //   setFilteredData(f);
  // };
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setPaginatorConfig((prev) => ({
      ...prev,
      value: value,
      page: 1,
      first: 0,
    }));
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
        {data?.statusId != statusCode.DRAFTED && (
          <Button
            type="button"
            icon="pi pi-eye"
            size="small"
            severity="success"
            className="rounded"
            text
            onClick={() => handleButtonClick(data.id, "TrainingDetail")}
          />
        )}
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
        {isAdmin && <ExportDataForm trainingType={trainingType}/>}
      </div>
    );
  };
  const getRequestById = (id) => {
    return data?.results?.find((item) => item.id === id);
  };
  const header = renderHeader();
  const tableRef = useRef(null);
  return (
    <>
      {loading ? (
        <SkeletonDataTable />
      ) : error ? (
        <ErrorTemplate message={error} />
      ) : (
        <>
          <DataTable
            ref={tableRef}
            value={mapTRequestToTableData(data?.results ?? [])}
            stripedRows
            size="small"
            tableStyle={{ minWidth: "50rem" }}
            dataKey="id"
            // filters={filters}
            header={header}
            emptyMessage="No data found."
            className="customTable"
            sortMode="multiple"
            // onValueChange={(e) => mapFilteredData(e)}
          >
            <Column field="id" header="Id" sortable></Column>
            {isAdmin && (
              <Column
                field="requesterName"
                header="Requestor Name"
                sortable
              ></Column>
            )}
            <Column field="type" header="Type" sortable></Column>
            <Column field="program" header="Program" sortable></Column>
            <Column field="category" header="Category" sortable></Column>
            <Column field="provider" header="Provider" sortable></Column>
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
              ></Column>
            )}
            {(isAdmin || isRequestor) && (
              <Column
                field="createdDate"
                header="Created"
                sortable
                style={{ width: "8%" }}
                body={(rowData) => {
                  return formatDateOnly(rowData.createdDate);
                }}
              ></Column>
            )}
            {(isAdmin || isRequestor || isFacilitator) && (
              <Column
                field="approverPosition"
                header="Current Status"
                style={{ minWidth: "12rem" }}
                body={(rowData) => (
                  <RequestStatusColumn value={getRequestById(rowData?.id)} />
                )}
              ></Column>
            )}
            {isTrainee && (
              <Column
                field="approverPosition"
                header="Status"
                style={{ minWidth: "12rem" }}
                body={(rowData) => (
                  <TraineeStatusTemplate
                    traineeId={SessionGetEmployeeId()}
                    value={getRequestById(rowData?.id)}
                  />
                )}
              ></Column>
            )}
            <Column field="id" header="Action" body={actionTemplate}></Column>
          </DataTable>
          <Paginator
            first={paginatorConfig?.first ?? 1}
            pageLinkSize={5}
            rows={paginatorConfig.rows}
            totalRecords={data?.totalRecords}
            rowsPerPageOptions={[10, 20, 30, 50, 100]}
            onPageChange={(e) =>
              setPaginatorConfig((prev) => ({
                ...prev,
                first: e.first,
                rows: e.rows,
                page: e.page + 1,
              }))
            }
          />
        </>
      )}
    </>
  );
};
TrainingRequestList.propTypes = {
  headingTitle: proptype.string,
  allowEdit: proptype.bool,
  isAdmin: proptype.bool,
  isRequestor: proptype.bool,
  isFacilitator: proptype.bool,
  isTrainee: proptype.bool,
  requestStatus: proptype.any,
  trainingType: proptype.any,
};
export default TrainingRequestList;
