import { resolvePath } from "react-router-dom";
import { createTrainingEvaluationApi, getAllTrainingEvaluationApi, getTrainingEvaluationByIdApi } from "../api/evaluationApi";

const evaluationService = {
    createTrainingEvaluation: async (data)=>{
        const response = await createTrainingEvaluationApi(data);
        return response;
    },
    getAllTrainingEvaluation: async ()=>{
        const response = await getAllTrainingEvaluationApi();
        return response;
    },
    getTrainingEvaluationById: async (id)=>{
        const response = await getTrainingEvaluationByIdApi(id);
        return response?.status === 1 ? response?.data : {};
    }
}
export default evaluationService;