import fetchFromApi from "./apiUtil"

export const createTrainingEvaluationApi = async (data) =>{
    return await fetchFromApi("/TrainingEvaluation/CreateTrainingEvaluation", "POST", data)
}
export const getAllTrainingEvaluationApi = async () =>{
    return await fetchFromApi("/TrainingEvaluation/GetAllTrainingEvaluations")
}
export const getTrainingEvaluationByIdApi = async (id) =>{
    return await fetchFromApi(`/TrainingEvaluation/GetTrainingEvaluationById?id=${id}`)
}