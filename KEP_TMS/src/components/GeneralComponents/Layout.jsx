import { useEffect, useState } from "react";
import RequestModal from "../ModalsComponent/RequestType";
import Sidebar from "./Sidebar";
import proptype from "prop-types";
import { useNavigate } from "react-router-dom";

const RenderLayout = ({ ActionComponent }) => {
  const [showmenu, setshowmenu] = useState(true);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  // useEffect(() => {
  //   if (token != null) {
  //     setshowmenu(true);
  //   } else {
  //     navigate("*");
  //   }
  // }, [token, navigate]);

  return (
    <>
      {showmenu && (
        <>
          <Sidebar />
          <div
            className="flex-grow-1 px-3 px-md-4"
            style={{ marginLeft: "4.5rem" }}
          >
            {ActionComponent && <ActionComponent />}
          </div>
          <RequestModal />
        </>
      )}
    </>
  );
};
RenderLayout.propTypes = {
  ActionComponent: proptype.func,
};
export default RenderLayout;