import proptype from "prop-types";
import TrainingScheduleList from "../trainingRequestFormComponents/TrainingScheduleList";
import { UserList } from "../List/UserList";
import ApproverList from "../List/ApproversList";
import { ActivityType } from "../../api/constants";

const TrainingRequestEmailtemplate = ({ data}) => {
  console.log(data)
    const tableHedear = (value) => {
        return <>
        <p><span style={{color:"hsl(210, 75%, 60%"}}><strong>{value}
            </strong></span></p>
        </>
    }
  return (
    <>
      <p>&nbsp;</p>
      <p>
        Good Day!
        <br />
        <br />
        Training Request #{data?.id} is now submitted.
        <br />
        <br />
        Please be reminded of the following:
        <br />
        1.Training participant/s are required to fill up the following forms:
        <br />
        &nbsp;&nbsp;&nbsp;a. <strong>Training Evaluation</strong>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt; Training participant/s must
        fill up this form immediately after the training.
        <br />
        &nbsp;&nbsp;&nbsp;b. <strong>Training Report</strong>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt; Training participant/s must
        fill up this form within one month after the training.
        <br />
        &nbsp;&nbsp;&nbsp;c. <strong>Training Effectiveness</strong>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt; Training participant/s must
        fill up this form now.
      </p>
      <figure className="table">
        <table>
          <thead>
            <tr>
              <th colSpan="4">
                <h4 style={{ textAlign: "center" }}>
                  <strong>{`${data?.trainingType?.name} Training Request #${data?.id} Details`}</strong>
                </h4>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>REQUESTOR:</strong>
              </td>
              <td>{data?.requestorName}</td>
              <td rowSpan="2">
                <strong>DATE:</strong>
              </td>
              <td rowSpan="2">11/06/2024 10:40:13 am</td>
            </tr>
            <tr>
              <td>
                <strong>BADGE ID:</strong>
              </td>
              <td>{data?.requestorBadge}</td>
            </tr>
            <tr>
              <td>
                <strong>TRAINING PROGRAM:</strong>
              </td>
              <td style={{ padding: "7.5pt" }} colSpan="3">
                {data?.trainingProgram?.name}
              </td>
            </tr>
            <tr>
              <td>
                <strong>CATEGORY:</strong>
              </td>
              <td colSpan="3">{data?.trainingCategory?.name}</td>
            </tr>
            <tr>
              <td>
                <strong>TRAINING OBJECTIVES:</strong>
              </td>
              <td colSpan="3">Test</td>
            </tr>
            <tr>
              <td>
                <strong>TRAINING DURATION:</strong>
              </td>
              <td>
                Training Start: 11/27/2024
                <br />
                Training End: 11/28/2024
              </td>
              <td>
                <strong>VENUE</strong>
              </td>
              <td>Test</td>
            </tr>
            <tr>
              <td>
                <strong>TRAINING FEE:</strong>
              </td>
              <td>₱96</td>
              <td>
                <strong>TOTAL COST:</strong>
              </td>
              <td>₱96</td>
            </tr>
          </tbody>
        </table>
      </figure>

      {tableHedear("TRAINING SCHEDULES")}
      <TrainingScheduleList schedules={data.trainingDates} />
      <p></p>
      {tableHedear("TRAINING PARTICIPANTS")}
      <UserList
        leadingElement={true}
        col="3"
        userlist={data.trainingParticipants}
        property={"name"}
      />
      <p></p>
      {tableHedear("TRAINING FACILITATORS")}
      <UserList
        leadingElement={true}
        userlist={data.trainingFacilitators}
        property={"name"}
      />
      <p></p>
      {tableHedear("ROUTES")}
      {/* <ApproverList data={data} emailFormat activityType={ActivityType.REQUEST}/> */}
      <p>
        <br />
        Regards,
        <br />
        TMS Administrator
      </p>
      <p>&nbsp;</p>
    </>
  );
};
TrainingRequestEmailtemplate.propTypes = {
  data: proptype.object,
};
export default TrainingRequestEmailtemplate;
