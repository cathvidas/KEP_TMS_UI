import { useEffect, useState } from "react";
import RequestModal from "../Modal/RequestType";
import Sidebar from "./Sidebar";
import proptype from "prop-types";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { RequestMenu } from "../TrainingDetails/Menu";

const Layout = ({
  BodyComponent,
  header,
  showMenu,
  showModalAction,
  returnAction
}) => {
  const[showModal, setShowModal] = useState(false);
  const [showmenu, setshowmenu] = useState(true);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    if (token != null) {
      setshowmenu(true);
    } else {
      navigate("*");
    }
  }, [token, navigate]);

  useEffect(() => {
    if(showModalAction){
      setShowModal(showModalAction);}
  }, [showModalAction]);

  useEffect(()=>{
    if(returnAction != null){
      returnAction(showModal);
    }
  }, [showModal]);
  return (
    <>
      {showmenu && (
        <>
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1  px-3 px-md-4">
              <Header title={header?.title} IconComponent={header?.icon} setShowModal={setShowModal} />
              <div className="d-flex gap-3">
                {showMenu && (
                  <RequestMenu
                  // action={handleChangeContent}
                  // current={currentContent}
                  />
                )}
                <div className="flex-fill mb-5">
                  {BodyComponent && <BodyComponent />}
                </div>
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
