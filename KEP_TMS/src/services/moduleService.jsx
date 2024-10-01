import { createModuleApi, getModulesByRequestIdApi } from "../api/moduleApi";

const moduleService = {
    getModulesByRequestId: async (id) => {
        const response = await getModulesByRequestIdApi(id);
        return response.data;
    },
    getModule: async (id) => {
        const response = await fetch(`http://localhost:3000/modules/${id}`);
        const data = await response.json();
        return data;
    },
    createModule: async (module) => {
        const response = await createModuleApi(module);
        return response.data
    }
}
export default moduleService;