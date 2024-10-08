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
    return response;
  },
  getAllTrainingReports: async () => {
    const response = await getAllTrainingReportsApi();
    return response;
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
    return response;
  }
};
export default trainingReportService;
