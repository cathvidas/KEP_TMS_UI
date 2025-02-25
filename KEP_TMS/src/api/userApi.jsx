import fetchFromApi from "./apiUtil";
export const checkUserCredentials = async (LoginCredentials) => {
  return await fetchFromApi("/Users/Login", "POST", LoginCredentials);
};
export const getAllUsersApi = async (pageNumber, pageSize, searchValue) => {
  if (searchValue) {
    return await fetchFromApi(
      `/Users/GetUsers?pageNumber=${pageNumber}&pageSize=${pageSize}&searchValue=${searchValue}`
    );
  }
  return await fetchFromApi(
    `/Users/GetUsers?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );
};
export const getUsersByRoleApi = async (pageNumber, pageSize,role, searchValue) => {
  if (searchValue) {
    return await fetchFromApi(
      `/Users/GetUsersByRole?pageNumber=${pageNumber}&pageSize=${pageSize}&Role=${role}&SearchValue=${searchValue}`
    );
  }
  return await fetchFromApi(
      `/Users/GetUsersByRole?pageNumber=${pageNumber}&pageSize=${pageSize}&Role=${role}`
  );
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
export const GetUserTotalAccumulatedHoursApi = async (id) => {
  return await fetchFromApi(`Users/GetTotalAccumulatedHours?EmployeeBadge=${id}`);
};

