import { DataTable } from "primereact/datatable";
import GeneralTable from "../../components/General/GeneralTable"
import { SectionBanner } from "../../components/General/Section"
import { Column } from "primereact/column";
import CommonTable from "../../components/General/CommonTable";
import { Button } from "primereact/button";
import effectivenessHook from "../../hooks/effectivenessHook";
import { SessionGetEmployeeId } from "../../services/sessions";
import StatusColor from "../../components/General/StatusColor";
import { confirmAction } from "../../services/sweetalert";
import handleResponseAsync from "../../services/handleResponseAsync";

const ForApprovaleffectiveness = ()=>{
    const {data, error, loading} = effectivenessHook.useApproverAssignedEffectiness(SessionGetEmployeeId());
    console.log(data)
    const actionTemplate = (rowData)=><>
    <div className="d-flex"> 
    <Button type="button" size="small" text icon="pi pi-eye" severity="success"  className="rounded-circle" />
    <Button type="button" size="small" text icon="pi pi-thumbs-up"  className="rounded-circle" onClick={()=>approveEffectiveness(true)}/>
    <Button type="button" size="small" text icon="pi pi-thumbs-down" severity="danger" className="rounded-circle" onClick={()=>approveEffectiveness(false)}/>
    {/* <Button type="button" size="small" text icon="pi pi-trash" severity="danger" className="rounded-circle" onClick={()=>handleDelete(rowData.id)} /> */}
    </div>
    </>
      const approveEffectiveness = (isApprove) => {
     confirmAction({
        title: isApprove ? "Approve Effectiveness" : "DisApprove Effectiveness",
        text: isApprove ? "Are you sure you want to approve this Effectiveness?" : "Are you sure you want to disapprove this Effectiveness?",
        confirmButtonText: isApprove? "Approve" : "Disapprove",
        cancelButtonText: "No",
        confirmButtonColor: isApprove? "#4CAF50" : "#f44336",
        onConfirm: ""
     })
      };
  const columnItems = [{
    field: "id",
    header: "Request Id",
    body: (rowData)=><>{rowData?.trainingEffectiveness?.trainingRequest?.id}</>
  },
//   {
//     field: "",
//     header: "Created",
//     body: (rowData)=><>{rowData?.trainingEffectiveness?.trainingProgram?.name}</>
//   },
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
    <SectionBanner title="Training Request Effectiveness" subtitle="List of for Approval"/>
    <CommonTable
            dataTable={data}
            title="Programs"
            columnItems={columnItems}
          />
  </div>
  );
}
export default ForApprovaleffectiveness