import fetchFromApi from "./apiUtil";

export const createTrainingEffectivenessApi = async (data)=>{
    return await fetchFromApi("TrainingEffectiveness/CreateTrainingEffectiveness", "POST", data);
}
export const getEffectivenessByIdApi = async (id)=>{
    return await fetchFromApi(`TrainingEffectiveness/GetTrainingEffectivenessById?id=${id}`);
}
export const getAllEffectivenessApi = async ()=>{
    return await fetchFromApi(`TrainingEffectiveness/GetAllTrainingEffectiveness`);
}
export const getApproverAssignedEffectivenessApi = async (id)=>{
    return await fetchFromApi(`Services/GetAssignedEffectiveness?assignedTo=${id}`);
}
export const updateEffectivenessApi = async (data)=>{
    return await fetchFromApi(`TrainingEffectiveness/updateTrainingEffectiveness`, "PUT", data);
}
export const updateProjectPerformanceEvaluationApi = async (data)=>{
    return await fetchFromApi(`TrainingEffectiveness/UpdateProjectPerformanceEvaluation`, "PUT", data);
}