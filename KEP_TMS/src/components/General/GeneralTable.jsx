import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import proptype from "prop-types";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { actionFailed, actionSuccessful, confirmAction } from "../../services/sweetalert";
import { deleteTrainingCategory } from "../../services/trainingServices";

const GeneralTable = ({ dataTable, title, handleUpdate , dataType}) => {
  const columns = dataTable.length > 0 ? Object.keys(dataTable[0]) : [];
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
console.log(dataType)
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const renderHeader = () => {
    return (
      <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
        <h6 className="m-0">Recent Trainings</h6>
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </IconField>
      </div>
    );
  };
  const action = (s) => {
    console.log(s);
  };
  const handleDelete = async (id) => {
    console.log(id)
    try{
      const res = dataType === "Categories" ? await deleteTrainingCategory(id): null;
      if(res?.isSuccess){
        actionSuccessful("Success", res.message)
        setInterval(() => {
          window.location.reload();
        }, 2000);
      }else {
        actionFailed("Error", res.message)
      }
    }catch(err){
      actionFailed("Error", err)
    }
  };
  const actionBodyComponent = (rowData) => (
    <div className="d-flex">
      <Button
        icon="pi pi-pencil"
        className="rounded p-button-text"
        onClick={()=>handleUpdate(rowData.id)
        }
      />
      <Button
        icon="pi pi-trash"
        severity="danger"
        className="rounded p-button-text"
        onClick={() =>
          confirmAction({
            title: "Delete Program",
            text: "Are you sure you want to delete this program?",
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Nope",
            actionFunction: handleDelete,
            param: rowData.id,
          })}
      />
    </div>
  );
  return (
    <>
      <div className=" w-100 overflowX-auto" style={{ overflowX: "auto" }}>
        <DataTable
          header={renderHeader}
          filters={filters}
          value={dataTable}
          size="small"
          scrollable
          scrollHeight="flex"
          paginator
          stripedRows
          dataKey={"id"}
          rows={10}
          tableStyle={{ minWidth: "50rem" }}
        >
          {columns.length > 0 &&
            columns.map((x, i) => (
              <Column key={i} field={x} header={x}></Column>
            ))}
          <Column header="Action" body={actionBodyComponent}></Column>
        </DataTable>
      </div>
    </>
  );
};
GeneralTable.propTypes = {
  dataTable: proptype.array.isRequired,
  //   columns: proptype.array,
  //   title: proptype.string.isRequired,
  //   actions: proptype.array,
  //   defaultSortConfig: proptype.object,
  //   onRowClick: proptype.func,
  //   onRowEdit: proptype.func,
  //   onRowDelete: proptype.func,
  //   onExport: proptype.func,
};
export default GeneralTable;
