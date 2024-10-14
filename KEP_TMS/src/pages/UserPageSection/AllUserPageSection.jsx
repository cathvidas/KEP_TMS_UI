import { Button } from "primereact/button";
import CommonTable from "../../components/General/CommonTable";
import { useNavigate } from "react-router-dom";
import { formatDateOnly } from "../../utils/datetime/Formatting";
import proptype from "prop-types"
import { SectionBanner } from "../../components/General/Section";
import { useEffect, useState } from "react";
import AddUserForm from "../../components/forms/ModalForms/AddUserForm";
import NewUserForm from "../../components/forms/ModalForms/NewUserForm";
import mapUserUpdateDetail from "../../services/DataMapping/mapUserUpdateDetails";

const AllUserPageSection = ({userType, data, options, isFilter})=>{
    const [defaultValue, setDefaultValue] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const navigate = useNavigate();
   const filterdata =()=>{
    return userType ? data?.filter(item=>  item.roleName === userType) : data
   }
    const actionTemplate = (rowData) => (
      <>
        <Button
          type="button"
          size="small"
          text
          icon="pi pi-eye"
          severity="help"
          className="rounded-circle"
          onClick={() =>
            navigate(`/KEP_TMS/Users/Detail/${rowData.employeeBadge}`)
          }
        />
        <Button
          type="button"
          size="small"
          text
          icon="pi pi-user-edit"
          className="rounded-circle"
          onClick={() => {
            setDefaultValue(rowData);
            setShowUpdateForm(true);
          }}
        />
        {isFilter && 
        <Button
          type="button"
          size="small"
          text
          icon="pi pi-trash"
          severity="danger"
          className="rounded-circle"
        />}
      </>
    );
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
return (
  <>
    {(userType === "Approver" ||
      userType === "Facilitator" ||
      userType === "Admin") && (
      <SectionBanner
        title={`${userType}s`}
        subtitle={`List of all current ${userType}s`}
        ActionComponents={() => (
          <Button
            className="theme-bg rounded py-1"
            icon="pi pi-user-plus"
            size="small"
            label={`Add ${userType}`}
            type="button"
            onClick={() => setShowForm(true)}
          />
        )}
      />
    )}
    <CommonTable dataTable={filterdata()} columnItems={columnItems} />
    <AddUserForm showForm={showForm} closeForm={()=>setShowForm(false)} userType={userType} data={data} userRoles={options?.options?.roles}/>
    <NewUserForm showForm={showUpdateForm} closeForm={setShowUpdateForm} options={options} defaultData={mapUserUpdateDetail(defaultValue)} headerTitle={"Update User Details"} isUpdate/>
  </>
)
}

AllUserPageSection.propTypes = {
    userType: proptype.string,
    data: proptype.array,
    userRoles: proptype.array,
    options: proptype.object,
    isFilter: proptype.bool,
}
export default AllUserPageSection;