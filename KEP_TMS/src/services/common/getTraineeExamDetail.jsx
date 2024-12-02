import getPassingScore from "../../utils/common/getPassingScore";

const getTraineeExamDetail = (data, user) => {
    const traineeExam = data?.traineeExam?.find(
      (e) => e.traineeId === user
    );
    //get the lastest exam
    if (traineeExam?.examList?.length > 0) {
      traineeExam?.examList?.sort((a, b) => b.id - a.id);
      return {
        submitted: true,
        detail: traineeExam?.examList,
        isRetake: traineeExam?.examList[0]?.forRetake ?? false,
        isPassed:
          getPassingScore(data?.examDetail?.questionLimit) <=
          traineeExam?.examList[0]?.totalScore,

      };
    }
    
    return { submitted: false, detail: [], isPassed: false, isRetake: false };
  };
  export default getTraineeExamDetail;