import { Button } from "primereact/button";
import CommonTable from "../components/General/CommonTable";
import Layout from "../components/General/Layout";
import { ButtonGroup } from "primereact/buttongroup";
import { useState } from "react";
import VideoUploadForm from "../components/forms/ModalForms/VideoUploadForm";
import VideoAccess from "../components/List/VideoAccess";
import { SessionGetRole } from "../services/sessions";
import {
  API_BASE_URL,
  SearchValueConstant,
  UserTypeValue,
} from "../api/constants";
import attachmentHook from "../hooks/attachmentHook";
import { Paginator } from "primereact/paginator";
import { formatDateTime } from "../utils/datetime/Formatting";
import { actionSuccessful, confirmAction } from "../services/sweetalert";
import handleResponseAsync from "../services/handleResponseAsync";
import attachmentService from "../services/attachmentService";
import SkeletonDataTable from "../components/Skeleton/SkeletonDataTable";
import ErrorTemplate from "../components/General/ErrorTemplate";

const DocumentsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const isAdmin = SessionGetRole() === UserTypeValue.ADMIN;
  const [paginatorConfig, setPaginatorConfig] = useState({
    first: 0,
    rows: 10,
    page: 1,
    value: null,
  });
  const { data, error, loading } = attachmentHook.useAllVideoAttachments(
    paginatorConfig.page,
    paginatorConfig.rows,
    SearchValueConstant.VIDEOS,
    paginatorConfig.value,
    trigger
  );
  const columnItems = [
    {
      field: "",
      header: "No",
      body: (_, { rowIndex }) => <>{rowIndex + 1}</>,
    },
    {
      field: "fileName",
      header: "File Name",
    },
    isAdmin
      ? {
          field: "category",
          header: "Category",
        }
      : "",
    {
      field: "Access",
      header: isAdmin ? "Access" : "Training Program",
      body: (rowData) => (
        <>
          {isAdmin ? (
            <span
              className="p-badge p-badge-info cursor-pointer"
              onClick={() => setSelectedItem(rowData)}
            >
              {rowData?.referenceCount}
            </span>
          ) : (
            <>
              <lu>
                <span>Sample Training Request; </span>
                <span>Sample Training Request; </span>
                <span>Sample Training Request</span>
              </lu>
            </>
          )}
        </>
      ),
    },
    isAdmin
      ? {
          field: "fileType",
          header: "Type",
        }
      : "",
    isAdmin
      ? {
          field: "updateDate",
          header: "Date Modified",
          body: (rowData) => <>{formatDateTime(rowData.updateDate)}</>,
        }
      : "",
    {
      field: "ExternalTrainer",
      header: "Action",
      body: (rowData) => (
        <ButtonGroup>
          <Button
            type="button"
            text
            severity="success"
            icon="pi pi-play-circle"
            className="p-button-rounded"
            title="Play Video"
            size="small"
            onClick={() => window.open(API_BASE_URL + rowData?.url, "_blank")}
          />
          {isAdmin && (
            <>
              <Button
                type="button"
                text
                icon="pi pi-list"
                className="p-button-rounded"
                size="small"
                title="View Access Management"
                onClick={() => setSelectedItem(rowData)}
              />
              <Button
                type="button"
                text
                icon="pi pi-trash"
                severity="danger"
                size="small"
                title="Delete Video"
                className="p-button-rounded"
                onClick={() => deleteFile(rowData?.id)}
              />
            </>
          )}
        </ButtonGroup>
      ),
    },
  ];
  const deleteFile = (id) => {
    confirmAction({
      showLoaderOnConfirm: true,
      title: "Delete Video?",
      text: "Are you sure you want to delete this file?",
      confirmButtonText: "Delete",
      confirmButtonColor: "#d33",
      onConfirm: () =>
        handleResponseAsync(
          () => attachmentService.deleteAttachment(id),
          (e) => {
            actionSuccessful("Success", e?.message);
            setTrigger((prev) => prev + 1);
          }
        ),
    });
  };
  const header = (
    <>
      <Button
        label="Upload Video"
        icon="pi pi-upload"
        text
        onClick={() => setShowModal(true)}
      />
    </>
  );
  const Content = () => {
    return (
      <>
        <div className="d-flex ">
          {/* <MenuContainer fullHeight label="Documents" itemList={items} /> */}
          <div
            className="flex-fill overflow-auto p-3"
            style={{ minHeight: "100vh" }}
          >
            {selectedItem ? (
              <VideoAccess
                data={selectedItem}
                handleClose={() => setSelectedItem(null)}
                refreshData={()=> setTrigger((prev) => prev + 1)}
              />
            ) : (
              <>
                {loading ? (
                  <SkeletonDataTable />
                ) : error ? (
                  <ErrorTemplate message={error} />
                ) : (
                  <>
                    <CommonTable
                      headerComponent={header}
                      tableName="Videos"
                      columnItems={columnItems}
                      dataTable={data?.results}
                      hidePaginator
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
                )}
                <VideoUploadForm
                  handleShow={showModal}
                  handleClose={() => setShowModal(false)}
                  onSuccess={() => setTrigger((prev) => prev + 1)}
                />
              </>
            )}
          </div>
        </div>
      </>
    );
  };
  return (
    <Layout
      navReference="Videos"
      header={{
        title: "Dashboard",
        hide: true,
        className: "border-bottom",
      }}
      BodyComponent={() => <Content />}
    />
  );
};
export default DocumentsPage;
