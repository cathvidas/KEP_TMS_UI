import { DataTable } from "primereact/datatable";
import { SectionHeading } from "../../components/General/Section";
import { Column } from "primereact/column";
import StatusColor from "../../components/General/StatusColor";
import getStatusById from "../../utils/status/getStatusById";

const PendingView =({data})=>{
    const examTemplate = (rowData) => {
      return (
        <>{StatusColor(getStatusById(rowData?.exam), "", {}, true)}</>
      );
    };
    const reportTemplate = (rowData) => {
      return (
        <>{StatusColor(getStatusById(rowData.reportId), "", {}, true)}</>
      );
    };
    const evaluationTemplate = (rowData) => {
      return (
        <>{StatusColor(getStatusById(rowData.evaluationId), "", {}, true)}</>
      );
    };
    const effectivenessTemplate = (rowData) => {
      return (
        <>{StatusColor(getStatusById(rowData.effectivenessId), "", {}, true)}</>
      );
    };
    const overallStatusTemplate = (rowData) => {
      return (
        <>{StatusColor("Pending", "", {}, true)}</>
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
export default PendingView;