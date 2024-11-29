import { Navbar } from "react-bootstrap";
import proptype from "prop-types";
import { Button } from "primereact/button";
import { SessionGetRole } from "../../services/sessions";
import { UserTypeValue } from "../../api/constants";

const Header = ({ title, IconComponent, showModal, setShowModal,toggleSidebar, className, showRequestButton }) => {
  const handleShow = () => {
    setShowModal(!showModal);
  };
  return (
    <Navbar className={`header navbar-expand-md d-flex w-100 py-0 z-1 px-2 border-bottom bg-white ${className}`} style={{background: "#fbfdfc"}}>
      <div className="d-block d-md-none">
      <Button type="button" severity="secondary" text icon="pi pi-bars" className="py-1" onClick={toggleSidebar} /></div>
      <a className="navbar-brand ms-2 d-flex align-items-center " href="#" style={{fontWeight: 500}}>
        <span
          className="d-flex gap-2 justify-content-center align-items-center bs-icon"
          style={{
            color: "rgb(0, 167, 111)",
            background: "rgba(13, 110, 253, 0)",
          }}
        >
          {IconComponent && IconComponent}
          <small style={{ color: "#00a76f" }}>
            {title}
          </small>
        </span>
      </a>
      {((SessionGetRole() === UserTypeValue.ADMIN || SessionGetRole() === UserTypeValue.REQUESTOR) && showRequestButton) &&
      <div
        className="ms-auto justify-content-end align-items-center"
      >
        <Button
          className="rounded-circle border-0 me-2"
          style={{ background: "#00a76f", color: "rgb(255,255,255)" }}
          data-bs-toggle="modal"
          data-bs-target="#TRtype"
          onClick={handleShow}
          icon="pi pi-plus"
          />
      </div>}
    </Navbar>
  );
};

Header.propTypes = {
  title: proptype.string.isRequired,
  IconComponent: proptype.object,
  showModal: proptype.bool,
  setShowModal: proptype.func,
  toggleSidebar: proptype.func,
  className: proptype.string,
  showRequestButton: proptype.bool,
};

export default Header;
