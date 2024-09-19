import proptype from "prop-types";
import UserIcon from "../General/UserIcon";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { FilterMatchMode } from "primereact/api";

export const UserList = ({
  leadingElement,
  property,
  userlist,
  trailingElement,
  col,
  handleParticipants,
  action,
  filterTemp
}) => {
 // const [filters, setFilters] = useState(filterTemp);
  const [selected, setSelected] = useState(null);
  


  console.log(selected);
  useEffect(()=>{

  })
  useEffect(() => {
    if (handleParticipants) {
      handleParticipants(selected);
    }
  }, [selected, handleParticipants]);
  const actionBodyTemplate = (data) => {
    return (
      <Button
        icon="pi pi-trash"
        size="small"
        rounded
        className="rounded-circle"
        text
        severity="danger"
        onClick={() => action(data.employeeBadge)}
      />
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
            tableStyle={{ minWidth: "50rem" }}
            selectionMode={true}
            selection={trailingElement?.input === true ? selected : false}
            onSelectionChange={(e) => setSelected(e.value)}
            filters={filterTemp}
          >
            {trailingElement?.input === true && (
              <Column
                selectionMode="multiple"
                headerStyle={{ width: "3rem" }}
              ></Column>
            )}
            <Column field="employeeBadge" header="Code"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="departmentName" header="Department"></Column>
            <Column field="roleName" header="Usertype"></Column>
            {trailingElement?.action === true && (
              <Column
                headerStyle={{ width: "10%", minWidth: "8rem" }}
                bodyStyle={{ textAlign: "center" }}
                body={actionBodyTemplate}
              ></Column>
            )}
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
};
