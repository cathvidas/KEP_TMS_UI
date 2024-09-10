const handleApiAction = async (actionType, apiFunction, params, successMessage, erroMessage) => {
    try{
        await apiFunction(params);
        console.error(successMessage);
    }
    catch(error){
        console.error(erroMessage,error);
    }
}
export default handleApiAction