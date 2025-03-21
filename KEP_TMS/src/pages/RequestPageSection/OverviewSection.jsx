import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import proptype from "prop-types";
import {
  faCalendar,
  faInfoCircle,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { SectionHeading } from "../../components/General/Section";
import ApproverList from "../../components/List/ApproversList";
import TrainingScheduleList from "../../components/trainingRequestFormComponents/TrainingScheduleList";
import { UserList } from "../../components/List/UserList";
import EmptyState from "../../components/trainingRequestFormComponents/EmptyState";
import DetailsOverview from "../../components/TrainingPageComponents/DetailsOverview";
import { formatDateTime } from "../../utils/datetime/Formatting";
import { useCallback, useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { SessionGetEmployeeId } from "../../services/sessions";
import getToastDetail from "../../services/common/getToastDetail";
import { Tooltip } from "primereact/tooltip";
import { SpeedDial } from "primereact/speeddial";
import { confirmAction } from "../../services/sweetalert";
import handleResponseAsync from "../../services/handleResponseAsync";
import trainingRequestService from "../../services/trainingRequestService";
import { validateTrainingRequestForm } from "../../services/inputValidation/validateTrainingRequestForm";
import { ActivityType, statusCode } from "../../api/constants";
import SpeedDialButtonItemTemplate from "../../components/General/SpeedDialButtonItemTemplate";
import RequestAuditTrailLogsItem from "../../components/TrainingPageComponents/RequestAuditTrailLogsItem";
import { Dialog } from "primereact/dialog";
import ActivityList from "../../components/List/ActivityList";
import CommentBox from "../../components/General/CommentBox";
import handleApproveRequest from "../../services/handlers/handleApproveRequest";
import ActivityStatus from "../../components/General/ActivityStatus";
import TrainingFacilitatorList from "../../components/List/TrainingFacilitatorList";
const OverviewSection = ({
  data,
  showFacilitators = false,
  showApprovers = false,
  isAdmin,
  userReports,
  logs,
  reloadData,
}) => {
  const navigate = useNavigate();
  const toast = useRef(null);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [reqStatus, setReqStatus] = useState({
    show: true,
    statusId: 0,
    summary: "",
    detail: {},
  });
  const cancelRequest = () => {
    const formmatedData = {
      ...validateTrainingRequestForm(data),
      updatedBy: SessionGetEmployeeId(),
      statusId: statusCode.INACTIVE,
    };
    confirmAction({
      showLoaderOnConfirm: true,
      title: "Are you sure?",
      text: "Are you sure you want to cancel this training request?",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#d33",
      onConfirm: () =>
        handleResponseAsync(() =>
          trainingRequestService.updateTrainingRequest(formmatedData), null, null, reloadData
        ),
    });
  };
  useEffect(() => {
    const statsData = getToastDetail(
      data,
      SessionGetEmployeeId(),
      userReports ?? null,
      () => cancelRequest(),
      () => navigate("/KEP_TMS/Request/Update/" + data.id),
      () => setShowCommentBox(true),
      reloadData
    );
    setReqStatus(statsData);
  }, [data, userReports]);

  const showSticky = useCallback(() => {
    if (reqStatus.show) {
      setReqStatus({ ...reqStatus, show: false });
      toast.current?.clear();
      toast.current?.show({
        severity: reqStatus?.severity,
        summary: reqStatus?.summary,
        detail: reqStatus?.detail,
        sticky: true,
        content: reqStatus?.content,
      });
    }
  }, [reqStatus]);
  const toast2 = useRef(null);
  const items = [
    {
      label: "Update",
      icon: "pi pi-pencil",
      command: () => navigate("/KEP_TMS/Request/Update/" + data.id),
      template: SpeedDialButtonItemTemplate,
      inactive: ( data?.status?.id === statusCode.APPROVED || data?.status?.id === statusCode.CLOSED)
    },
    {
      label: "Cancel Request",
      icon: "pi pi-ban",
      command: cancelRequest,
      template: SpeedDialButtonItemTemplate,
      inactive: ( data?.status?.id === statusCode.INACTIVE || data?.status?.id === statusCode.CLOSED),
    },
    {
      label: "Status",
      icon: "pi pi-info-circle",
      command: () => showSticky,
      template: SpeedDialButtonItemTemplate,
      disable: true,
      // inactive: true
    },
    {
      label: "Logs",
      icon: "pi pi-info-circle",
      command: () => setShowLogModal(true),
      template: SpeedDialButtonItemTemplate,
    },
  ];
  const actionBodyTemplate = (
    <div>
      <Button
        type="button"
        icon="pi pi-thumbs-up"
        onClick={() =>
          handleApproveRequest({
            id: data?.id,
            approve: true,
            onFinish: reloadData,
            user: SessionGetEmployeeId(),
          })
        }
        size="small"
        className="rounded"
        text
      />
      <Button
        type="button"
        icon="pi pi-thumbs-down
"
        size="small"
        className="rounded"
        severity="danger"
        text
        onClick={() => setShowCommentBox(true)}
      />
    </div>
  );
  return (
    <>
      <Toast ref={toast} position="bottom-center" className="z-1" />
      {showSticky()}

      <div className="card p-3 w-100">
        <div>
          <h3 className="text-center theme-color m-0">
            {data?.trainingType?.name} Training Request
          </h3>
         
          <h6 className="text-muted text-center mb-3">Request ID: {data.id}</h6>
          {showApprovers &&
          <> <div className="h6 d-flex flex-md-wrap flex-column flex-lg-row gap-lg-3 gap-1 pb-3 justify-content-md-around border-bottom">
            <span> REQUESTOR: {data?.requestor?.fullname}</span>
            <span> BADGE NO: {data?.requestor?.employeeBadge}</span>
            <span> DEPARTMENT: {data?.requestor?.departmentName}</span>
            <span> DATE: {formatDateTime(data?.createdDate)}</span>
            {(isAdmin || data?.requesterBadge === SessionGetEmployeeId())&&
            <span> STATUS: <ActivityStatus icon={data?.status?.id == statusCode.INACTIVE ? "pi pi-ban": ""} 
            severity={data?.status?.id == statusCode.INACTIVE ? "text-danger": ""} 
            status={data?.status?.id == statusCode.INACTIVE ? "Cancelled": data?.status?.id} /></span>}
          </div></>}
        </div>
        <div className="flex justify-content-between">
          <SectionHeading
            title="Details"
            icon={<FontAwesomeIcon icon={faInfoCircle} />}
          />
        </div>
        <DetailsOverview data={data} showCost={isAdmin || showApprovers} />
        <br />
        <SectionHeading
          title="Training Schedules"
          icon={<FontAwesomeIcon icon={faCalendar} />}
        />
        <TrainingScheduleList schedules={data.trainingDates} />
          <>
            <br />
            <SectionHeading
              title="Participants"
              icon={<FontAwesomeIcon icon={faUsers} />}
            />
            {data.trainingParticipants?.length > 0 ? (
              <div className="w-100 overflow-hidden">
                <small className="text-muted">
                  {data.trainingParticipants?.length} participants{" "}
                </small>
                <UserList
                  leadingElement={true}
                  col="3"
                  userlist={data.trainingParticipants}
                  property={"name"}
                  // allowEffectiveness
                />
              </div>
            ) : (
              <EmptyState placeholder="No participants added" />
            )}
          </>
        {showFacilitators && (
          <>
            <br />
            <SectionHeading
              title="Facilitator"
              icon={<FontAwesomeIcon icon={faUsers} />}
            />
           <TrainingFacilitatorList requestData={data} />
          </>
        )}
        {showApprovers&& data?.status?.id != statusCode.DRAFTED && (
          <>
            <br />
            <hr />
            <div className="">
              <h6 className="theme-color fw-bold">Routes</h6>
              <ApproverList
                data={data}
                activityType={ActivityType.REQUEST}
                hasEmailForm
                activityLogs={logs}
                optionColumn={actionBodyTemplate}
                reloadData={reloadData}
              />
            </div>
            {logs && (
              <>
                <ActivityList
                  data={logs}
                  label={"Activities"}
                />
              </>
            )}
          </>
        )}
      </div>
      {data?.status?.id != statusCode.DRAFTED && <>
      <Dialog
        header="History Log"
        visible={showLogModal}
        maximizable
        style={{ width: "50vw", minHeight: "50vh" }}
        onHide={() => {
          if (!showLogModal) return;
          setShowLogModal(false);
        }}
      >
        <hr className="mt-0" />
        <RequestAuditTrailLogsItem data={data} />
      </Dialog>
      <CommentBox
        show={showCommentBox}
        header="Comments"
        onClose={() => setShowCommentBox(false)}
        confirmButton={{ label: "Return Request" }}
        onSubmit={(e) =>
          handleApproveRequest({
            id: data?.id,
            approve: false,
            onFinish: reloadData,
            remarks: e,
            user: SessionGetEmployeeId(),
          })
        }
        description="Please state your reason for returning this Training Request."
      />
      {(isAdmin ||
        data?.requesterBadge == SessionGetEmployeeId()) && (
        <div className="position-absolute bottom-0  mb-3 me-4 end-0">
          <Toast ref={toast2} />
          <Tooltip
            target=".speeddial-bottom-right  .p-speeddial-action"
            position="left"
          />
          <SpeedDial
            model={items}
            direction="up"
            className="speeddial-bottom-right  end-0 bottom-0 custom-link text-white"
            buttonClassName="p-button-default rounded-circle "
          />
        </div>
      )}</>}
    </>
  );
};
OverviewSection.propTypes = {
  data: proptype.object,
  statusData: proptype.object,
  showParticipants: proptype.bool,
  showFacilitators: proptype.bool,
  showApprovers: proptype.bool,
  isAdmin: proptype.bool,
  userReports: proptype.object,
  logs: proptype.array,
  activityRoutes: proptype.array,
  reloadData: proptype.func,
};
export default OverviewSection;
