import { Link, useLocation, useNavigate } from "react-router-dom";
import proptype from "prop-types";
import UserIcon from "./UserIcon";
import Swal from "sweetalert2";
import icon from "/src/img/icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAward,
  faBarChart,
  faCheckToSlot,
  faClapperboard,
  faClinicMedical,
  faClipboardCheck,
  faClipboardList,
  faGear,
  faHouse,
  faList,
  faPenToSquare,
  faReceipt,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useState } from "react";
import { SessionGetRole } from "../../services/sessions";

const NavItem = ({ item, icon, title, expanded }) => {
  console.log(SessionGetRole())
  const locations = useLocation();
  const getClassNames = (page) =>
    `nav-link py-3  rounded-0  ${expanded === "true" && "flex gap-2 px-4"} ${
      locations.pathname === page ? "link-light active" : "text-secondary"
    }`;

  const tooltip = (
    <Tooltip>
      <span>{title}</span>
    </Tooltip>
  );
  return (
    <li className="nav-item ">
      <OverlayTrigger
        placement="right"
        overlay={expanded !== "true" ? tooltip : <></>}
      >
        <Link className={getClassNames(item)} to={item} aria-current="page">
          {icon && <>{icon}</>}
          {expanded == "true" && title && (
            <span className="text-start">{title}</span>
          )}
        </Link>
      </OverlayTrigger>
    </li>
  );
};
const Sidebar = () => {
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
    <div
      className="bg-body position-sticky   top-0 min-vh-100 bottom-0 z-1 border-right"
      style={{
        borderRight:
          "var(--bs-border-width) var(--bs-border-style) var(--bs-border-color)",
        width: expanded == "true" ? "" : "4.5rem",
        height: "100vh",
      }}
    >
      <div
        className="d-flex position-absolute top-0 z-3 mt-3 bg-body"
        style={{ right: "-12px" }}
      >
        <Link
          className="p-2 p-0 border d-flex justify-content-center rounded"
          href="#"
          style={{ color: "var(--bs-secondary)" }}
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faAngleRight} />
          <i className="icon ion-ios-arrow-forward"></i>
        </Link>
      </div>
      <div
        className="d-flex flex-column flex-shrink-0 top-0 bottom-0"
        style={{ width: expanded === "true" ? "" : "4.5rem" }}
      >
        <Link
          className="fw-bold lh-1 theme-color flex text-decoration-none py-3 px-3 pe-4"
          href="/"
        >
          <img src={icon} width="43" />
          {expanded === "true" && (
            <small>
              KNOWLES TRAINING <br /> REQUEST SYSTEM
            </small>
          )}
        </Link>
        <ul className="nav nav-pills flex-column text-center nav-flush mb-auto">
          <NavItem
            item={"/KEP_TMS/Dashboard"}
            title="Home"
            expanded={expanded}
            icon={<FontAwesomeIcon icon={faHouse} />}
          />
          <NavItem
            item={"/KEP_TMS/RequestList"}
            title="Request List"
            expanded={expanded}
            icon={<FontAwesomeIcon icon={faClipboardList} />}
          />
          <NavItem
            item="/KEP_TMS/Trainings"
            title="Training List"
            expanded={expanded}
            icon={<FontAwesomeIcon icon={faClipboardCheck} />}
          />
          {(SessionGetRole() !== "Trainee" && SessionGetRole !== "Facilitator") && 
          <>
          <NavItem
            item={"/KEP_TMS/ForApproval"}
            title="For Approval"
            expanded={expanded}
            icon={<FontAwesomeIcon icon={faPenToSquare} />}
          />
          
          <NavItem
            item={"/KEP_TMS/Request_View"}
            title="For Approval"
            expanded={expanded}
            icon={<FontAwesomeIcon icon={faCheckToSlot} />}
          />
          <NavItem
            item="/KEP_TMS/MasterList"
            title="Master List"
            expanded={expanded}
            icon={<FontAwesomeIcon icon={faList} />}
          />
          </>
          }
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
            icon={<FontAwesomeIcon icon={faBarChart} />}
          />
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
  );
};

NavItem.propTypes = {
  item: proptype.string.isRequired,
  icon: proptype.object,
  title: proptype.string,
  expanded: proptype.string,
};

export default Sidebar;
