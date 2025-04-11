const validateEffectivenessEvaluation = (projectPerformanceEvaluation) => {
  let isLowRating = false;
  projectPerformanceEvaluation?.forEach((_, i) => {
    var trimmedContent = projectPerformanceEvaluation[i]?.content?.trim();
    if (
      projectPerformanceEvaluation[i]?.evaluatedActualPerformance <
        projectPerformanceEvaluation[i]?.actualPerformance &&
      trimmedContent
    ) {
        isLowRating = true;
    }
  });
  return isLowRating;
};
export default validateEffectivenessEvaluation;
