
const handleApiResponse = (
  actionType,
  apiFunction,
  params,
  successMessage,
  erroMessage
) => {
  var list = [];
  try {
    var response = apiFunction();
    if (response) {
      response.then((res) => {
        res.forEach((data) => {
          if (actionType) {
            list.push(actionType(data));
          } else {
            list.push({data});
          }
        });
      });
    }
    {
      successMessage && console.log(successMessage);
    }
  } catch (error) {
    console.log(erroMessage && erroMessage, error);
  }
  return list;
};
export default handleApiResponse;
