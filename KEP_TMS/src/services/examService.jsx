import { createExamApi, deleteExamApi, getAllTraineeExamByExamIdApi, getExamByRequestIdApi, getTraineeExamApi, saveTraineeExamApi, updateExamApi } from "../api/examApi";

const examService = {
  createExam: async (data) => {
    const response = await createExamApi(data);
    if (response.status !== 1) {
      throw new Error(response.message);
    }
    return response;
  },
  updateExam: async (data) => {
    const response = await updateExamApi(data);
    if (response.status !== 1) {
      throw new Error(response.message);
    }
    return response;
  },
  deleteExam: async (id) => {
    const response = await deleteExamApi(id);
    if (response.status !== 1) {
      throw new Error(response.message);
    }
    return response;
  },
  getExamByRequestId: async (id) => {
    const response = await getExamByRequestIdApi(id);
    return response?.status === 1 ? response?.data : [];
  },
  saveTraineeExam: async (data) => {
    const response = await saveTraineeExamApi(data);
    if (response.status !== 1) {
      throw new Error(response.message);
    }
    return response?.data;
  },
  getTraineeExam: async (id) => {
    const response = await getTraineeExamApi(id);
    return response?.status === 1 ? response?.data : {};
  },
  getAllTraineeExamByExamId: async (id) => {
    const response = await getAllTraineeExamByExamIdApi(id);
    return response?.status === 1 ? response?.data : [];
  },
  saveStoredExamLog: async () => {
    const examLog = JSON.parse(localStorage.getItem("examLog"));
    if(examLog){
    const response = await saveTraineeExamApi(examLog);
    if (response.status === 1) {
      localStorage.removeItem("examLog")
    }
    }
  },
};
export default examService;