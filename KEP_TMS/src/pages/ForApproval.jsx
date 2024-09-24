import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Header from "../components/General/Header"
import Layout from "../components/General/Layout"
import { faClipboardList } from "@fortawesome/free-solid-svg-icons"
import { SectionBanner, SectionTitle } from "../components/General/Section"
import RTable from "../components/General/Table"
import { icon } from "@fortawesome/fontawesome-svg-core"
import { useEffect, useState } from "react"
import { getTrainingRequestByApprover } from "../api/trainingServices"
import { SessionGetEmployeeId } from "../services/sessions"
import { mapForApprovalRequestToTableData, mapTRequestToTableData } from "../services/DataMapping/TrainingRequestData"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { formatCurrency, formatDateOnly } from "../utils/Formatting"
import { getUserById } from "../api/UserAccountApi"

const ForApproval =()=>{
  const [request, setRequest] = useState([]);
  useEffect(() => {
    const getRequest = async () => {
      try {
        const res = await getTrainingRequestByApprover(SessionGetEmployeeId());
        console.log(res)
        const mappedData = mapForApprovalRequestToTableData(res);
        setRequest(mappedData);
      } catch (error) {
        console.error(error);
      }
    };
    getRequest();
  }, []);
  
const dateStartTemplate = (rowData) => {
  return (
    <div>
      {formatDateOnly(rowData.startDate)}
    </div>
  );
}
const dateEndTemplate = (rowData) => {
  return (
    <div>
      {formatDateOnly(rowData.startDate)}
    </div>
  );
}
const totalFeeTemplate = (rowData) => {
  return (
    <div>
      {formatCurrency(rowData.totalFee)}
    </div>
  );
}
 const getUserDetail = (user) =>{
  const getUser = async ()=>{
      try{
          const result = await getUserById(user);
          return result.data.fullname
  
      }catch(err){
          console.log(err)
      }

  }
 getUser();
}

console.log(getUserDetail("HR002"));
const userTemplate = (rowData) => {
  return(
    <span>
    {getUserDetail(rowData.requestorId)}</span>
  )
}
  console.log(request)
    const Content =() =>(<>
    
      <SectionBanner title="For Approvals" subtitle="List of Trainings waiting for Approval"/>
      <SectionTitle
        title={"Recent Trainings"}
        Action={{ Link: "#i", Text: "View All" }}
      />


<DataTable value={request} stripedRows tableStyle={{minWidth: "50rem"}}>
  <Column field="id" header="Id"></Column>
  <Column field="requestorName" header="Requestor" body={userTemplate}></Column>
  <Column field="requestorBadge" header="Badge No"></Column>
  <Column field="program" header="Program Name"></Column>
  <Column field="category" header="Category"></Column>
  <Column field="provider" header="Provider"></Column>
  <Column field="venue" header="Venue"></Column>
  <Column field="startDate" header="Start Date" body={dateStartTemplate}></Column>
  <Column field="endDate" header="End Date" body={dateEndTemplate}></Column>
  <Column header="Total Fee" body={totalFeeTemplate}></Column>
  <Column field="currentApprover" header="Current Status"></Column>
</DataTable>

      {/* <RTable userType={"forapproval"} /> */}
      </>
        
    )
    return(<>
    <Layout BodyComponent={Content} header={{ title:"For Approvals", icon: <i className="pi pi-pen-to-square"></i>}}/></>)
}
export default ForApproval