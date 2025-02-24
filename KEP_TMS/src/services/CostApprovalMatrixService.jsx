import { CreateCostApprovalMatrixApi, GetAllCostApprovalMatrixApi, GetCostApprovalMatrixApi, UpdateCostApprovalMatrixApi } from "../api/CostApprovalMatrixApi";

const CostApprovalMatrixService = {
    createCostApprovalMatrix: async (data) => {
        const response = await CreateCostApprovalMatrixApi(data);
        if (response.status !== 1) {
          throw new Error(response.message);
        }
        return response;
      },
      updateCostApprovalMatrix: async (data) => {
        const response = await UpdateCostApprovalMatrixApi(data);
        if (response.status !== 1) {
          throw new Error(response.message);
        }
        return response;
      },
      getCostApprovalMatrix: async (id) => {
        const response = await GetCostApprovalMatrixApi(id);
        return response?.status === 1 ? response.data : null;
      },
      getAllCostApprovalMatrix: async (id) => {
        const response = await GetAllCostApprovalMatrixApi(id);
        return response?.status === 1 ? response.data : [];
      },
}
export default CostApprovalMatrixService;