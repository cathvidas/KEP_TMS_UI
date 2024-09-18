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

        console.log(trainingRequests);
        const updatedRequests = await Promise.all(
          trainingRequests.map(async (request) => {
            // Get the list of facilitator IDs
            const facilitatorIds = request.trainingFacilitators.map(
              ({ facilitorBadge }) => facilitorBadge
            );
            // Fetch details for each facilitator
            const facilitatorsDetails = await Promise.all(
              facilitatorIds.map(async (employeeBadge) => {
                const user = await getUserById(employeeBadge);
                console.log(user);
                return {
                  employeeBadge,
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
          setData((prev =>([...prev, ...updatedRequests, ...updatedRequests, ...updatedRequests])));
        }
      } catch (error) {
        console.error("Error fetching training requests:", error);
      }
    };

    getTrainingRequests();
  }, [renderType]);

  console.log(data);
  const [selectedData, setSelectedData] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },

    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    "country.name": {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    balance: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const representativeFilterTemplate = (options) => {
    return (
      <React.Fragment>
        <div className="mb-3 font-bold">Agent Picker</div>
        <MultiSelect
          value={options.value}
          options={[0,1,12,3,334,45,45]}
          itemTemplate={representativesItemTemplate}
          onChange={(e) => options.filterCallback(e.value)}
          optionLabel="name"
          placeholder="Any"
          className="p-column-filter"
        />
      </React.Fragment>
    );
  };

  const representativesItemTemplate = (option) => {
    return (
      <div className="flex align-items-center gap-2">
        <img
          alt={option.name}
          src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`}
          width="32"
        />
        <span>{option.name}</span>
      </div>
    );
  };
  const renderHeader = () => {
    return (
      <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
        <h4 className="m-0">Customers</h4>
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
  };    const getSeverity = (status) => {
    switch (status) {
        case 'unqualified':
            return 'danger';

        case 'Approved':
            return 'success';

        case 'new':
            return 'info';

        case 'negotiation':
            return 'warning';

        case 'renewal':
            return null;
    }
};
  const statusBodyTemplate = (rowData) => {
    console.log(rowData)
    return <Tag value={rowData.statusName} severity={getSeverity(rowData.statusName)} />;
};
  const header = renderHeader();
  return (
    <>
    <div className="card">
        <DataTable value={data} stripedRows  size="small"  tableStyle={{ minWidth: '50rem' }} paginator rows={10} dataKey="id" filters={filters} 
         header={header} emptyMessage="No data found.">
            <Column field="id" header="No" sortable style={{ width: '5%' }}></Column>
            <Column field="requestorName" header="Requestor" sortable style={{ width: '15%' }}></Column>
            <Column field="categoryName" header="Category" sortable style={{ width: '15%' }}></Column>
            <Column field="trainingProviderName" header="Provider" sortable style={{ width: '15%' }}></Column>
            <Column field="venue" header="Venue" sortable style={{ width: '15%' }}></Column>
            <Column field="trainingStartDate" header="Start Date" sortable style={{ width: '15%' }}></Column>
            <Column field="trainingEndDate" header="End Date" sortable style={{ width: '25%' }}></Column>
            <Column field="totalTrainingFee" header="Total Fee" sortable style={{ width: '25%' }}></Column>
            <Column field="statusName" header="Status" sortable style={{ width: '25%' }} body={statusBodyTemplate}></Column>
            <Column field="quantity" header="Action" sortable style={{ width: '25%' }}></Column>
        </DataTable>
    </div>
    </>
  );
};
export default TRequestTable;
