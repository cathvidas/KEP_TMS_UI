import fetchFromApi from "./apiUtil"

export const createTrainingReportApi = async (data) =>{
    return await fetchFromApi("/TrainingReport/CreateTrainingReport", "POST", data)
}
export const getAllTrainingReports = async () =>{
    return await fetchFromApi("/TrainingReport/GetAllTrainingReports")
}
export const getTrainingReportById = async (id) =>{
    return await fetchFromApi(`/TrainingReport/GetTrainingReportById?id=${id}`)
}
