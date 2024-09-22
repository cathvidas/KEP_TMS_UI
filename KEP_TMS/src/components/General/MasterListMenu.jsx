import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import proptype, { func } from "prop-types";
import React, { useRef } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import getDomainName from "../../services/getDomainName";

const MasterListMenu = () => {
  const navigate = useNavigate();
  const items = [
    {
      label: "Users",
      items: [
        {
          label: "Facilitators",
          icon: "pi pi-plus",
          command: () => navigate("/KEP_TMS/MasterList/Users/Facilitators"),
        },
        {
          label: "Admin",
          icon: "pi pi-search",
          command: () => navigate("/KEP_TMS/MasterList/Users/Admin"),
        },
        {
          label: "Approver",
          icon: "pi pi-search",
          command: () => navigate("/KEP_TMS/MasterList/Users/Approvers"),
        },
      ],
    },
    {
      label: "Dropdown",
      items: [
        {
          label: "Programs",
          icon: "pi pi-cog",
          command: () => navigate("/KEP_TMS/MasterList/Programs"),
        },
        {
          label: "Category",
          icon: "pi pi-sign-out",
          command: () => navigate("/KEP_TMS/MasterList/Categories"),
        },
        {
          label: "Training Type",
          icon: "pi pi-sign-out",
        },
      ],
    },
    {
      label: "Trainings",
      items: [
        {
          label: "Internal",
          icon: "pi pi-cog",
          command: () => navigate("/KEP_TMS/MasterList/Training/Internal"),
        },
        {
          label: "External",
          icon: "pi pi-sign-out",
          command: () => navigate("/KEP_TMS/MasterList/Training/External"),
        },
      ],
    },
  ];

  return (
    <div
      className="p-3 position-sticky top-0"
      style={{ height: "fit-content" }}
    >
      <div className="d-flex gap-1 px-3 mb-1 border-bottom pb-2 align-items-center">
        <FontAwesomeIcon icon={faBars} />
        <i className="icon ion-star bs-icon-md bs-icon"></i>
        <h6 className="m-0">MENU</h6>
      </div>
      <div className="">
        <Menu
          model={items}
          className="border-0"
          style={{ background: "rgb(251, 253, 252)", width: '150px' }}
          aria-hidden={true}
        />
      </div>
    </div>
  );
};

MasterListMenu.propTypes = {
  menuList: proptype.arrayOf(proptype.node),
};
export default MasterListMenu;
