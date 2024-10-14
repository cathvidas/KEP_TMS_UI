import { SectionBanner } from "../../components/General/Section"
import CommonTable from "../../components/General/CommonTable";
import { Button } from "primereact/button";
import { SessionGetEmployeeId } from "../../services/sessions";
import StatusColor from "../../components/General/StatusColor";
import { confirmAction } from "../../services/sweetalert";
import handleResponseAsync from "../../services/handleResponseAsync";
import effectivenessService from "../../services/effectivenessService";
import { ActivityType } from "../../api/constants";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import userHook from "../../hooks/userHook";
import trainingReportHook from "../../hooks/trainingReportHook";
import TrainingReportForm from "../../components/forms/TrainingReportForm";

const ForApprovalReport = ()=>{
    const {data, error, loading} = trainingReportHook.useApproverAssignedReports(SessionGetEmployeeId());
    const [showModal, setShowModal] = useState(false);
    const [effectivenessId, setEffectivenessId] = useState(0);
    const [selectedData, setSElectedData] = useState({});
    const requestData = selectedData?.trainingReport?.trainingRequest;
    const userData = userHook.useUserById(selectedData?.trainingReport?.traineeBadge);
    console.log(userData)
    const actionTemplate = (rowData)=><>
    <div className="d-flex"> 
    <Button type="button" size="small" text icon="pi pi-eye" severity="success"  className="rounded-circle" onClick={()=>{setSElectedData(rowData);
      setShowModal(true)
    }}/>
    <Button type="button" size="small" text icon="pi pi-thumbs-up"  className="rounded-circle" onClick={()=>approveReport(rowData?.trainingReport?.id,true)}/>
    <Button type="button" size="small" text icon="pi pi-thumbs-down" severity="danger" className="rounded-circle" onClick={()=>approveReport(rowData?.trainingReport?.id,false)}/>
    {/* <Button type="button" size="small" text icon="pi pi-trash" severity="danger" className="rounded-circle" onClick={()=>handleDelete(rowData.id)} /> */}
    </div>
    </>
      const approveReport = (id, isApprove) => {
     confirmAction({
        title: isApprove ? "Approve Training Report" : "DisApprove Training Report",
        text: isApprove ? "Are you sure you want to approve this Training Report?" : "Are you sure you want to disapprove this Training Report?",
        confirmButtonText: isApprove? "Approve" : "Disapprove",
        cancelButtonText: "No",
        confirmButtonColor: isApprove? "#4CAF50" : "#f44336",
        onConfirm: ()=>{
          handleResponseAsync(
           ()=> effectivenessService.approvetrainingReport({ 
            transactId: id,
            updatedBy: SessionGetEmployeeId(),
            activityIn: ActivityType.EFFECTIVENESS
          })

          )
        }
     })
      };
  const columnItems = [{
    field: "id",
    header: "Request Id",
    body: (rowData)=><>{rowData?.trainingReport?.trainingRequest?.id}</>
  },
   {
    field: "name",
    header: "Created By",
    body: (rowData)=><>{rowData?.trainingReport?.traineeBadge}</>
  },{
    field: "description",
    header: "Program",
    body: (rowData)=><>{rowData?.trainingReport?.trainingRequest?.trainingProgram?.name}</>
  }, {
    field: "statusName",
    header: "Status",
    body: (rowData)=><>{StatusColor({status:rowData?.trainingReport?.status?.name, showStatus: true})}</>
  }, {
    field:"",
    header: "Action",
    body: actionTemplate
  }
]
    return (
    <div className="p-3">
    <SectionBanner title="Training Request Effectiveness" subtitle="List of for Approval"/>
    <CommonTable
            dataTable={data}
            title="Programs"
            columnItems={columnItems}
          />
          <Modal show={showModal} onHide={()=>setShowModal(false)} fullscreen>
            <Modal.Header closeButton>
              <Modal.Title>Training Effectiveness Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedData?.loading? "Loading..." : <TrainingReportForm userData={userData} data={requestData} defaultValue={selectedData?.trainingReport
}/>}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=>setEffectivenessId(0)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
  </div>
  );
}
export default ForApprovalReport