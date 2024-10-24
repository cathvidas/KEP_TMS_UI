import getPassingScore from "../../utils/common/getPassingScore";

const getTraineeExamDetail = (data, user) => {
    const traineeExam = data?.traineeExam?.filter(
      (e) => e.createdBy === user
    );
    //get the lastest exam
    if (traineeExam?.length > 0) {
      traineeExam.sort((a, b) => b.id - a.id);
      return {
        submitted: true,
        detail: traineeExam,
        isPassed:
          getPassingScore(data?.examDetail?.questionLimit) <=
          traineeExam[0]?.totalScore,
      };
    }
    return { submitted: false, detail: [] };
  };
  export default getTraineeExamDetail;