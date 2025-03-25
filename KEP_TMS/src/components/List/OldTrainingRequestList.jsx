import proptype from "prop-types";
import oldTrainingsHook from "../../hooks/oldTrainingsHook";
import { useState } from "react";
import CommonTable from "../General/CommonTable";
import { formatCurrency, formatDateOnly, formatDateTime } from "../../utils/datetime/Formatting";
import ActivityStatus from "../General/ActivityStatus";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { APP_DOMAIN, TrainingType } from "../../api/constants";
import { Paginator } from "primereact/paginator";
const OldTrainingRequestList = ({ trainingType }) => {
  const navigate = useNavigate();
  const requestType = TrainingType.EXTERNAL ? "External" : "Internal";
  const [paginatorConfig, setPaginatorConfig] = useState({
    first: 0,
    rows: 10,
    page: 1,
    value: "",
  });
  const { data, loading, error } = trainingType == TrainingType.EXTERNAL ? oldTrainingsHook.useOldExternalRequest(true, paginatorConfig.page,
    paginatorConfig.rows) : {};

    const columnItems = [
      {
        field: "id",
        header: "Id",
      },
      {
        field: "requesterName",
        header: "Requestor",
      },
      {
        field: "trainingType",
        header: "Type",
        body: <>{requestType}</>
      },
      {
        field: "Id",
        header: "Program",
        body: (rowData) => <>{rowData?.trainingProgram?.name}</>,
      },
      {
        field: "Id",
        header: "Category",
        body: (rowData) => <>{rowData?.trainingCategory?.name}</>,
      },
      {
        field: "Id",
        header: "Provider",
        body: (rowData) => <>{rowData?.trainingProvider?.name}</>,
      },
      {
        field: "venue",
        header: "Venue",
      },
      {
        field: "Id",
        header: "Start Date",
        body: (rowData) => <>{formatDateOnly(rowData?.trainingStartDate)}</>,
      },
      {
        field: "Id",
        header: "End Date",
        body: (rowData) => <>{formatDateOnly(rowData?.trainingEndDate)}</>,
      },
      {
        field: "Id",
        header: "Total Fee",
        body: (rowData) => <>{formatCurrency(rowData?.totalTrainingFee)}</>,
      },
      {
        field: "Id",
        header: "Created",
        body: (rowData) => <>{formatDateTime(rowData?.createdDate)}</>,
      },
      {
        field: "Id",
        header: "Status",
        body: (rowData) => (
          <>
            <ActivityStatus block status={rowData?.status?.id} />
          </>
        ),
      },
      {
        field: "Id",
        header: "Action",
        body: (rowData) => (
          <>
            {" "}
            <Button
              type="button"
              icon="pi pi-eye"
              size="small"
              severity="success"
              className="rounded-circle"
              text
              onClick={()=>navigate(APP_DOMAIN + "/OldTrainingDetail/" + rowData?.id)}
            />
          </>
        ),
      },
    ];
    return (
      <>
        <CommonTable
          tableName={`Old ${requestType
          } Training Request List`}
          columnItems={columnItems}
          dataTable={data?.results}
          hideOnEmpty={false}
          hidePaginator
          loading={loading}
          emptyMessage={error}
        />
        <Paginator
          first={paginatorConfig?.first ?? 1}
          pageLinkSize={5}
          rows={paginatorConfig.rows}
          totalRecords={data?.totalRecords}
          rowsPerPageOptions={[10, 20, 30, 50, 100]}
          onPageChange={(e) =>
            setPaginatorConfig((prev) => ({
              ...prev,
              first: e.first,
              rows: e.rows,
              page: e.page + 1,
            }))
          }
        />
      </>
    );
};
OldTrainingRequestList.propTypes = {
  trainingType: proptype.any,
};
export default OldTrainingRequestList;
