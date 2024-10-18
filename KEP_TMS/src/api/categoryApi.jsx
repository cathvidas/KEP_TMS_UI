import fetchFromApi from "./apiUtil";

export const getAllCategoriesApi = async () => {
    return await fetchFromApi("/TrainingCategory/GetAllTrainingCategories");
}
export const getCategoryApi = async (categoryId) => {
    return await fetchFromApi(`/TrainingCategory/GetTrainingCategoryById?id=${categoryId}`);
}
export const createCategoryApi = async (data)=>{
    return await fetchFromApi("/TrainingCategory/CreateTrainingCategory", "POST", data);
}
export const updateCategoryApi =async (data)=>{
    return await fetchFromApi("/TrainingCategory/UpdateTrainingCategory", "PUT", data);
}
export const deleteCategoryApi =async(id) =>{
    return await fetchFromApi(`/TrainingCategory/DeleteTrainingCategory?id=${id}`, "DELETE");
}