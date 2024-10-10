import fetchFromApi from "./apiUtil"

export const createTrainingReportApi = async (data) =>{
    return await fetchFromApi("/TrainingReport/CreateTrainingReport", "POST", data)
}
export const getAllTrainingReportsApi = async () =>{
    return await fetchFromApi("/TrainingReport/GetAllTrainingReports")
}
export const getTrainingReportByIdApi = async (id) =>{
    return await fetchFromApi(`/TrainingReport/GetTrainingReportById?id=${id}`)
}
export const updateTrainingReportApi = async (data) =>{
    return await fetchFromApi("/TrainingReport/UpdateTrainingReport", "PUT", data)
}
export const getApproverAssignedReportsApi = async (id)=>{
    return await fetchFromApi(`Services/GetAssignedReports?assignedTo=${id}`);
}