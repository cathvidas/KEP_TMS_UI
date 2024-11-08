import { disapproveActivityApi, getActivityApproversApi, getAllDepartmentsApi, getAllEmployeeTypesApi, getAllPositionsApi, getAllRolesApi, getApprovedFormsApi, getAuditTrailApi, getCurrentRoutingActivityApi, getRoutingActivityWithAuditTrailApi, sendEmailApi } from "../api/commonApi";
import userMapping from "./DataMapping/userMapping";
import userService from "./userService";

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
      const response = activityIn &&
        transactId && (await getAuditTrailApi(transactId, activityIn));
      return response.status === 1 ? response?.data : {};
    } catch {
      return {};
    }
  },
  getActivityApprovers: async (id, activityIn, requestTotalCost) => {
    const response = id && activityIn && await getActivityApproversApi(id, activityIn, requestTotalCost);
    if (response?.status === 1) {
      const updatedData = await Promise.all(
        response?.data?.map(async (item) => {
          return await userService.getUserById(item?.employeeBadge);
        })
      );
      return updatedData;
    }
    return [];
  },
  getCurrentRouting: async (transactId, activityIn) => {
    try {
      const response = await getCurrentRoutingActivityApi(
        transactId,
        activityIn
      );
      if(response){
        const userData = await userService.getUserById(response?.assignedTo)
        return {...response, assignedDetail: userData};
      }
      return response;
    } catch {
      return {};
    }
  },
  getRoutingActivityWithAuditTrail: async (transactId, activityIn) => {
    try {
      const response =
        transactId &&
        (await getRoutingActivityWithAuditTrailApi(transactId, activityIn));
        if(response){
          const updatedData =userMapping.mapUserIdList(response, "assignedTo", null, true);
          return updatedData;
        }
    } catch {
      return [];
    }
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
  sendEmail: async (data) => {
    const response = await sendEmailApi(data);
    return response.status === 1 ? response?.data : [];
  },
};

export default commonService;