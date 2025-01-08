import fetchFromApi from "./apiUtil";
export const checkUserCredentials = async (LoginCredentials) => {
  return await fetchFromApi("/Users/Login", "POST", LoginCredentials);
};
export const getAllUsersApi = async () => {
  return await fetchFromApi("/Users/GetAllUsers");
};
export const getUserApi = async (id) => {
  return await fetchFromApi(`/Users/GetUserById?badge=${id}`);
};
export const getUserNameByUserId = async (id) => {
  const user = await getUserApi(id);
  return user.username;
};
export const createUserApi = async (data) => {
  return await fetchFromApi("/Users/CreateUser", "POST", data);
};
export const updateUserApi = async (data) => {
  return await fetchFromApi("/Users/UpdateUser", "PUT", data);
};

//KEP Common

export const getpagedEmployeesApi = async (pageNumber, pageSize, searchValue) => {
  if (searchValue) {
    return await fetchFromApi(
      `/Users/GetPagedEmployees?pageNumber=${pageNumber}&pageSize=${pageSize}&searchValue=${searchValue}`
    );
  }
  return await fetchFromApi(
    `/Users/GetPagedEmployees?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );
};