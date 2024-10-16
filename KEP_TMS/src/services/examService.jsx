import { createExamApi, getExamByRequestIdApi, getTraineeExamApi, saveTraineeExamApi } from "../api/examApi";

const examService ={
    createExam: async (data)=>{
        const response = await createExamApi(data);
        if(response.status !== 1){
          throw new Error(response.message);
        }
        return response?.data;
    },
    getExamByRequestId: async (id)=>{
        const response = await getExamByRequestIdApi(id);
        return response?.status === 1 ? response?.data : [];
    },
    saveTraineeExam: async(data)=>{
        const response = await saveTraineeExamApi(data);
        if(response.status!== 1){
            throw new Error(response.message);
        }
        return response?.data;
    },
    getTraineeExam: async(id)=>{
        const response = await getTraineeExamApi(id);
        return response?.status === 1? response?.data : {};
    }
}
export default examService;