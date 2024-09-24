import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import proptype, { func } from "prop-types";
import React, { useRef } from "react";
import { useRouteError } from "react-router-dom";

export const RequestMenu = ({menuList, action, current}) => {
  const items = [
      {
          label: 'Details',
          items: [
              {
                  label: 'Overview',
                  icon: 'pi pi-plus'
              },
              {
                  label: 'Trainees',
                  icon: 'pi pi-search'
              },
              {
                  label: 'Modules',
                  icon: 'pi pi-search'
              },
              {
                  label: 'Questionnaire',
                  icon: 'pi pi-search'
              }
          ]
      },
      {
          label: 'Profile',
          items: [
              {
                  label: 'Settings',
                  icon: 'pi pi-cog'
              },
              {
                  label: 'Logout',
                  icon: 'pi pi-sign-out'
              }
          ]
      }
  ];

  return (
    <div className="p-3 position-sticky top-0 col-1 d-none d-md-block " style={{height: "fit-content", minWidth: "200px"}}
    >
      <div className="d-flex gap-1 px-3 mb-1 border-bottom pb-2 align-items-center">
        <FontAwesomeIcon icon={faBars} />
        <i className="icon ion-star bs-icon-md bs-icon"></i>
        <h6 className="m-0">MENU</h6>
      </div>
      <div className="">
        <Menu model={items} className="border-0" style={{background: "rgb(251, 253, 252)"}} />
      </div>
    </div>
  );
  
  
};

RequestMenu.propTypes = {
  menuList: proptype.arrayOf(proptype.node),  
};

