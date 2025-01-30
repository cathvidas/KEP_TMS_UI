import { ButtonGroup } from "primereact/buttongroup";
import CommonTable from "../General/CommonTable";
import { Button } from "primereact/button";
import proptype from "prop-types";
import { useState } from "react";
import VideoAccessForm from "../forms/ModalForms/VideoAccessForm";
import attachmentHook from "../../hooks/attachmentHook";
import { SearchValueConstant } from "../../api/constants";
import { Paginator } from "primereact/paginator";
import SkeletonDataTable from "../Skeleton/SkeletonDataTable";
import ErrorTemplate from "../General/ErrorTemplate";
import { formatDateTime } from "../../utils/datetime/Formatting";
import { actionFailed, actionSuccessful, confirmAction } from "../../services/sweetalert";
import handleResponseAsync from "../../services/handleResponseAsync";
import attachmentService from "../../services/attachmentService";

const VideoAccess = ({ data, handleClose, refreshData }) => {
  const [showForm, setShowForm] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [paginatorConfig, setPaginatorConfig] = useState({
    first: 0,
    rows: 10,
    page: 1,
    value: null,
  });
  const videoAccess = attachmentHook.useAttachmentAccess(
    paginatorConfig.page,
    paginatorConfig.rows,
    SearchValueConstant.ATTACHMENT,
    data?.id,
    paginatorConfig.value,
    trigger
  );
  console.log(data, videoAccess);
  const sampleItems = [
    {
      field: "requestId",
      header: "Request Id",
      // body: (_, { rowIndex }) => <>{rowIndex + 1}</>,
    },
    {
      field: "trainingProgram",
      header: "Training Program",
    },
    {
      field: "Owner",
      header: "Created By",
      body: (rowData)=><>{rowData?.createBy}</>
    },
    {
      field: "Date",
      header: "Created Date",
      body: (rowData)=><>{formatDateTime(rowData?.createDate)}</>
    },
    {
      field: "ExternalTrainer",
      header: "Action",
      body: (rowData) => <>{
        <ButtonGroup>
          <Button
            type="button"
            text
            icon="pi pi-trash"
            severity="danger"
            size="small"
            className="p-button-rounded"
            onClick={() => deleteAccess(rowData.id)}
          />
        </ButtonGroup>}</> 
    },
  ];
  const deleteAccess = (id) =>{
    confirmAction({
      title: "Delete Video Access",
      text: "Are you sure you want to delete this video access?",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Delete",
      onConfirm: () => handleResponseAsync(
        ()=> attachmentService.deleteAttachmentAccess(id),
        (res) => {
          actionSuccessful("Success", res?.message);
          setTrigger(prev=>prev+1);
          refreshData();
        },
        (err) => actionFailed("Error", err?.message)
      ),
    })
  }
  return (
    <>
      <div className="flex border-bottom pb-2">
        <h5 className="theme-color fw-bold mb-0 px-2">{data?.fileName}</h5>
        <Button
          className="ms-auto"
          icon="pi pi-arrow-left"
          text
          type="button"
          label="Back"
          onClick={handleClose}
        />
      </div>
      {videoAccess?.loading ? (
        <SkeletonDataTable />
      ) : videoAccess?.error ? (
        <ErrorTemplate message={videoAccess?.error} />
      ) : (
        <>
          <CommonTable
            headerComponent={
              <Button
                label="Add New"
                icon="pi pi-plus"
                text
                onClick={() => setShowForm(true)}
              />
            }
            hideOnEmpty={false}
            tableName="Video Access"
            columnItems={sampleItems}
            dataTable={videoAccess?.data?.results}
            hidePaginator
            onInputChange={(e)=>
              setPaginatorConfig((prev) => ({
                ...prev,
                value: e,
                page: 1,
                first: 0,
              }))}
          />
          <Paginator
            first={paginatorConfig?.first ?? 1}
            pageLinkSize={5}
            rows={paginatorConfig.rows}
            totalRecords={videoAccess?.data?.totalRecords}
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
      )}
      <VideoAccessForm
        showForm={showForm}
        closeForm={() => setShowForm(false)}
        data={data}
      />
    </>
  );
};
VideoAccess.propTypes = {
  data: proptype.object,
  handleClose: proptype.func,
};
export default VideoAccess;
