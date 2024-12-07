import { createProviderApi, deleteProviderApi, getAllProvidersApi, getPagedProviderApi, getProviderById, updateProviderApi } from "../api/providerApi"

const providerService ={
    getProviderById: async (id)=>{
        const response = await getProviderById(id);
        return response?.status === 1 ? response?.data:{};
    },
    getAllProviders: async ()=>{
        const response = await getAllProvidersApi();
        return response?.status === 1 ? response?.data: [];
    },
    getPagedProviders: async (pageNumber, pageSize, searchValue) => {
      try {
        const response = await getPagedProviderApi(
          pageNumber,
          pageSize,
          searchValue
        );
        return response;
      } catch {
        return {};
      }
    },
    updateProvider: async (data)=>{
        const response = await updateProviderApi(data);
        if(response.status !== 1){
          throw new Error(response.message);
        }
        return response?.data;
    },
    createProvider: async (data)=>{
        const response = await createProviderApi(data);
        if(response.status !== 1){
          throw new Error(response.message);
        }
        return response?.data;
    },
    deleteProvider: async (id)=>{
        const response = await deleteProviderApi(id);
        if(response.status !== 1){
          throw new Error(response.message);
        }
        return response?.data;
    }
}
export default providerService;