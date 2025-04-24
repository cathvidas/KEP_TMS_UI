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
  
    if (!details?.trainingObjectives?.trim()) {
      newErrors.trainingObjectives = "This field is required.";
      hasErrors = true;
    }
  
    if (!details?.venue?.trim()) {
      newErrors.venue = "This field is required.";
      hasErrors = true;
    }
  
    return {
      hasErrors,
      newErrors,
    };
  };
  export default validateTrainingDetails;