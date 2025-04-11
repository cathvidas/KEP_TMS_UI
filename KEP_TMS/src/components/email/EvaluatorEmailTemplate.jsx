import proptype from "prop-types"
const EvaluatorEmailTemplate = ({reqData, message, recipientName}) =>{
return <>
<table
  border="1"
  cellPadding="5"
  cellSpacing="0"
  style={{
    borderCollapse: "collapse",
    width: "500px",
    fontFamily: "Arial, sans-serif",
  }}
>
  <thead>
    <tr style={{ backgroundColor: "#7fc9b0" }}>
      <th
        style={{
          padding: "10px",
          textAlign: "left",
          fontSize: "16px",
          border: "1px solid",
        }}
      >
        PERFORMANCE RATING NOTIFICATION
      </th>
    </tr>
  </thead>
  <tbody>
    <tr >
      <td style={{ padding: "15px", fontSize: "14px" }}>
        <p>
          Hi{recipientName ? " " + recipientName : ""},
          <br />
          <br />
          This is an automated notification regarding your training
          effectiveness for the trainig request <strong>#{reqData?.id}</strong> entitled  &#34;<strong>{reqData?.trainingProgram?.name}</strong>&#34;.
          <br />
          <br />
          The rating provided by your evaluator is lower than expected.
          Please find the evaluative message below:
          <br />
        <blockquote id="messageHolder" style={{borderLeft: "3px solid #555", paddingLeft: "10px", color: "#555", flexWrap: "break-word"}}>
            {message}
        </blockquote>
        <br />We recommend reviewing this feedback for potential areas of improvement. For further inquiries or discussions, please contact your supervisor or the training coordinator.</p>
      </td>
    </tr>
  </tbody>
</table></>
}
EvaluatorEmailTemplate.propTypes = {
  reqData: proptype.object,
  message: proptype.string,
  recipientName: proptype.string
}
export default EvaluatorEmailTemplate;