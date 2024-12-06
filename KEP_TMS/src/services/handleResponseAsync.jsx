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
        actionSuccessful("Success!", response.message);
      }
    
  } catch (error) {
    if(onError){
      onError(error)
    }else{
      actionFailed("Error", error.message ?? "Something went wrong")
    }
  } finally{
    if(onFinish){
      onFinish()
    }
  }
};
export default handleResponseAsync;
