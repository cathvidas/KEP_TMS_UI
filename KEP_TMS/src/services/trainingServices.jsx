import handleApiResponse from "../api/apiHandlers";
import { getTrainingCategories, getTrainingPrograms } from "../api/trainingServiceApi";
import { FormatToOptions } from "../utils/Formatting";

export const GetAllTrainingPrograms = () => {
    return handleApiResponse(FormatToOptions, getTrainingPrograms);
  };
export const GetAllTrainingCategories = () => {
  return handleApiResponse(FormatToOptions, getTrainingCategories);
};