const validateExamForm = (data) => {
    const errors = {};
    let isValid = true;
    if (!data.title) {
        errors.title = "Exam title is required";
        isValid = false;
    }
    if (data.passingRate === 0) {
        errors.passingRate = "Passing rate should be greater than zero";
        isValid = false;
    }
    if (!data.questionLimit || data.questionLimit < 1) {
        errors.questionLimit = "Number of questions to display is required";
        isValid = false;
    }
    if (data.examQuestions?.length < data?.questionLimit ) {
        errors.examQuestion = "You must add at least " + data?.questionLimit + " questions; ";
        isValid = false;
    }
      let optionError = false;
      let answerError = false;
    data?.examQuestions?.forEach((question) => {
        errors.examQuestion = errors.examQuestion || "";
      if (!(question?.answerOptions?.length > 0) && !optionError) {
        errors.examQuestion += "Some questions are missing options; ";
        optionError = true;
        isValid = true;
      }
      let answer = question?.answerOptions?.some((option) => option?.isCorrect);
      if (!answer && !answerError) {
        errors.examQuestion += "Some questions are missing correct answers; ";
      }
    });
    return {errors, isValid};
}
export default validateExamForm;