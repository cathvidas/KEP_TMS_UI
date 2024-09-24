import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useRef, useState } from "react";
import {
  getAllTrainingRequests,
  getTrainingRequestByApprover,
} from "../../api/trainingServices";
import { SessionGetEmployeeId, SessionGetFirstName, SessionGetUserId } from "../../services/sessions";
import { getUserById } from "../../api/UserAccountApi";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/Formatting";
import getSeverity from "../../services/statusStyle";
import { mapTRequestToTableData } from "../../services/DataMapping/TrainingRequestData";

const TRequestTable = ({ renderType }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getTrainingRequests = async () => {
      try {
        var trainingRequests = await getAllTrainingRequests();

        if (renderType === "forapprovall") {
          trainingRequests = await getTrainingRequestByApprover(
            SessionGetUserId()
          );
        }

        const updatedRequests = await Promise.all(
          trainingRequests.data.map(async (request) => {
            // Get the list of facilitator IDs
            const facilitatorIds = request.trainingFacilitators.map(
              (element) => {
                return element.facilitatorBadge;
              }
            );
            console.log(facilitatorIds);
            // Fetch details for each facilitator
            const facilitatorsDetails = await Promise.all(
              facilitatorIds.map(async (facilitatorBadge) => {
                const user = await getUserById(facilitatorBadge);
                return {
                  facilitatorBadge,
                  name: user.data.username,
                  fullname: user.data.lastname + ", " + user.data.firstname,
                };
              })
            );

            return {
              ...request,
              trainingFacilitators: facilitatorsDetails, // Replace with detailed facilitator information
            };
          })
        );

        // Set training requests with updated facilitator information
        if (renderType === "user" || renderType === "Trainee") {
          const userRequests = updatedRequests.filter(
            (request) => request.createdBy === SessionGetEmployeeId()
          );
          console.log(updatedRequests);
          console.log(SessionGetEmployeeId());
          setData(userRequests);
        } else {
          setData(updatedRequests);
        }
      } catch (error) {
        console.error("Error fetching training requests:", error);
      }
    };

    getTrainingRequests();
  }, [renderType]);

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
        onClick={() => handleButtonClick(data.id, "TrainingView")}
      />
      <Button
      type="button"
        icon="pi pi-pencil"
        size="small"
        className="rounded"
        text
        onClick={() => handleButtonClick(data.id, "Request/Update")}
      />
      <Button
      type="button"
        icon="pi pi-trash"
        size="small"
        className="rounded"
        severity="danger"
        text
        onClick={() => handleButtonClick(data.id)}
      />
      </div>
    );
  };

  const datatable = useRef(null);
  const exportCSV = (selectionOnly) => {
    datatable.current.exportCSV({ selectionOnly });
};
  const renderHeader = () => {
    return (
      <div className="flex flex-wrap gap-2  align-items-center">
        <h6 className="m-0 me-auto">Recent Trainings</h6>
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </IconField>
        <Button icon="pi pi-download" text className="rounded" onClick={()=> exportCSV(false)}/>
      </div>
    );
  };
  const statusBodyTemplate = (rowData) => {
    console.log(rowData);
    return (
      <Tag
        value={rowData.status}
        severity={getSeverity(rowData.status)}
      />
    );
  };
const priceBodyTemplate = (product) => {
    return formatCurrency(product?.totalFee);
};
  const header = renderHeader();
  return (
    <>
      <div className="">
        <DataTable
        ref={datatable}
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
          sortMode="multiple"
        >
          <Column
            field="id"
            header="Id"
            sortable
          ></Column>
          <Column
            field="requestorName"
            header="Requestor"
            sortable
          ></Column>
          <Column
            field="type"
            header="Type"
            sortable
          ></Column>
          <Column
            field="program"
            header="Program"
            sortable
          ></Column>
          <Column
            field="category"
            header="Category"
            sortable
          ></Column>
          <Column
            field="provider"
            header="Provider"
            sortable
          ></Column>
          <Column
            field="venue"
            header="Venue"
            sortable
          ></Column>
          <Column
            field="startDate"
            header="Start Date"
            sortable
           style={{ width: "8%" }}
          ></Column>
          <Column
            field="endDate"
            header="End Date"
            sortable
            style={{ width: "8%" }}
          ></Column>
          <Column
            field="totalFee"
            header="Total Fee"
            sortable
            style={{ width: "8%" }}
            body={priceBodyTemplate}
          ></Column>
          <Column
            field="status"
            header="Status"
            sortable
           // style={{ width: "25%" }}
            body={statusBodyTemplate}
          ></Column>
          <Column
            field="id"
            header="Action"
           // style={{ width: "25%" }}
            body={actionTemplate}
          ></Column>
        </DataTable>
      </div>
    </>
  );
};
export default TRequestTable;
