import { API_ENDPOINTS } from "../api/apiEndpoints";
import fetchFromApi from "../api/apiUtil";
import { TrainingType } from "../api/constants";

export const getTrainingTypeById = (typeId) => {
  return TrainingType.EXTERNAL === typeId
    ? "External"
    : TrainingType.INTERNAL === typeId
    ? "Internal"
    : null;
};
