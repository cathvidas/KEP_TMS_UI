import { Card, Col, Form, Row } from "react-bootstrap";
import TextEditor from "../forms/common/TextEditor";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useRef, useState } from "react";
import proptype from "prop-types";
import {
  ActivityType,
  APPLICATION_BASE_URL,
  OtherConstant,
} from "../../api/constants";
import { actionSuccessful, confirmAction } from "../../services/sweetalert";
import handleResponseAsync from "../../services/handleResponseAsync";
import ErrorTemplate from "../General/ErrorTemplate";
import { SessionGetEmployeeId } from "../../services/sessions";
import TableEmailTemplate from "./TableEmailTemplate";
import { formatDateOnly } from "../../utils/datetime/Formatting";
import emailService from "../../services/emailService";
import commonHook from "../../hooks/commonHook";
const TrainingFormsEmailTemplate = ({
  requestData,
  userFormData,
  reportType,
  typeId,
  onClose,
  examDetail,
  disableFormLink,
}) => {
  const formType =
    typeId == ActivityType.EFFECTIVENESS
      ? "Effectiveness"
      : typeId == ActivityType.REPORT
      ? "Report"
      : typeId == ActivityType.EVALUATION
      ? "Evaluation"
      : "Request";
  const [addFormLink, setAddFormLink] = useState(!disableFormLink);
  const [showRecipients, setShowRecipients] = useState(true);
  const [emailContent, setEmailContent] = useState("");
  const [error, setError] = useState("");
  const [subject, setSubject] = useState(
    `Reminder: Pending Training ${formType} Form Submission`
  );
  const [recipients, setRecipients] = useState([]);
  const [toCC, setToCC] = useState();
  const [urlPlaceholder, setUrlPlaceholder] = useState("view more details");
  useEffect(() => {
    if (userFormData) {
        setRecipients(userFormData);
    }
  }, [userFormData, reportType]);
  const emailTempContentRef = useRef(null);
  const emailFormLinkRef = useRef(null);
  const generateEamilContent = () => {
    let content = "";
    content += emailContent;
    if (addFormLink) {
      content += `<a href="${APPLICATION_BASE_URL}TrainingDetail/${
        requestData?.id
      }/Reports" className="text-primary">${
        urlPlaceholder
          ? urlPlaceholder
          : `${APPLICATION_BASE_URL}TrainingDetail/${requestData?.id}/Reports`
      }</a>`;
    }
    if (recipients?.length > 0) {
      const rec = recipients?.map((item) => {
        return item?.userDetail?.employeeBadge;
      });
      sendEmail({
        subject,
        body: content,
        recipients: rec,
        toCC: toCC?.map(({superiorBadge}) => superiorBadge) ?? [],
        sender: SessionGetEmployeeId(),
      });
    } else {
      setError("No recipients added");
    }
  };
  const sendEmail = (data) => {
    confirmAction({
      showLoaderOnConfirm: true,
      title: "Send Email",
      message: "Are you sure you want to send this email?",
      onConfirm: () =>
        handleResponseAsync(
          () => emailService.sendEmailToMany(data),
          () => {
            actionSuccessful("Email sent successfully");
            onClose();
          },
          null
        ),
    });
  };
  const getExamSumary = (traineeId) => {
    const exams = examDetail?.filter((item) =>
      item?.traineeExam?.find((o) => o.traineeId === traineeId)
    );
    return examDetail?.length > 0 ? exams?.length === examDetail?.length
      ? "Completed"
      : `${exams?.length}/${examDetail?.length}` : "N/A";
  };
  const columnItems = [
    {
      field: "no",
      header: "No",
    },
    {
      field: "name",
      header: "Participant's Name",
    },
    {
      field: "department",
      header: "Department",
    },
    {
      field: "position",
      header: "Position",
    },
    {
      field: "effectiveness",
      header: "Training Effectiveness",
    },
    {
      field: "report",
      header: "Training Report",
    },
    {
      field: "evaluation",
      header: "Training Evaluation",
    },
    {
      field: "exam",
      header: "Training Exams",
    },
  ];
  const columnValues = userFormData?.map((item, index) => ({
    no: index + 1,
    name: item?.userDetail?.fullname,
    department: item?.userDetail?.departmentName,
    position: item?.userDetail?.position,
    effectiveness:
      requestData?.durationInHours >= OtherConstant.EFFECTIVENESS_MINHOUR
        ? item?.effectivenessDetail?.id
          ? "Submitted"
          : "Not yet Submitted"
        : "N/A",
    report: item?.reportDetail?.id ? "Submitted" : "Not yet Submitted",
    evaluation: item?.evaluationDetail?.id ? "Submitted" : "Not yet Submitted",
    exam: getExamSumary(item?.userDetail?.employeeBadge),
  }));
  const getSuperiors = ()=>{
    let superiors = [];
    recipients?.forEach(user=>{
      if(user?.userDetail?.superiorBadge && !(superiors?.some(superior=>superior?.superiorBadge === user?.userDetail?.superiorBadge))){
        superiors.push({superiorBadge: user?.userDetail?.superiorBadge, superiorName: user?.userDetail?.superiorName})
      }
    })
    return superiors;
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
              <div className="flex justify-content-between">
                <h5>Email Content</h5>
                {!showRecipients && (
                  <Button
                    type="button"
                    text
                    label={`Show Recipients (${recipients?.length})`}
                    onClick={() => setShowRecipients(!showRecipients)}
                  />
                )}{" "}
              </div>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>SUbject</Form.Label>
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
                  <TextEditor
                    defaultValue={emailTempContentRef.current?.innerHTML}
                    // disableTable
                    showToolbar
                    onChange={setEmailContent}
                  />
                  {addFormLink && (
                    <div className="px-2" ref={emailFormLinkRef}>
                      <p className="text-primary">
                        {urlPlaceholder
                          ? urlPlaceholder
                          : `${APPLICATION_BASE_URL}TrainingDetail/${requestData?.id}`}
                      </p>
                    </div>
                  )}
                </div>
              </Form.Group>
              {!disableFormLink && (
                <>
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
                </>
              )}

              <div ref={emailTempContentRef} className="d-none">
                <p>Good Day,</p>
                <p>
                  Please be reminded to complete and submit the following
                  training forms for the training program &apos;
                  {requestData?.trainingProgram?.name}&apos;.
                </p>
                <p>
                  If you have any questions or need assistance with the form,
                  feel free to reach out to HR Department. Thank you for your
                  cooperation.
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
                        Number of Participants
                      </th>
                      <td style={{ padding: "5px" }}>
                        {requestData?.totalParticipants}
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
                        Date
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
                <TableEmailTemplate items={columnItems} value={columnValues} />
              </div>
            </Col>
            {showRecipients && (
              <Col className="col-md-3 border-end px-3">
                <div className="flex justify-content-between">
                  <h5 className="m-0">
                    Recipients {`(${recipients?.length})`}
                  </h5>
                  {showRecipients && (
                    <Button
                      type="button"
                      text
                      icon="pi pi-angle-up"
                      label={`Hide`}
                      onClick={() => setShowRecipients(!showRecipients)}
                    />
                  )}{" "}
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
                </DataTable>
                <ErrorTemplate message={error} />
                <div className="flex justify-content-between">
                  <h5 className="m-0">To CC {`(${toCC?.length ?? 0})`}</h5>
                  {showRecipients && (
                    <Button
                      type="button"
                      text
                      icon="pi pi-angle-up"
                      label={`Hide`}
                      onClick={() => setShowRecipients(!showRecipients)}
                    />
                  )}{" "}
                </div>
                <DataTable
                  size="small"
                  value={getSuperiors()}
                  selectionMode={true}
                  selection={toCC}
                  onSelectionChange={(e) => setToCC(e.value)}
                >
                  <Column
                    selectionMode="multiple"
                    headerStyle={{ width: "3rem" }}
                  ></Column>
                  <Column
                    field="fullname"
                    header="Name"
                    body={(rowData) => <>{rowData?.superiorName}</>}
                  ></Column>
                </DataTable>
                <ErrorTemplate message={error} />
              </Col>
            )}
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

TrainingFormsEmailTemplate.propTypes = {
  recipients: proptype.array,
  toCC: proptype.array,
  requestData: proptype.object,
  userFormData: proptype.array,
  reportType: proptype.string,
  typeId: proptype.string,
  onClose: proptype.func,
  onRefresh: proptype.func,
  examDetail: proptype.array,
  disableFormLink: proptype.bool,
};
export default TrainingFormsEmailTemplate;
