import { API_ENDPOINTS } from "./apiEndpoints"
import fetchFromApi from "./apiUtils"

export const checkUserCredentials= async  (LoginCredentials) => {
return await fetchFromApi(API_ENDPOINTS.USER_LOGIN, "POST", LoginCredentials)
} 

export const getAllUsers = async () =>{
    return await fetchFromApi(API_ENDPOINTS.GET_USERS);
}


export const getUserById = async (id) =>{
    return await fetchFromApi(`${API_ENDPOINTS.GET_USER_BY_ID}?id=${id}`);
}