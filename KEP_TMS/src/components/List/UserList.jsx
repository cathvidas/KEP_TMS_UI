import proptype from "prop-types";
import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import StatusColor from "../General/StatusColor";
import effectivenessHook from "../../hooks/effectivenessHook";

export const UserList = ({
  userlist,
  trailingElement,
  handleParticipants,
  action,
  filterTemp,
  scrollHeight,
  column,
  allowEffectiveness = false,
  sortable= false,
  selectionMode,showSelected,
  handleScroll
}) => {
  // const [filters, setFilters] = useState(filterTemp);
  const [selected, setSelected] = useState([]);
  const [removeEmpBadge, setRemoveEmpBadge] = useState(null);
  useEffect(() => {
    if (action != null) {
      action(removeEmpBadge);
    }
  }, [removeEmpBadge]);

  useEffect(() => {
    if (handleParticipants) {
      handleParticipants(selected)
    }
  }, [selected, handleParticipants]);
  const actionBodyTemplate = (data) => {
    return (
      <Button type="button" severity="danger" icon="pi pi-trash" text onClick={() => setRemoveEmpBadge(data.employeeBadge)}/>
    );
  };
  const effectivenessTemplate = (rowData) => {
    const effec = effectivenessHook.useEffectivenessById(
      rowData.effectivenessId
    );
    return (
      <>
        {StatusColor({
          status: effec?.data?.statusName ?? "Pending",
          showStatus: true,
        })}
      </>
    );
  };
  const unselectUser = (id)=>{
    setSelected(selected.filter(item=>item.employeeBadge != id))
  }
  const addSelectedUser = (users)=>{
    const filtered = users.filter(item=> !selected?.includes(item)
    )
    setSelected(selected.concat(filtered))
  }
  const getUnselectedUser = ()=>{
    return userlist.filter(item=>!selected?.includes(item))
  } 
   const onScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    if (scrollTop + clientHeight >= scrollHeight && handleScroll) {
      handleScroll();
    }
  };
  return (
    <>
    {showSelected &&
    <div className="flex flex-wrap gap- mb-2">
          {selected?.map(item =><><div
        className="ps-2 py-1  rounded"
        style={{ backgroundColor: 'var(--highlight-bg)', color: 'var(--highlight-text-color)'}}
        >
            <span>{item?.fullname} </span> <Button type="button" className="p-0" size="small" text icon="pi pi-times" onClick={()=>unselectUser(item?.employeeBadge)}/>
    </div>
          </>)}
      
    </div>}
      {userlist && (
        <>
        
          <DataTable 
          onScrollCapture={onScroll}
          // onScrollCapture={handleScroll}
            value={showSelected ?getUnselectedUser() : userlist}
            size="small"
            stripedRows
         //   tableStyle={{ minWidth: "30rem" }}
            selectionMode={selectionMode}
            selection={trailingElement?.input === true ? selected : false}
            onSelectionChange={(e) => addSelectedUser(e.value)}
            filters={filterTemp}
            scrollable showGridlines 
            scrollHeight={scrollHeight ?? ""} 
          >
            {trailingElement?.input === true && (
              <Column
                selectionMode="multiple"
                headerStyle={{ width: "3rem" }}
              ></Column>
            )}
            <Column header="No" body={(_, { rowIndex }) => rowIndex + 1}  sortable={sortable}/>
            <Column field="fullname" header="Name" sortable={sortable}></Column>
            <Column field="employeeBadge" header="Employee Id" sortable={sortable}></Column>
            <Column field="position" header="Position" sortable={sortable}></Column>
            <Column field="departmentName" header="Department" sortable={sortable}></Column>
            {allowEffectiveness && 
            <Column field="effectivenessId" header="Effectiveness Report" body={effectivenessTemplate} sortable={sortable}></Column>
            }
            {allowEffectiveness && 
            <Column field="superiorName" header="Approver" sortable={sortable}></Column>}
            {trailingElement?.action === true && (
              <Column
                headerStyle={{ width: "10%", minWidth: "8rem" }}
                bodyStyle={{ textAlign: "center" }}
                body={actionBodyTemplate}
              ></Column>
            )}
            {column && column}
          </DataTable>
        </>
      )}
    </>
  );
};

UserList.propTypes = {
  leadingElement: proptype.bool,
  userlist: proptype.array,
  trailingElement: proptype.object,
  col: proptype.string,
  handleParticipants: proptype.func,
  property: proptype.string,
  action: proptype.func,
  filterTemp: proptype.object,
  scrollHeight: proptype.string,
  column: proptype.object,
  allowEffectiveness: proptype.bool,
  sortable: proptype.bool,
  selectionMode: proptype.bool,
  showSelected: proptype.bool,
  handleScroll: proptype.func,
};
