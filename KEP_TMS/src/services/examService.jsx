import { createExamApi, deleteExamApi, getAllTraineeExamByExamIdApi, getExamByRequestIdApi, getTraineeExamApi, saveTraineeExamApi, updateExamApi, updateTraineeExamRetakeApi } from "../api/examApi";

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
    const response = id && await deleteExamApi(id);
    if (response.status !== 1) {
      throw new Error(response.message);
    }
    return response;
  },
  getExamByRequestId: async (id) => {
    const response = id && await getExamByRequestIdApi(id);
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
    const response = id && await getTraineeExamApi(id);
    return response?.status === 1 ? response?.data : {};
  },
  getAllTraineeExamByExamId: async (id) => {
    const response = id && await getAllTraineeExamByExamIdApi(id);
    return response?.status === 1 ? response?.data : [];
  },
  updateTraineeExamRetake: async (id, forRetake) => {
    const response = await updateTraineeExamRetakeApi({id, forRetake});
    if (response.status !== 1) {
      throw new Error(response.message);
    }
    return response?.data;
  },
  saveStoredExamLog: async () => {
    const examLog = JSON.parse(sessionStorage.getItem("examLog"));
    if(examLog){
    const response = await saveTraineeExamApi(examLog);
    if (response.status === 1) {
      sessionStorage.removeItem("examLog")
    }
    }
  },
};
export default examService;