import { createModuleApi, deleteModuleApi, getModulesByRequestIdApi } from "../api/moduleApi";

const moduleService = {
    getModulesByRequestId: async (id) => {
        const response = await getModulesByRequestIdApi(id);
        return response?.status === 1 ?response.data : {};
    },
    createModule: async (module) => {
        const response = await createModuleApi(module);
        if(response.status !== 1){
          throw new Error(response.message);
        }
        return response?.data;
    },
    deleteModule: async (id) => {
        const response = await deleteModuleApi(id)     
        if(response.status !== 1){
            throw new Error(response.message);
          }
        return response;
    }
}
export default moduleService;