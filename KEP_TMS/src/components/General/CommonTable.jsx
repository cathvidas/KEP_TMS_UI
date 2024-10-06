import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import proptype from "prop-types";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { useRef, useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";

const CommonTable = ({ dataTable, title, handleUpdate , dataType, columnItems, actionBodyComponent}) => {
//   const columns = dataTable.length > 0 ? Object.keys(dataTable[0]) : [];
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
  const handleExport =()=>{

  } 
  const dt = useRef(null);
  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
};
  const renderHeader = () => {
    return (
      <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
        <h6 className="m-0">Recent Trainings</h6>
{/*         
        <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
        <Button type="button" icon="pi pi-pencil" text onClick={handleExport} /> */}
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
  return (
    <>
      <div className=" w-100 overflowX-auto" style={{ overflowX: "auto" }}>
        <DataTable
        ref={dt}
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
          {columnItems  &&
            columnItems.map((item, i) => (
              <Column key={i} field={item?.field} header={item?.header} body={item.body??""}></Column>
            ))}
          <Column header="Action" body={actionBodyComponent}></Column>
        </DataTable>
      </div>
    </>
  );
};
CommonTable.propTypes = {
  dataTable: proptype.array.isRequired,
  //   columns: proptype.array,
  //   title: proptype.string.isRequired,
  //   actions: proptype.array,
  //   defaultSortConfig: proptype.object,
  //   onRowClick: proptype.func,
  //   onRowEdit: proptype.func,
  //   onRowDelete: proptype.func,
  //   onExport: proptype.func,
  columnItems: proptype.array,
  actionBodyComponent: proptype.func,
};
export default CommonTable;
