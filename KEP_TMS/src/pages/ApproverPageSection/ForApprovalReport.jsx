import { SectionBanner } from "../../components/General/Section";
import CommonTable from "../../components/General/CommonTable";
import { Button } from "primereact/button";
import { SessionGetEmployeeId } from "../../services/sessions";
import StatusColor from "../../components/General/StatusColor";
import { actionSuccessful, confirmAction } from "../../services/sweetalert";
import handleResponseAsync from "../../services/handleResponseAsync";
import { ActivityType, statusCode } from "../../api/constants";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import userHook from "../../hooks/userHook";
import trainingReportHook from "../../hooks/trainingReportHook";
import TrainingReportForm from "../../components/forms/TrainingReportForm";
import CommentBox from "../../components/General/CommentBox";
import trainingReportService from "../../services/trainingReportService";
import commonService from "../../services/commonService";

const ForApprovalReport = () => {
  const [trigger, setTrigger] = useState(0);
  const { data } =
    trainingReportHook.useApproverAssignedReports(SessionGetEmployeeId(), trigger);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const requestData = selectedData?.trainingReport?.trainingRequest;
  const userData = userHook.useUserById(
    selectedData?.trainingReport?.traineeBadge
  );
  const report = trainingReportHook.useTrainingReportById(selectedData?.trainingReport?.id, trigger)
  const [showAnnotation, setShowAnnotation] = useState(false)
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
          onClick={() => {
            setSelectedData(rowData);
            setShowModal(true);
          }}
        />
        <Button
          type="button"
          size="small"
          text
          icon="pi pi-thumbs-up"
          className="rounded-circle"
          onClick={() => approveReport(rowData?.trainingReport?.id, true)}
        />
        <Button
          type="button"
          size="small"
          text
          icon="pi pi-thumbs-down"
          severity="danger"
          className="rounded-circle"
          onClick={() => {
            setSelectedData(rowData);
            setShowAnnotation(true);
          }}
        />
      </div>
    </>
  );
  const approveReport = (id, isApprove) => {
    confirmAction({
      showLoaderOnConfirm: true,
      title: isApprove
        ? "Approve Training Report"
        : "DisApprove Training Report",
      text: isApprove
        ? "Are you sure you want to approve this Training Report?"
        : "Are you sure you want to disapprove this Training Report?",
      confirmButtonText: isApprove ? "Approve" : "Disapprove",
      cancelButtonText: "No",
      confirmButtonColor: isApprove ? "#4CAF50" : "#f44336",
      onConfirm: () => {
        handleResponseAsync(() =>
          trainingReportService.approveTrainingReport({
            transactId: id,
            ApprovedBy: SessionGetEmployeeId(),
            activityIn: ActivityType.REPORT,
          }), 
          (e)=> {
            actionSuccessful("Sucess!", e.mesasge)
            setTimeout(() => {
              setTrigger(trigger+1)
            }, 1000);
          },null, null
        );
      },
    });
  };
  const disapproveReport = (e) => {    
    confirmAction({
    showLoaderOnConfirm:true,
    title:  "Return Training Report",
    text:"Are you sure you want to disapproved and return this Training Report?",
    confirmButtonText:  "Yes",
    cancelButtonText: "Cancel",
    confirmButtonColor:"#d33",
    onConfirm: () => {
      handleResponseAsync(() =>
        commonService.disapproveActivity({
          transactId: selectedData?.trainingReport?.id,
          disapprovedBy: SessionGetEmployeeId(),
          activityIn: ActivityType.REPORT,
          remarks:e,
        }), 
        ()=>{actionSuccessful("Success!", "successfully returned report");
          setTimeout(() => {
            setTrigger(trigger+1);
            setShowAnnotation(false)
          }, 1000);
        }
      );
    },
  });
  }
  const columnItems = [
    {
      field: "id",
      header: "Request Id",
      body: (rowData) => <>{rowData?.trainingReport?.trainingRequest?.id}</>,
    },
    {
      field: "name",
      header: "Created By",
      body: (rowData) => <>{rowData?.trainingReport?.traineeBadge}</>,
    },
    {
      field: "description",
      header: "Program",
      body: (rowData) => (
        <>{rowData?.trainingReport?.trainingRequest?.trainingProgram?.name}</>
      ),
    },
    {
      field: "statusName",
      header: "Status",
      body: (rowData) => (
        <>
          {StatusColor({
            status: rowData?.trainingReport?.status?.name,
            showStatus: true,
          })}
        </>
      ),
    },
    {
      field: "",
      header: "Action",
      body: actionTemplate,
    },
  ];
  return (
    <div className="p-3">
      <SectionBanner
        title="Training Reports"
        subtitle="List of for Approval Training Reports"
      />
      <CommonTable
        dataTable={data}
        title="Programs"
        columnItems={columnItems}
      />

      <CommentBox
        header="Comments"
        description="Please provide a comment explaining the reason for returning this report."
        show={showAnnotation}
        onClose={() => setShowAnnotation(false)}
        confirmButton={{ label: "Return Report" }}
        onSubmit={disapproveReport}
      />
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        fullscreen
        style={showAnnotation && { zIndex: 1050 }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="theme-color h5">
            Training Effectiveness Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4 px-5">
          {report?.loading ? (
            "Loading..."
          ) : (
            <TrainingReportForm
              userData={userData?.data}
              data={requestData}
              defaultValue={report?.data}
              isSubmitted
              currentRouting={report?.data?.currentRouting}
              auditTrail={
                report?.data?.auditTrail?.length > 0 &&
                report?.data?.auditTrail[0]
              }
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          {report?.data?.currentRouting?.assignedTo ===
            SessionGetEmployeeId() &&
          report?.data?.currentRouting?.statusId === statusCode.FORAPPROVAL ? (
            <>
              <Button
                size="small"
                label="Disapprove"
                icon="pi pi-thumbs-down"
                className="rounded"
                severity="danger"
                text
                onClick={() => {
                  setSelectedData(selectedData);
                  setShowAnnotation(true);
                }}
              />
              <Button
                size="small"
                label="Approve"
                icon="pi pi-thumbs-up"
                className="rounded"
                onClick={() =>
                  approveReport(selectedData?.trainingReport?.id, true)
                }
              />{" "}
            </>
          ) : report?.data?.routings?.find(
              (item) =>
                item?.assignedTo === SessionGetEmployeeId() &&
                item?.statusId === statusCode.APPROVED
            ) ? (
            <Button
              type="button"
              size="small"
              label="Approved"
              icon="pi pi-check"
              className="rounded theme-color"
              text
            />
          ) : (
            report?.data?.routings?.find(
              (item) =>
                item?.assignedTo === SessionGetEmployeeId() &&
                item?.statusId === statusCode.DISAPPROVED
            ) && (
              <Button
                type="button"
                size="small"
                label="Returned"
                icon="pi pi-check"
                className="rounded text-danger"
                text
              />
            )
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ForApprovalReport;
