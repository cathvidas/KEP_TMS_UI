import { createTrainingEvaluationApi } from "../api/evaluationApi";

const evaluationService = {
    createTrainingEvaluation: async (data)=>{
        const response = await createTrainingEvaluationApi(data);
        return response;
    }
}
export default evaluationService;