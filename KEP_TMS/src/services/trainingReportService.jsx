import { approveTrainingFormApi } from "../api/commonApi";
import {
  createTrainingReportApi,
  getAllTrainingReportsApi,
  getApproverAssignedReportsApi,
  getTrainingReportByIdApi,
} from "../api/trainingReportApi";

const trainingReportService = {
  createTrainingReport: async (data) => {
    const response = await createTrainingReportApi(data);
    if(response.status !== 1){
      throw new Error(response.message);
    }
    return response?.data;
  },
  getAllTrainingReports: async () => {
    const response = await getAllTrainingReportsApi();
    return response?.status === 1? response?.data: [];
  },
  getTrainingReportById: async (id) => {
    const response = await getTrainingReportByIdApi(id);
    return response?.status === 1? response?.data: {};
  },
  getApproverAssignedReports: async (id) => {
    const response = await getApproverAssignedReportsApi(id);
    return response;
  },
  approveTrainingReport: async (data)=>{
    const response = await approveTrainingFormApi(data);
    if(response.status !== 1){
      throw new Error(response.message);
    }
    return response?.data;
  }
};
export default trainingReportService;
