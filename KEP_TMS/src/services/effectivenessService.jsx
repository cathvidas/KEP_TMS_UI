import { createTrainingEffectivenessApi, getEffectivenessByIdApi } from "../api/effectivenessApi";
import { getTrainingEffectiveness } from "../api/trainingServices";

const effectivenessService ={
    createTrainingEffectiveness: async (data) => {
        const response = await createTrainingEffectivenessApi(data);
        return response;
    },
    getEffectivenessById: async (id) =>{
        const response= await getEffectivenessByIdApi(id);
        return response;
    }
}
export default effectivenessService;