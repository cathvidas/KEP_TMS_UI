import { Row, Col, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import proptype from "prop-types";
import { Button } from "primereact/button";
import { actionFailed, actionSuccessful, confirmAction } from "../../../services/sweetalert";
import { SessionGetEmployeeId } from "../../../services/sessions";
import Select from "react-select";
import { statusCode } from "../../../api/constants";
import programService from "../../../services/programService";
import handleResponseAsync from "../../../services/handleResponseAsync";
import ErrorTemplate from "../../General/ErrorTemplate";
const ProgramForm = ({ handleShow, handleClose, selectedData, onReload }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const [options] = useState([
    { label: "Active", value: statusCode.ACTIVE },
    { label: "Inactive", value: statusCode.INACTIVE },
  ]);
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
    return Object.keys(formErrors)?.length === 0;
  };

  useEffect(() => {
    if (validated) {
      validateForm();
    }
  }, [formData]);
  useEffect(() => {
    if (selectedData != null) {
      const status = options.find(
        (option) => option.label === selectedData?.statusName
      );
      const updatedData = { ...selectedData, statusId: status?.value };
      setFormData(updatedData);
    } else {
      setFormData(null);
    }
  }, [selectedData]);
  const submitForm = async () => {
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
    handleResponseAsync(
      () =>
        selectedData != null
          ? programService.updateProgram(data)
          : programService.createProgram(data),
      () => {
        actionSuccessful("Success!", `Successfully ${selectedData != null ? "updated" : "added"} training program.`);
          onReload();
      },
      (e) => actionFailed("Failed!", e.message)
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      confirmAction({
        showLoaderOnConfirm: true,
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
      <Modal show={handleShow} onHide={handleClose} size={"md"}>
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
            <Row className="g-3">
              <Col>
                <Form.Group>
                  <Form.Label className="required">Name</Form.Label>

                  <Form.Control
                    type="text"
                    name="name"
                    value={formData?.name ?? ""}
                    placeholder="Program Name"
                    onChange={handleOnChange}
                    required
                  />
                  {errors.name && (
                    <ErrorTemplate message={errors?.name} />
                  )}
                </Form.Group>
              </Col>
              <Col className="col-12">
                <Form.Group>
                  <Form.Label className="required">Description</Form.Label>
                  <textarea
                    className="form-control"
                    value={formData?.description ?? ""}
                    placeholder="Program Description"
                    name="description"
                    rows="5"
                    onChange={handleOnChange}
                    required
                  ></textarea>
                  {errors.description && (
                    <ErrorTemplate message={errors?.description} />
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
                    {errors.status && (
                      <ErrorTemplate message={errors?.status} />
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
ProgramForm.propTypes = {
  handleShow: proptype.bool.isRequired,
  handleClose: proptype.func,
  selectedData: proptype.object,
  onReload: proptype.func,
};
export default ProgramForm;
