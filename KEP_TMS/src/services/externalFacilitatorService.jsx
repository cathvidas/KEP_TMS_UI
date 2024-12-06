import {
  createExternalFacilitatorApi,
  deleteExternalFacilitatorApi,
  getExternalFacilitatorByIdApi,
  getPagedExternalFacilitatorApi,
  updateExternalFacilitatorApi,
} from "../api/externalFacilitatorApi";

const externalFacilitatorService = {
  getExternaFacilitatorById: async (id) => {
    const response = id && await getExternalFacilitatorByIdApi(id);
    return response?.status === 1 ? response?.data : {};
  },
  getPagedExternaFacilitator: async (pageNumber, pageSize, searchValue) => {
    try {
      const response = await getPagedExternalFacilitatorApi(
        pageNumber,
        pageSize,
        searchValue
      );
      return response;
    } catch {
      return {};
    }
  },
  getAllExternaFacilitators: async () => {
    const list = [];
    let page = 1;
    while(true){
        const response = await externalFacilitatorService.getPagedExternaFacilitator(page, 100,);
        list.push(...response.results);
        if (response.results.length < 100) {
            break;
          }
          page++;
    }
    return list;
  },
  createExternalFacilitator: async (data) => {
    const response = await createExternalFacilitatorApi(data);
    if (response.status !== 1) {
      throw new Error(response.message);
    }
    return response;
  },
  updateExternalFacilitator: async (data) => {
    const response = await updateExternalFacilitatorApi(data);
    if (response.status !== 1) {
      throw new Error(response.message);
    }
    return response;
  },
  deleteExternalFacilitator: async (id) => {
    const response = await deleteExternalFacilitatorApi(id);
    return response?.status === 1 ? response?.data : {};
  },
};
export default externalFacilitatorService;
