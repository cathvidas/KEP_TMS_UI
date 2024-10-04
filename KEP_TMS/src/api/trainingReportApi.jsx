import fetchFromApi from "./apiUtil"

export const createTrainingReportApi = async (data) =>{
    return await fetchFromApi("/TrainingReport/CreateTrainingReport", "POST", data)
}
