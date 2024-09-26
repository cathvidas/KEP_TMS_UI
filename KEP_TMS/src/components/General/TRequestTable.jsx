import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useRef, useState } from "react";
import {
  getAllTrainingRequests,
  getCurrentRoutingActivity,
  getTrainingRequestByApprover,
} from "../../api/trainingServices";
import {
  SessionGetEmployeeId,
  SessionGetRole,
  SessionGetUserId,
} from "../../services/sessions";
import { getUserApi } from "../../api/userApi";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { formatCurrency, formatDateOnly } from "../../utils/Formatting";
import { mapTRequestToTableData } from "../../services/DataMapping/TrainingRequestData";
import StatusColor from "./StatusColor";
import proptype from "prop-types";
import { ActivityType } from "../../api/constants";

const TRequestTable = ({ filterType }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getTrainingRequests = async () => {
      try {
        let trainingRequests = await getAllTrainingRequests();


        const updatedRequests = await Promise.all(
          trainingRequests.data.map(async (request) => {
            // Get the list of facilitator IDs
            const facilitatorIds = request.trainingFacilitators.map(
              (element) => {
                return element.facilitatorBadge;
              }
            );
            // Fetch details for each facilitator
            const facilitatorsDetails = await Promise.all(
              facilitatorIds.map(async (facilitatorBadge) => {
                const user = await getUserApi(facilitatorBadge);
                return {
                  facilitatorBadge,
                  name: user.data.username,
                  fullname: user.data.lastname + ", " + user.data.firstname,
                };
              })
            );
            const approver = await getCurrentRoutingActivity(request.id, ActivityType.REQUEST)
            const user = await getUserApi(approver.assignedTo)
            const routing ={
              approverUsername: user.data.username,
              approverFullName: user.data.lastname + ", " + user.data.firstname,
              statusId: approver.statusId,
              approverId: user.data.employeeBadge,
              approverPosition: user.data.position
            }
            
        // if (filterType === "forApproval") {
        //   const res = 
        //   trainingRequests = res
        // //  console.log(trainingRequests)
        // }
            return {
              ...request,
              trainingFacilitators: facilitatorsDetails, 
              routing: routing// Replace with detailed facilitator information
            };
          })
        );
console.log(updatedRequests)
        // Set training requests with updated facilitator information
        if (filterType === "UserRole" && (SessionGetRole() !== "Admin" && SessionGetRole() !== "SuperAdmin")) {
          const userRequests = updatedRequests.filter(
            (request) => request.requestorBadge === SessionGetEmployeeId()
          );
          setData(userRequests);
        } else {
          setData(updatedRequests);
        }
      } catch (error) {
        console.error("Error fetching training requests:", error);
      }
    };

    getTrainingRequests();
  }, [filterType]);

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
          onClick={() => handleButtonClick(data.id, "TrainingRequest")}
        />
        <Button
          type="button"
          icon="pi pi-pencil"
          size="small"
          className="rounded"
          text
          onClick={() => handleButtonClick(data.id, "Request/Update")}
        />
        {/* <Button
      type="button"
        icon="pi pi-trash"
        size="small"
        className="rounded"
        severity="danger"
        text
        onClick={() => handleButtonClick(data.id)}
      /> */}
      </div>
    );
  };
  const approverColumnTemplate =(rowData)=> {
    return(<>
    <div >
    <span> {StatusColor(rowData.status, "p-1", {fontSize: "0.55rem"}, false)}</span>
      <span> {rowData.status == "ForApproval"? "For "+ rowData.approverPosition + " Approval": rowData.status}</span><br />
      <b> - {rowData.approverFullName}</b>
    </div>
    </>)

  }

  const datatable = useRef(null);
  const exportCSV = (selectionOnly) => {
    datatable.current.exportCSV({ selectionOnly });
  };
  const renderHeader = () => {
    return (
      <div className="flex flex-wrap gap-2  align-items-center">
        <h6 className="m-0 me-auto">Recent Requests</h6>
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </IconField>
        <Button
          icon="pi pi-download"
          text
          className="rounded"
          onClick={() => exportCSV(false)}
        />
      </div>
    );
  };
  const header = renderHeader();
  return (
    <>
      <div className="">
        {data?.length > 0 ? (
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
            <Column field="id" header="Id" sortable></Column>

            <Column field="requestorBadge" header="BadgeNo" sortable></Column>
            <Column field="requestorName" header="Requestor" sortable></Column>
            <Column field="type" header="Type" sortable></Column>
            <Column field="program" header="Program" sortable></Column>
            <Column field="category" header="Category" sortable></Column>
            <Column field="provider" header="Provider" sortable></Column>
            <Column field="venue" header="Venue" sortable></Column>
            <Column
              field="startDate"
              header="Start Date"
              sortable
              style={{ width: "8%" }}
              body={(rowData) => {
                return formatDateOnly(rowData.startDate);
              }}
            ></Column>
            <Column
              field="endDate"
              header="End Date"
              sortable
              style={{ width: "8%" }}
              body={(rowData) => {
                return formatDateOnly(rowData.endDate);
              }}
            ></Column>
            <Column
              field="totalFee"
              header="Total Fee"
              sortable
              style={{ width: "8%" }}
              body={(product) => {
                return formatCurrency(product?.totalFee);
              }}
            ></Column>
            <Column
              field="approverPosition"
              header="Current Approver"
              sortable 
              style={{ minWidth: '12rem' }} 
              body={approverColumnTemplate}
            ></Column>
            {/* <Column
              field="status"
              header="Status"
              sortable
              body={(rowData) => {
                return StatusColor(rowData.status);
              }}
            ></Column> */}
            <Column field="id" header="Action" body={actionTemplate}></Column>
          </DataTable>
        ) : (
          "No recent requests"
        )}
      </div>
    </>
  );
};
TRequestTable.propTypes = {
  filterType: proptype.string,
};
export default TRequestTable;
