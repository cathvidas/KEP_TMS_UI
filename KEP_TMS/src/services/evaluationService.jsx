import { createTrainingEvaluationApi, getAllTrainingEvaluationApi, getTrainingEvaluationByIdApi } from "../api/evaluationApi";

const evaluationService = {
    createTrainingEvaluation: async (data)=>{
        const response = await createTrainingEvaluationApi(data);
        if(response.status === 400){
          throw new Error(response.title);
        }
        return response;
    },
    getAllTrainingEvaluation: async ()=>{
        const response = await getAllTrainingEvaluationApi();
        return response?.status === 1 ? response?.data : [];
    },
    getTrainingEvaluationById: async (id)=>{
        const response = await getTrainingEvaluationByIdApi(id);
        return response?.status === 1 ? response?.data : {};
    }
}
export default evaluationService;