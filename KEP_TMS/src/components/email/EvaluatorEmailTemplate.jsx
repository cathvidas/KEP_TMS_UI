import proptype from "prop-types"
import { formatDateOnly } from "../../utils/datetime/Formatting";
const EvaluatorEmailTemplate = ({reqData, message, recipientName, employeeName, projectPerformanceEvaluation, ratingDate, targetDateEvaluation, evaluatorName}) =>{
return (
  <>
    <p>
      Hi{recipientName ? " " + recipientName : ""},
      <br />
      <br />
      This is an automated notification regarding the low effectiveness rating of{" "}<strong>{employeeName}</strong> for the training request <strong>#{reqData?.id}</strong>{" "}titled &#34;<strong>{reqData?.trainingProgram?.name}</strong>&#34;.
      <br />
    </p>
    <table
      border="1"
      cellPadding="5"
      cellSpacing="0"
      style={{
        borderCollapse: "collapse",
        width: "100%",
        fontSize: "14px",
      }}
    >
      <thead>
        <tr style={{ backgroundColor: "#f2f2f2" }}>
          <th
            style={{
              padding: "5px",
              textAlign: "center",
              fontSize: "16px",
              border: "1px solid",
            }}
            colSpan={6}
          >
            Effectiveness Evaluation Rating
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ padding: "5px" }} colSpan={4}><strong>Target Date of Evaluation:</strong> {targetDateEvaluation ?? "N/A"}</td>
          <td style={{ padding: "5px" }} colSpan={2}><strong>Evaluator:</strong> {evaluatorName ?? "N/A"}</td>
        </tr>
        <tr style={{textAlign: "center"}}>
          <td style={{ padding: "5px", fontWeight: "bold", width: "25%", textAlign: "left" }} colSpan={2}>Project / Task / Assignment</td>
          <td style={{ padding: "5px", width: "17%"}}><strong>Performance Before Training </strong></td>
          <td style={{ padding: "5px", width: "17%"}}><strong>Projected Performance</strong></td>
          <td style={{ padding: "5px", width: "17%"}}><strong>Actual Performance</strong></td>
          <td style={{ padding: "5px", width: "17%"}}><strong>Actual Performance evaluated by the immediate manager</strong></td>
        </tr>
        {projectPerformanceEvaluation?.map((item, index)=>{
          return(
            <tr key={index}  style={{textAlign: "center"}}>
              <td style={{ padding: "5px" }}>{index + 1}</td>
              <td style={{ padding: "5px", textAlign: "left" }} >{item.content}</td>
              <td style={{ padding: "5px" }}><strong>{item.performanceBeforeTraining}</strong>; {formatDateOnly(item?.createdDate ?? ratingDate?.creatorAudit)}</td>
              <td style={{ padding: "5px" }}><strong>{item.projectedPerformance}</strong>; {formatDateOnly(item?.createdDate ?? ratingDate?.creatorAudit)}</td>
              <td style={{ padding: "5px" }}><strong>{item.actualPerformance}</strong>; {formatDateOnly(item?.createdDate ?? ratingDate?.creatorAudit)}</td>
              <td style={{ padding: "5px" }}><strong>{item.evaluatedActualPerformance}</strong>; {formatDateOnly(item?.createdDate ?? ratingDate?.evaluatorAudit ?? formatDateOnly(new Date()))}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
    <p><strong>ACTION PLAN:</strong></p>
    <div id="messageHolder" style={{whiteSpace: "pre-wrap"}}> {message}</div>
  </>
);
}
EvaluatorEmailTemplate.propTypes = {
  reqData: proptype.object,
  message: proptype.string,
  recipientName: proptype.string,
  employeeName: proptype.string, 
  projectPerformanceEvaluation: proptype.array,
  ratingDate: proptype.string,
  targetDateEvaluation: proptype.string,
  evaluatorName: proptype.string,
}
export default EvaluatorEmailTemplate;