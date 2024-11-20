import { Row, Col, Form, Modal } from "react-bootstrap";
import { useCallback, useEffect, useMemo, useState } from "react";
import proptype from "prop-types";
import { Button } from "primereact/button";
import { actionSuccessful, confirmAction } from "../../../services/sweetalert";
import { SessionGetEmployeeId } from "../../../services/sessions";
import Select from "react-select";
import { statusCode } from "../../../api/constants";
import handleResponseAsync from "../../../services/handleResponseAsync";
import externalFacilitatorService from "../../../services/externalFacilitatorService";
const ExternalFacilitatorForm = ({ handleShow, handleClose, selectedData, onFinish }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const options = useMemo(
    () => [
      { label: "Active", value: statusCode.ACTIVE },
      { label: "Inactive", value: statusCode.INACTIVE },
    ],
    []
  );
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validateForm = useCallback(() => {
    let formErrors = {};
    if (!formData.name) {
      formErrors.name = "This field is required";
    }
    setErrors(formErrors);
    return Object.keys(formErrors)?.length === 0;
  }, [formData]);

  useEffect(() => {
    if (selectedData != null) {
      setFormData(selectedData);
    }else{
      setFormData({});
    }
  }, [selectedData, options]);
  const submitForm = async () => {
    const data =
      selectedData != null
        ? {...formData,
            updatedBy: SessionGetEmployeeId(),
          }
        : {...formData,
            createdBy: SessionGetEmployeeId(),
            statusId: statusCode.ACTIVE,
          };
    handleResponseAsync(
      () =>
        selectedData != null
          ? externalFacilitatorService.updateExternalFacilitator(data)
          : externalFacilitatorService.createExternalFacilitator(data),
      (e) => {
        actionSuccessful(`Success!`, e.message);
        onFinish();
      },
      (error) => setErrors({ value: error.message })
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      confirmAction({
        showLoaderOnConfirm: true,
        title: selectedData != null ? "Update Detail" : "Submit",
        text:
          selectedData != null
            ? "Are you sure you want to update this?"
            : "Are you sure you want to submit this form?",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        onConfirm: submitForm,
      });
    } 
  };
  return (
    <>
      {" "}
      <Modal show={handleShow} onHide={handleClose} size={"md"}>
        <Modal.Header className="border-0" closeButton>
          <Modal.Title className={`h5 theme-color`}>
            {selectedData != null ? "Update Detail" : "Add External Facilitator"}
          </Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={handleSubmit}
          noValidate
        >
          <Modal.Body className="py-0">
            {errors.value && (
              <p className="text-red text-center">{errors.value}</p>
            )}
            <Row className="g-3">
              <Col>
                <Form.Group>
                  <Form.Label className="required">Name</Form.Label>

                  <Form.Control
                    type="text"
                    name="name"
                    value={formData?.name}
                    placeholder="Name"
                    onChange={handleOnChange}
                    required
                  />
                  {errors.name && (
                    <small className="text-red">{errors.name}</small>
                  )}
                </Form.Group>
              </Col>
              <Col className="col-12">
                <Form.Group>
                  <Form.Label>Department / Organization</Form.Label>
                  <Form.Control
                    className="form-control"
                    value={formData?.depatmentOrganization}
                    placeholder="Department / Organization"
                    name="depatmentOrganization"
                    rows="5"
                    onChange={handleOnChange}
                    required
                 />
                  {errors.depatmentOrganization && (
                    <small className="text-red">{errors.depatmentOrganization}</small>
                  )}
                </Form.Group>
              </Col>
              <Col className="col-12">
                <Form.Group>
                  <Form.Label>Position</Form.Label>
                  <Form.Control
                    className="form-control"
                    value={formData?.position}
                    placeholder="Position Name"
                    name="position"
                    rows="5"
                    onChange={handleOnChange}
                    required
                 />
                  {errors.position && (
                    <small className="text-red">{errors.position}</small>
                  )}
                </Form.Group>
              </Col>
              {selectedData && (
                <Col className="col-12">
                  <Form.Group>
                    <Form.Label className="required">Status</Form.Label>
                    <Select
                      options={options}
                      value={options.filter(
                        (x) => x.value == formData?.statusId
                      )}
                      onChange={(e) =>
                        setFormData({ ...formData, statusId: e.value })
                      }
                      name="status"
                    />
                  </Form.Group>
                </Col>
              )}
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <Button
              type="button"
              label="Cancel"
              onClick={handleClose}
              className="p-button-text rounded"
            />
            <Button
              type="submit"
              label={selectedData != null ? "Update" : "Create"}
              className="rounded"
            />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
ExternalFacilitatorForm.propTypes = {
  handleShow: proptype.bool.isRequired,
  handleClose: proptype.func,
  selectedData: proptype.object,
  onFinish: proptype.func,
};
export default ExternalFacilitatorForm;