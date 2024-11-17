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
    if (data.examQuestion?.length < data?.questionLimit ) {
        errors.examQuestion = "You must add at least " + data?.questionLimit + " questions";
        isValid = false;
    }
    return {errors, isValid};
}
export default validateExamForm;