import { createProgramApi, deleteProgramApi, getAllProgramsApi, getProgramApi, updateProgramApi } from "../api/programApi";

const programService ={
    getAllPrograms: async () => {
        const response = await getAllProgramsApi();
        return response?.status === 1 ? response?.data: [];
    },
    getProgramById: async (id) => {
        const response = await getProgramApi(id);
        return response?.status === 1 ? response?.data: {};
    },
    createProgram: async (program) => {
        const response = await createProgramApi(program);
        if(response.status !== 1){
          throw new Error(response.message);
        }
        return response?.data;
    },
    updateProgram: async (program) => {
        const response = await updateProgramApi(program);
        if(response.status !== 1){
          throw new Error(response.message);
        }
        return response?.data;
    },
    deleteProgram: async (id) => {
        const response = await deleteProgramApi(id);
        if(response.status !== 1){
          throw new Error(response.message);
        }
        return response?.data;
    },
}
export default programService;