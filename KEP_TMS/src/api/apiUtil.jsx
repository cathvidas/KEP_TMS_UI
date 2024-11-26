import apiClient from "./apiClient";

const fetchFromApi = async (endpoint, method = "GET", data = null,  header = null) => {
    try{
        const config ={
            method,
            url: endpoint,
            data,
            headers: header != null ? header :{
                'Content-Type': 'application/json',
            },
        }
        // console.log(config)
        const response = await apiClient(config);
        return response.data;
    } catch(error){
        console.error(`Error fetching data from API: ${error}`);
        throw error;
    }
}
export default fetchFromApi;