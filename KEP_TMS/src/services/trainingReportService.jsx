import { createTrainingReportApi } from "../api/trainingReportApi"

const trainingReportService = {
    createTrainingReport: async (data) =>{
        const response = await createTrainingReportApi(data)
        console.log(response)
        return response;
    }
}
export default trainingReportService;