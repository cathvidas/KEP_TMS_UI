import { craeteModuleApi } from "../api/moduleApi";

const moduleService = {
    getModules: async () => {
        const response = await fetch('http://localhost:3000/modules');
        const data = await response.json();
        return data;
    },
    getModule: async (id) => {
        const response = await fetch(`http://localhost:3000/modules/${id}`);
        const data = await response.json();
        return data;
    },
    createModule: async (module) => {
        const response = await craeteModuleApi(module);
        return response.data
    }
}
export default moduleService;