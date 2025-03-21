import fetchFromApi from "./apiUtil";

export const getProviderById = async (id) => {
  return await fetchFromApi(
    `TrainingProvider/GetTrainingProviderById?id=${id}`
  );
};
export const getAllProvidersApi = async () => {
  return await fetchFromApi("TrainingProvider/GetAllTrainingProviders");
};
export const createProviderApi = async (data) => {
  return await fetchFromApi(
    "TrainingProvider/CreateTrainingProvider",
    "POST",
    data
  );
};
export const updateProviderApi = async (data) => {
  return await fetchFromApi(
    "TrainingProvider/UpdateTrainingProvider",
    "PUT",
    data
  );
};
export const deleteProviderApi = async (id) => {
  return await fetchFromApi(
    `TrainingProvider/DeleteTrainingProvider?id=${id}`,
    "DELETE"
  );
};

export const getPagedProviderApi = async (pageNumber, pageSize, searchValue) => {
  let url = `/TrainingProvider/GetPaged?pageNumber=${pageNumber}&pageSize=${pageSize}`
  if (searchValue) {
    url += `&searchValue=${searchValue}`;
  }
  return await fetchFromApi(url);
};
