import { useEffect, useState } from "react";
import RequestModal from "../Modal/RequestType";
import Sidebars from "./Sidebar";
import proptype from "prop-types";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Login from "../../pages/Login";

const Layout = ({
  BodyComponent,
  header,
  navReference,
  showModalAction,
  returnAction,
}) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showmenu, setshowmenu] = useState(true);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");  
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

 useEffect(() => {
  if(width < 768){
    setShowSidebar(false);
    setExpanded(true);
  }else{
    setShowSidebar(true);
    setExpanded(false);
  }
 },[width])
  useEffect(() => {
    if (token != null) {
      setshowmenu(true);
    } 
  else{
      setshowmenu(false);
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
      {showmenu? (
        <>
          <div className="d-flex">
            <Sidebars activeNavigation={navReference} hide={()=>setShowSidebar(false)} show={showSidebar} expanded={expanded}/>
            <div className=" flex-fill d-flex flex-column d-block expand-transition overflow-hidden w-100 vh-100">
              <div className=" position-sticky top-0 w-100">
                {(!header?.hide || (header?.hide && expanded) )&&
                <Header
                  title={header?.title}
                  // IconComponent={header?.icon}
                  setShowModal={setShowModal}
                  toggleSidebar={()=>setShowSidebar(!showSidebar)}
                  className={header?.className}
                />}
              </div>
              <div className="overflow-auto flex-grow-1" style={{background: "#fbfdfc"}}>
                {BodyComponent && <BodyComponent />}
              </div>
            </div>
          </div>
          <RequestModal showModal={showModal} setShowModal={setShowModal} />
        </>
      ):
      <Login />}
    </>
  );
};
Layout.propTypes = {
  BodyComponent: proptype.func,
  header: proptype.object,
  returnAction: proptype.func,
  showModalAction: proptype.bool,
  navReference: proptype.string,

};
export default Layout;
