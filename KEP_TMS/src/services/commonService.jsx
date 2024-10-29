import { disapproveActivityApi, getAllDepartmentsApi, getAllEmployeeTypesApi, getAllPositionsApi, getAllRolesApi, getApprovedFormsApi, getAuditTrailApi, getCurrentRoutingActivityApi, getRoutingActivityWithAuditTrailApi } from "../api/commonApi";

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
      const response =
        transactId && (await getAuditTrailApi(transactId, activityIn));
      return response.status === 1 ? response?.data : {};
    } catch {
      return {};
    }
  },
  getCurrentRouting: async (transactId, activityIn) => {
    try {
      const response = await getCurrentRoutingActivityApi(transactId, activityIn);
      return response;
    } catch {
      return {};
    }
  },
  getRoutingActivityWithAuditTrail: async (transactId, activityIn) => {
    const response =
      transactId &&
      (await getRoutingActivityWithAuditTrailApi(transactId, activityIn));
    return response?.status === 1 ? response?.data : [];
  },
  getApprovedForms: async (assignedTo, activityIn) => {
    const response = await getApprovedFormsApi(assignedTo, activityIn);
    return response.status === 1 ? response?.data : [];
  },
  disapproveActivity: async (data) => {
    const response = await disapproveActivityApi(data);
    if (response.status !== 1) {
      throw new Error(response.message);
    }
    return response;
  },
};

export default commonService;