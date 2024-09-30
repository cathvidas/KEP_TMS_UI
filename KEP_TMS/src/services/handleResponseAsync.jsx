import { actionFailed, actionSuccessful } from "./sweetalert";

const handleResponseAsync = async (
  apiFunction,
  onSuccess,
  onError, onFinish
) => {
  try {
    const response = await apiFunction();
      if (onSuccess) {
        onSuccess(response);
      } else {
        actionSuccessful("Success", "successss");
      }
    
  } catch (error) {
    if(onError){
      onError(error)
    }else{
      actionFailed("Error", error.message)
    }
  } finally{
    if(onFinish){
      onFinish()
    }
  }
};
export default handleResponseAsync;
