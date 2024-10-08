import { Row, Col, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import proptype from "prop-types";
import { Button } from "primereact/button";
import {
  insertTrainingProgram,
  updateTrainingProgram,
} from "../../../api/trainingServices";
import { actionSuccessful, confirmAction } from "../../../services/sweetalert";
import { SessionGetEmployeeId } from "../../../services/sessions";
import Select from "react-select";
import { statusCode } from "../../../api/constants";
import providerConstant from "../../../services/constants/providerConstant";
import { FormFieldItem } from "../../trainingRequestFormComponents/FormElements";
import categoryHook from "../../../hooks/categoryHook";
const ProviderForm = ({ handleShow, handleClose, selectedData }) => {
  const [formData, setFormData] = useState(providerConstant);
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const categories = categoryHook.useAllCategories();
  const [options, setOptions] = useState({status:[
    { label: "Active", value: statusCode.ACTIVE },
    { label: "Inactive", value: statusCode.INACTIVE },
  ], category: []});
  useEffect(()=>{
if(!categories?.loading){
    const categoriesOptions = categories?.data?.map((category) => {
        return { label: category.name, value: category.id };
    })
    setOptions({...options, category: categoriesOptions})
}
  },[categories])
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) {
      formErrors.name = "Name is required";
    }
    if (!formData.description) {
      formErrors.description = "Description is required";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  useEffect(() => {
    if (validated) {
      validateForm();
    }
  }, [formData]);
  useEffect(() => {
    if (selectedData != null) {
      const status = options?.status?.find(
        (option) => option.label === selectedData?.statusName
      );
      const updatedData = { ...selectedData, statusId: status?.value };
      setFormData(updatedData);
    }else{
      setFormData(providerConstant)
    }
  }, [selectedData]);
console.log(options)
  const submitForm = async () => {
    try {
      const data =
        selectedData != null
          ? {
              id: formData.id,
              name: formData.name,
              description: formData.description,
              statusId: formData.statusId,
              updatedBy: SessionGetEmployeeId(),
            }
          : {
              name: formData.name,
              description: formData.description,
              createdBy: SessionGetEmployeeId(),
              statusId: statusCode.ACTIVE,
            };
      const res =
        selectedData != null
          ? await updateTrainingProgram(data)
          : await insertTrainingProgram(data);
      if (res.isSuccess) {
        handleClose();
        actionSuccessful(res.message);

        setInterval(() => {
          window.location.reload();
        }, 2500);
      } else {
        setErrors({ value: res.message });
      }
    } catch (error) {
      setErrors({ value: error.message });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      confirmAction({
        title: selectedData != null ? "Update Program" : "Add Program",
        text:
          selectedData != null
            ? "Are you sure you want to update this program?"
            : "Are you sure you want to add this program?",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        onConfirm: submitForm,
      });
    } else {
      setValidated(true);
    }
  };
  return (
    <>
      {" "}
      <Modal show={handleShow} onHide={handleClose} size={"lg"}>
        <Modal.Header className="border-0" closeButton>
          <Modal.Title className={`h5 text-theme`}>
            {selectedData != null ? "Update Program" : "Add Program"}
          </Modal.Title>
        </Modal.Header>
        <Form
          className={validated && "was-validated"}
          onSubmit={handleSubmit}
          noValidate
        >
          <Modal.Body className="py-0">
            {errors.value && (
              <p className="text-red text-center">{errors.value}</p>
            )}
            <Row className="">
              <FormFieldItem
                label="Name"
                col={"col-12"}
                required
                error={errors?.name??""}
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
                FieldComponent={
                  <Select
                    isLoading={categories.loading}
                    options={options.category}
                    value={options?.category?.filter(
                      (x) => x.value == formData?.statusId
                    )}
                    onChange={(e) =>
                      setFormData({ ...formData, statusId: e.value })
                    }
                    name="status"
                  />
                }
              />
              <FormFieldItem
                label="Contact"
                col={"col-md-6"}
                required
                FieldComponent={
                  <Form.Control
                  value={formData?.contactNumber ?? ""}
                    onChange={(e) =>
                      setFormData({ ...formData, statusId: e.value })
                    }
                    className="form-control"
                    type="text"
                    placeholder="Contact No"
                  />
                }
              />
              <hr />
              <FormFieldItem
                label="Address"
                col={"col-md-6"}
                required
                FieldComponent={
                  <Form.Control
                  value={formData?.address?.building ?? ""}
                    onChange={(e) =>
                      setFormData({ ...formData, statusId: e.value })
                    }
                    className="form-control"
                    type="text"
                    placeholder="Building"
                  />
                }
              />
              <FormFieldItem
                label="Address"
                col={"col-md-6"}
                required
                FieldComponent={
                  <Form.Control
                  value={formData?.address?.street ?? ""}
                    onChange={(e) =>
                      setFormData({ ...formData, statusId: e.value })
                    }
                    className="form-control"
                    type="text"
                    placeholder="Street"
                  />
                }
              />
              <FormFieldItem
                label="Address"
                col={"col-md-6"}
                required
                FieldComponent={
                  <Form.Control
                  value={formData?.address?.landmark ?? ""}
                    onChange={(e) =>
                      setFormData({ ...formData, statusId: e.value })
                    }
                    className="form-control"
                    type="text"
                    placeholder="Landmark"
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
              label="No"
              icon="pi pi-times"
              onClick={handleClose}
              className="p-button-text rounded"
            />
            <Button
              type="submit"
              label="Yes"
              icon="pi pi-check"
              className="rounded"
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
