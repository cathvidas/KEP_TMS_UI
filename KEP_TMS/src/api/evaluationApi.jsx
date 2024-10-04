import fetchFromApi from "./apiUtil"

export const createTrainingEvaluationApi = async (data) =>{
    return await fetchFromApi("/TrainingEvaluation/CreateTrainingEvaluation", "POST", data)
}