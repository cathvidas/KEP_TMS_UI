import apiClient from "../api/apiClient";

const fetchFromApi = async (endpoint, method = "GET", data = null) => {
    try{
        const config ={
            method,
            url: endpoint,
            data,
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await apiClient(config);
        return response.data;
    } catch(error){
        console.error(`Error fetching data from API: ${error.message}`);
        throw error;
    }
}
export default fetchFromApi;