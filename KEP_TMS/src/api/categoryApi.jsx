import { API_ENDPOINTS } from "./apiEndpoints";
import fetchFromApi from "./apiUtil";

export const getAllCategoriesApi = async () => {
    return await fetchFromApi(API_ENDPOINTS.GET_TRAINING_CATEGORIES);
}
export const getCategoryApi = async (categoryId) => {
    return await fetchFromApi(`${API_ENDPOINTS.GET_TRAINING_CATEGORY_BY_ID}?id=${categoryId}`);
}
export const createCategoryApi = async (data)=>{
    return await fetchFromApi(API_ENDPOINTS.INSERT_TRAINING_CATEGORY, "POST", data);
}
export const updateCategoryApi =async (data)=>{
    return await fetchFromApi(API_ENDPOINTS.UPDATE_TRAINING_CATEGORY, "PUT", data);
}
export const deleteCategoryApi =async(id) =>{
    return await fetchFromApi(`${API_ENDPOINTS.DELETE_TRAINING_CATEGORY}?id=${id}`, "DELETE");
}