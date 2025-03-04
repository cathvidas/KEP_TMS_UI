import { Button } from "primereact/button";
import SkeletonBanner from "../../components/Skeleton/SkeletonBanner";
import SkeletonDataTable from "../../components/Skeleton/SkeletonDataTable";
import CommonTable from "../../components/General/CommonTable";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { formatDateOnly } from "../../utils/datetime/Formatting";
import externalFacilitatorHook from "../../hooks/externalFacilitatorHook";
import getStatusById from "../../utils/status/getStatusById";
import { Paginator } from "primereact/paginator";
import handleResponseAsync from "../../services/handleResponseAsync";
import externalFacilitatorService from "../../services/externalFacilitatorService";
import { actionSuccessful, confirmAction } from "../../services/sweetalert";
import ExternalFacilitatorForm from "../../components/forms/ModalForms/ExternalFacilitatorForm";

const ExternalFacilitatorListSection = () => {
  const [visible, setVisible] = useState({ detail: false, form: false });
  const [trigger, setTrigger] = useState(0)
  const [paginatorConfig, setPaginatorConfig] = useState({
    first: 0,
    rows: 10,
    page: 1,
    value:null,
  });
  
  const { data,error, loading } = externalFacilitatorHook.usePagedExternalFacilitator(paginatorConfig.page, paginatorConfig.rows, paginatorConfig.value, trigger);
  const [selectedData, setSelectedData] = useState({});
  const actionTemplate = (rowData) => (
    <>
      <div className="d-flex">
        <Button
          type="button"
          size="small"
          text
          icon="pi pi-eye"
          severity="success"
          className="rounded-circle"
          onClick={() => {setSelectedData(rowData);
            setVisible({ ...visible, detail: true });
          }}
        />
        <Button
          type="button"
          size="small"
          text
          icon="pi pi-pencil"
          className="rounded-circle"
          onClick={() => {setSelectedData(rowData);
            setVisible({ ...visible, form: true });
          }}
        />
        <Button type="button" size="small" text icon="pi pi-trash" severity="danger" className="rounded-circle" onClick={()=>handleDelete(rowData.id)} />
        </div>
    </>
  );
  const columnItems = [
    {
      field: "",
      header: "No",
      body: (_, { rowIndex }) => <>{paginatorConfig.first + 1+ rowIndex}</>,
    },
    {
      field: "name",
      header: "Name",
    },
    {
      field: "position",
      header: "Position",
    },
    {
      field: "depatmentOrganization",
      header: "Depatment Organization",
    },
    {
      field: "createdDate",
      header: "Created",
      body: (rowData) => formatDateOnly(rowData.createdDate),
    },
    {
      field: "status",
      header: "Status",
      body: (rowData) => <>{getStatusById(rowData.statusId)}</>,
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
        <div className="flex theme-color" >
          <i
            className="pi pi-users fw-bold"
            style={{ fontSize: "1.5rem" }}
          ></i>
          <h6 className="theme-color m-0 fw-bold" >
            External Trainers
          </h6>
        </div>
        <Button
          type="button"
          icon="pi pi-plus"
          className="rounded  py-1"
          text
          outlined
          label={"Add New"}
          onClick={() => {
            setVisible({ ...visible, form: true });
            setSelectedData(null);
          }}
        />
      </div>
    </div>
  );
  const handleDelete = (id) => {
    confirmAction({
      title: "Confirm Deletion",
      text: `Are you sure you want to delete this Program?`,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      onConfirm: () =>
        handleResponseAsync(
          () => externalFacilitatorService.deleteExternalFacilitator(id),
          (e)=>{actionSuccessful("Success", e.message);
            setTrigger(prev=>prev+1)
          }
        ),
    });
  };
  return (
    <>
      {loading ? (
        <>
          <SkeletonBanner />
          <SkeletonDataTable />
        </>
      ) :error ? (
        <p>Error while processing your request</p>
      ) : (
        <>
          <CommonTable
          headerComponent={header}
            dataTable={data?.results}
            title="External Facilitators"
            columnItems={columnItems}
            hidePaginator
            hideOnEmpty={false}
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
            totalRecords={data?.totalRecords}
            rowsPerPageOptions={[10, 20, 30, 50, 100]}
            onPageChange={(e) =>
              setPaginatorConfig((prev) => ({
                ...prev,
                first: e.first,
                rows: e.rows,
                page: e.page+1,
              }))
            }
          />
          <ExternalFacilitatorForm
            handleShow={visible.form}
            handleClose={() => setVisible({ ...visible, form: false })}
            selectedData={selectedData}
            onFinish={()=>{setTrigger((prev)=>prev+1);
              setVisible({ ...visible, form: false })
            }}
          />
          <Modal
            show={visible.detail}
            onHide={() => setVisible({ ...visible, detail: false })}
            size={"md"}
          >
            <Modal.Header closeButton>
              <Modal.Title className={`h5 theme-color`}>
                Facilitator Details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              
              <h6><strong>Name:</strong> <span>{selectedData?.name}</span></h6>
              <h6><strong>Depatment / Organization:</strong> <span>{selectedData?.depatmentOrganization}</span></h6>
              <h6><strong>Position:</strong> <span>{selectedData?.position}</span></h6>
              <h6><strong>Status:</strong> <span>{getStatusById(selectedData?.statusId)}</span></h6>
              <h6><strong>Created:</strong> <span>{formatDateOnly(selectedData?.createdDate)}{" by "}
              {selectedData?.createdBy}</span></h6>
              <h6><strong>Added:</strong> <span>{selectedData?.updatedDate ? `${formatDateOnly(selectedData?.updatedDate)} by ${selectedData?.updatedBy}`: "N/A"}</span></h6>
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="button"
                label="Close"
                text
                className="rounded mr-2"
                onClick={() => setVisible({ ...visible, detail: false })}
              />
              <Button
                type="button"
                label="Edit"
                icon="pi pi-pen-to-square"
                className="rounded"
                onClick={() => setVisible({ form: true, detail: false })}
              />
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};
export default ExternalFacilitatorListSection;
