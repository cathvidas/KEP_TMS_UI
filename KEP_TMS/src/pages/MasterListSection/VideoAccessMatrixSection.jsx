import { Button } from "primereact/button";
import CommonTable from "../../components/General/CommonTable";
import { useEffect, useState } from "react";
import { formatDateTime } from "../../utils/datetime/Formatting";
import handleResponseAsync from "../../services/handleResponseAsync";
import userHook from "../../hooks/userHook";
import getStatusById from "../../utils/status/getStatusById";
import SkeletonDataTable from "../../components/Skeleton/SkeletonDataTable";
import ErrorTemplate from "../../components/General/ErrorTemplate";
import { actionSuccessful, confirmAction } from "../../services/sweetalert";
import { SessionGetEmployeeId } from "../../services/sessions";
import videoAccessMatrixService from "../../services/videoAccessMatrixService";
import VideoAccessMatrixForm from "../../components/forms/ModalForms/VideoAccessMatrixForm";

const VideoAccessMatrixSection = () => {
  const [visible, setVisible] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [trigger, setTrigger] = useState(0);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getRoles = async () => {
      handleResponseAsync(
        () => videoAccessMatrixService.getAllVideoAccessMatrix(),
        (e) => setData(e),
        (e) => setError(e),
        () => setLoading(false)
      );
    };
    getRoles();
  }, [trigger]);
  const removeMatrix = (id)=>{
    
    confirmAction({
      showLoaderOnConfirm: true,
      title: "Delete Video Access Matrix",
      text: "Are you sure you want to continue?",
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
      onConfirm: () => 
        handleResponseAsync(
          () => videoAccessMatrixService.deleteVideoAccessMatrix({id,updatedBy: SessionGetEmployeeId()}),
          (e) => {
            actionSuccessful("Success", e?.message ?? `Video Access Matrix successfully deleted`);
            setTrigger((prev) => prev + 1)
          }
        )
    })
  }
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
        <Button
          type="button"
          size="small"
          text
          severity="danger"
          icon="pi pi-trash"
          className="rounded-circle"
          onClick={() => {
            removeMatrix(rowData?.id);
          }}
        />
          </div>
    </>
  );
  const columnItems = [
    {
      field: "level",
      header: "No",
      body: (_, { rowIndex }) => <>{rowIndex + 1}</>,
    },
    {
      field: "description",
      header: "Name",
      body: (rowData) =>
        userHook.useUserById(rowData.employeeBadge)?.data?.fullname,
    },
    {
      field: "title",
      header: "Position",
      body: (rowData) =>
        userHook.useUserById(rowData.employeeBadge)?.data?.position,
    },
    {
      field: "cost",
      header: "Department",
      body: (rowData) =>
        userHook.useUserById(rowData.employeeBadge)?.data?.departmentName,
    },
    {
      field: "createdDate",
      header: "Modified Date",
      body: (rowData) =>
        formatDateTime(rowData.updatedDate ?? rowData.createdDate),
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
          <h6 className="theme-color m-0 fw-bold">Video Access Matrix</h6>
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
          <VideoAccessMatrixForm
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
export default VideoAccessMatrixSection;
