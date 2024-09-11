const handleApiAction = async (actionType, apiFunction, params, successMessage, erroMessage) => {
    try{
        var  response = await apiFunction();
        actionType(response.data);

        console.error(successMessage && successMessage);
    }
    catch(error){
        console.error(erroMessage && erroMessage,error);
    }
}
export default handleApiAction