import { API_ENDPOINTS } from "./apiEndpoints"
import fetchFromApi from "./apiUtils"

export const getTrainingPrograms = async () => {
    return await fetchFromApi(API_ENDPOINTS.GET_TRAINING_PROGRAMS);
}

export const getTrainingCategories = async () => {
    return await fetchFromApi(API_ENDPOINTS.GET_TRAINING_CATEGORIES);
}

export const getTrainingParticipants = async (programId) => {
    return await fetchFromApi(`${API_ENDPOINTS.GET_TRAINING_PARTICIPANTS}/${programId}`);
}

export const getTrainingFacilitators = async (programId) => {
    return await fetchFromApi(`${API_ENDPOINTS.GET_TRAINING_FACILITATORS}/${programId}`);
}

export const getTrainingDates = async (programId) => {
    return await fetchFromApi(`${API_ENDPOINTS.GET_TRAINING_DATES}/${programId}`);
}

export const getTrainingEvaluations = async (programId) => {
    return await fetchFromApi(`${API_ENDPOINTS.GET_TRAINING_EVALUATIONS}/${programId}`);
}

export const getTrainingEffectiveness = async (programId) => {
    return await fetchFromApi(`${API_ENDPOINTS.GET_TRAINING_EFFECTIVENESS}/${programId}`);
}

export const getTrainingReports = async (programId) => {
    return await fetchFromApi(`${API_ENDPOINTS.GET_TRAINING_REPORTS}/${programId}`);
}

export const getTrainingFeedbacks = async (programId) => {
    return await fetchFromApi(`${API_ENDPOINTS.GET_TRAINING_FEEDBACKS}/${programId}`);
}

export const getTrainingOutcomes = async (programId) => {
    return await fetchFromApi(`${API_ENDPOINTS.GET_TRAINING_OUTCOMES}/${programId}`);
}

export const getTrainingProgress = async (programId) => {
    return await fetchFromApi(`${API_ENDPOINTS.GET_TRAINING_PROGRESS}/${programId}`);
}

export const getTrainingEvaluationResults = async (programId) => {
    return await fetchFromApi(`${API_ENDPOINTS.GET_TRAINING_EVALUATION_RESULTS}/${programId}`);
}

export const getTrainingEvaluationQuestions = async (programId) => {
    return await fetchFromApi(`${API_ENDPOINTS.GET_TRAINING_EVALUATION_QUESTIONS}/${programId}`);
}
