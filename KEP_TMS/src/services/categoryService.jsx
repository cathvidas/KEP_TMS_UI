import { createCategoryApi, deleteCategoryApi, getAllCategoriesApi, getCategoryApi, updateCategoryApi } from "../api/categoryApi";

const categoryService ={
    getAllCategories: async () => {
        const response = await getAllCategoriesApi();
        return response.data;
    },
    getCategoryById: async (id) => {
        const response = await getCategoryApi(id);
        return response.data;
    },
    createCategory: async (data) => {
        const response = await createCategoryApi(data);
        return response;
    },
    updateCategory: async (data) => {
        const response = await updateCategoryApi(data);
        return response;
    },
    deleteCategory: async (id) => {
        const response = await deleteCategoryApi(id);
        return response;
    },
}
export default categoryService;