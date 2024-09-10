import apiClient from "./apiClient";

export const getTrainingPrograms = async () => {
  try {
    const res = await apiClient.get("/TrainingProgram/GetAllTrainingPrograms");
    return res.data;
  } catch (error) {
    console.error("Error fetching training programs:", error);
    throw error;
  }
};
 export const getTrainingCategories = async () => {
  try {
    const res = await apiClient.get("/TrainingCategory/GetAllTrainingCategories");
    return res.data;
  } catch (error) {
    console.error("Error fetching training categories:", error);
    throw error;
  }
};