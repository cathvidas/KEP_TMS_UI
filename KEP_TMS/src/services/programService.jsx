import { createProgramApi, deleteProgramApi, getAllProgramsApi, getProgramApi } from "../api/programApi";

const programService ={
    getAllPrograms: async () => {
        const response = await getAllProgramsApi();
        return response.data;
    },
    getProgramById: async (id) => {
        const response = await getProgramApi(id);
        return response.data;
    },
    createProgram: async (program) => {
        const response = await createProgramApi(program);
        return response;
    },
    deleteProgram: async (id) => {
        const response = await deleteProgramApi(id);
        return response;
    },
}
export default programService;