
import { Toast } from "../components/SweetToast";

const validateLogin = (userId, password) => {
    let result = true;
    if (
      (userId === "" || userId === null) &&
      (password === "" || password === null)
    ) {
      result = false;
      Toast.fire({
        icon: "warning",
        title: "Please Enter Credentials",
      });
    } else if (userId === "" || userId === null) {
      result = false;
      Toast.fire({
        icon: "warning",
        title: "Please Enter Your Badge",
      });
    } else if (password === "" || password === null) {
      result = false;
      Toast.fire({
        icon: "warning",
        title: "Please Enter Password",
      });
    }
    return result;
  };
export default validateLogin;