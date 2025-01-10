const validateTrainingEffectiveness = (
  getFormData,
  performanceCharacteristics,
  projectPerformanceEvaluation,
  isAfter,
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
    if (
      !performanceCharacteristics[i]?.content &&
      validCharacteristic &&
      performanceCharacteristics[i]?.rating !== 0
    ) {
      formErrors.performanceCharacteristics = `No performance characteristics defined on row ${
        i + 1
      }`;
      validCharacteristic = false;
    } else if (
      performanceCharacteristics[i]?.rating === 0 &&
      validCharacteristic &&
      performanceCharacteristics[i]?.content
    ) {
      formErrors.performanceCharacteristics = `No ratings added in Performance characteristic ${
        i + 1
      }`;
      validCharacteristic = false;
    } else if (
      validCharacteristic &&
      performanceCharacteristics[i]?.content &&
      performanceCharacteristics[i]?.rating !== 0
    ) {
      characteristicsCount += 1;
    }
  });
  if (characteristicsCount === 0 && validCharacteristic) {
    formErrors.performanceCharacteristics = `Add at least one performance characteristic`;
  }
  let evaluationCount = 0;

  projectPerformanceEvaluation?.forEach((_, i) => {
    if (
      !projectPerformanceEvaluation[i]?.content &&
      validEvaluation &&
      (projectPerformanceEvaluation[i]?.performanceBeforeTraining !== 0 ||
        projectPerformanceEvaluation[i]?.projectedPerformance !== 0)
    ) {
      formErrors.projectPerformanceEvaluation = `No Activity defined on row ${
        i + 1
      } `;
      validEvaluation = false;
    } else if (
      projectPerformanceEvaluation[i]?.projectedPerformance === 0 &&
      (projectPerformanceEvaluation[i]?.performanceBeforeTraining !== 0 ||
        projectPerformanceEvaluation[i]?.content) &&
      validEvaluation
    ) {
      formErrors.projectPerformanceEvaluation = `No ratings added on Projected performance for Project Performance Evaluation ${
        i + 1
      }`;
      validEvaluation = false;
    } else if (
      projectPerformanceEvaluation[i]?.projectedPerformance <=
        projectPerformanceEvaluation[i]?.performanceBeforeTraining &&
      validEvaluation &&
      projectPerformanceEvaluation[i]?.content
    ) {
      formErrors.projectPerformanceEvaluation = `Projected performance should be greater than Performance before training for Project Performance Evaluation ${
        i + 1
      }`;
      validEvaluation = false;
    } else if (
      validEvaluation &&
      projectPerformanceEvaluation[i]?.content &&
      projectPerformanceEvaluation[i]?.projectedPerformance !== 0
    ) {
      evaluationCount += 1;
    }

    if (evaluationCount === 0 && validEvaluation) {
      formErrors.projectPerformanceEvaluation =
        "Add at least one project performance evaluation activity";
      validEvaluation = false;
    }

    if (
      projectPerformanceEvaluation[i]?.content &&
      projectPerformanceEvaluation[i]?.actualPerformance <
        projectPerformanceEvaluation[i]?.projectedPerformance &&
      validEvaluation &&
      isAfter
    ) {
      formErrors.projectPerformanceEvaluation = `Actual performance for Project Performance Evaluation Activity ${
        i + 1
      } should be greater than the projected performance`;
      validEvaluation = false;
    }
    if (
      projectPerformanceEvaluation[i]?.content &&
      projectPerformanceEvaluation[i]?.evaluatedActualPerformance === 0 &&
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
