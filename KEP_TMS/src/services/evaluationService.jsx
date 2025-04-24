import { createTrainingEvaluationApi, getAllTrainingEvaluationApi, getTrainingEvaluationByIdApi, GetTrainingEvaluationsByRequestIdApi } from "../api/evaluationApi";

const evaluationService = {
  createTrainingEvaluation: async (data) => {
    const response = await createTrainingEvaluationApi(data);
    if (response.status === 400) {
      throw new Error(response.title);
    }
    return response;
  },
  getAllTrainingEvaluation: async () => {
    const response = await getAllTrainingEvaluationApi();
    return response?.status === 1 ? response?.data : [];
  },
  getTrainingEvaluationById: async (id) => {
    const response = await getTrainingEvaluationByIdApi(id || 0);
    return response?.status === 1 ? response?.data : {};
  },
  getTrainingEvaluationsByRequestId: async (reqId) => {
    const response = await GetTrainingEvaluationsByRequestIdApi(reqId || 0);
    return response?.status == 1 ? response?.data : [];
  },
};
export default evaluationService;