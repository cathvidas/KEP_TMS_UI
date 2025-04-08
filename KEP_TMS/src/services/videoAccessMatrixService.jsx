import { CreateVideoAccessMatrixApi, DeleteVideoAccessMatrixApi, GetAllVideoAccessMatrixApi, GetVideoAccessMatrixApi, UpdateVideoAccessMatrixApi } from "../api/videoAccessMatrixApi";

const videoAccessMatrixService = {
    createVideoAccessMatrix: async (data) => {
        const response = await CreateVideoAccessMatrixApi(data);
        if (response.status !== 1) {
          throw new Error(response.message);
        }
        return response;
      },
      updateVideoAccessMatrix: async (data) => {
        const response = await UpdateVideoAccessMatrixApi(data);
        if (response.status !== 1) {
          throw new Error(response.message);
        }
        return response;
      },
      getVideoAccessMatrix: async (id) => {
        const response = await GetVideoAccessMatrixApi(id);
        return response?.status === 1 ? response.data : null;
      },
      getAllVideoAccessMatrix: async () => {
        const response = await GetAllVideoAccessMatrixApi();
        return response?.status === 1 ? response.data : [];
      },
      deleteVideoAccessMatrix: async (data) => {
        const response = await DeleteVideoAccessMatrixApi(data);
        return response?.status === 1 ? response.data : [];
      },
}
export default videoAccessMatrixService;