import apiClient from "./apiClient";

const fetchFromApi = async (endpoint, method = "GET", data = null,  header = null) => {

  //  console.log(endpoint, method, data);
    try{
        const config ={
            method,
            url: endpoint,
            data,
            headers: header != null ? header :{
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