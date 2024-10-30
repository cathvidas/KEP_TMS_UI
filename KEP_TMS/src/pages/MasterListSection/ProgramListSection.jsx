import { Button } from "primereact/button";
import ProgramForm from "../../components/forms/ModalForms/ProgramForm";
import { SectionBanner } from "../../components/General/Section";
import SkeletonBanner from "../../components/Skeleton/SkeletonBanner";
import SkeletonDataTable from "../../components/Skeleton/SkeletonDataTable";
import programHook from "../../hooks/programHook";
import CommonTable from "../../components/General/CommonTable";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { formatDateOnly } from "../../utils/datetime/Formatting";

const ProgramListSection = () => {
  const [visible, setVisible] = useState({detail: false, form: false});
  const { data, error, loading } = programHook.useAllPrograms();
  const [selectedData, setSelectedData] = useState({});

  const actionTemplate = (rowData)=><>
  <div className="d-flex"> 
  <Button type="button" size="small" text icon="pi pi-eye" severity="help" className="rounded-circle" onClick={()=>handleOnclick(rowData.id)}/>
  <Button type="button" size="small" text icon="pi pi-pen-to-square" className="rounded-circle" onClick={()=>handleOnclick(rowData.id, true)}/>
  {/* <Button type="button" size="small" text icon="pi pi-trash" severity="danger" className="rounded-circle" onClick={()=>handleDelete(rowData.id)} /> */}
  </div>
  </>
  const handleOnclick = (id, isUpdate = false) => {
    const selected = data.find((x) => x.id === id);
    setSelectedData(selected);
    setVisible(
      isUpdate ? { detail: false, form: true } : { detail: true, form: false }
    );
  };
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
  const columnItems = [{
    // field: "id",
    header: "No",
    body: (_, {rowIndex}) => rowIndex + 1,
  }, {
    field: "name",
    header: "Name",
  },{
    field: "description",
    header: "Description",
  },{
    field: "createdDate",
    header: "Created",
    body: (rowData) => formatDateOnly(rowData.createdDate),
  }, {
    field: "statusName",
    header: "Status",
  }, {
    field:"",
    header: "Action",
    body: actionTemplate
  }
]
  const actionButton = () => {
    return (
      <div className=" flex flex-wrap justify-content- gap-3">
        <Button
          type="button"
          icon="pi pi-plus"
          severity="success"
          className="rounded theme-bg py-1 "
          label={"programs"}
          onClick={() => {setVisible({...visible, form:true})
            setSelectedData(null)
          }}
        />
      </div>
    );
  };
  return (
    <>
      {loading ? (
        <>
          <SkeletonBanner />
          <SkeletonDataTable />
        </>
      ) : error ? 
      <p>Error while processing your request</p>
      : (
        <>
          <SectionBanner
            title={"Programs"}
            subtitle="List of Training Programs"
            ActionComponents={actionButton}
          />{" "}
          <CommonTable
          tableName={"Training Programs"}
            dataTable={data}
            title="Programs"
            columnItems={columnItems}
          />
          <ProgramForm
            handleShow={visible.form}
            handleClose={() => setVisible({ ...visible, form: false })}
            selectedData={selectedData}
          />
          <Modal
            show={visible.detail}
            onHide={() => setVisible({ ...visible, detail: false })}
            size={"md"}
          >
            <Modal.Header  closeButton>
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
                onClick={() => setVisible({...visible, detail:false})}
              />
              <Button
                type="button"
                label="Edit"
                icon="pi pi-pen-to-square"
                className="rounded"
                onClick={() => setVisible({form:true, detail:false})}
              />
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};
export default ProgramListSection;
