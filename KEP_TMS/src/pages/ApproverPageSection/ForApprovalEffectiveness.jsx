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
import CommentBox from "../../components/General/CommentBox";
import commonService from "../../services/commonService";
import ActivityStatus from "../../components/General/ActivityStatus";
import routingService from "../../services/common/routingService";
import proptype from "prop-types"
import SkeletonForm from "../../components/Skeleton/SkeletonForm";
import { formatDateTime } from "../../utils/datetime/Formatting";
const ForApprovaleffectiveness = ({data, refreshData}) => {
  const [trigger, setTrigger] = useState(0);
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
    trigger, true
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
      header: "Id",
      body: (rowData) => (
        <>{rowData?.trainingEffectiveness?.id}</>
      ),
    },
    {
      field: "name",
      header: "Submitted By",
      body: (rowData) => <>{rowData?.auditTrail?.createdBy}</>,
    },
    {
      field: "name",
      header: "Submitted Date",
      body: (rowData) => <>{formatDateTime(rowData?.auditTrail?.createdDate)}</>,
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
  const currentStatus = routingService.getApproverStatus(effectiveness?.data?.routings, SessionGetEmployeeId())
  return (
    <div className="p-3">
          <SectionBanner
            title="Training Effectiveness"
            subtitle="List of for Approval Training Effectiveness"
          />
          <CommonTable
            dataTable={data}
            title="Programs"
            columnItems={columnItems}
          />
      <CommentBox
      defaultValue={remark}
        header="Comments"
        description="Please provide a comment explaining the reason for returning this report."
        show={showAnnotation}
        onClose={() => setShowAnnotation(false)}
        confirmButton={{ label: "Return Effectiveness" }}
        onSubmit={disapproveEffectiveness}
      />
      <Modal
        show={showModal}
        onHide={() => {setShowModal(false);
          refreshData();
        }}
        size="xl"
        style={showAnnotation && { zIndex: 1050 }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="theme-color h5">
            Training Effectiveness Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-md-4 px-md-5">
          {effectiveness?.loading ? (
            <SkeletonForm/>
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
        <Modal.Footer>
          { currentStatus?.statusId === statusCode.FORAPPROVAL ? (
            <>
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
              />
            </>
          ) : currentStatus?.statusId ===  statusCode.APPROVED
             ? 
              <ActivityStatus status={statusCode.APPROVED} />
           :
           currentStatus?.statusId === statusCode.DISAPPROVED
            && (
              <ActivityStatus status={statusCode.DISAPPROVED} icon="pi pi-times"/>
            )
          }
        </Modal.Footer>
      </Modal>
    </div>
  );
};
ForApprovaleffectiveness.propTypes = {
  data: proptype.array,
  refreshData: proptype.func
}
export default ForApprovaleffectiveness;
