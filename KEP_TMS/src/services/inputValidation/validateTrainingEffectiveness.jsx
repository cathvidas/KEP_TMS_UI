const validateTrainingEffectiveness = (
  getFormData,
  performanceCharacteristics,
  projectPerformanceEvaluation,
  isAfter,
  isSixMonthsAfter,
  forEvaluation
) => {
  let formErrors = {};
  let isValid = true;
  let validCharacteristic = true;
  let validEvaluation = true;
  if (!getFormData.evaluationDate) {
    formErrors.evaluationDate = "Evaluation Date is required";
    isValid = false;
  }
  if (!getFormData.annotation && isAfter) {
    formErrors.annotation = "This field is required";
    isValid = false;
  }
  let characteristicsCount = 0;
  performanceCharacteristics?.forEach((_, i) => {
    var trimmedContent = performanceCharacteristics[i]?.content?.trim();
    if (
      !trimmedContent &&
      validCharacteristic &&
      performanceCharacteristics[i]?.rating != null
    ) {
      formErrors.performanceCharacteristics = `No performance characteristics defined on row ${
        i + 1
      }`;
      validCharacteristic = false;
    } else if (
      performanceCharacteristics[i]?.rating === null &&
      validCharacteristic &&
      trimmedContent
    ) {
      formErrors.performanceCharacteristics = `No ratings added in Performance characteristic ${
        i + 1
      }`;
      validCharacteristic = false;
    } else if (
      validCharacteristic &&
      trimmedContent &&
      performanceCharacteristics[i]?.rating !== null
    ) {
      characteristicsCount += 1;
    }
  });
  if (characteristicsCount === 0 && validCharacteristic) {
    formErrors.performanceCharacteristics = `Add at least one performance characteristic`;
    validCharacteristic = false;
  }
  let evaluationCount = 0;

  projectPerformanceEvaluation?.forEach((_, i) => {
    var trimmedContent = projectPerformanceEvaluation[i]?.content?.trim();
    if (
      !trimmedContent &&
      validEvaluation &&
      (projectPerformanceEvaluation[i]?.performanceBeforeTraining !== null ||
        projectPerformanceEvaluation[i]?.projectedPerformance !== null || (projectPerformanceEvaluation[i]?.actualPerformance !== null && isSixMonthsAfter))
    ) {
      formErrors.projectPerformanceEvaluation = `No Activity defined on row ${
        i + 1
      } `;
      validEvaluation = false;
    } else if (
      projectPerformanceEvaluation[i]?.projectedPerformance === null &&
      (projectPerformanceEvaluation[i]?.performanceBeforeTraining !== null ||
        trimmedContent) &&
      validEvaluation
    ) {
      formErrors.projectPerformanceEvaluation = `No ratings added on projected performance row ${
        i + 1
      }`;
      validEvaluation = false;
    } else if (
      projectPerformanceEvaluation[i]?.projectedPerformance <=
        projectPerformanceEvaluation[i]?.performanceBeforeTraining &&
      validEvaluation &&
      trimmedContent
    ) {
      formErrors.projectPerformanceEvaluation = `Projected performance rating should be greater than the performance before training rating on row ${
        i + 1
      }`;
      validEvaluation = false;
    } else if (
      validEvaluation &&
      trimmedContent &&
      projectPerformanceEvaluation[i]?.projectedPerformance !== null
    ) {
      evaluationCount += 1;
    }

    if (evaluationCount === 0 && validEvaluation) {
      formErrors.projectPerformanceEvaluation =
        "Add at least one task";
      validEvaluation = false;
    }

    if (
      trimmedContent &&
      projectPerformanceEvaluation[i]?.actualPerformance <
        projectPerformanceEvaluation[i]?.projectedPerformance &&
      validEvaluation &&
      isSixMonthsAfter
    ) {
      formErrors.projectPerformanceEvaluation = `Actual performance in row ${
        i + 1
      } should be equal or greater than the projected performance`;
      validEvaluation = false;
    }
    if (
      trimmedContent &&
      projectPerformanceEvaluation[i]?.evaluatedActualPerformance === null &&
      validEvaluation &&
      forEvaluation
    ) {
      formErrors.projectPerformanceEvaluation = `No ratings added on row ${
        i + 1
      }`;
      validEvaluation = false;
    }
  });
  if (!isValid || !validEvaluation || !validCharacteristic) {
    isValid = false;
  }
  return { formErrors, isValid };
};
export default validateTrainingEffectiveness;
