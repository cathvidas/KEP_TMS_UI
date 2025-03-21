import { ModuleAvailability } from "../constants/appConstants";

const validateModuleForm = (data, moduleAvailability, files, requireFiles) => {
  let formErrors = {};
  let isValid = true;
  if (!data.Name) {
    formErrors.Name = "Title is required";
    isValid = false;
  }
  if (!data.Description) {
    formErrors.Description = "Description is required";
    isValid = false;
  }
  if (files?.length === 0 && requireFiles) {
    formErrors.file = "No files attached to this module";
    isValid = false;
  }
  if (moduleAvailability && (
    moduleAvailability === ModuleAvailability.CUSTOM_DURATION ||
    moduleAvailability === ModuleAvailability.TRAINING_DATES_BASED
  )) {
    if (!data?.AvailableAt) {
      formErrors.AvailableAt = "Start date is required";
      isValid = false;
    }
    if (!data?.UnavailableAt) {
      formErrors.UnavailableAt = "End date is required";
      isValid = false;
    }
    if (new Date(data?.AvailableAt) > new Date(data?.UnavailableAt)) {
      formErrors.UnavailableAt =
        "Unavailable date must be after available date";
      isValid = false;
    }
  }
  return { isValid, formErrors };
};
export default validateModuleForm;
