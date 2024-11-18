import fetchFromApi from "./apiUtil";

export const createExternalFacilitatorApi = async (data) => {
  return await fetchFromApi(`/ExternalFacilitator/Add`, "POST", data);
};
export const updateExternalFacilitatorApi = async (data) => {
  return await fetchFromApi(`/ExternalFacilitator/Update`, "PUT", data);
};
export const getExternalFacilitatorByIdApi = async (id) => {
  return await fetchFromApi(`/ExternalFacilitator/GetById?id=${id}`);
};
export const getPagedExternalFacilitatorApi = async (
  pageNumber,
  pageSize,
  searchValue
) => {
  if (searchValue) {
    return await fetchFromApi(
      `/ExternalFacilitator/GetPaged?pageNumber=${pageNumber}&pageSize=${pageSize}&searchValue=${searchValue}`
    );
  }
  return await fetchFromApi(
    `/ExternalFacilitator/GetPaged?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );
};
export const deleteExternalFacilitatorApi = async (id) => {
  return await fetchFromApi(`/ExternalFacilitator/Delete?id=${id}`, "DELETE");
};
