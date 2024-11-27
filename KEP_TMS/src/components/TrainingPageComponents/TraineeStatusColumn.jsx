import { statusCode } from "../../api/constants";
import examHook from "../../hooks/examHook";
import getTraineeExamDetail from "../../services/common/getTraineeExamDetail";
import trainingDetailsService from "../../services/common/trainingDetailsService";
import proptype from "prop-types";
const TraineeStatusTemplate = ({value, traineeId}) => {
    const traineeFormDetail = value?.trainingParticipants?.find(item => item?.employeeBadge === traineeId)
    const traineeExams = examHook.useAllTraineeExamByRequest(value?.id);
    const getStatus = () => {
      let detail = "Pending";
      if (
        value?.status?.id === statusCode.SUBMITTED &&
        traineeFormDetail?.effectivenessId === null
      ) {
        detail = "Effectiveness,";
      }
      if (trainingDetailsService.checkIfTrainingEndsAlready(value)) {
        if (traineeFormDetail?.evaluationId === null) {
          detail += " Evaluation,";
        }
        if (traineeFormDetail?.reportId === null) {
          detail += " Training Report,";
        }
        if (traineeExams?.length > 0) {
          const exam = getTraineeExamDetail(traineeExams, traineeId);
          if (!exam?.submitted) {
            detail += " Exam,";
          }
        }
      }else{
        detail = value?.status?.name;
      }
      return detail;
    };
  
    return (
      <>
        <div>
          {getStatus()}
        </div>
      </>
    );
  };
  TraineeStatusTemplate.propTypes = {
    value: proptype.object,
    traineeId: proptype.string
  } 
  export default TraineeStatusTemplate;