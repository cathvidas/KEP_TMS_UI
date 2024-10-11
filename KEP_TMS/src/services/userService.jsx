import { createUserApi, getAllUsersApi, getUserApi, updateUserApi } from "../api/userApi";

const userService ={
    getAllUsers: async()=>{
            const response = await getAllUsersApi();
            return response;
    },
    getUserById: async(id)=>{
            const response = await getUserApi(id);
            return response?.status === 1 ? response.data: {};
    },
    createUser: async(user)=>{
        const response = await createUserApi(user);
        return response;
    },
    updateUser: async(user)=>{
        const response = await updateUserApi(user);
        return response;
    }
}
export default userService;