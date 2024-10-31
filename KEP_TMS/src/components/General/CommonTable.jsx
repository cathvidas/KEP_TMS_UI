import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import proptype from "prop-types";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import "../../assets/css/customPrimeReact.css"

const CommonTable = ({
  dataTable,
  columnItems,
  tableName,
  header,
  HeaderComponent,
  hideHeader,
  hidePaginator,
}) => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const renderHeader = () => {
    return (
      <div className="flex flex-wrap">
        <h6 className="m-0  ">{tableName ?? ""}</h6>
        {/*         
        <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
        <Button type="button" icon="pi pi-pencil" text onClick={handleExport} /> */}
        {HeaderComponent && 
        <HeaderComponent /> }
        <IconField iconPosition="left" className="ms-auto" >
          <InputIcon className="pi pi-search ms-1" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search"
            className="rounded-pill"
          />
        </IconField>
      </div>
    );
  };
  return (
    <>
      <div className=" w-100 overflowX-auto" style={{ overflowX: "auto" }}>
        {dataTable?.length > 0 ?
        <DataTable
          // ref={dt}
          className="customTable"
          header={!hideHeader ? header ?? renderHeader : ""}
          filters={filters}
          value={dataTable}
          size="small"
          scrollable
          scrollHeight="flex"
          paginator={!hidePaginator}
          stripedRows
          dataKey={"id"}
          rows={10}
          key={"id"}
          tableStyle={{ minWidth: "50rem" }}
          rowsPerPageOptions={[5, 10, 25, 50]}
        >
          {columnItems &&
            columnItems?.map((item, i) => (
              <Column
                key={"dt"+i}
                field={item?.field}
                header={item?.header}
                body={item.body ?? ""}
              ></Column>
            ))}
        </DataTable>: <>
        <div className="text-center py-5">No data available</div> 
        </>}
      </div>
    </>
  );
};
CommonTable.propTypes = {
  dataTable: proptype.array.isRequired,
  columnItems: proptype.array,
  tableName: proptype.string,
  header: proptype.func,
  HeaderComponent: proptype.any,
  hideHeader: proptype.bool,
  hidePaginator: proptype.bool,
};
export default CommonTable;
