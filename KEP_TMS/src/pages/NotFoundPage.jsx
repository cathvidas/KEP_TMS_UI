import { Button } from "primereact/button";
import { SessionGetToken } from "../services/sessions";
import { useNavigate } from "react-router-dom";
import { APP_DOMAIN } from "../api/constants";

const NotFoundPage = () => {
    const navigate = useNavigate();
  return (
    <div className="w-100 vh-100 d-flex justify-content-center align-items-center ">
      <div className="text-center">
        <h1 className="opacity-50">Page Not Found!</h1>
        <Button
        type="button"
          text
          label={SessionGetToken() ? "Go Back to Home" : "Go to Login page"}
          onClick={() =>
            SessionGetToken()
              ? navigate(APP_DOMAIN + "/dashboard")
              : navigate(APP_DOMAIN)
          }
        />
      </div>
    </div>
  );
};
export default NotFoundPage;
