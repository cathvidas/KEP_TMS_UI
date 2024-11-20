const validateTrainingEffectiveness = (getFormData,performanceCharacteristics, projectPerformanceEvaluation, isAfter ) =>{
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
    if (getFormData.performanceCharacteristics.length === 0 && validCharacteristic) {
      formErrors.performanceCharacteristics =
        "At least one performance characteristic is required";
      validCharacteristic = false;
    } else {
        performanceCharacteristics?.forEach((_,i) => {
        if (!performanceCharacteristics[i]?.content && validCharacteristic) {
          formErrors.performanceCharacteristics = `Performance characteristic ${
            i + 1
          } is required`;
          validCharacteristic = false;
        }
        if (
          performanceCharacteristics[i]?.rating === 0 &&
          validCharacteristic
        ) {
          formErrors.performanceCharacteristics = `Rating for Performance characteristic ${
            i + 1
          } is required`;
          validCharacteristic = false;
        }
      });
    }
    if (!getFormData.projectPerformanceEvaluation.length) {
      formErrors.projectPerformanceEvaluation =
        "At least one project performance evaluation is required";
      validEvaluation = false;
    } else {
        projectPerformanceEvaluation?.forEach((_,i) => {
        if (!projectPerformanceEvaluation[i]?.content && validEvaluation) {
          formErrors.projectPerformanceEvaluation = `Project Performance Evaluation ${
            i + 1
          } content is required`;
          validEvaluation = false;
        }
        if (projectPerformanceEvaluation[i]?.performanceBeforeTraining === 0 && validEvaluation) {
          formErrors.projectPerformanceEvaluation = `Performance before training for Project Performance Evaluation ${
            i + 1
          } is required`;
          validEvaluation = false;
        }
        if (projectPerformanceEvaluation[i]?.projectedPerformance === 0 && validEvaluation) {
          formErrors.projectPerformanceEvaluation = `Projected performance for Project Performance Evaluation ${
            i + 1
          } is required`;
          validEvaluation = false;
        }
        if(projectPerformanceEvaluation[i]?.projectedPerformance <= projectPerformanceEvaluation[i]?.performanceBeforeTraining && validEvaluation){
          formErrors.projectPerformanceEvaluation = `Projected performance should be greater than Performance before training for Project Performance Evaluation ${
            i + 1
          }`;
          validEvaluation = false;
        }
        if (isAfter) {
          if (projectPerformanceEvaluation[i]?.actualPerformance === 0 && validEvaluation) {
            formErrors.projectPerformanceEvaluation = `Actual performance for Project Performance Evaluation ${
              i + 1
            } is required`;
            validEvaluation = false;
          }
          if (
            projectPerformanceEvaluation[i]?.evaluatedActualPerformance === 0 && validEvaluation
          ) {
            formErrors.projectPerformanceEvaluation = `Evaluated actual performance for Project Performance Evaluation ${
              i + 1
            } is required`;
            validEvaluation = false;
          }
        }
      });
    }
    if (!isValid || !validEvaluation || !validCharacteristic) {
      isValid = false;
    }
    return {formErrors,isValid};
}
export default validateTrainingEffectiveness;