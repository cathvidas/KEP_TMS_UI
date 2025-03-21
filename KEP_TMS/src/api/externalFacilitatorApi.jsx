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
  let url = `/ExternalFacilitator/GetPaged?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  if (searchValue) {
    url += `&searchValue=${searchValue}`;
  }
  return await fetchFromApi(url);
};
export const deleteExternalFacilitatorApi = async (id) => {
  return await fetchFromApi(`/ExternalFacilitator/Delete?id=${id}`, "DELETE");
};
