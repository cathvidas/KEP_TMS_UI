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
import StatusColor from "../../components/General/StatusColor";
import TrainingScheduleList from "../../components/trainingRequestFormComponents/TrainingScheduleList";
import { UserList } from "../../components/List/UserList";
import EmptyState from "../../components/trainingRequestFormComponents/EmptyState";
import DetailsOverview from "../../components/TrainingPageComponents/DetailsOverview";
import { formatDateTime } from "../../utils/datetime/Formatting";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { statusCode } from "../../api/constants";
import countData from "../../utils/countData";
import { SessionGetEmployeeId } from "../../services/sessions";

const OverviewSection = ({
  data,
  showParticipants = false,
  showFacilitators = false,
  showApprovers = false,
}) => {
  const navigate = useNavigate();
  const toast = useRef(null);
  const [reqStatus, setReqStatus] = useState({
    show: true,
    statusId: 0,
    summary: "",
    detail: {},
  });
  const isTrainee = data?.trainingParticipants?.find(
    (user) => user?.employeeBadge === SessionGetEmployeeId()
  );
  useEffect(() => {
    const status = data?.status?.id;
    const statusData = { ...reqStatus, statusId: status };
    if (status == statusCode.FORAPPROVAL) {
      statusData.detail = [data?.currentRouting?.fullname];
      statusData.summary =
        SessionGetEmployeeId() === data?.currentRouting?.employeeBadge
          ? "Waiting for your Approval"
          : `For ${data?.currentRouting?.position} Approval`;
      statusData.severity = "info";
    } else if (status == statusCode.APPROVED) {
      statusData.summary = "Waiting for Facilitator's Action";
      const isFacilitator = data?.trainingFacilitators?.some(
        (f) => f.employeeBadge === SessionGetEmployeeId()
      );
      let facilitators = "";
      data?.trainingFacilitators?.forEach((f) => {
        facilitators += `${f?.fullname}, `;
      });
      statusData.severity = "info";
      statusData.detail = isFacilitator
        ? "Please add module or set an exam if required and publish the request"
        : facilitators;
    } else if (status == statusCode.SUBMITTED) {
      statusData.summary = "Waiting for participants Effectiveness";
      statusData.detail =
        isTrainee && isTrainee?.effectivenessId === null
          ? "Navigate to Report section and fill out the effectiveness form"
          // : isTrainee?.effectivenessId?.sta
          : `${countData(data.trainingParticipants, "effectivenessId", 4)}/${
              data.totalParticipants
            } submitted`;
      statusData.severity = "warn";
    } else {
      statusData.show = false;
      // statusData.summary = data?.status?.name;
      // statusData.detail = "";
      // statusData.severity = status == statusCode.SUBMITTED ? "warning" : status === statusCode.PUBLISHED? "success": "secondary" ;
    }
    setReqStatus(statusData);
  }, [data]);

  const showSticky = () => {
    if(reqStatus.show){
    toast.current?.clear();
    toast.current?.show({
      severity: reqStatus?.severity,
      summary: reqStatus?.summary,
      detail: reqStatus?.detail,
      sticky: true,
    });}
  };
  return (<>
  {
showSticky()}

        <Toast ref={toast} position="bottom-center" className="z-1"/>
    <div className="card p-3 w-100">
      <div>
        <h3 className="text-center theme-color m-0">
          New {data?.trainingType?.name} Training Request
          <span
            className="ms-3 text-secondary h6 mb-0 btn border-0"
            title="Edit Request"
            onClick={() => navigate("/KEP_TMS/Request/Update/" + data.id)}
          >
            <i className="pi pi-pencil"></i> Edit
          </span>
        </h3>
        <h6 className="text-muted text-center mb-3">Request ID: {data.id}</h6>
        <div className="position-absolute end-0 top-0 ">
          <Button
            type="button"
            onClick={() => history.back()}
            icon="pi pi-times"
            text
          />
        </div>
        <div className="h6 d-flex flex-md-wrap flex-column flex-lg-row gap-lg-3 gap-1 pb-3 justify-content-md-around border-bottom">
          <span> Requestor: {data?.requestor?.fullname}</span>
          <span> Badge No: {data?.requestor?.employeeBadge}</span>
          <span> Department: {data?.requestor?.departmentName}</span>
          <span> Date: {formatDateTime(data?.createdDate)}</span>
          <span  onClick={showSticky}>
            Status:{" "}
            {StatusColor({
              status: data?.status?.name,
              class: "p-2 px-3 ",
              showStatus: true,
            })}
          </span>
        </div>
      </div>
      <div className="flex justify-content-between">
        <SectionHeading
          title="Details"
          icon={<FontAwesomeIcon icon={faInfoCircle} />}
        />
      </div>
      <DetailsOverview data={data} />
      <br />
      <SectionHeading
        title="Training Schedules"
        icon={<FontAwesomeIcon icon={faCalendar} />}
      />
      <TrainingScheduleList schedules={data.trainingDates} />
      {showParticipants && (
        <>
          <br />
          <SectionHeading
            title="Participants"
            icon={<FontAwesomeIcon icon={faUsers} />}
          />
          {data.trainingParticipants?.length > 0 ? (
            <div className="w-100 overflow-hidden">
              <small className="text-muted">
                {data.trainingParticipants.length} participants{" "}
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
      )}
      {showFacilitators && (
        <>
          <br />
          <SectionHeading
            title="Facilitator"
            icon={<FontAwesomeIcon icon={faUsers} />}
          />
          {data.trainingFacilitators?.length > 0 ? (
            <UserList
              leadingElement={true}
              userlist={data.trainingFacilitators}
              property={"name"}
            />
          ) : (
            <EmptyState placeholder="No facilitator added" />
          )}
        </>
      )}
      {showApprovers && (
        <>
          <br />

          <div className="">
            <SectionHeading
              title="Approvers"
              icon={<FontAwesomeIcon icon={faUsers} />}
            />
            <ApproverList data={data} />
          </div>
        </>
      )}
    </div></>
  );
};
OverviewSection.propTypes = {
  data: proptype.object,
  statusData: proptype.object,
  showParticipants: proptype.bool,
  showFacilitators: proptype.bool,
  showApprovers: proptype.bool,
};
export default OverviewSection;
