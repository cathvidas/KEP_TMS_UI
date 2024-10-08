import { Button } from "primereact/button";
import CommonTable from "../../components/General/CommonTable";
import GeneralTable from "../../components/General/GeneralTable";
import userHook from "../../hooks/userHook";
import { formatDateOnly } from "../../utils/Formatting";
import UserDetailView from "./UserDetailView";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SkeletonDataTable from "../../components/Skeleton/SkeletonDataTable";

const AllUserPageSection = ({userType})=>{
    const navigate = useNavigate();
    const {data, error, loading} = userHook.useAllUsersAndEmployee();
   const filterdata =()=>{
    return userType ? data.filter(item=>  item.roleName === userType) : data
   }
    const actionTemplate = (rowData)=><>
    <Button type="button" size="small" text icon="pi pi-eye" severity="help" className="rounded-circle" onClick={()=>navigate(`/KEP_TMS/Users/Detail/${rowData.employeeBadge}`)}/>
    <Button type="button" size="small" text icon="pi pi-user-edit" className="rounded-circle" />
    <Button type="button" size="small" text icon="pi pi-trash" severity="danger" className="rounded-circle" />
    </>
    const columnItems = [
        {field: "employeeBadge", header: "Badge No"},
        {field: "fullname", header: "Name"},
        {field: "position", header: "Position"},
        {field: "departmentName", header: "Department"},
        {field: "roleName", header: "User Type"},
        {field: "createdBy", header: "Created By"},
        {field: "createdDate", header: "Date Created" , body: (rowdata)=>formatDateOnly(rowdata?.createdDate)},
        {field: "createdDate", header: "Action" , body:(rowData)=>actionTemplate(rowData)},
    ]
return<>
{loading ? <SkeletonDataTable/>:
<CommonTable dataTable={filterdata()} columnItems={columnItems} />}
</>
}
export default AllUserPageSection;