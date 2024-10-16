import { getAllDepartmentsApi, getAllEmployeeTypesApi, getAllPositionsApi, getAllRolesApi, getAuditTrailApi, getRoutingActivityWithAuditTrailApi } from "../api/commonApi";

const commonService = {
  getAllDepartments: async () => {
    const response = await getAllDepartmentsApi();
    return response.status === 1 ? response?.data : [];
  },
  getAllRoles: async () => {
    const response = await getAllRolesApi();
    return response.status === 1 ? response?.data : [];
  },
  getAllPositions: async () => {
    const response = await getAllPositionsApi();
    return response.status === 1 ? response?.data : [];
  },
  getAllEmployeeTypes: async () => {
    const response = await getAllEmployeeTypesApi();
    return response.status === 1 ? response?.data : [];
  },
  getAuditTrail: async (transactId, activityIn) => {
    try {
      const response = await getAuditTrailApi(transactId, activityIn);
      return response;
    } catch {
      return {};
    }
  },
  getRoutingActivityWithAuditTrail: async (transactId, activityIn) => {
      const response = await getRoutingActivityWithAuditTrailApi(transactId, activityIn);
      return response?.status === 1 ? response?.data : [];
  }
};

export default commonService;