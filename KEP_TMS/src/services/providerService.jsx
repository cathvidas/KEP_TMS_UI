import { createProviderApi, deleteProviderApi, getAllProvidersApi, getProviderById, updateProviderApi } from "../api/providerApi"

const providerService ={
    getProviderById: async (id)=>{
        const response = await getProviderById(id);
        return response;
    },
    getAllProviders: async ()=>{
        const response = await getAllProvidersApi();
        return response;
    },
    updateProvider: async (data)=>{
        const response = await updateProviderApi(data);
        return response;
    },
    createProvider: async (data)=>{
        const response = await createProviderApi(data);
        return response;
    },
    deleteProvider: async (id)=>{
        const response = await deleteProviderApi(id);
        return response;
    }
}
export default providerService;