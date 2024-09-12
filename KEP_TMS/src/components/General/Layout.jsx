import { useEffect, useState } from "react";
import RequestModal from "../Modal/RequestType";
import Sidebar from "./Sidebar";
import proptype from "prop-types";
import { useNavigate } from "react-router-dom";

const RenderLayout = ({ ActionComponent, showModal, setShowModal }) => {
  const [showmenu, setshowmenu] = useState(true);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  console.log(showModal);
  useEffect(() => {
    if (token != null) {
      setshowmenu(true);
    } else {
      navigate("*");
    }
  }, [token, navigate]);

  return (
    <>
      {showmenu && (
        <>
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1  px-3 px-md-4">
              {ActionComponent && <ActionComponent />}
            </div>
          </div>
          <RequestModal showModal={showModal} setShowModal={setShowModal} />
        </>
      )}
    </>
  );
};
RenderLayout.propTypes = {
  ActionComponent: proptype.func,
  showModal: proptype.bool,
  setShowModal: proptype.func,
};
export default RenderLayout;
