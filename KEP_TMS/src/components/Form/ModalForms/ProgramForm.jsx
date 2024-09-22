import { Row, Col, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import proptype from "prop-types";
import { Button } from "primereact/button";
import { insertTrainingProgram, updateTrainingProgram } from "../../../services/trainingServices";
import { actionSuccessful, confirmAction } from "../../../services/sweetalert";
import { SessionGetEmployeeId } from "../../../services/sessions";
import { useNavigate } from "react-router-dom";
import Select from 'react-select'
import { statusCode } from "../../../api/constants";
const ProgramForm = ({ handleShow, handleClose, selectedData }) => {
  const [visible, setVisible] = useState(handleShow);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const [options, setOptions] = useState([
    { label: "Active", value: statusCode.ACTIVE },
    { label: "Inactive", value: statusCode.INACTIVE },
  ])
  const navigate = useNavigate();
console.log(selectedData)
  useEffect(() => {
    if (handleClose != null) {
      handleClose(visible);
    }
  }, [visible]);

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
      const status = options.find((option) => option.label === selectedData?.statusName);
      const updatedData = {...selectedData, statusId:status?.value}
      setFormData(updatedData);
    }
  }, [selectedData]);
  const submitForm = async () => {
    try {
      const data = selectedData != null ? {
        id: formData.id,
        name: formData.name,
        description: formData.description,
        statusId: formData.statusId,
        updatedBy: SessionGetEmployeeId(),
      } :{
        name: formData.name,
        description: formData.description,
        createdBy: SessionGetEmployeeId(),
        statusId: statusCode.ACTIVE,
      };
      console.log(data)
      const res = selectedData!= null? await updateTrainingProgram(data): await insertTrainingProgram(data);
      if (res.isSuccess) {
        handleClose(false);
        actionSuccessful(res.message);

        setInterval(() => {
            window.location.reload()
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
        title:selectedData != null? "Update Program" :"Add Program",
        text: selectedData != null? "Are you sure you want to update this program?": "Are you sure you want to add this program?",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        actionFunction: submitForm,
      });
    } else {
      setValidated(true);
    }
  };
  return (
    <>
      {" "}
      <Modal show={visible} onHide={() => setVisible(false)} size={"md"}>
        <Modal.Header className="border-0" closeButton>
          <Modal.Title className={`h5 text-theme`}>{selectedData != null ? "Update Program": "Add Program"}</Modal.Title>
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
                    value={formData.name}
                    placeholder="Program Name"
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
                  <Form.Label className="required">Description</Form.Label>

                  <textarea
                    className="form-control"
                    value={formData.description}
                    placeholder="Program Description"
                    name="description"
                    rows="5"
                    onChange={handleOnChange}
                    required
                  ></textarea>
                  {errors.description && (
                    <small className="text-red">{errors.description}</small>
                  )}
                </Form.Group>
              </Col>
              {selectedData && 
              <Col className="col-12">
                <Form.Group>
                  <Form.Label className="required">Status</Form.Label>
                  <Select
                    options={options}
                    value={options.filter(x=>x.value == formData?.statusId)}
                    onChange={(e)=>setFormData({...formData, statusId: e.value})}
                    name="status"
                  />
                  {errors.description && (
                    <small className="text-red">{errors.description}</small>
                  )}
                </Form.Group>
              </Col>}
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <Button
              label="No"
              icon="pi pi-times"
              onClick={() => setVisible(false)}
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
ProgramForm.propType = {
  handleShow: proptype.bool.isRequired,
  handleClose: proptype.func,
  selectedData: proptype.object,
};
export default ProgramForm;
