import { DataTable } from "primereact/datatable";
import GeneralTable from "../../components/General/GeneralTable"
import { SectionBanner } from "../../components/General/Section"
import { Column } from "primereact/column";
import CommonTable from "../../components/General/CommonTable";
import { Button } from "primereact/button";
import effectivenessHook from "../../hooks/effectivenessHook";
import { SessionGetEmployeeId } from "../../services/sessions";
import StatusColor from "../../components/General/StatusColor";
import { actionSuccessful, confirmAction } from "../../services/sweetalert";
import handleResponseAsync from "../../services/handleResponseAsync";
import effectivenessService from "../../services/effectivenessService";
import { ActivityType } from "../../api/constants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import EffectivenessForm from "../../components/forms/EffectivenessForm";
import trainingRequestHook from "../../hooks/trainingRequestHook";
import userHook from "../../hooks/userHook";

const ForApprovaleffectiveness = ()=>{
    const [trigger, setTrigger] = useState(0);
    const {data, error, loading} = effectivenessHook.useApproverAssignedEffectiveness(SessionGetEmployeeId(), trigger);
    const [showModal, setShowModal] = useState(false);
    const [selectedData, setSElectedData] = useState({});
    const requestData = trainingRequestHook.useTrainingRequest(selectedData?.trainingEffectiveness?.trainingRequest?.id);
    const userData = userHook.useUserById(selectedData?.trainingEffectiveness?.employeeBadge);
    const actionTemplate = (rowData)=><>
    <div className="d-flex"> 
    <Button type="button" size="small" text icon="pi pi-eye" severity="success"  className="rounded-circle" onClick={()=>{setSElectedData(rowData);
      setShowModal(true)
    }}/>
    <Button type="button" size="small" text icon="pi pi-thumbs-up"  className="rounded-circle" onClick={()=>approveEffectiveness(rowData?.trainingEffectiveness?.id,true)}/>
    <Button type="button" size="small" text icon="pi pi-thumbs-down" severity="danger" className="rounded-circle" onClick={()=>approveEffectiveness(rowData?.trainingEffectiveness?.id,false)}/>
    {/* <Button type="button" size="small" text icon="pi pi-trash" severity="danger" className="rounded-circle" onClick={()=>handleDelete(rowData.id)} /> */}
    </div>
    </>
      const approveEffectiveness = (id, isApprove) => {
     confirmAction({
        title: isApprove ? "Approve Effectiveness" : "Disapprove Effectiveness",
        text: isApprove ? "Are you sure you want to approve this Effectiveness?" : "Are you sure you want to disapprove this Effectiveness?",
        confirmButtonText: isApprove? "Approve" : "Disapprove",
        cancelButtonText: "Cancel",
        confirmButtonColor: isApprove? "#4CAF50" : "#d33",
        onConfirm: ()=>{
          handleResponseAsync(
            () =>
              effectivenessService.approveTrainingEffectiveness({
                transactId: id,
                approvedBy: SessionGetEmployeeId(),
                activityIn: ActivityType.EFFECTIVENESS,
              }),
            (e)=>{
              actionSuccessful("Sucess!", e.mesasge)
              setTimeout(() => {
                setShowModal(false)
                setTrigger(trigger+1)
              }, 1000);},
            null,
          );
        }
     })
      };
      console.log(data)
  const columnItems = [{
    field: "id",
    header: "Request Id",
    body: (rowData)=><>{rowData?.trainingEffectiveness?.trainingRequest?.id}</>
  },
   {
    field: "name",
    header: "Created By",
    body: (rowData)=><>{rowData?.trainingEffectiveness?.employeeBadge}</>
  },{
    field: "description",
    header: "Program",
    body: (rowData)=><>{rowData?.trainingEffectiveness?.trainingProgram?.name}</>
  }, {
    field: "statusName",
    header: "Status",
    body: (rowData)=><>{StatusColor({status:rowData?.trainingEffectiveness?.status?.name, showStatus: true})}</>
  }, {
    field:"",
    header: "Action",
    body: actionTemplate
  }
]
    return (
      <div className="p-3">
        <SectionBanner
          title="Training Request Effectiveness"
          subtitle="List of for Approval"
        />
        <CommonTable
          dataTable={data}
          title="Programs"
          columnItems={columnItems}
        />
        <Modal show={showModal} onHide={() => setShowModal(false)} fullscreen>
          <Modal.Header closeButton>
            <Modal.Title className="theme-color h5">Training Effectiveness Details</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-md-4 px-md-5">
            {selectedData?.loading ? (
              "Loading..."
            ) : (
              <EffectivenessForm
                userData={userData?.data}
                data={requestData?.data}
                formData={selectedData?.trainingEffectiveness}
                currentRouting={selectedData?.routingActivity}
                auditTrail={selectedData?.auditTrail}
              
              />
            )}
          </Modal.Body>
          <Modal.Footer>
              <Button type="button" size="small" label="Disapprove" icon="pi pi-thumbs-down" className="rounded" severity="danger" text onClick={()=>approveEffectiveness(selectedData?.trainingEffectiveness?.id,false)} />
              <Button type="button" size="small" label="Approve" icon="pi pi-thumbs-up" className="rounded" onClick={()=>approveEffectiveness(selectedData?.trainingEffectiveness?.id,true)} />
            </Modal.Footer>
        </Modal>
      </div>
    );
}
export default ForApprovaleffectiveness