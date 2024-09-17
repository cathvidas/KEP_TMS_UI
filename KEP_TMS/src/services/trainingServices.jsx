import { API_ENDPOINTS } from "../api/apiEndpoints"
import fetchFromApi from "../api/apiUtils";

//PROGRAM
export const getTrainingPrograms = async () => {
    return await fetchFromApi(API_ENDPOINTS.GET_TRAINING_PROGRAMS);
}
export const getTrainingProgramById = async (programId) => {
    return await fetchFromApi(`${API_ENDPOINTS.GET_TRAINING_PROGRAM_BY_ID}?id=${programId}`);
}


//CATEGORIES
export const getTrainingCategories = async () => {
    return await fetchFromApi(API_ENDPOINTS.GET_TRAINING_CATEGORIES);
}
export const getTrainingCategoryById = async (categoryId) => {
    return await fetchFromApi(`${API_ENDPOINTS.GET_TRAINING_CATEGORY_BY_ID}?id=${categoryId}`);
}


//PROVIDERS
export const getTrainingProviderById=async(providerId)=>{
    return await fetchFromApi(`${API_ENDPOINTS.GET_TRAINING_PROVIDER_BY_ID}?id=${providerId}`)
}
export const getAllTrainingProviders=async()=>{
    return await fetchFromApi(API_ENDPOINTS.GET_TRAINING_PROVIDERS);
}
//REQUESTS
export const getTrainingRequestById = async (requestId)=>{
    return await fetchFromApi(`${API_ENDPOINTS.GET_TRAINING_REQUEST_BY_ID}?id=${requestId}`);
}
export const getAllTrainingRequests = async () => {
    return await fetchFromApi(API_ENDPOINTS.GET_TRAINING_REQUESTS);
}
export const insertTrainingRequest = async (trainingRequest) => {
    console.log(trainingRequest)
    return await fetchFromApi(API_ENDPOINTS.INSERT_TRAINING_REQUEST, "POST", trainingRequest);
}
export const approveTrainingRequest = async (formatData) => {
    return await fetchFromApi(API_ENDPOINTS.APPROVE_TRAINING_REQUEST, "POST", formatData);
}


//PARTICIPANTS
export const getTrainingParticipants = async (programId) => {
    return await fetchFromApi(`${API_ENDPOINTS.GET_TRAINING_PARTICIPANTS}/${programId}`);
}

//FACILITATORS
export const getTrainingFacilitators = async (programId) => {
    return await fetchFromApi(`${API_ENDPOINTS.GET_TRAINING_FACILITATORS}/${programId}`);
}


//TRAINING DATES
export const getTrainingDates = async (programId) => {
    return await fetchFromApi(`${API_ENDPOINTS.GET_TRAINING_DATES}/${programId}`);
}


// REPOSRTS
export const getTrainingEvaluations = async (programId) => {
    return await fetchFromApi(`${API_ENDPOINTS.GET_TRAINING_EVALUATIONS}/${programId}`);
}

export const getTrainingEffectiveness = async (programId) => {
    return await fetchFromApi(`${API_ENDPOINTS.GET_TRAINING_EFFECTIVENESS}/${programId}`);
}

export const getTrainingReports = async (programId) => {
    return await fetchFromApi(`${API_ENDPOINTS.GET_TRAINING_REPORTS}/${programId}`);
}


// APPROVER
export const getTrainingRequestByApprover = async (approverId) => {
    return await fetchFromApi(`${API_ENDPOINTS.GET_TRAINING_REQUESTS_BY_APPROVER}?approverId=${approverId}`);
}

