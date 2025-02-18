
import { Toast } from "../components/SweetToast";
import { checkUserCredentials } from "../api/userApi";
import { SessionSetReference } from "./sessions";

const handleUserLogin = async (data) => {
  try {
    var res = await checkUserCredentials(data);
    if (res.isSuccess === true) {
      const data = res.data;
      SessionSetReference(data);
      return true;
    } else {
      Toast.fire({
        icon: "error",
        title: "Incorrect user Id or password. Please try again.",
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
