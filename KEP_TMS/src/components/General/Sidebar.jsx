import "../../assets/css/sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import proptype from "prop-types";
import UserIcon from "./UserIcon";
import icon2 from "/src/img/logo-nobg.png";
import { SessionGetEmployeeId, SessionGetRole } from "../../services/sessions";
import { Button } from "primereact/button";
import { confirmAction } from "../../services/sweetalert";
import { APP_DOMAIN, UserTypeValue } from "../../api/constants";

const Sidebars = ({ activeNavigation, expanded, show, hide }) => {
  const navigate = useNavigate();
  const checkIfActive = (path) => {
    return path && path?.toUpperCase() === activeNavigation?.toUpperCase();
  };
  const firstname = sessionStorage.getItem("firstname");
  const lastname = sessionStorage.getItem("lastname");
  const fullname = sessionStorage.getItem("fullname");

  const NavItem = ({
    item,
    icon,
    title,
    iconComponent,
    onClick,
    hideLabel = false,
  }) => {
    return (
      <li className="nav-item">
        <div
          className={`nav-link py-2 cursor-pointer  ${
            expanded ? "px-3" : "px-2"
          } link-body-emphasis rounded-0  ${
            checkIfActive(item) ? "link-light active" : "text-secondary"
          }`}
          style={{ padding: "2rem",
            }}
          to={"#"}
          onClick={onClick ? onClick : () => navigate(`${APP_DOMAIN}/${item}`)}
          aria-current="page"
        >
          <div
            className={`flex  flex-${
              expanded ? "row gap-3" : "column gap-1"
            } text-center`}
          >
            {iconComponent ? (
              <>{iconComponent}</>
            ) : (
              icon && <i className={icon} style={{ fontSize: "1.4rem" }}></i>
            )}
            {!hideLabel && (
              <small
                style={{
                  fontSize: ".7rem",
                  lineHeight: ".8rem",
                  fontWeight: 500,
                }}
              >
                {title}
              </small>
            )}
          </div>
        </div>
      </li>
    );
  };
  NavItem.propTypes = {
    item: proptype.string.isRequired,
    icon: proptype.string,
    title: proptype.string.isRequired,
    iconComponent: proptype.object,
    onClick: proptype.func,
    hideLabel: proptype.bool,
  };
  const handleSignOut = () => {
    confirmAction({
      title: "Sign Out",
      text: "Are you sure you want to sign out?",
      icon: "question",
      confirmButtonText: "Yes",
      confirmButtonColor: "#00a76f",
      cancelButtonText: "No",
      showCancelButton: true,
      onConfirm: () => {
        navigate("/KEP_TMS");
        sessionStorage.clear();
        localStorage.clear();
      },
    });
  };
  return (
    <>
      <div
        className={`${show ? "d-block" : "d-none"} ${
          expanded ? "expanded position-fixed" : "position-sticky"
        } bg-body  d-md-block  sidebar top-0 min-vh-100 bottom-0 z-1 border-right z-2`}
        style={{
          borderRight:
            "var(--bs-border-width) var(--bs-border-style) var(--bs-border-color)",
          height: "100vh",
          width: expanded ? "" : "5rem",
        }}
      >
        <div className="d-flex w-100 flex-column  h-100 theme2-bg top-0 bottom-0">
          <Link
            className={`border-bottom fw-bold lh-1 bg-white gap-0 flex text-decoration-none py-1`}
            to={expanded ? "" : "/KEP_TMS/Dashboard"}
          >
            <img
              className={`${expanded ? `mx-2` : `mx-auto`} bg-white`}
              src={icon2}
              width="43"
            />
            {expanded && (
              <>
                <span className="bg-white theme-color">KNOWLES HR TRAINING SYSTEM</span>
                <Button
                  type="button"
                  text
                  severity="secondary"
                  onClick={hide}
                  className="ms-auto me-1 bg-white"
                  icon="pi pi-times"
                />
              </>
            )}
          </Link>
          <ul className="nav nav-pills flex-column nav-flush w-100 mb-auto">
            <NavItem item={"Dashboard"} title="Dashboard" icon={"pi pi pi-home"} />
            {(SessionGetRole() === UserTypeValue.ADMIN ||
              SessionGetRole() === UserTypeValue.REQUESTOR) && (
              <NavItem
                item={"RequestList"}
                title="Training Requests"
                icon="pi pi-file-edit"
              />
            )}
            <NavItem
              item="Trainings"
              title="Trainings"
              icon="pi pi-address-book"
            />
            {SessionGetRole() === UserTypeValue.FACILITATOR && (
              <NavItem
                item="FacilitatedTrainings"
                title="Facilitated Trainings"
                icon="pi pi-clipboard"
              />
            )}
            <NavItem
              item={"List/ForApproval"}
              title="For Approval"
              icon="pi pi-pen-to-square"
            />
            <NavItem
              item="Certificates"
              title="Certificates"
              icon={"pi pi-trophy"}
            />
            {SessionGetRole() === UserTypeValue.ADMIN && (
              <>
                <NavItem item="Users" title="Users" icon="pi pi-users" />
                <NavItem
                  item="MasterList"
                  title="Master List"
                  icon="pi pi-list"
                />
              <NavItem item="Setting" title="Setting" icon={"pi pi-cog"} />
              </>
            )}
          </ul>
          <ul className={` nav nav-pills d-flex flex-column nav-flush`}>
            <NavItem
              item={"Users/Detail/" + SessionGetEmployeeId()}
              title={fullname ?? lastname + "," + firstname}
              icon="pi pi-users"
              iconComponent={
                <UserIcon Name={fullname ?? lastname + "," + firstname} />
              }
            />
            <NavItem
              onClick={handleSignOut}
              title="Sign Out"
              icon="pi pi-sign-out"
            />
          </ul>
        </div>
      </div>
    </>
  );
};

Sidebars.propTypes = {
  activeNavigation: proptype.string,
  expanded: proptype.bool,
  show: proptype.bool,
  hide: proptype.func,
};
export default Sidebars;
