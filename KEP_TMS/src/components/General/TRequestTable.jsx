import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import {
  getAllTrainingRequests,
  getTrainingRequestByApprover,
} from "../../services/trainingServices";
import { SessionGetFirstName, SessionGetUserId } from "../../services/sessions";
import { getUserById } from "../../api/UserAccountApi";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { MultiSelect } from "primereact/multiselect";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/Formatting";
import getSeverity from "../../services/statusStyle";

const TRequestTable = ({ renderType }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getTrainingRequests = async () => {
      try {
        var trainingRequests = await getAllTrainingRequests();

        console.log(trainingRequests.data);
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
            (request) => request.requestorName === SessionGetFirstName()
          );
          setData(userRequests);
        } else {
          setData(updatedRequests);
          // setData((prev) => [
          //   ...prev,
          //   ...updatedRequests,
          //   ...updatedRequests,
          //   ...updatedRequests,
          //   ...updatedRequests,
          //   ...updatedRequests,
          //   ...updatedRequests,
          //   ...updatedRequests,
          //   ...updatedRequests,
          // ]);
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
  const handleButtonClick = (id) => {
    navigate(`/KEP_TMS/Request_View/${id}`);
  };
  const actionTemplate = (data) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-eye"
          severity="success"
          className="rounded"
          onClick={() => handleButtonClick(data.id)}
        />
      </React.Fragment>
    );
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
  const statusBodyTemplate = (rowData) => {
    console.log(rowData);
    return (
      <Tag
        value={rowData.statusName}
        severity={getSeverity(rowData.statusName)}
      />
    );
  };

const priceBodyTemplate = (product) => {
    return formatCurrency(product.totalTrainingFee);
};
//  const format
  const header = renderHeader();
  return (
    <>
      <div className="">
        <DataTable
          value={data}
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
            header="No"
            sortable
            style={{ width: "3%" }}
          ></Column>
          <Column
            field="requestorName"
            header="Requestor"
            sortable
            style={{ width: "10%" }}
          ></Column>
          <Column
            field="trainingProgramName"
            header="Program"
            sortable
            style={{ width: "10%" }}
          ></Column>
          <Column
            field="categoryName"
            header="Category"
            sortable
            style={{ width: "10%" }}
          ></Column>
          <Column
            field="trainingProviderName"
            header="Provider"
            sortable
            style={{ width: "15%" }}
          ></Column>
          <Column
            field="venue"
            header="Venue"
            sortable
            style={{ width: "10%" }}
          ></Column>
          <Column
            field="trainingStartDate"
            header="Start Date"
            sortable
            style={{ width: "15%" }}
          ></Column>
          <Column
            field="trainingEndDate"
            header="End Date"
            sortable
            style={{ width: "15%" }}
          ></Column>
          <Column
            field="totalTrainingFee"
            header="Total Fee"
            sortable
            style={{ width: "15%" }}
            body={priceBodyTemplate}
          ></Column>
          <Column
            field="statusName"
            header="Status"
            sortable
            style={{ width: "25%" }}
            body={statusBodyTemplate}
          ></Column>
          <Column
            field="id"
            header="Action"
            style={{ width: "25%" }}
            body={actionTemplate}
          ></Column>
        </DataTable>
      </div>
    </>
  );
};
export default TRequestTable;
