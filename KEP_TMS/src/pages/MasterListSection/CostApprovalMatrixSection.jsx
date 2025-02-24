import { Button } from "primereact/button";
import CommonTable from "../../components/General/CommonTable";
import { useEffect, useState } from "react";
import { formatDateOnly } from "../../utils/datetime/Formatting";
import CostApprovalMatrixForm from "../../components/forms/ModalForms/CostApprovalMatrixForm";
import handleResponseAsync from "../../services/handleResponseAsync";
import CostApprovalMatrixService from "../../services/CostApprovalMatrixService";
import userHook from "../../hooks/userHook";
import getStatusById from "../../utils/status/getStatusById";
import SkeletonDataTable from "../../components/Skeleton/SkeletonDataTable";
import ErrorTemplate from "../../components/General/ErrorTemplate";

const CostApprovalMatrixSection = () => {
  const [visible, setVisible] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [trigger, setTrigger] = useState(0);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getRoles = async () => {
      handleResponseAsync(
        () => CostApprovalMatrixService.getAllCostApprovalMatrix(),
        (e) => setData(e),
        (e) => setError(e),
        () => setLoading(false)
      );
    };
    getRoles();
  }, [trigger]);
  const actionTemplate = (rowData) => (
    <>
      <div className="d-flex">
        <Button
          type="button"
          size="small"
          text
          icon="pi pi-pencil"
          className="rounded-circle"
          onClick={() => {
            setVisible(true);
            setSelectedData(rowData);
          }}
        />
          </div>
    </>
  );
  const columnItems = [
    {
      field: "level",
      header: "Level",
      // body: (_, { rowIndex }) => <>{rowIndex + 1}</>,
    },
    {
      field: "description",
      header: "Approver",
      body: (rowData) =>
        userHook.useUserById(rowData.employeeBadge)?.data?.fullname,
    },
    {
      field: "title",
      header: "Title",
    },
    {
      field: "costRange",
      header: "Cost Range",
    },
    {
      field: "description",
      header: "Modified By",
      body: (rowData) =>
        userHook.useUserById(rowData.updatedBy ?? rowData.createdBy)?.data
          ?.fullname ?? rowData?.createdBy,
    },
    {
      field: "createdDate",
      header: "Modified Date",
      body: (rowData) =>
        formatDateOnly(rowData.updatedDate ?? rowData.createdDate),
    },
    {
      field: "statusId",
      header: "Status",
      body: (rowData) => getStatusById(rowData.statusId),
    },
    {
      field: "",
      header: "Action",
      body: actionTemplate,
    },
  ];

  const header = (
    <div className="flex justify-content-between">
      <div className="flex flex-wrap gap-3">
        <div className="flex theme-color">
          <h6 className="theme-color m-0 fw-bold">Cost Codes</h6>
        </div>
        <Button
          type="button"
          icon="pi pi-plus"
          className="rounded  py-1"
          text
          outlined
          label={"Add New"}
          onClick={() => {
            setVisible(true);
            setSelectedData(null);
          }}
        />
      </div>
    </div>
  );
  return (
    <>
      {loading ? (
        <SkeletonDataTable />
      ) : error ? (
        <ErrorTemplate message={error} />
      ) : (
        <>
          <CommonTable
            headerComponent={header}
            hideOnEmpty={false}
            dataTable={data}
            title="Programs"
            columnItems={columnItems}
          />
          <CostApprovalMatrixForm
            handleShow={visible}
            handleClose={() => setVisible(false)}
            onFinish={() => setTrigger((prev) => prev + 1)}
            selectedData={selectedData}
          />
        </>
      )}
    </>
  );
};
export default CostApprovalMatrixSection;
