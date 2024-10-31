import "../../assets/css/sidebar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import proptype from "prop-types";
import UserIcon from "./UserIcon";
import Swal from "sweetalert2";
import icon2 from "/src/img/logo-nobg.png";
import { SessionGetRole } from "../../services/sessions";
import TooltipTemplate from "./TooltipTemplate";

const NavItem = ({ item, icon, title }) => {
  const locations = useLocation();
  const getClassNames = (page) =>
    `nav-link py-2 px-2 link-body-emphasis rounded-0  ${
      locations.pathname === page ? "link-light active" : "text-secondary"
    }`;

  return (
    <li className="">
      <TooltipTemplate
        title={title}
        item={
          <Link
            className={getClassNames(item)}
            style={{ padding: "2rem", borderBottom: "1px solid #f8f8f8 " }}
            to={item}
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
const Sidebars = () => {
  const navigate = useNavigate();

  const firstname = sessionStorage.getItem("firstname");
  const lastname = sessionStorage.getItem("lastname");
  const fullname = sessionStorage.getItem("fullname");

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
            <NavItem
              item={"/KEP_TMS/Dashboard"}
              title="Home"
              icon={"pi pi pi-home"}
            />
            <NavItem
              item={"/KEP_TMS/RequestList"}
              title="Training Requests"
              icon="pi pi-clipboard"
            />
            <NavItem
              item="/KEP_TMS/Trainings"
              title="Assigned Trainings"
              icon="pi pi-address-book"
            />
            {SessionGetRole() === "Facilitator" && (
              <NavItem
                item="/KEP_TMS/AssignedTrainings"
                title="Facilitated Trainings"
                icon="pi pi-list-check"
              />
            )}
            <NavItem
              item={"/KEP_TMS/List/ForApproval"}
              title="For Approval"
              icon="pi pi-pen-to-square"
            />
            {(SessionGetRole() === "Admin" ||
              SessionGetRole() === "SuperAdmin") && (
              <>
                <NavItem
                  item="/KEP_TMS/MasterList"
                  title="Master List"
                  icon="pi pi-list"
                />
                  {/* <NavItem
                    item="/KEP_TMS/AnalyticsPage"
                    title="Analytics"
                    expanded={expanded}
                    icon={<i className="pi pi-chart-bar"></i>}
                  /> */}
                <NavItem
                  item="/KEP_TMS/Users"
                  title="Users"
                  icon="pi pi-users"
                />
              </>
            )}
            <NavItem
                item="/KEP_TMS/CertificatesPage"
                title="Certificates"
                icon={"pi pi-trophy"}
              />
          </ul>
          <div className={`dropdown p-3 d-flex flex-column nav-flush`}>
            <Link
              className=" link-body-emphasis d-flex mx-auto align-items-center text-decoration-none"
              aria-expanded="false"
              role="button"
            >
              <UserIcon Name={fullname ?? lastname + "," + firstname} />
            </Link>
            <Link
              className=" link-body-emphasis p-3 d-flex align-items-center "
              aria-expanded="false"
              role="button"
              onClick={handleSignOut}
            >
              <i className="pi pi-sign-out" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

NavItem.propTypes = {
  item: proptype.string.isRequired,
  icon: proptype.string,
  title: proptype.string,
  expanded: proptype.string,
};

export default Sidebars;
