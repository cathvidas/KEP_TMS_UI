import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import proptype from "prop-types";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { useRef, useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import "../../assets/css/customPrimeReact.css"
import SkeletonDataTable from "../Skeleton/SkeletonDataTable";

const CommonTable = ({
  dataTable,
  columnItems,
  tableName,
  header,
  headerComponent,
  hideHeader,
  hidePaginator,
  dataKey,
  onInputChange,
  hideOnEmpty=true,
  loading
}) => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    if(onInputChange){
    onInputChange(value);}
    _filters["global"].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const renderHeader = () => {
    return (
      <div className="flex flex-wrap">
        {tableName && <h6 className="m-0  theme-color fw-bold">{tableName}</h6>}
        {headerComponent && 
        <>{headerComponent}</> }
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
  
  const dataRef = useRef();
  return (
    <>
    {loading ? <SkeletonDataTable/> : <>
      <div className=" w-100 overflowX-auto" style={{ overflowX: "auto" }}>
        {((dataTable?.length > 0 && hideOnEmpty) || !hideOnEmpty) ?<>
        <DataTable
          ref={dataRef}
          className="customTable"
          header={!hideHeader ? header ?? renderHeader : ""}
          filters={filters}
          value={dataTable}
          size="small"
          scrollable
          scrollHeight="flex"
          paginator={!hidePaginator}
          stripedRows
          dataKey={dataKey}
          rows={10}
          emptyMessage="No records found"
          key={"id"}
          tableStyle={{ minWidth: "50rem" }}
          rowsPerPageOptions={[5, 10, 25, 50]}
        >
          {columnItems &&
            columnItems?.map((item, i) => {
              return  <Column
                key={ i}
                field={item?.field}
                header={item?.header}
                body={item.body ?? ""}
              ></Column>
})}
        </DataTable></>
        : <>
        <div className="text-center py-5">No data available</div> 
        </>}
      </div></>}
    </>
  );
};
CommonTable.propTypes = {
  dataTable: proptype.array.isRequired,
  columnItems: proptype.array,
  tableName: proptype.string,
  header: proptype.func,
  headerComponent: proptype.any,
  hideHeader: proptype.bool,
  hidePaginator: proptype.bool,
  dataKey: proptype.string,
  onInputChange: proptype.func,
  hideOnEmpty: proptype.bool,
  loading: proptype.bool,
};
export default CommonTable;
