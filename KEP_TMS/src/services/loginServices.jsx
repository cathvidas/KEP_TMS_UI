
import { Toast } from "../components/SweetToast";
import { checkUserCredentials } from "../api/UserAccountApi";

const handleUserLogin = async (data) => {
  try {
    var res = await checkUserCredentials(data);
    if (res.isSuccess === true) {
      const data = res.data;
      console.log(data);
      sessionStorage.setItem("fullname", data.fullname);
      sessionStorage.setItem("username", data.username);
      sessionStorage.setItem("firstname", data.firstname);
      sessionStorage.setItem("lastname", data.lastname);
      sessionStorage.setItem("token", data.token);
      return true
    } else{  
        Toast.fire({
          icon: "error",
          title: res.message,
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
