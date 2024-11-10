import { Button, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import proptype from "prop-types";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Header = ({ title, IconComponent, showModal, setShowModal }) => {
  const handleShow = () => {
    setShowModal(!showModal);
  };
  return (
    <Navbar className="header navbar-expand-md d-flex w-100  bg-body z-1 shadow-sm px-4 ">
      <a className="navbar-brand d-flex align-items-center " href="#" style={{fontWeight: 500}}>
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
      <button className="navbar-toggler" data-bs-toggle="collapse">
        <span className="visually-hidden">Toggle navigation</span>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="navbar-collapse justify-content-end gap-3 align-items-center"
        id="navcol-2"
      >
        <ul className="nav nav-tabs gap-3 border-0">
          <li className="nav-item"></li>
          <li className="nav-item">
            <a
              className="nav-link active p-2 border d-flex align-items-center rounded h-100"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="bi bi-bell"
              >
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6"></path>
              </svg>
            </a>
          </li>
        </ul>
        <Button
          className="btn rounded-circle border-0"
          style={{ background: "#00a76f", color: "rgb(255,255,255)" }}
          data-bs-toggle="modal"
          data-bs-target="#TRtype"
          onClick={handleShow}
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
    </Navbar>
  );
};

Header.propTypes = {
  title: proptype.string.isRequired,
  IconComponent: proptype.object,
  showModal: proptype.bool,
  setShowModal: proptype.func,
};

export default Header;
