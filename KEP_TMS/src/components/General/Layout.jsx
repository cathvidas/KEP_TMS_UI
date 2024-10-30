import { useEffect, useState } from "react";
import RequestModal from "../Modal/RequestType";
import Sidebars from "./Sidebar";
import proptype from "prop-types";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Layout = ({
  BodyComponent,
  header,
  showMenu,
  showModalAction,
  returnAction,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showmenu, setshowmenu] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    if (token != null) {
      setshowmenu(true);
    } else {
      navigate("/KEP_TMS");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (showModalAction) {
      setShowModal(showModalAction);
    }
  }, [showModalAction]);

  useEffect(() => {
    if (returnAction != null) {
      returnAction(showModal);
    }
  }, [showModal]);
  return (
    <>
      {showmenu && (
        <>
          <div className="d-flex">
            <Sidebars />
            <div className="flex-grow-1 d-flex flex-column d-block expand-transition overflow-hidden vh-100">
              <div className="d-flex">
                {!header?.hide &&
                <Header
                  title={header?.title}
                  IconComponent={header?.icon}
                  setShowModal={setShowModal}
                />}
              </div>
              <div className="overflow-auto flex-grow-1" style={{background: "#fbfdfc"}}>
                {BodyComponent && <BodyComponent />}
              </div>
            </div>
          </div>
          <RequestModal showModal={showModal} setShowModal={setShowModal} />
        </>
      )}
    </>
  );
};
Layout.propTypes = {
  BodyComponent: proptype.func,
  header: proptype.object,
  showMenu: proptype.bool,
  showModalAction: proptype.bool,
};
export default Layout;
