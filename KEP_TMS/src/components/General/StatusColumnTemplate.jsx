import countData from "../../utils/countData";
import StatusColor from "./StatusColor";

const StatusColumnTemplate = (rowData) => {

  return (
    <>
      <div>
        {rowData?.showStatus && 
        <span>
          {StatusColor({status: rowData?.status, class: "p-1", style:{ fontSize: "0.55rem" }, showStatus:false})}
        </span>}
        <span>
          {" "}
          {rowData?.status == "ForApproval"
            ? "For " + (rowData?.approverPosition ?? "") + " Approval"
            : rowData?.status == "Approved"
            ? "Awaiting Trainer Action"
            : rowData?.status == "Submitted"
            ? "Awaiting for trainee effectiveness"
            : rowData?.status}
        </span>
        <br />
        <b>
          {
            rowData?.status == "Submitted"
            ?`${countData(rowData?.trainingParticipants, "effectivenessId", 4)}/${rowData?.totalParticipants} submitted`:
            rowData?.status == "Published"
            ? "": 
           rowData?.status == "Approved"
            ? "-"+ rowData?.facilitatorName  
            : rowData.approverFullName && "-"+ rowData?.approverFullName}
        </b>
      </div>
    </>
  );
};
export default StatusColumnTemplate;