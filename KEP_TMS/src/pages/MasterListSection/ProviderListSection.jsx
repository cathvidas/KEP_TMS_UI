import { Button } from "primereact/button";
import ProgramForm from "../../components/forms/ModalForms/ProgramForm";
import { SectionBanner } from "../../components/General/Section";
import SkeletonBanner from "../../components/Skeleton/SkeletonBanner";
import SkeletonDataTable from "../../components/Skeleton/SkeletonDataTable";
import CommonTable from "../../components/General/CommonTable";
import { useState } from "react";
import { actionFailed, actionSuccessful, confirmAction } from "../../services/sweetalert";
import handleResponseAsync from "../../services/handleResponseAsync";
import programService from "../../services/programService";
import { Modal } from "react-bootstrap";
import providerHook from "../../hooks/providerHook";
import ProviderForm from "../../components/forms/ModalForms/ProviderForm";
import { formatDateOnly } from "../../utils/datetime/Formatting";

const ProviderListSection = () => {
  const [visible, setVisible] = useState({detail: false, form: false});
  const { data, loading } = providerHook.useAllProviders();
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
  const handleDelete = (id) => {
      confirmAction({
        title: "Confirm Deletion",
        text: `Are you sure you want to delete this Program?`,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        onConfirm:()=> handleResponseAsync(
          ()=>programService.deleteProgram(id),
          ()=>actionSuccessful("Success!", "Program deleted successfully"),
          (e)=>actionFailed("Error!", e.message)
        ),
      })
  }
  const columnItems = [
    {
      field: "id",
      header: "ID",
    },
    {
      field: "name",
      header: "Name",
    },
    {
      field: "categoryName",
      header: "Category",
    },
    {
      field: "contactNumber",
      header: "Contacts",
    },
    {
      field: "Address",
      header: "Address",
      body: (rowData) => (
        <>{`${rowData?.address?.building}, 
        ${rowData?.address?.street}, ${rowData?.address?.barangay}, 
        ${rowData?.address?.landmark}, ${rowData?.address?.city_Municipality}, 
        ${rowData?.address?.country}, ${rowData?.address?.postalCode}`}</>
      ),
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
  const actionButton = () => {
    return (
      <div className=" flex flex-wrap justify-content- gap-3">
        <Button
          type="button"
          icon="pi pi-plus"
          severity="success"
          className="rounded theme-bg"
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
      ) : (
        <>
          <SectionBanner
            title={"Programs"}
            subtitle="List of Training Programs"
            ActionComponents={actionButton}
          />{" "}
          <CommonTable
            dataTable={data}
            title="Programs"
            columnItems={columnItems}
          />
          <ProviderForm
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
                Provider Details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h6>Name: </h6>
              <p>{selectedData?.name}</p>
              <h6>Category: </h6>
              <p>{selectedData?.categoryName}</p>
              <h6>Address: </h6>
              <p><i>Building: </i> {selectedData?.address?.building}</p>
              <p><i>Street: </i> {selectedData?.address?.street}</p>
              <p><i>Barangay: </i> {selectedData?.address?.barangay}</p>
              <p><i>Landmark: </i> {selectedData?.address?.landmark}</p>
              <p><i>Municipality: </i> {selectedData?.address?.city_Municipality}</p>
              <p><i>Country: </i> {selectedData?.address?.country}</p>
              <p><i>Postal Code: </i> {selectedData?.address?.postalCode}</p>
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
export default ProviderListSection;
