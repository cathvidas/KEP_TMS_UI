import { Link, useLocation, useNavigate } from "react-router-dom";
import proptype from "prop-types";
import UserIcon from "./UserIcon";
import Swal from "sweetalert2";
import icon2 from "/src/img/logo-nobg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAward,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useState } from "react";
import { SessionGetRole } from "../../services/sessions";

const NavItem = ({ item, icon, title, expanded }) => {
  const locations = useLocation();
  const getClassNames = (page) =>
    `nav-link p-3  rounded-0  ${
      locations.pathname === page ? "link-light active" : "text-secondary"
    }`;

  const tooltip = (
    <Tooltip>
      <span>{title}</span>
    </Tooltip>
  );
  return (
    <li className="nav-item">
      <OverlayTrigger
        placement="right"
        overlay={expanded !== "true" ? tooltip : <></>}
      >
        <Link className={getClassNames(item)} to={item} aria-current="page">
          {icon && <>{icon}</>}
          {expanded == "true" && title && (
            <span className="text-start ms-3 ">{title}</span>
          )}
        </Link>
      </OverlayTrigger>
    </li>
  );
};
const Sidebars = () => {
  const [expanded, setExpanded] = useState(localStorage.getItem("s-expand"));
  const navigate = useNavigate();
  const toggleSidebar = () => {
    var x = localStorage.getItem("s-expand");
    if (x == "true") {
      localStorage.setItem("s-expand", "false");
      setExpanded("false");
    } else {
      localStorage.setItem("s-expand", "true");
      setExpanded("true");
    }
  };

  const firstname = sessionStorage.getItem("firstname");
  const lastname = sessionStorage.getItem("lastname");

  const handleSignOut = () => {
    Swal.fire({
      title: "Signing Out",
      text: "Do you want to continue",
      icon: "question",
      confirmButtonText: "Yes",
      confirmButtonColor: "green",
      cancelButtonText: "No",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        navigate("/KEP_TMS");
        sessionStorage.clear();
        localStorage.clear();
      }
    });
  };
  return (
    <>
      <div
        className={`bg-body position-sticky  sidebar top-0 min-vh-100 bottom-0 z-1 border-right z-2 ${
          expanded == "true" ? "expanded" : "collapsed"
        }`}
        style={{
          borderRight:
            "var(--bs-border-width) var(--bs-border-style) var(--bs-border-color)",
          height: "100vh",
        }}
      >
        <div
          className="d-flex position-absolute top-0 z-3 mt-3 bg-body"
          style={{ right: "-12px" }}
        >
          <div
            className="p-2 p-0 border d-flex justify-content-center rounded"
            style={{ color: "var(--bs-secondary)" }}
            onClick={toggleSidebar}
          >
            {expanded == "true" ? (
              <FontAwesomeIcon icon={faAngleLeft} />
            ) : (
              <FontAwesomeIcon icon={faAngleRight} />
            )}
          </div>
        </div>
        <div className="d-flex w-100 flex-column  top-0 bottom-0">
          <Link
            className="fw-bold lh-1 theme-color flex text-decoration-none py-3 px-3 pe-4 d-flex"
            href="/"
          >
            <img src={icon2} width="43" />
            {expanded === "true" && (
              <small style={{ whiteSpace: "nowrap" }}>
                KNOWLES TRAINING <br /> REQUEST SYSTEM
              </small>
            )}
          </Link>
          <ul className="nav nav-pills flex-column nav-flush w-100 mb-auto">
            <NavItem
              item={"/KEP_TMS/Dashboard"}
              title="Home"
              expanded={expanded}
              icon={<i className="pi pi-home"></i>}
            />
            <NavItem
              item={"/KEP_TMS/RequestList"}
              title="Training Requests"
              expanded={expanded}
              icon={<i className="pi pi-clipboard"></i>}
            />
            <NavItem
              item="/KEP_TMS/Trainings"
              title="Assigned Trainings"
              expanded={expanded}
              icon={<FontAwesomeIcon icon={faClipboardCheck} />}
            />
            {SessionGetRole() === "Facilitator" &&
            <NavItem
              item="/KEP_TMS/AssignedTrainings"
              title="Facilitated Trainings"
              expanded={expanded}
              icon={<i className="pi pi-list-check"></i>}
            />}
            <NavItem
              item={"/KEP_TMS/List/ForApproval"}
              title="For Approval"
              expanded={expanded}
              icon={<i className="pi pi-pen-to-square"></i>}
            />

            {/* <NavItem
                  item={"/KEP_TMS//TrainingRequest"}
                  title="For Approval"
                  expanded={expanded}
                  icon={<FontAwesomeIcon icon={faCheckToSlot} />}
                /> */}
            {(SessionGetRole() === "Admin" ||
              SessionGetRole() === "SuperAdmin") && (
                <>
                  <NavItem
                    item="/KEP_TMS/MasterList"
                    title="Master List"
                    expanded={expanded}
                    icon={<i className="pi pi-list"></i>}
                  />
                  <NavItem
                    item="/KEP_TMS/CertificatesPage"
                    title="Certificates"
                    expanded={expanded}
                    icon={<FontAwesomeIcon icon={faAward} />}
                  />
                  <NavItem
                    item="/KEP_TMS/AnalyticsPage"
                    title="Analytics"
                    expanded={expanded}
                    icon={<i className="pi pi-chart-bar"></i>}
                  />
                  <NavItem
                    item="/KEP_TMS/Users"
                    title="Users"
                    expanded={expanded}
                    icon={<i className="pi pi-users"></i>}
                  />
                </>
              )}
          </ul>
          <div className="dropdown p-3">
            <Link
              className="dropdown-toggle link-body-emphasis d-flex align-items-center text-decoration-none"
              aria-expanded="false"
              data-bs-toggle="dropdown"
              role="button"
            >
              <UserIcon Name={lastname + "," + firstname} />
            </Link>
            <div
              className="dropdown-menu shadow text-small"
              data-popper-placement="top-start"
            >
              <Link className="dropdown-item" href="#">
                New project...
              </Link>
              <Link className="dropdown-item" href="#">
                Settings
              </Link>
              <Link className="dropdown-item" href="#">
                Profile
              </Link>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item" onClick={handleSignOut}>
                Sign out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

NavItem.propTypes = {
  item: proptype.string.isRequired,
  icon: proptype.object,
  title: proptype.string,
  expanded: proptype.string,
};

export default Sidebars;
