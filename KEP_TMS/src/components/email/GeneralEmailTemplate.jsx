import { Card, Col, Dropdown, Form, Row } from "react-bootstrap";
import TextEditor from "../forms/common/TextEditor";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useRef, useState } from "react";
import proptype from "prop-types";
import getStatusById from "../../utils/status/getStatusById";
import { ActivityType, APPLICATION_BASE_URL, statusCode } from "../../api/constants";
import { actionSuccessful, confirmAction } from "../../services/sweetalert";
import handleResponseAsync from "../../services/handleResponseAsync";
import ErrorTemplate from "../General/ErrorTemplate";
import { SessionGetEmployeeId } from "../../services/sessions";
import emailService from "../../services/emailService";
import commonHook from "../../hooks/commonHook";
import { formatDateOnly } from "../../utils/datetime/Formatting";
const GeneralEmailTemplate = ({
  requestData,
  userFormData,
  reportType,
  typeId,
  onClose,
  onRefresh
}) => {
  const formType = 
  typeId == ActivityType.EFFECTIVENESS
    ? "Effectiveness"
    : typeId == ActivityType.REPORT
    ? "Report"
    : typeId == ActivityType.EVALUATION
    ? "Evaluation"
    : typeId == ActivityType.EXAM
    ? "Exams"
    : "Request"
  const [addRecipient, setAddRecipinet] = useState(false);
  const [addFormLink, setAddFormLink] = useState(false);
  const [statusSelected, setStatusSelected] = useState("Pending");
  const [greeting, setGreeting] = useState("Good Day");
  const [emailContent, setEmailContent] = useState("");
  const [error, setError] = useState("");
  const [subject, setSubject] = useState(
    `Reminder: Pending Training ${formType} ${typeId == ActivityType.EXAM ? "" :"Form "}Submission`
  );
  const [recipients, setRecipients] = useState([]);
  const [urlPlaceholder, setUrlPlaceholder] = useState(
    "To submit the form, please click the link below"
  );
  useEffect(() => {
    if (userFormData) {
      if (statusSelected === "Pending") {
        setRecipients(userFormData?.filter((item) => !item[reportType]?.id));
      } else {
        setRecipients(
          userFormData?.filter(
            (item) => item[reportType]?.statusName === statusSelected
          )
        );
      }
    }
  }, [statusSelected, userFormData, reportType]);
  const tableItems = [
    {
      fullname: "fullname",
      status: "Full Name",
      body: (_, { rowIndex }) => <>{tableItems[rowIndex].fullname}</>,
    },
    {
      fullname: "status",
      status: "Status",
      body: (_, { rowIndex }) => <>{tableItems[rowIndex].email}</>,
    },
  ];
  const emailTempContentRef = useRef(null);
  const emailGreetingRef = useRef(null);
  const emailFormLinkRef = useRef(null);
  const getPageLink = ()=>{
    const base = `${APPLICATION_BASE_URL}TrainingDetail/${requestData?.id}`
    if(typeId === ActivityType.REPORT){
      return `${base}/Form/Report`
    }
    else if(typeId === ActivityType.EVALUATION){
      return `${base}/Form/Evaluation`
    }else if(typeId === ActivityType.EFFECTIVENESS){
      return `${base}/Form/Effectiveness`
    }else if(typeId === ActivityType.EXAM){
      return `${base}/Exams`
    }
    else{
      return `${base}`
    }
  }
  const generateEamilContent = () => {
    let content = "";
    if (addRecipient) {
      content += emailTempContentRef.current?.innerHTML;
    }
    content += emailContent;
    if (addFormLink) {
      content += `<a href="${getPageLink()}" className="text-primary">${urlPlaceholder ? urlPlaceholder : getPageLink()}</a>`;
    }
    if(recipients?.length > 0){
    const rec = recipients?.map(item=> {
      return item?.userDetail?.employeeBadge
    })
    sendEmail({ subject, body: content, recipients: rec, toCC: [], sender: SessionGetEmployeeId() });}
    else{
      setError("No recipients added")
    }
  };
  const sendEmail = (data)=>{
    confirmAction({
      showLoaderOnConfirm: true,
      title: "Send Email",
      message: "Are you sure you want to send this email?",
      onConfirm: () => 
      handleResponseAsync(
        ()=>emailService.sendEmailToMany(data),
        ()=>{actionSuccessful("Email sent successfully")
          onRefresh()
          onClose()
        },null
    )})
  }
  return (
    <>
      <Card>
        <Card.Header className="flex justify-content-between">
          <h5 className="m-0">Email Template</h5>
          <Button type="button" text icon="pi pi-times" onClick={onClose} />
        </Card.Header>
        <Card.Body>
          <Row className="g-3">
            <Col className="px-3">
              <h5>Email Content</h5>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                controlId="exampleForm.ControlTextarea1"
                className="mt-2"
              >
                <Form.Label>Email Body</Form.Label>
                <div className="border rounded ">
                  {addRecipient && (
                    <div className="px-2 mt-2" ref={emailGreetingRef}>
                      &nbsp;{greeting} <strong>@recipient</strong>,{" "}
                    </div>
                  )}
                  <TextEditor
                    defaultValue={emailTempContentRef.current?.innerHTML}
                    // disableTable
                    showToolbar
                    onChange={setEmailContent}
                  />
                  {addFormLink && (
                    <div className="px-2" ref={emailFormLinkRef}>
                      <p className="text-primary">
                        {urlPlaceholder ? urlPlaceholder : getPageLink()}
                      </p>
                    </div>
                  )}
                </div>
              </Form.Group>

              <hr />
              <Form.Check
                className="mt-2"
                type="checkbox"
                label="Add Form Link"
                checked={addFormLink}
                onChange={(e) => setAddFormLink(e.target.checked)}
                id="addFormLink"
              />
              {addFormLink && (
                <>
                  <Form.Control
                    value={urlPlaceholder}
                    onChange={(e) => setUrlPlaceholder(e.target.value)}
                    placeholder="Link placeholder"
                  />
                </>
              )}

              <div ref={emailTempContentRef} className="d-none">
                <p>Good Day,</p>
                <p>
                  Please be reminded to complete and submit the training
                   &nbsp;<b>{formType} {typeId == ActivityType.EXAM ? "" :"Form "}</b> for your training.
                </p>
                
                <table
                  border="1"
                  cellPadding="5"
                  cellSpacing="0"
                  style={{
                    borderCollapse: "collapse",
                    width: "100%",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  <tbody>
                    <tr>
                      <th
                        style={{
                          padding: "5px",
                          textAlign: "left",
                          fontSize: "16px",
                          border: "1px solid",
                          backgroundColor: "#f2f2f2",
                        }}
                      >
                        Title
                      </th>
                      <td style={{ padding: "5px" }}>
                        {requestData?.trainingProgram?.name}
                      </td>
                    </tr>
                    <tr>
                      <th
                        style={{
                          padding: "5px",
                          textAlign: "left",
                          fontSize: "16px",
                          border: "1px solid",
                          backgroundColor: "#f2f2f2",
                        }}
                      >
                        Form
                      </th>
                      <td style={{ padding: "5px" }}>
                        {formType} {typeId == ActivityType.EXAM ? "" :"Form "}
                      </td>
                    </tr>
                    <tr>
                      <th
                        style={{
                          padding: "5px",
                          textAlign: "left",
                          fontSize: "16px",
                          border: "1px solid",
                          backgroundColor: "#f2f2f2",
                        }}
                      >
                      Training  Date
                      </th>
                      <td style={{ padding: "5px" }}>
                        {requestData?.trainingStartDate ===
                        requestData?.trainingEndDate
                          ? formatDateOnly(requestData?.trainingStartDate)
                          : `${formatDateOnly(
                              requestData?.trainingStartDate
                            )} - ${formatDateOnly(
                              requestData?.trainingEndDate
                            )}`}
                      </td>
                    </tr>
                    <tr>
                      <th
                        style={{
                          padding: "5px",
                          textAlign: "left",
                          fontSize: "16px",
                          border: "1px solid",
                          backgroundColor: "#f2f2f2",
                        }}
                      >
                       Facilitator/s
                      </th>
                      <td style={{ padding: "5px" }}>
                        {
                          commonHook.useFormattedFacilitatorList(
                            requestData?.trainingFacilitators
                          )?.data
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p>
                  If you have any questions or need assistance with the form,
                  feel free to reach out to HR Department.
                </p>
                <p>Thank you for your cooperation.</p>
                <p></p>
              </div>
            </Col>
            <Col className="col-md-4 border-end px-3">
              <div className="flex mb-2 justify-content-between align-items-center">
                <h5 className="m-0">Recipients</h5>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="default"
                    className="border-0 p-0 theme-color rounded-0 btn btn-default bg-theme"
                  >
                    {statusSelected}
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    align="end"
                    className="overflow-auto"
                    style={{ maxHeight: "300px" }}
                  >
                    <Dropdown.Item onClick={() => setStatusSelected("Pending")}>
                      Pending
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        setStatusSelected(getStatusById(statusCode.APPROVED))
                      }
                    >
                      Approved
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        setStatusSelected(getStatusById(statusCode.DISAPPROVED))
                      }
                    >
                      DisApproved
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        setStatusSelected(getStatusById(statusCode.FORAPPROVAL))
                      }
                    >
                      ForApproval
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <DataTable
                size="small"
                value={userFormData}
                selectionMode={true}
                selection={recipients}
                onSelectionChange={(e) => setRecipients(e.value)}
              >
                <Column
                  selectionMode="multiple"
                  headerStyle={{ width: "3rem" }}
                ></Column>
                <Column
                  field="fullname"
                  header="Name"
                  body={(rowData) => <>{rowData?.userDetail?.fullname}</>}
                ></Column>
                <Column
                  field="status"
                  header="Status"
                  body={(rowData) => (
                    <>{rowData[reportType]?.statusName ?? "Pending"}</>
                  )}
                ></Column>
              </DataTable>
              <ErrorTemplate message={error}/>
            </Col>
          </Row>
          <div className="text-end">
            <Button
              type="button"
              label="Send"
              icon="pi pi-send"
              className="rounded-pill mt-2"
              onClick={generateEamilContent}
            ></Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

GeneralEmailTemplate.propTypes = {
  recipients: proptype.array,
  toCC: proptype.array,
  requestData: proptype.object,
  userFormData: proptype.array,
  reportType: proptype.string,
  typeId: proptype.string,
  onClose: proptype.func,
  onRefresh: proptype.func,
};
export default GeneralEmailTemplate;
