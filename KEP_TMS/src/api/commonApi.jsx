import fetchFromApi from "./apiUtil"

export const approveTrainingFormApi = async (data) => {
    return await fetchFromApi(`Services/ApproveReportOrEffectiveness`, "POST", data)
}