const validateTrainingDetails = (details) => {
    let hasErrors = false;
    const newErrors = {};
  
    if (!details?.trainingCategory?.id) {
      newErrors.trainingCategory = "This field is required.";
      hasErrors = true;
    }
  
    if (!details?.trainingProgram?.id) {
      newErrors.trainingProgram = "This field is required.";
      hasErrors = true;
    }
  
    if (!details?.trainingObjectives) {
      newErrors.trainingObjectives = "This field is required.";
      hasErrors = true;
    }
  
    if (!details?.venue) {
      newErrors.venue = "This field is required.";
      hasErrors = true;
    }
  
    return {
      hasErrors,
      newErrors,
    };
  };
  export default validateTrainingDetails;