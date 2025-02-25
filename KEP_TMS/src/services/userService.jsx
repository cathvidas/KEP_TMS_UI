import { createUserApi, getAllUsersApi, getUserApi, getUsersByRoleApi, GetUserTotalAccumulatedHoursApi, updateUserApi } from "../api/userApi";

const userService = {
  getAllUsers: async (pageNumber, pageSize, searchValue) => {
    try {
      const response = await getAllUsersApi(pageNumber, pageSize, searchValue);
      return response;
    } catch {
      return {};
    }
  },
  getUsersByRole: async (pageNumber, pageSize,role, searchValue) => {
      const response = await getUsersByRoleApi(pageNumber, pageSize,role, searchValue);
      return response;
  },
  getUserById: async (id) => {
    const response = await getUserApi(id);
    return response?.status === 1 ? response.data : {};
  },
  createUser: async (user) => {
    const response = await createUserApi(user);
    return response;
  },
  updateUser: async (user) => {
    const response = await updateUserApi(user);
    return response;
  },
  getUserTotalAccumulatedHours: async (id) => {
    const response = await GetUserTotalAccumulatedHoursApi(id);
    return response?.status === 1 ? response.data : {};
  },
};
export default userService;