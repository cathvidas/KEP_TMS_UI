import { DataTable } from "primereact/datatable";
import { SectionHeading } from "../../components/General/Section";
import { Column } from "primereact/column";
import StatusColor from "../../components/General/StatusColor";
import getStatusById from "../../utils/status/getStatusById";
import proptype from "prop-types";
import effectivenessHook from "../../hooks/effectivenessHook";
const PendingView =({data})=>{
    const examTemplate = (rowData) => {
      return (
        <>{StatusColor({status:getStatusById(rowData?.exam), showStatus: true})}</>
      );
    };
    const reportTemplate = (rowData) => {
      return (
        <>{StatusColor({status:getStatusById(rowData.reportId),showStatus: true})}</>
      );
    };
    const evaluationTemplate = (rowData) => {
      return (
        <>{StatusColor({status: getStatusById(rowData.evaluationId), showStatus: true})}</>
      );
    };
    const effectivenessTemplate = (rowData) => {
      const effec = effectivenessHook.useEffectivenessById(
        rowData.effectivenessId
      );
      return (
        <>
          {StatusColor({
            status: effec?.data?.data?.statusName ?? "Pending",
            showStatus: true,
          })}
        </>
      );
    };
    const overallStatusTemplate = (rowData) => {
      const effec = effectivenessHook.useEffectivenessById(
        rowData.effectivenessId
      );
      return (
        <>
          {StatusColor({
            status: effec?.data?.data?.statusName,
            showStatus: true,
          })}
        </>
      );
    };
    console.log(data)
    return(<>
    <SectionHeading title="Trainee Pending Reports" icon={<i className="pi pi-clock"></i>}/>
    <DataTable value={data?.trainingParticipants}
    stripedRows>
    <Column header="No" body={(_, { rowIndex }) => rowIndex + 1} />
        <Column 
        header="Name"
        field="fullname"
        sortable={true}
        >
        </Column>
        <Column 
        header="Name"
        field="employeeBadge"
        sortable={true}
        >
        </Column>
        <Column 
        header="Exam"
        field=""
        sortable
        body={examTemplate}
        >
        </Column>
        <Column 
        header="Training Report"
        field=""
        sortable
        body={reportTemplate}
        >
        </Column>
        <Column 
        header="Evaluation Report"
        field=""
        sortable
        body={evaluationTemplate}
        >
        </Column>
        <Column 
        header="Effectiveness Report"
        field=""
        sortable={true}
        body={effectivenessTemplate}
        >
        </Column>
        <Column 
        header="Overall Status"
        field=""
        sortable={true}
        body={overallStatusTemplate}
        >
        </Column>
    </DataTable>
    </>)

}
PendingView.propTypes = {
  data: proptype.object.isRequired,
}
export default PendingView;