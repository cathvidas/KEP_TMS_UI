import { API_ENDPOINTS } from "./apiEndpoints"
import fetchFromApi from "./apiUtil"

export const checkUserCredentials= async  (LoginCredentials) => {
return await fetchFromApi(API_ENDPOINTS.USER_LOGIN, "POST", LoginCredentials)
} 

export const getAllUsersApi = async () =>{
    return await fetchFromApi(API_ENDPOINTS.GET_USERS);
}


export const getUserApi = async (id) =>{
    return await fetchFromApi(`${API_ENDPOINTS.GET_USER_BY_ID}?badge=${id}`);
}

export const getUserNameByUserId = async (id) =>{
    const user = await getUserApi(id);
    return user.username;
}
export const createUserApi = async (data)=>{
    return await fetchFromApi(API_ENDPOINTS.CREATE_USER, "POST", data);
}
export const updateUserApi = async (data)=>{
    return await fetchFromApi(API_ENDPOINTS.UPDATE_USER, "PUT", data);
}