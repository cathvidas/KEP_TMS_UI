import { createExamApi, getExamByRequestIdApi } from "../api/examApi";

const examService ={
    createExam: async (data)=>{
        const response = await createExamApi(data);
        return response.data;
    },
    getExamByRequestId: async (id)=>{
        const response = await getExamByRequestIdApi(id);
        return response.data;
    }
}
export default examService;