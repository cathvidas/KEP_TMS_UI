import { API_ENDPOINTS } from "./apiEndpoints"
import fetchFromApi from "./apiUtils"

export const checkUserCredentials= async  (LoginCredentials) => {
return await fetchFromApi(API_ENDPOINTS.USER_LOGIN, "POST", LoginCredentials)
} 