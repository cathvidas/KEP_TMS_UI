
const handleApiResponse = (
  actionType,
  apiFunction,
  successMessage,
  erroMessage
) => {
  let list = [];
  try {
    const response = apiFunction();
    if (response) {
      response.then((res) => {
        res.forEach((data) => {
          if (actionType) {
            list.push(actionType(data));
          } else {
            list.push(data);
          }
        });
      });
    }
    {
      successMessage && console.log(successMessage);
    }
    return list;
  } catch (error) {
    console.log(erroMessage && erroMessage, error);
    return[]
  }
};
export default handleApiResponse;
