import commonHook from "../../hooks/commonHook";
import proptype from "prop-types";
import { GenerateTrainingDates } from "../../utils/datetime/Formatting";
import calculateTotalHours from "../../utils/datetime/calculateTotalHours";
import { formatTotalTime } from "../../utils/datetime/FormatDateTime";
import TableEmailTemplate from "./TableEmailTemplate";
import userHook from "../../hooks/userHook";
const ApproverPendingsEmailTemplate = ({ userId = "C-00590" }) => {
  const { data, loading, error } = commonHook.useAllAssignedForApproval(userId);

  const requestItems = [
    { field: "id", header: "Request #" },
    { field: "program", header: "Program" },
    { field: "participants", header: "Total Participants" },
    { field: "dates", header: "Training Dates" },
    { field: "hours", header: "Training Hours" },
  ];
  const requestLists = data?.requests
    ? data.requests?.map(({ trainingRequest }) => {
        return {
          id: trainingRequest?.id,
          program: trainingRequest?.trainingProgram?.name,
          participants: trainingRequest?.totalParticipants,
          dates: GenerateTrainingDates(trainingRequest?.trainingDates),
          hours: formatTotalTime(
            calculateTotalHours(trainingRequest?.trainingDates)
          ),
        };
      })
    : [];
  const effectivenessItems = [
    { field: "id", header: "Effectiveness #" },
    { field: "name", header: "Participant's Name", getName: true },
    { field: "program", header: "Training Program" },
  ];
  const formItems = [
    { field: "formId", header: "Form #" },
    { field: "type", header: "Form Type" },
    { field: "name", header: "Participant's Name", getName: true },
    { field: "program", header: "Training Program" },
  ];
  const effectivenessLists = data?.effectiveness
    ? data.effectiveness?.map(({ trainingEffectiveness }) => {
        return {
          id: trainingEffectiveness?.id,
          formId: trainingEffectiveness?.id,
          type: "Effectiveness",
          name: trainingEffectiveness?.employeeBadge,
          program: trainingEffectiveness?.trainingProgram?.name,
        };
      })
    : [];
  const reportItems = [
    { field: "id", header: "Report #" },
    { field: "name", header: "Participant's Name", getName: true },
    { field: "program", header: "Training Program" },
  ];
  const reportLists = data?.reports
    ? data.reports?.map(({ trainingReport }) => {
        return {
          id: trainingReport?.id,
          formId: trainingReport?.id,
          type: "Training Report",
          name: trainingReport?.traineeBadge,
          program: trainingReport?.trainingRequest?.trainingProgram?.name,
        };
      })
    : [];
  return (
    <>
      <p>&nbsp;</p>
      <p>
        Good Day {userHook.useUserById(userId)?.data?.fullname},
        <br />
        <br />
        You have the following pending approvals.
        <br />
      </p>
      <TableEmailTemplate
        items={requestItems}
        value={requestLists}
        label={"Training Requests"}
        hideInNull
      />
      {/* <TableEmailTemplate items={effectivenessItems} value={effectivenessLists} label={"Training Effectiveness"} hideInNull/>
    <TableEmailTemplate items={reportItems} value={reportLists} label={"Training Reports"} hideInNull/> */}
      <TableEmailTemplate
        items={formItems}
        value={[...effectivenessLists, ...reportLists]}
        label={"Training Forms"}
        hideInNull
      />
    </>
  );
};
ApproverPendingsEmailTemplate.propTypes = {
  userId: proptype.string.isRequired,
};
export default ApproverPendingsEmailTemplate;
