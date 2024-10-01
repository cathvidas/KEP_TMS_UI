import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
import proptype, { func } from "prop-types";
import React, { useRef } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { actionSuccessful, confirmAction } from "../../services/sweetalert";
import { SessionGetEmployeeId } from "../../services/sessions";
import { statusCode } from "../../api/constants";
import handleResponseAsync from "../../services/handleResponseAsync";
import trainingRequestService from "../../services/trainingRequestService";

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
  ];
const handlePublish = () => {
  const data = {requestId: reqId,
    employeeBadge: SessionGetEmployeeId(),
    statusId: statusCode.PUBLISHED,
    updatedBy: SessionGetEmployeeId()
  }
  confirmAction({title: "Publish Training Request", text: "Are you sure you want to publish this training request?", 
    onConfirm: ()=>{
      handleResponseAsync(
        ()=>trainingRequestService.approveTrainingRequest(data),
        (e)=>actionSuccessful("Training request published successfully",e.message),
        (error)=>console.error("Error publishing training request: ", error)
      )
    }
  })
  // actionSuccessful("ahsd")

}
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
        <Button label="Publish" size="small" severity="info" className="rounded py-1 ms-3" onClick={handlePublish}/>
      </div>
    </div>
  );
  
  
};

RequestMenu.propTypes = {
  menuList: proptype.arrayOf(proptype.node),  
};

