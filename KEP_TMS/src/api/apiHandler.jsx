
const handleApiResponse = async (
  apiFunction,
  onSuccess,
  onError, onFinish
) => {
  try {
    const response = await apiFunction();
    if (onSuccess) {
      onSuccess(response);
    }
  } catch (error) {
    if(onError){
      onError(error)
    }
  } finally{
    if(onFinish){
      onFinish()
    }
  }
};
export default handleApiResponse;
