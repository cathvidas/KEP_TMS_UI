import { SectionBanner } from "../../components/General/Section";
import CommonTable from "../../components/General/CommonTable";
import { Button } from "primereact/button";
import effectivenessHook from "../../hooks/effectivenessHook";
import { SessionGetEmployeeId } from "../../services/sessions";
import StatusColor from "../../components/General/StatusColor";
import { actionSuccessful, confirmAction } from "../../services/sweetalert";
import handleResponseAsync from "../../services/handleResponseAsync";
import effectivenessService from "../../services/effectivenessService";
import { ActivityType, statusCode } from "../../api/constants";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import EffectivenessForm from "../../components/forms/EffectivenessForm";
import trainingRequestHook from "../../hooks/trainingRequestHook";
import userHook from "../../hooks/userHook";
import SkeletonDataTable from "../../components/Skeleton/SkeletonDataTable";
import CommentBox from "../../components/General/CommentBox";
import commonService from "../../services/commonService";
import ActivityStatus from "../../components/General/ActivityStatus";

const ForApprovaleffectiveness = () => {
  const [trigger, setTrigger] = useState(0);
  const { data, loading } = effectivenessHook.useApproverAssignedEffectiveness(
    SessionGetEmployeeId(),
    trigger
  );
  const [remark] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [showAnnotation, setShowAnnotation] = useState(false);
  const requestData = trainingRequestHook.useTrainingRequest(
    selectedData?.trainingEffectiveness?.trainingRequest?.id
  );
  const userData = userHook.useUserById(
    selectedData?.trainingEffectiveness?.employeeBadge
  );
  const effectiveness = effectivenessHook.useEffectivenessById(
    selectedData?.trainingEffectiveness?.id,
    trigger
  );
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
          onClick={() =>
            approveEffectiveness(rowData?.trainingEffectiveness?.id, true)
          }
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
        {/* <Button type="button" size="small" text icon="pi pi-trash" severity="danger" className="rounded-circle" onClick={()=>handleDelete(rowData.id)} /> */}
      </div>
    </>
  );
  const approveEffectiveness = (id, isApprove) => {
    const formData = {
      transactId: id,
      activityIn: ActivityType.EFFECTIVENESS,
      approvedBy: SessionGetEmployeeId(),
    };
    confirmAction({
      showLoaderOnConfirm: true,
      title: isApprove ? "Approve Effectiveness" : "Disapprove Effectiveness",
      text: isApprove
        ? "Are you sure you want to approve this Effectiveness?"
        : "Are you sure you want to disapprove this Effectiveness?",
      confirmButtonText: isApprove ? "Approve" : "Disapprove",
      cancelButtonText: "Cancel",
      confirmButtonColor: isApprove ? "#4CAF50" : "#d33",
      onConfirm: () => {
        handleResponseAsync(
          () => effectivenessService.approveTrainingEffectiveness(formData),
          (e) => {
            actionSuccessful("Sucess!", e.mesasge);
            setTimeout(() => {
              setTrigger(trigger + 1);
            }, 1000);
          },
          null
        );
      },
    });
  };
  const disapproveEffectiveness = (e) => {
    console.log(selectedData, {
      transactId: selectedData?.trainingEffectiveness?.id,
      disapprovedBy: SessionGetEmployeeId(),
      activityIn: ActivityType.EFFECTIVENESS,
      remarks: e,
    })
    confirmAction({
      showLoaderOnConfirm: true,
      title: "Return Effectiveness Report",
      text: "Are you sure you want to disapproved and return this Effectiveness Report?",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      
      onConfirm: () => {
        handleResponseAsync(
          () =>
            commonService.disapproveActivity({
              transactId: selectedData?.trainingEffectiveness?.id,
              disapprovedBy: SessionGetEmployeeId(),
              activityIn: ActivityType.EFFECTIVENESS,
              remarks: e,
            }),
          () => {
            actionSuccessful("Success!", "successfully returned Effectiveness Report");
            setTimeout(() => {
              setTrigger((prev) => prev + 1);
              setShowAnnotation(false);
            }, 1000);
          }
        );
      },
    });
  };
  const columnItems = [
    {
      field: "id",
      header: "Request Id",
      body: (rowData) => (
        <>{rowData?.trainingEffectiveness?.trainingRequest?.id}</>
      ),
    },
    {
      field: "name",
      header: "Created By",
      body: (rowData) => <>{rowData?.trainingEffectiveness?.employeeBadge}</>,
    },
    {
      field: "description",
      header: "Program",
      body: (rowData) => (
        <>{rowData?.trainingEffectiveness?.trainingProgram?.name}</>
      ),
    },
    {
      field: "statusName",
      header: "Status",
      body: (rowData) => (
        <>
          {StatusColor({
            status: rowData?.trainingEffectiveness?.status?.name,
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
      {loading ? (
        <>
          <SectionBanner />
          <SkeletonDataTable />
        </>
      ) : (
        <>
          <SectionBanner
            title="Training Effectiveness"
            subtitle="List of for Approval Training Effectiveness"
          />
          <CommonTable
            dataTable={data}
            title="Programs"
            columnItems={columnItems}
          />
        </>
      )}
      <CommentBox
      defaultValue={remark}
        header="Comments"
        // label="Remarks"
        description="Please provide a comment explaining the reason for returning this report."
        show={showAnnotation}
        onClose={() => setShowAnnotation(false)}
        confirmButton={{ label: "Return Effectiveness" }}
        onSubmit={disapproveEffectiveness}
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
        <Modal.Body className="p-md-4 px-md-5">
          {selectedData?.loading ? (
            "Loading..."
          ) : (
            <EffectivenessForm
              userData={userData?.data}
              data={requestData?.data}
              formData={effectiveness?.data}
              currentRouting={effectiveness?.data?.currentRouting}
              auditTrail={effectiveness?.data?.auditTrail}
            />
          )}
        </Modal.Body>
        
          {effectiveness?.data?.currentRouting?.assignedTo ===
            SessionGetEmployeeId() &&
          effectiveness?.data?.currentRouting?.statusId ===
            statusCode.FORAPPROVAL && (
            <><Modal.Footer>
              <Button
                type="button"
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
                type="button"
                size="small"
                label="Approve"
                icon="pi pi-thumbs-up"
                className="rounded"
                onClick={() =>
                  approveEffectiveness(
                    selectedData?.trainingEffectiveness?.id,
                    true
                  )
                }
              /></Modal.Footer>
            </>
           )
        
          // : effectiveness?.data?.routings?.find(
          //     (item) =>
          //       item?.assignedTo === SessionGetEmployeeId() &&
          //       item?.statusId === statusCode.APPROVED
          //   ) ? (
          //   <Button
          //     type="button"
          //     size="small"
          //     label="Approved"
          //     icon="pi pi-check"
          //     className="rounded theme-color"
          //     text
          //   />
          // ) : (
          //   effectiveness?.data?.routings?.find(
          //     (item) =>
          //       item?.assignedTo === SessionGetEmployeeId() &&
          //       item?.statusId === statusCode.DISAPPROVED
          //   ) && (
          //     <ActivityStatus status={"Returned"} severity={"text-danger"} icon="pi pi-times"/>
          //   )
          // )
          }
      </Modal>
    </div>
  );
};
export default ForApprovaleffectiveness;
