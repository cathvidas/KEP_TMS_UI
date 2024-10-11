import { createCategoryApi, deleteCategoryApi, getAllCategoriesApi, getCategoryApi, updateCategoryApi } from "../api/categoryApi";

const categoryService ={
    getAllCategories: async () => {
        const response = await getAllCategoriesApi();
        return response.status === 1 ? response?.data : [];
    },
    getCategoryById: async (id) => {
        const response = await getCategoryApi(id);
        return response.status === 1 ? response?.data : {};
    },
    createCategory: async (data) => {
        const response = await createCategoryApi(data);
        if(response.status !== 1){
          throw new Error(response.message);
        }
        return response?.data;
    },
    updateCategory: async (data) => {
        const response = await updateCategoryApi(data);
        if(response.status !== 1){
          throw new Error(response.message);
        }
        return response?.data;
    },
    deleteCategory: async (id) => {
        const response = await deleteCategoryApi(id);
        if(response.status !== 1){
          throw new Error(response.message);
        }
        return response?.data;
    },
}
export default categoryService;