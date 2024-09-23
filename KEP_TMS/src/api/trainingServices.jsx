import { API_ENDPOINTS } from "./apiEndpoints"
import fetchFromApi from "./apiUtils";

//PROGRAM
export const getTrainingPrograms = async () => {
    return await fetchFromApi(API_ENDPOINTS.GET_TRAINING_PROGRAMS);
}
export const getTrainingProgramById = async (programId) => {
    return await fetchFromApi(`${API_ENDPOINTS.GET_TRAINING_PROGRAM_BY_ID}?id=${programId}`);
}
export const insertTrainingProgram = async (data) =>{
    return await fetchFromApi(API_ENDPOINTS.INSERT_TRAINING_PROGRAM, "POST", data);
}
export const deleteTrainingProgram = async (id) =>{
    return await fetchFromApi(`${API_ENDPOINTS.DELETE_TRAINING_PROGRAM}?id=${id}`, "DELETE");
}
export const updateTrainingProgram = async (data) =>{
    return await fetchFromApi(API_ENDPOINTS.UPDATE_TRAINING_PROGRAM, "PUT", data);
}


//CATEGORIES
export const getTrainingCategories = async () => {
    return await fetchFromApi(API_ENDPOINTS.GET_TRAINING_CATEGORIES);
}
export const getTrainingCategoryById = async (categoryId) => {
    return await fetchFromApi(`${API_ENDPOINTS.GET_TRAINING_CATEGORY_BY_ID}?id=${categoryId}`);
}
export const inserTrainingCategory = async (data)=>{
    return await fetchFromApi(API_ENDPOINTS.INSERT_TRAINING_CATEGORY, "POST", data);
}
export const updateTrainingCategory =async (data)=>{
    return await fetchFromApi(API_ENDPOINTS.UPDATE_TRAINING_CATEGORY, "PUT", data);
}
export const deleteTrainingCategory =async(id) =>{
    return await fetchFromApi(`${API_ENDPOINTS.DELETE_TRAINING_CATEGORY}?id=${id}`, "DELETE");
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
export const updateTrainingRequest = async (data)=>{
    return await fetchFromApi(API_ENDPOINTS.UPDATE_TRAINING_REQUEST, "PUT", data);
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

export const getTrainingRequestApprovers = async (data) => {
    return await fetchFromApi(`${API_ENDPOINTS.GET_TRAINING_REQUEST_APPROVERS}?userBadge=${data.userBadge}&cost=${data.cost}&requestType=${data.requestType}`);
}


// SERVICES
export const getRoutingActivity = async (transactId, activityIn) =>{
    return await fetchFromApi(`${API_ENDPOINTS.GET_ROUTING_ACTIVITY}?transactId=${transactId}&activityIn=${activityIn}`);
}


//FILE UPLOADS
export const uploadFile = async (data) => {
    return await fetchFromApi(API_ENDPOINTS.UPLOAD_FILE, "POST", data, {'Content-Type': 'multipart/form-data'});
}
