import proptype from "prop-types";
import TrainingScheduleList from "../trainingRequestFormComponents/TrainingScheduleList";
import { UserList } from "../List/UserList";
import {
  formatCurrency,
  formatDateOnly,
} from "../../utils/datetime/Formatting";
import ApproverList from "../List/ApproversList";
import { ActivityType, APPLICATION_BASE_URL } from "../../api/constants";
import ActivityList from "../List/ActivityList";
import { Link } from "react-router-dom";

const TrainingRequestEmailtemplate = ({
  requestDetail,
  recipient,
  activityLogs,
}) => {
  const tableHedear = (value) => {
    return (
      <>
        <p>
          <span style={{ color: "hsl(210, 75%, 60%" }}>
            <strong>{value}</strong>
          </span>
        </p>
      </>
    );
  };
  return (
    <>
      <p>&nbsp;</p>
      <p>
        Good Day {recipient?.fullname},
        <br />
        <br />
        I hope you&apos;re doing well.
        <br />
        <br />
        This is a friendly reminder that{" "}
        <strong>Training Request #{requestDetail?.id}</strong> is currently
        awaiting your approval.
        <br />
        Could you kindly review and approve the request at your earliest
        convenience?
        <br />
        <br />
        For your reference, here are the details of the training request:
      </p>
      <figure className="table">
        <table>
          <thead>
            <tr>
              <th colSpan="4">
                <h4 style={{ textAlign: "center" }}>
                  <strong>{`${requestDetail?.trainingType?.name} Training Request #${requestDetail?.id} Details`}</strong>
                </h4>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>REQUESTOR:</strong>
              </td>
              <td>{requestDetail?.requestorName}</td>
              <td rowSpan="2">
                <strong>DATE:</strong>
              </td>
              <td rowSpan="2">11/06/2024 10:40:13 am</td>
            </tr>
            <tr>
              <td>
                <strong>BADGE ID:</strong>
              </td>
              <td>{requestDetail?.requestorBadge}</td>
            </tr>
            <tr>
              <td>
                <strong>TRAINING PROGRAM:</strong>
              </td>
              <td style={{ padding: "7.5pt" }} colSpan="3">
                {requestDetail?.trainingProgram?.name}
              </td>
            </tr>
            <tr>
              <td>
                <strong>CATEGORY:</strong>
              </td>
              <td colSpan="3">{requestDetail?.trainingCategory?.name}</td>
            </tr>
            <tr>
              <td>
                <strong>TRAINING OBJECTIVES:</strong>
              </td>
              <td colSpan="3">{requestDetail?.trainingObjectives}</td>
            </tr>
            <tr>
              <td>
                <strong>TRAINING DURATION:</strong>
              </td>
              <td>
                Training Start:{" "}
                {formatDateOnly(requestDetail?.trainingStartDate)}
                <br />
                Training End: {formatDateOnly(requestDetail?.trainingEndDate)}
              </td>
              <td>
                <strong>VENUE</strong>
              </td>
              <td>{requestDetail?.venue}</td>
            </tr>
            <tr>
              <td>
                <strong>TRAINING FEE:</strong>
              </td>
              <td>{formatCurrency(requestDetail?.trainingFee)}</td>
              <td>
                <strong>TOTAL COST:</strong>
              </td>
              <td>{formatCurrency(requestDetail?.totalTrainingFee)}</td>
            </tr>
          </tbody>
        </table>
      </figure>

      {tableHedear("TRAINING SCHEDULES")}
      <TrainingScheduleList schedules={requestDetail?.trainingDates} />
      <p></p>
      {tableHedear("TRAINING PARTICIPANTS")}
      <UserList
        leadingElement={true}
        col="3"
        userlist={requestDetail?.trainingParticipants}
        property={"name"}
      />
      <p></p>
      {tableHedear("TRAINING FACILITATORS")}
      <UserList
        leadingElement={true}
        userlist={requestDetail?.trainingFacilitators}
        property={"name"}
      />
      <p></p>
      {tableHedear("ROUTES")}
      <ApproverList
        data={requestDetail}
        emailFormat
        activityType={ActivityType.REQUEST}
      />
      <p></p>
      {tableHedear("ACTIVITIES")}
      <ActivityList data={activityLogs?.filter((item) => item.show)} />
      <p></p>
      <p>---</p>
      <p>
        <span className="text-small" style={{color:"hsl(120, 75%, 60%)"}}><strong>KEP Training Management System</strong></span><br/>
        <span className="text-small">Knowles Electronics Philippines</span><br/>
        <Link to={APPLICATION_BASE_URL}><span className="text-small" style={{color:"hsl(210, 75%, 60%)"}}>{APPLICATION_BASE_URL}</span></Link>
        </p>
        <p>&nbsp;</p>
    </>
  );
};
TrainingRequestEmailtemplate.propTypes = {
  requestDetail: proptype.object,
  recipient: proptype.object,
  activityLogs: proptype.array,
};
export default TrainingRequestEmailtemplate;
