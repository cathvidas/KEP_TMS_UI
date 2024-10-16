import fetchFromApi from "./apiUtil";

export const createExamApi = async (data) => {
  return await fetchFromApi(`/Exam/CreateExam`, "POST", data);
};
export const getExamByRequestIdApi = async (id) => {
  return await fetchFromApi(`/Exam/GetExamByRequestId?requestId=${id}`);
};
export const saveTraineeExamApi = async (data) => {
  return await fetchFromApi(`/Exam/SaveTraineeExam`, "POST", data);
};
export const getTraineeExamApi = async (id) => {
  return await fetchFromApi(`/Exam/GetTraineeExamById?traineeExamId=${id}`);
};
