import { Button } from "primereact/button";
import ProgramForm from "../../components/forms/ModalForms/ProgramForm";
import SkeletonBanner from "../../components/Skeleton/SkeletonBanner";
import SkeletonDataTable from "../../components/Skeleton/SkeletonDataTable";
import programHook from "../../hooks/programHook";
import CommonTable from "../../components/General/CommonTable";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { formatDateOnly } from "../../utils/datetime/Formatting";
import { Paginator } from "primereact/paginator";

const ProgramListSection = () => {
  const [visible, setVisible] = useState({ detail: false, form: false });
  const [trigger, setTrigger] = useState(0);
  const [paginatorConfig, setPaginatorConfig] = useState({
    first: 0,
    rows: 10,
    page: 1,
    value:null,
  });
  
  const { data, error, loading } = programHook.usePagedPrograms(paginatorConfig.page, paginatorConfig.rows, paginatorConfig.value, trigger);
  // const { data, error, loading } = programHook.useAllPrograms(false, trigger);
  const [selectedData, setSelectedData] = useState({});

  const actionTemplate = (rowData) => (
    <>
      <div className="d-flex">
        <Button
          type="button"
          size="small"
          text
          icon="pi pi-eye"
          severity="help"
          className="rounded-circle"
          onClick={() => {setSelectedData(rowData);
            setVisible({ ...visible, detail: true });
          }}
        />
        <Button
          type="button"
          size="small"
          text
          icon="pi pi-pen-to-square"
          className="rounded-circle"
          onClick={() => {setSelectedData(rowData);
            setVisible({ ...visible, form: true });
          }}
        />
        {/* <Button type="button" size="small" text icon="pi pi-trash" severity="danger" className="rounded-circle" onClick={()=>handleDelete(rowData.id)} /> */}
      </div>
    </>
  );
  // const handleDelete = (id) => {
  //     confirmAction({
  //       title: "Confirm Deletion",
  //       text: `Are you sure you want to delete this Program?`,
  //       confirmButtonText: "Delete",
  //       cancelButtonText: "Cancel",
  //       onConfirm:()=> handleResponseAsync(
  //         ()=>programService.deleteProgram(id),
  //         ()=>actionSuccessful("Success!", "Program deleted successfully"),
  //         (e)=>actionFailed("Error!", e.message)
  //       ),
  //     })
  // }
  const columnItems = [
    {
      // field: "id",
      header: "No",
      body: (_, { rowIndex }) => <>{paginatorConfig.first + 1+ rowIndex}</>,
    },
    {
      field: "name",
      header: "Name",
    },
    {
      field: "description",
      header: "Description",
    },
    {
      field: "createdDate",
      header: "Created",
      body: (rowData) => formatDateOnly(rowData.createdDate),
    },
    {
      field: "statusName",
      header: "Status",
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
          <h6 className="theme-color m-0 fw-bold">Training Programs</h6>
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
  return (
    <>
      {loading ? (
        <>
          <SkeletonBanner />
          <SkeletonDataTable />
        </>
      ) : error ? (
        <p>Error while processing your request</p>
      ) : (
        <>
          <CommonTable
            headerComponent={header}
            dataTable={data?.results}
            title="Programs"
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
          <ProgramForm
            handleShow={visible.form}
            handleClose={() => setVisible({ ...visible, form: false })}
            selectedData={selectedData}
            onReload={() => {
              setTrigger((prev) => prev + 1);
              setVisible({ ...visible, form: false });
            }}
          />
          <Modal
            show={visible.detail}
            onHide={() => setVisible({ ...visible, detail: false })}
            size={"md"}
          >
            <Modal.Header closeButton>
              <Modal.Title className={`h5 theme-color`}>
                Program Details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h6>Name: </h6>
              <p>{selectedData?.name}</p>
              <h6>Description: </h6>
              <p>{selectedData?.description}</p>
              <h6>Status: </h6>
              <p>{selectedData?.statusName}</p>
              <h6 className="m-0">Created: </h6>
              <p>
                {formatDateOnly(selectedData?.createdDate)} by{" "}
                {selectedData?.createdBy}
              </p>
              <h6 className="m-0">Updated: </h6>
              <p>
                {formatDateOnly(selectedData?.updatedDate)} by{" "}
                {selectedData?.updatedBy}
              </p>
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
export default ProgramListSection;
