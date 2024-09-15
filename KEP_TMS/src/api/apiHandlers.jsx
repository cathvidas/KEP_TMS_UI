
const handleApiResponse = async (
  actionType,
  apiFunction,
  successAction,
  erroMessage
) => {
  try {
    const response = await apiFunction();
    if (response) {
      console.log("success")
      return true;
    }
    else{
      console.log("error")
      return false
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
export default handleApiResponse;
