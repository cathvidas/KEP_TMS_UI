import proptype from "prop-types";
import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import StatusColor from "../General/StatusColor";
import getStatusById from "../../utils/status/getStatusById";
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
  sortable= false
}) => {
  // const [filters, setFilters] = useState(filterTemp);
  const [selected, setSelected] = useState(null);
  const [removeEmpBadge, setRemoveEmpBadge] = useState(null);
  useEffect(() => {
    if (action != null) {
      action(removeEmpBadge);
    }
  }, [removeEmpBadge]);

  useEffect(()=>{
    setSelected([]);
  }, [filterTemp])
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
  
  return (
    <>
      {userlist && (
        <>
          <DataTable 
            value={userlist}
            size="small"
            stripedRows
         //   tableStyle={{ minWidth: "30rem" }}
            selectionMode={true}
            selection={trailingElement?.input === true ? selected : false}
            onSelectionChange={(e) => setSelected(e.value)}
            filters={filterTemp}
            scrollable showGridlines 
            scrollHeight={scrollHeight ?? "60vh"} 
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
  sortable: proptype.bool
};
