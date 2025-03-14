
import { Toast } from "../components/SweetToast";
import { checkUserCredentials } from "../api/userApi";
import { SessionSetReference } from "./sessions";
import handleResponseAsync from "./handleResponseAsync";
import userService from "./userService";
export const handleSetPassword = async (data) => {
  let response = true;
  handleResponseAsync(
    () => userService.setPassword(data),
    (res) => {
      Toast.fire({
        icon: "success",
        title: res?.message ?? res,
      });
      response = true;
    },
    (err) => {
      Toast.fire({
        icon: "error",
        title: err?.message ?? err,
      });
      response = false;
    }
  );
  return response;
};
const handleUserLogin = async (data) => {
  try {
    var res = await checkUserCredentials(data);
    if (res.isSuccess === true) {
      const data = res.data;
      if (res.status === 201) {
        Toast.fire({
          icon: "warning",
          title: res?.message,
        });
        return res;
      }
      SessionSetReference(data);
      return true;
    } else {
      Toast.fire({
        icon: "error",
        title: res?.message,
      });
    }

  } catch (err) {
    if (err.code === "ERR_NETWORK") {
      Toast.fire({
        icon: "error",
        title: err.message,
      });
    } else {
      Toast.fire({
        icon: "error",
        title: err,
      });
    }
  }
};
export default handleUserLogin;
