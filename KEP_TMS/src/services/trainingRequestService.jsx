import { getTrainingRequestApi, updateTrainingRequestApi } from "../api/trainingRequestApi"

const trainingRequestService ={
    getAllTrainingRequests: async ()=>{
        const response = await getTrainingRequestApi()
        return response;
    },
    getTrainingRequest: async (id)=>{
        const response = await getTrainingRequestApi(id)
        return response.data;
    },
    updateTrainingRequest: async (data)=>{
        const response = await updateTrainingRequestApi(data)
        return response;
    },
    // deleteTrainingRequest: async ()=>{
    //     const response = await deleteTrainingRequestApi(id)
    //     return response;
    // }
    
}
export default trainingRequestService;