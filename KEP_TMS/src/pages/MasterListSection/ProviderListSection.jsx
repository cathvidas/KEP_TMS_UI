import { Button } from "primereact/button";
import { SectionBanner } from "../../components/General/Section";
import SkeletonBanner from "../../components/Skeleton/SkeletonBanner";
import SkeletonDataTable from "../../components/Skeleton/SkeletonDataTable";
import CommonTable from "../../components/General/CommonTable";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import providerHook from "../../hooks/providerHook";
import ProviderForm from "../../components/forms/ModalForms/ProviderForm";
import { formatDateOnly } from "../../utils/datetime/Formatting";
import { checkIfNullOrEmpty } from "../../utils/stringUtil";

const ProviderListSection = () => {
  const [trigger, setTrigger] = useState(0);
  const [visible, setVisible] = useState({ detail: false, form: false });
  const { data, loading } = providerHook.useAllProviders(trigger);
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
          onClick={() => handleOnclick(rowData)}
        />
        <Button
          type="button"
          size="small"
          text
          icon="pi pi-pen-to-square"
          className="rounded-circle"
          onClick={() => handleOnclick(rowData, true)}
        />
        {/* <Button type="button" size="small" text icon="pi pi-trash" severity="danger" className="rounded-circle" onClick={()=>handleDelete(rowData.id)} /> */}
      </div>
    </>
  );
  const handleOnclick = (rowData, isUpdate = false) => {
    setSelectedData(rowData);
    setVisible(
      isUpdate ? { detail: false, form: true } : { detail: true, form: false }
    );
  };
  const concatenateValue = (oldValue, newValue)=>{
    if(!checkIfNullOrEmpty(oldValue) && !checkIfNullOrEmpty(newValue)){
      return `${oldValue}, ${newValue}`;
    }else if(!checkIfNullOrEmpty(oldValue) && checkIfNullOrEmpty(newValue)){
      return oldValue;
    }else if(checkIfNullOrEmpty(oldValue) && !checkIfNullOrEmpty(newValue)){
      return newValue;
    }
    return "";
  }
  const formatAddressDetail = (rowData) => {
    let value = "";
    value = concatenateValue(value, rowData?.address?.building);
    value = concatenateValue(value, rowData.address.street);
    value = concatenateValue(value, rowData?.address?.barangay);
    value = concatenateValue(value, rowData?.address?.landmark);
    value = concatenateValue(value, rowData?.address?.city_Municipality);
    value = concatenateValue(value, rowData?.address?.province);
    value = concatenateValue(value, rowData?.address?.country);
    value = concatenateValue(value, rowData?.address?.postalCode);
    return !checkIfNullOrEmpty(value) ? value : "N/A";
  };
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
      filterField: "concatenatedString",
      body: (rowData) => (
        <>{formatAddressDetail(rowData)}</>
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
          className="rounded theme-bg py-1"
          label={"providers"}
          onClick={() => {
            setVisible({ ...visible, form: true });
            setSelectedData(null);
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
            title={"Providers"}
            subtitle="List of Training Providers"
            ActionComponents={actionButton}
          />{" "}
          <CommonTable
          tableName={"Provider List"}
            dataTable={data}
            title="Providers"
            columnItems={columnItems}
          />
          <ProviderForm
            handleShow={visible.form}
            handleClose={() => setVisible({ ...visible, form: false })}
            selectedData={selectedData}
            onFinish={() => setTrigger((prev) => prev + 1)}
          />
          <Modal
            show={visible.detail}
            onHide={() => setVisible({ ...visible, detail: false })}
            size={"md"}
          >
            <Modal.Header closeButton>
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
              <p>
                <i>Building: </i> {selectedData?.address?.building}
              </p>
              <p>
                <i>Street: </i> {selectedData?.address?.street}
              </p>
              <p>
                <i>Barangay: </i> {selectedData?.address?.barangay}
              </p>
              <p>
                <i>Landmark: </i> {selectedData?.address?.landmark}
              </p>
              <p>
                <i>City/Municipality: </i>{" "}
                {selectedData?.address?.city_Municipality}
              </p>
              <p>
                <i>Province: </i> {selectedData?.address?.province}
              </p>
              <p>
                <i>Country: </i> {selectedData?.address?.country}
              </p>
              <p>
                <i>Postal Code: </i> {selectedData?.address?.postalCode}
              </p>
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
export default ProviderListSection;
