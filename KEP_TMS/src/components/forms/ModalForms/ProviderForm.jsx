import { Row, Col, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import proptype from "prop-types";
import { Button } from "primereact/button";
import { actionFailed, actionSuccessful, confirmAction } from "../../../services/sweetalert";
import ErrorTemplate from "../../General/ErrorTemplate"
import Select from "react-select";
import { statusCode } from "../../../api/constants";
import providerConstant from "../../../services/constants/providerConstant";
import { FormFieldItem } from "../../trainingRequestFormComponents/FormElements";
import categoryHook from "../../../hooks/categoryHook";
import handleResponseAsync from "../../../services/handleResponseAsync";
import providerService from "../../../services/providerService";
import { SessionGetEmployeeId } from "../../../services/sessions";
const ProviderForm = ({ handleShow, handleClose, selectedData }) => {
  const [formData, setFormData] = useState(providerConstant);
  const [errors, setErrors] = useState({});
  const categories = categoryHook.useAllCategories();
  const [options, setOptions] = useState({status:[
    { label: "Active", value: statusCode.ACTIVE },
    { label: "Inactive", value: statusCode.INACTIVE },
  ], category: []});
  useEffect(() => {
      const categoriesOptions = categories?.data?.map((category) => {
        return { label: category.name, value: category.id };
      });
      setOptions({ ...options, category: categoriesOptions });
  }, [categories.data]);
  const handleOnChange = (e, isAddress = false) => {
    if(isAddress){
      setFormData({...formData, address: {...formData.address, [e.target.name]: e.target.value }});
    }else{
    setFormData({ ...formData, [e.target.name]: e.target.value });}
  };
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;
    if (!formData.name) {
      formErrors.name = "Name is required";
      isValid = false;
    }
    if (formData.categoryId === 0) {
      formErrors.categoryId = "Category is required";
      isValid = false;
    }
    if (!formData.contactNumber) {
      formErrors.contactNumber = "Contact Number is required";
      isValid = false;
    }
    setErrors(formErrors);
    return isValid;
  };


  useEffect(() => {
    if (selectedData != null) {
      const category = options?.category?.find(
        (option) => option.label === selectedData?.categoryName
      );
      const status = options?.status?.find(
        (option) => option.label === selectedData?.statusName
      );
      const updatedData = { ...selectedData, categoryId: category?.value , statusId: status?.value };
      setFormData(updatedData);
    }else{
      setFormData(providerConstant)
    }
  }, [selectedData]);
  
  const handleSubmit = () => {
    const isUpdate = selectedData != null;
    const updatedFormData = {
      ...formData,
      [isUpdate ? 'updatedBy' : 'createdBy']: SessionGetEmployeeId(),statusId: isUpdate ? formData.statusId : statusCode.ACTIVE
    };
    const isValid = validateForm();
    if (isValid) {
      confirmAction({
        title: isUpdate ? "Update Provider" : "Add Provider",
        text:
          selectedData != null
            ? "Are you sure you want to update this program?"
            : "Are you sure you want to add this program?",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        onConfirm: ()=>{
          handleResponseAsync(
            ()=> selectedData != null ? providerService.updateProvider(updatedFormData): providerService.createProvider(updatedFormData),
            (e)=>actionSuccessful("Success!", e?.message),
            (e)=>actionFailed("Error!", e?.message),
          )
        },
      });
    } 
  };
  return (
    <>
      {" "}
      <Modal show={handleShow} onHide={handleClose} size={"lg"}>
        <Modal.Header className="border-0" closeButton>
          <Modal.Title className={`h5 theme-color`}>
            {selectedData != null ? "Update Provider" : "Add Provider"}
          </Modal.Title>
        </Modal.Header>
        <Form
        // className={validated && "was-validated"}
        >
          <Modal.Body className="py-0">
            {errors.value && <ErrorTemplate message={errors.value} />}
            <Row className="">
              <FormFieldItem
                label="Name"
                col={"col-12"}
                required
                error={errors?.name ?? ""}
                FieldComponent={
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData?.name ?? ""}
                    placeholder="Program Name"
                    onChange={handleOnChange}
                    required
                  />
                }
              />
              <FormFieldItem
                label="Category"
                col={"col-md-6"}
                required
                error={errors?.categoryId ?? ""}
                FieldComponent={
                  <Select
                    isLoading={categories.loading}
                    options={options.category}
                    value={options?.category?.filter(
                      (x) => x.value == formData?.categoryId
                    )}
                    onChange={(e) =>
                      setFormData({ ...formData, categoryId: e.value })
                    }
                    name="status"
                  />
                }
              />
              <FormFieldItem
                label="Contact"
                col={"col-md-6"}
                required
                error={errors?.contactNumber ?? ""}
                FieldComponent={
                  <Form.Control
                    value={formData?.contactNumber ?? ""}
                    onChange={handleOnChange}
                    name="contactNumber"
                    className="form-control"
                    type="text"
                    placeholder="Contact No"
                  />
                }
              />
              <hr />
              <h5 className="text-start text-secondary">Address Details</h5>
              <FormFieldItem
                label="Building"
                col={"col-md-4"}
                FieldComponent={
                  <Form.Control
                    value={formData?.address?.building ?? ""}
                    onChange={(e) => handleOnChange(e, true)}
                    name="building"
                    className="form-control"
                    type="text"
                    placeholder="Building"
                  />
                }
              />
              <FormFieldItem
                label="Street"
                col={"col-md-4"}
                FieldComponent={
                  <Form.Control
                    value={formData?.address?.street ?? ""}
                    onChange={(e) => handleOnChange(e, true)}
                    className="form-control"
                    type="text"
                    placeholder="Street"
                    name="street"
                  />
                }
              />
              <FormFieldItem
                label="Barangay"
                col={"col-md-4"}
                FieldComponent={
                  <Form.Control
                    value={formData?.address?.barangay ?? ""}
                    onChange={(e) => handleOnChange(e, true)}
                    className="form-control"
                    type="text"
                    placeholder="Barangay"
                    name="barangay"
                  />
                }
              />
              <FormFieldItem
                label="Landmark"
                col={"col-md-6"}
                FieldComponent={
                  <Form.Control
                    value={formData?.address?.landmark ?? ""}
                    onChange={(e) => handleOnChange(e, true)}
                    className="form-control"
                    type="text"
                    placeholder="Landmark"
                    name="landmark"
                  />
                }
              />
              <FormFieldItem
                label="Municipality"
                col={"col-md-6"}
                FieldComponent={
                  <Form.Control
                    value={formData?.address?.city_Municipality ?? ""}
                    onChange={(e) => handleOnChange(e, true)}
                    className="form-control"
                    type="text"
                    name="city_Municipality"
                    placeholder="Municipality"
                  />
                }
              />
              <FormFieldItem
                label="Country"
                col={"col-md-6"}
                FieldComponent={
                  <Form.Control
                    value={formData?.address?.country ?? ""}
                    onChange={(e) => handleOnChange(e, true)}
                    className="form-control"
                    type="text"
                    name="country"
                    placeholder="Country"
                  />
                }
              />
              <FormFieldItem
                label="Postal Code"
                col={"col-md-6"}
                FieldComponent={
                  <Form.Control
                    value={formData?.address?.postalCode ?? ""}
                    onChange={(e) => handleOnChange(e, true)}
                    className="form-control"
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                  />
                }
              />
              {selectedData && (
                <Col className="col-12">
                  <Form.Group>
                    <Form.Label className="required">Status</Form.Label>
                    <Select
                      options={options.status}
                      value={options?.status?.filter(
                        (x) => x.value == formData?.statusId
                      )}
                      onChange={(e) =>
                        setFormData({ ...formData, statusId: e.value })
                      }
                      name="status"
                    />
                    {errors.description && (
                      <small className="text-red">{errors.description}</small>
                    )}
                  </Form.Group>
                </Col>
              )}
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <Button
              type="button"
              label="Cancel"
              icon="pi pi-times"
              onClick={handleClose}
              className="p-button-text rounded"
            />
            <Button
              type="button"
              label="Save"
              icon="pi pi-check"
              className="rounded"
              onClick={handleSubmit}
            />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
ProviderForm.propTypes = {
  handleShow: proptype.bool.isRequired,
  handleClose: proptype.func,
  selectedData: proptype.object,
};
export default ProviderForm;
