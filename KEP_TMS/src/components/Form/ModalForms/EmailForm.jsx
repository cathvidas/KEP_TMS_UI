import { Row, Col, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import proptype from "prop-types";
import { Button } from "primereact/button";
import Select from "react-select";
const EmailForm = ({ handleShow, handleClose, selectedData,  }) => {
  const [formData, setFormData] = useState({});
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const [content, setContent] = useState(false);
  return (
    <>
      {" "}
      <Modal show={handleShow} onHide={handleClose} size={"md"}>
        <Modal.Header className="border-0" closeButton>
          <Modal.Title className={`h5 text-theme`}>
          {content ? "Follow Up Email" : ""}  
          </Modal.Title>
        </Modal.Header>
        <Form
          className={validated && "was-validated"}
          noValidate
        > {
            content ? <>
          <Modal.Body className="py-0">
            {errors?.value && (
              <p className="text-red text-center">{errors?.value}</p>
            )}
            <Row className="g-3">
              <Col>
                <Form.Group>
                  <Form.Label className="">Subject</Form.Label>

                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Category Name"
                    defaultValue={"Training Request Approval Follow-up"}
                    required
                  />
                  {errors.name && (
                    <small className="text-red">{errors.name}</small>
                  )}
                </Form.Group>
              </Col>
              <Col className="col-12">
                <Form.Group>
                  <Form.Label className="">Content</Form.Label>

                  <textarea
                    className="form-control"
                    value={formData.description}
                    placeholder="Category Description"
                    name="description"
                    rows="5"
                    required
                  ></textarea>
                  {errors.description && (
                    <small className="text-red">{errors.description}</small>
                  )}
                </Form.Group>
              </Col>
              {selectedData && (
                <Col className="col-12">
                  <Form.Group>
                    <Form.Label className="required">Status</Form.Label>
                    <Select
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
              label="Back"
              onClick={()=>setContent(false)}
              className="p-button-text rounded"
            />
            <Button
              type="button"
              label="Send"
              icon="pi pi-envelope"
              className="rounded"
            />
          </Modal.Footer></> : <>
          <Modal.Body className="p-0">
            <div  className="pb-4 px-4 border-bottom text-center">
                <h5 className="">Send Follow Up Email for Approval Training Request?
                </h5>
                <span className="text-muted h-6 d-block">Training Request ID: 12</span>
                <div className="px-5 d-flex flex-column mx-4">
                <Button type="button" icon="pi pi-envelope" className="my-2 rounded d-block text-center" label="Send Follow Up Email"/>
                <Button type="button" icon="pi pi-pencil" outlined  className="rounded d-block" label="Customize Content" onClick={()=>setContent(true)}/>
                </div>

            </div>
            </Modal.Body>
          </>}
        </Form>
      </Modal>
    </>
  );
};
EmailForm.propType = {
  handleShow: proptype.bool.isRequired,
  handleClose: proptype.func,
  selectedData: proptype.object,
};
export default EmailForm;
