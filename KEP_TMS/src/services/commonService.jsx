import { getAllDepartmentsApi, getAllRolesApi } from "../api/commonApi";

const commonService = {
    getAllServices: async () =>{
        const response = await getAllDepartmentsApi();
        return response.status === 1 ? response?.data : [];
    },
    getAllRoles: async () =>{
        const response = await getAllRolesApi();
        return response.status === 1 ? response?.data : [];
    }
}

export default commonService;