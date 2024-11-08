import { Row, Col, Form, Modal } from "react-bootstrap";
import { useRef, useState } from "react";
import proptype from "prop-types";
import { Button } from "primereact/button";
import TextEditor from "../common/TextEditor";
import { ActivityType } from "../../../api/constants";
import TrainingRequestEmailtemplate from "../../emailTemplate/TrainingRequestEmailtemplate";
import { confirmAction } from "../../../services/sweetalert";
import handleResponseAsync from "../../../services/handleResponseAsync";
import commonService from "../../../services/commonService";
const EmailForm = ({
  handleShow,
  handleClose,
  activityTitle,
  activityType,
  activityId,
  activityData,
  recepient
}) => {
  const [subject, setSubject] = useState(`${activityTitle ?? "Training Request"} #${activityData?.id} Follow Up Email`);
  const [errors, setErrors] = useState({});
  const [content, setContent] = useState(false);
  const [emailContent, setEmailContent] = useState("<div></div>");
  const formTemplateRef = useRef();
  const sendEmail = ()=>{
    const validate = validateEmailContent();
    const emailData = { subject: subject,
      body: content,
      sendTo: recepient}
      console.log(emailData)
    // if(validate){
    //   confirmAction({
    //     showLoaderOnConfirm: true,
    //     title: "Send Email",
    //     text: "Are you sure you want to send this email?",
    //     onConfirm: () => {
    //       handleResponseAsync(
    //         () => commonService.sendEmail(emailData),
    //         null,
    //         null,
    //       );
    //     },
    //   })
    // }
  }
const validateEmailContent = () => {
    let errors = {};
    let isValid = true;
    if (!emailContent) {
      errors.emailContent = "Email content is required";
      isValid = false;
    }
  if(!subject){
    errors.subject = "Subject is required";
    isValid = false;
  }
  setErrors(errors);
  return isValid;
}
  return (
    <>
      {" "}
      <div ref={formTemplateRef} className="d-none">
        {activityData && activityType === ActivityType.REQUEST && (
          <TrainingRequestEmailtemplate data={activityData} showParticipants  />
        )}
      </div>
      <Modal
        show={handleShow}
        onHide={handleClose}
        size={content ? "xl" : "md"}
      >
        <Modal.Header className="border-0" closeButton>
          <Modal.Title className={`h5 text-theme`}>
            {content ? "Follow Up Email" : ""}
          </Modal.Title>
        </Modal.Header>
        <Form >
          {" "}
          {content ? (
            <>
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
                        value={subject}
                        placeholder="Category Name"
                        onChange={(e) => setSubject(e.target.value)}
                        defaultValue={`${
                          activityTitle ? activityTitle : "Training Request"
                        } #${activityId} Approval Follow-up`}
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
                      <TextEditor defaultValue={formTemplateRef.current?.innerHTML} onChange={(e)=>setEmailContent(e)} showToolbar />
                      {/* <textarea
                    className="form-control"
                    value={formData.description}
                    placeholder="Category Description"
                    name="description"
                    rows="5"
                    required
                  ></textarea> */}
                      {errors.description && (
                        <small className="text-red">{errors.description}</small>
                      )}
                    </Form.Group>
                  </Col>
                  {/* {selectedData && (
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
                          <small className="text-red">
                            {errors.description}
                          </small>
                        )}
                      </Form.Group>
                    </Col>
                  )} */}
                </Row>
              </Modal.Body>
              <Modal.Footer className="border-0">
                <Button
                  type="button"
                  label="Back"
                  onClick={() => setContent(false)}
                  className="p-button-text rounded"
                />
                <Button
                  type="button"
                  label="Send"
                  icon="pi pi-envelope"
                  className="rounded"
                  onClick={sendEmail}
                />
              </Modal.Footer>
            </>
          ) : (
            <>
              <Modal.Body className="p-0">
                <div className="pb-4 px-4 border-bottom text-center">
                  <h5 className="">
                    Send Follow Up Email for{" "}
                    {activityTitle ? activityTitle : "Training Request"}{" "}
                    Approval?
                  </h5>
                  <span className="text-muted h-6 d-block">
                    {activityTitle ? activityTitle : "Training Request"} ID:{" "}
                    {activityId}
                  </span>
                  <div className="px-5 d-flex flex-column mx-4">
                    <Button
                      type="button"
                      icon="pi pi-envelope"
                      className="my-2 rounded d-block text-center"
                      label="Send Follow Up Email"
                    />
                    <Button
                      type="button"
                      icon="pi pi-pencil"
                      outlined
                      className="rounded d-block"
                      label="Customize Content"
                      onClick={() => setContent(true)}
                    />
                  </div>
                </div>
              </Modal.Body>
            </>
          )}
        </Form>
      </Modal>
    </>
  );
};
EmailForm.propTypes = {
  handleShow: proptype.bool.isRequired,
  handleClose: proptype.func,
  activityData: proptype.object,
  activityTitle: proptype.string,
  activityType: proptype.number,
  activityId: proptype.number,
  recepient: proptype.string,

};
export default EmailForm;
