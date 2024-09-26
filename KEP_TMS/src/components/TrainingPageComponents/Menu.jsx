import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import proptype, { func } from "prop-types";
import React, { useRef } from "react";
import { useNavigate, useRouteError } from "react-router-dom";

export const RequestMenu = ({menuList, action, current, reqId}) => {
  const navigate = useNavigate()
  const items = [
      {
          label: 'Content',
          items: [
              {
                  label: 'Overview',
                  icon: 'pi pi-info-circle',
                  command: () => navigate(`/KEP_TMS/TrainingRequest/${reqId}`),
                  
              },
              {
                  label: 'Modules',
                  icon: 'pi pi-folder',
                  command: () => navigate(`/KEP_TMS/TrainingRequest/${reqId}/Modules`),
              },
              {
                  label: 'Questionnaire',
                  icon: 'pi pi-list-check',
                  command: () => navigate(`/KEP_TMS/TrainingRequest/${reqId}/Exams`),
              }
          ]
      },
      // {
      //     label: 'Profile',
      //     items: [
      //         {
      //             label: 'Settings',
      //             icon: 'pi pi-cog'
      //         },
      //         {
      //             label: 'Logout',
      //             icon: 'pi pi-sign-out'
      //         }
      //     ]
      // }
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
        <Button label="Publish" size="small" severity="info" className="rounded py-1 ms-3"/>
      </div>
    </div>
  );
  
  
};

RequestMenu.propTypes = {
  menuList: proptype.arrayOf(proptype.node),  
};

