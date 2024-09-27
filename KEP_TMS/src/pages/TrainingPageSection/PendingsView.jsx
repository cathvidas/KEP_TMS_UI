import { DataTable } from "primereact/datatable";
import { SectionHeading } from "../../components/General/Section";
import { Column } from "primereact/column";
import StatusColor from "../../components/General/StatusColor";

const PendingView =({data})=>{
    const statusTemplate =(rowData)=>{
        return <>{StatusColor("Pending", "", {}, true)}</>
    }
    return(<>
    <SectionHeading title="Trainee Pending Reports" icon={<i className="pi pi-clock"></i>}/>
    <DataTable value={data?.trainingParticipants}>
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
        body={statusTemplate}
        >
        </Column>
        <Column 
        header="Training Report"
        field=""
        sortable
        body={statusTemplate}
        >
        </Column>
        <Column 
        header="Evaluation Report"
        field=""
        sortable={true}
        >
        </Column>
        <Column 
        header="Effectiveness Report"
        field=""
        sortable={true}
        >
        </Column>
        <Column 
        header="Overall Status"
        field=""
        sortable={true}
        >
        </Column>
    </DataTable>
    </>)

}
export default PendingView;