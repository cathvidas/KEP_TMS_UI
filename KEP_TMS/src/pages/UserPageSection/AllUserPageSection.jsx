import { Button } from "primereact/button";
import CommonTable from "../../components/General/CommonTable";
import { useNavigate } from "react-router-dom";
import { formatDateOnly } from "../../utils/datetime/Formatting";
import proptype from "prop-types"
import { SectionBanner } from "../../components/General/Section";
import { useState } from "react";
import AddUserForm from "../../components/forms/ModalForms/AddUserForm";
import NewUserForm from "../../components/forms/ModalForms/NewUserForm";
import mapUserUpdateDetail from "../../services/DataMapping/mapUserUpdateDetails";
import { actionFailed, actionSuccessful, confirmAction } from "../../services/sweetalert";
import handleResponseAsync from "../../services/handleResponseAsync";
import userService from "../../services/userService";
import { UserTypeValue } from "../../api/constants";
import { SessionGetEmployeeId } from "../../services/sessions";

const AllUserPageSection = ({userType, data, options, isFilter})=>{
    const [defaultValue, setDefaultValue] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const navigate = useNavigate();
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
          onClick={()=>handleRemoveUser(rowData)}
        />}
      </>
    );
    const handleRemoveUser = (data)=>{
        const roleId = options?.options?.roles?.filter(role=>role.label === UserTypeValue.TRAINEE)?.[0]?.value;
        const newData = {...mapUserUpdateDetail(data, options?.options), roleId: roleId, updatedBy: SessionGetEmployeeId()}
        confirmAction({
            title: "Confirm Remove?",
            text: `Are you sure you want to remove this user as ${userType}?`,
            confirmButtonText: "Remove",
            confirmButtonColor: "#d33",
            
            onConfirm: () => {
              handleResponseAsync(
                () => userService.updateUser(newData),
                (e) => actionSuccessful("Success!", e.message),
                (e) => actionFailed("Error!", e.message),
                ()=>window.location.reload()
              );
            },
          });
    }
    const columnItems = [
        {field: "_", header: "No", body: (_, {rowIndex})=><>{rowIndex + 1}</>},
        {field: "employeeBadge", header: "Badge No"},
        {field: "fullname", header: "Name"},
        {field: "position", header: "Position"},
        {field: "departmentName", header: "Department"},
        {field: "roleName", header: "User Type"},
        {field: "createdBy", header: "Created By"},
        {field: "createdDate", header: "Date Created" , body: (rowdata)=>formatDateOnly(rowdata?.createdDate)},
        {field: "statusName", header: "Status"},
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
    <CommonTable dataTable={data} columnItems={columnItems} tableName={`${userType ?? "All"} Users`}/>
    <AddUserForm showForm={showForm} closeForm={()=>setShowForm(false)} userType={userType} data={data} userRoles={options?.options?.roles} optionList={options?.options}/>
    <NewUserForm showForm={showUpdateForm} closeForm={setShowUpdateForm} options={options} defaultData={mapUserUpdateDetail(defaultValue, options?.options)} headerTitle={"Update User Details"} isUpdate/>
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