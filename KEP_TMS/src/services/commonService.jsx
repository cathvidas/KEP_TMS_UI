import { disapproveActivityApi, getActivityApproversApi, getAllDepartmentsApi, getAllEmployeeTypesApi, getAllPositionsApi, getAllRolesApi, getApprovedFormsApi, getAuditTrailApi, getFaciliatorRatingApi, getRoutingActivityWithAuditTrailApi, rerouteApproverApi } from "../api/commonApi";
import routingService from "./common/routingService";
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
  getActivityApprovers: async (id, activityIn) => {
    const response = id && activityIn && await getActivityApproversApi(id, activityIn);
    return response;
  },
  getCurrentRouting: async (transactId, activityIn) => {
    try {
      const response = await getRoutingActivityWithAuditTrailApi(
        transactId,
        activityIn
      );
      const current = routingService.getCurrentApprover(response);
      if(current){
        const userData = await userService.getUserById(current?.assignedTo)
        return {...current, assignedDetail: userData};
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
  getFacilitatorRating: async (reqId, userId) => {
    const response = await getFaciliatorRatingApi(reqId, userId);
    return response.status === 1 ? response?.data : null;
  },
  rerouteApprover: async (data) => {
    const response = await rerouteApproverApi(data);
    if (response.status !== 1) {
      throw new Error(response.message);
    }
    return response;
  },
};

export default commonService;