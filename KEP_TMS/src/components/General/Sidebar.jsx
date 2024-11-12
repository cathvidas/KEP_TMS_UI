import "../../assets/css/sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import proptype from "prop-types";
import UserIcon from "./UserIcon";
import icon2 from "/src/img/logo-nobg.png";
import { SessionGetEmployeeId, SessionGetRole } from "../../services/sessions";
import TooltipTemplate from "./TooltipTemplate";
import { Button } from "primereact/button";
import { confirmAction } from "../../services/sweetalert";
import { APP_DOMAIN } from "../../api/constants";

const Sidebars = ({ activeNavigation }) => {
  const navigate = useNavigate();
  const checkIfActive = (path) => {
    return path?.toUpperCase() === activeNavigation?.toUpperCase();
  };
  const firstname = sessionStorage.getItem("firstname");
  const lastname = sessionStorage.getItem("lastname");
  const fullname = sessionStorage.getItem("fullname");

  const NavItem = ({ item, icon, title }) => {
    return (
      <li className="">
        <TooltipTemplate
          title={title}
          item={
            <Link
              className={`nav-link py-2 px-2 link-body-emphasis rounded-0  ${
                checkIfActive(item) ? "link-light active" : "text-secondary"
              }`}
              style={{ padding: "2rem", borderBottom: "1px solid #f8f8f8 " }}
              to={`/KEP_TMS/${item}`}
              aria-current="page"
            >
              {icon && (
                <div className="flex gap-1 flex-column text-center">
                  <i className={icon} style={{ fontSize: "1.4rem" }}></i>{" "}
                  <small
                    style={{
                      fontSize: ".7rem",
                      lineHeight: ".8rem",
                      fontWeight: 500,
                    }}
                  >
                    {title}
                  </small>
                </div>
              )}
            </Link>
          }
        />
      </li>
    );
  };
  NavItem.propTypes = {
    item: proptype.string.isRequired,
    icon: proptype.string,
    title: proptype.string.isRequired,
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
        className={`bg-body position-sticky d-none d-md-block  sidebar top-0 min-vh-100 bottom-0 z-1 border-right z-2 `}
        style={{
          borderRight:
            "var(--bs-border-width) var(--bs-border-style) var(--bs-border-color)",
          height: "100vh",
          width: "5rem",
        }}
      >
        <div className="d-flex w-100 flex-column h-100  top-0 bottom-0">
          <Link
            className="fw-bold lh-1 theme-color flex text-decoration-none py-1 px-3 pe-4 d-flex"
            to={"/KEP_TMS/Dashboard"}
          >
            <img src={icon2} width="43" />
          </Link>
          <ul className="nav nav-pills flex-column nav-flush w-100 mb-auto">
            <NavItem item={"Dashboard"} title="Home" icon={"pi pi pi-home"} />
            <NavItem
              item={"RequestList"}
              title="Training Requests"
              icon="pi pi-file-edit"
            />
            <NavItem
              item="Trainings"
              title="Assigned Trainings"
              icon="pi pi-address-book"
            />
            {SessionGetRole() === "Facilitator" && (
              <NavItem
                item="FacilitatedTrainings"
                title="Facilitated Trainings"
                icon="pi pi-list-check"
              />
            )}
            <NavItem
              item={"List/ForApproval"}
              title="For Approval"
              icon="pi pi-pen-to-square"
            />
            {(SessionGetRole() === "Admin" ||
              SessionGetRole() === "SuperAdmin") && (
              <>
                <NavItem
                  item="MasterList"
                  title="Master List"
                  icon="pi pi-list"
                />
                {/* <NavItem
                    item="AnalyticsPage"
                    title="Analytics"
                    expanded={expanded}
                    icon={<i className="pi pi-chart-bar"></i>}
                  /> */}
                <NavItem item="Users" title="Users" icon="pi pi-users" />
              </>
            )}
            <NavItem
              item="Certificates"
              title="Certificates"
              icon={"pi pi-trophy"}
            />
          </ul>
          <div className={`dropdown gap-2 p-3 d-flex flex-column nav-flush`}>
            <Link
              className=" link-body-emphasis d-flex mx-auto align-items-center text-decoration-none"
              aria-expanded="false"
              role="button"
              to={APP_DOMAIN+"/Users/Detail/"+SessionGetEmployeeId()}
            >
              <UserIcon Name={fullname ?? lastname + "," + firstname} />
            </Link>
            <Button
              href="#"
              className=" link-body-emphasis py-1 rounded-pill  d-flex mx-auto "
              aria-expanded="false"
              type="button"
              onClick={handleSignOut}
              text
              icon="pi pi-sign-out"
            />
          </div>
        </div>
      </div>
    </>
  );
};

Sidebars.propTypes = {
  activeNavigation: proptype.string,
};
export default Sidebars;
