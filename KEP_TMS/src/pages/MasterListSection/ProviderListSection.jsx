import { Button } from "primereact/button";
import SkeletonBanner from "../../components/Skeleton/SkeletonBanner";
import SkeletonDataTable from "../../components/Skeleton/SkeletonDataTable";
import CommonTable from "../../components/General/CommonTable";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import providerHook from "../../hooks/providerHook";
import ProviderForm from "../../components/forms/ModalForms/ProviderForm";
import { formatDateOnly } from "../../utils/datetime/Formatting";
import { checkIfNullOrEmpty } from "../../utils/stringUtil";
import { Paginator } from "primereact/paginator";
import getStatusById from "../../utils/status/getStatusById";

const ProviderListSection = () => {
  const [trigger, setTrigger] = useState(0);
  const [visible, setVisible] = useState({ detail: false, form: false });
  const [paginatorConfig, setPaginatorConfig] = useState({
    first: 0,
    rows: 10,
    page: 1,
    value:null,
  });
  
  const { data, error,loading } = providerHook.usePagedProvider(paginatorConfig.page, paginatorConfig.rows, paginatorConfig.value, trigger);
  // const { data, loading } = providerHook.useAllProviders(false, trigger);
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
          onClick={() => handleOnclick(rowData)}
        />
        <Button
          type="button"
          size="small"
          text
          icon="pi pi-pencil"
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
  const concatenateValue = (oldValue, newValue) => {
    if (!checkIfNullOrEmpty(oldValue) && !checkIfNullOrEmpty(newValue)) {
      return `${oldValue}, ${newValue}`;
    } else if (!checkIfNullOrEmpty(oldValue) && checkIfNullOrEmpty(newValue)) {
      return oldValue;
    } else if (checkIfNullOrEmpty(oldValue) && !checkIfNullOrEmpty(newValue)) {
      return newValue;
    }
    return "";
  };
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
      body: (rowData) => <>{formatAddressDetail(rowData)}</>,
    },
    {
      field: "statusName",
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
        <div className="flex theme-color">
          <h6 className="theme-color m-0 fw-bold">Training Providers</h6>
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
      ) :error ? (
        <p>Error while processing your request</p>
      ) :  (
        <>
          <CommonTable
            headerComponent={header}
            dataTable={data?.results}
            title="Providers"
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
              <p>
              <strong>Name: </strong>
              {selectedData?.name}</p>
              <strong>Category: </strong>
              <p>
              {selectedData?.categoryName}</p>
              <strong>Address: </strong>
              <p>
                <i>Building: </i> {selectedData?.address?.building ?? "N/A"}
              </p>
              <p>
                <i>Street: </i> {selectedData?.address?.street ?? "N/A"}
              </p>
              <p>
                <i>Barangay: </i> {selectedData?.address?.barangay ?? "N/A"}
              </p>
              <p>
                <i>Landmark: </i> {selectedData?.address?.landmark ?? "N/A"}
              </p>
              <p>
                <i>City/Municipality: </i>{" "}
                {selectedData?.address?.city_Municipality ?? "N/A"}
              </p>
              <p>
                <i>Province: </i> {selectedData?.address?.province ?? "N/A"}
              </p>
              <p>
                <i>Country: </i> {selectedData?.address?.country ?? "N/A"}
              </p>
              <p>
                <i>Postal Code: </i> {selectedData?.address?.postalCode ?? "N/A"}
              </p>
              <strong>Status:</strong>
              {selectedData?.statusName ?? selectedData?.status?.name}
              <p>
              <strong>Created: </strong>
                {formatDateOnly(selectedData?.createdDate)} by{" "}
                {selectedData?.createdBy}
              </p>
              <p>
              <strong>Updated: </strong>
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
