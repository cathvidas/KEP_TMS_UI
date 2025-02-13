import { Button } from "primereact/button";
import CommonTable from "../../components/General/CommonTable";
import { formatDateOnly } from "../../utils/datetime/Formatting";
import proptype from "prop-types";
import { useEffect, useState } from "react";
import AddUserForm from "../../components/forms/ModalForms/AddUserForm";
import NewUserForm from "../../components/forms/ModalForms/NewUserForm";
import mapUserUpdateDetail from "../../services/DataMapping/mapUserUpdateDetails";
import {
  actionFailed,
  actionSuccessful,
  confirmAction,
} from "../../services/sweetalert";
import handleResponseAsync from "../../services/handleResponseAsync";
import userService from "../../services/userService";
import { UserTypeValue } from "../../api/constants";
import { SessionGetEmployeeId, SessionGetRole } from "../../services/sessions";
import { ButtonGroup } from "primereact/buttongroup";
import userHook from "../../hooks/userHook";
import { Paginator } from "primereact/paginator";
import UserDetailView from "./UserDetailView";

const AllUserPageSection = ({
  userType,
  id,
  options,
  reloadData,
}) => {
  const [defaultValue, setDefaultValue] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [userId, setUserId] = useState("");
  const [paginatorConfig, setPaginatorConfig] = useState({
    first: 0,
    rows: 10,
    page: 1,
    value: null,
  });
  const { data, loading } = userType ?  userHook.useUsersByRole(
    paginatorConfig.page,
    paginatorConfig.rows,
    userType,
    paginatorConfig.value,trigger
  ): userHook.useAllUsers(
    paginatorConfig.page,
    paginatorConfig.rows,
    paginatorConfig.value,
    trigger
  );
  useEffect(()=>{
    if(id){
      setUserId(id);
      setShowDetails(true);
    }else{
      setUserId("");
      setShowDetails(false);
    }
  }, [id])
  const actionTemplate = (rowData) => (
    <ButtonGroup className="d-flex">
      <Button
        type="button"
        size="small"
        text
        icon="pi pi-eye"
        severity="success"
        className="rounded-circle"
        onClick={() => {
          setUserId(rowData.employeeBadge);
          setShowDetails(true);
        }}
      />
      {userType && (
        <Button
          type="button"
          size="small"
          text
          icon="pi pi-pencil"
          className="rounded-circle"
          onClick={() => {
            setDefaultValue(rowData);
            setShowUpdateForm(true);
          }}
        />
      )}
      {userType && (
        <Button
          type="button"
          size="small"
          text
          icon="pi pi-trash"
          severity="danger"
          className="rounded-circle"
          onClick={() => handleRemoveUser(rowData)}
        />
      )}
    </ButtonGroup>
  );
  const handleRemoveUser = (data) => {
    const roleId = options?.options?.roles?.filter(
      (role) => role.label === UserTypeValue.TRAINEE
    )?.[0]?.value;
    const newData = {
      ...mapUserUpdateDetail(data, options?.options),
      roleId: roleId,
      updatedBy: SessionGetEmployeeId(),
    };
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
          reloadData
        );
      },
    });
  };
  const columnItems = [
    {
      // field: "id",
      header: "No",
      body: (_, { rowIndex }) => <>{paginatorConfig.first + 1+ rowIndex}</>,
    },
    { field: "employeeBadge", header: "User ID" },
    { field: "fullname", header: "Name" },
    { field: "email", header: "Email" },
    { field: "position", header: "Position" },
    { field: "departmentName", header: "Department" },
    { field: "roleName", header: "Role" },
    { field: "createdBy", header: "Created By" },
    {
      field: "createdDate",
      header: "Date Created",
      body: (rowdata) => formatDateOnly(rowdata?.createdDate),
    },
    userType ? { field: "statusName", header: "Status" } : "",
    {
      field: "createdDate",
      header: "Action",
      body: (rowData) => actionTemplate(rowData),
    },
  ].filter((item) => item !== "");
  const header = (
    <div className="flex justify-content-between">
      <div className="flex flex-wrap gap-3">
        <div className="flex theme-color">
          <h6 className="theme-color m-0 fw-bold">{`${
            userType ?? "All"
          } Users`}</h6>
        </div>
        <Button
          className="rounded py-1"
          text
          icon="pi pi-user-plus"
          size="small"
          label={`Add ${userType}`}
          type="button"
          onClick={() => setShowForm(true)}
        />
      </div>
    </div>
  );
  return (
    <>
      {showDetails ? (
        <>
        {!id &&
          <div className="flex">
            <Button
              type="button"
              label="Back"
              className="theme-bg rounded py-1 ms-auto mb-2"
              icon="pi pi-arrow-left"
              onClick={() => setShowDetails(false)}
            />
          </div>}
          <UserDetailView
            key={0}
            id={userId}
            // adminList={filterdata(UserTypeValue.ADMIN)}
            isAdmin={SessionGetRole()=== UserTypeValue.ADMIN}
            options={options}
          />
        </>
      ) : (
        <>
          <CommonTable
            headerComponent={
              userType === UserTypeValue.REQUESTOR ||
              userType === UserTypeValue.FACILITATOR ||
              userType === UserTypeValue.ADMIN
                ? header
                : null
            }
            loading={loading}
            dataTable={data?.results}
            columnItems={columnItems}
            hidePaginator
            hideOnEmpty={false}
            onInputChange={(e) =>
              setPaginatorConfig((prev) => ({
                ...prev,
                value: e,
                page: 1,
                first: 0,
              }))
            }
          />
          {!loading && (
            <Paginator
              first={paginatorConfig?.first ?? 1}
              pageLinkSize={5}
              rows={paginatorConfig.rows}
              totalRecords={data?.totalRecords}
              rowsPerPageOptions={[10, 20, 30, 50, 100]}
              onPageChange={(e) =>
                setPaginatorConfig((prev) => ({
                  ...prev,
                  first: e.first,
                  rows: e.rows,
                  page: e.page + 1,
                }))
              }
            />
          )}
        </>
      )}
      <AddUserForm
        showForm={showForm}
        closeForm={() => setShowForm(false)}
        userType={userType}
        data={data?.results}
        userRoles={options?.options?.roles}
        optionList={options?.options}
        onFinish={()=>{setShowForm(false);
          setTrigger(prev=> prev+1)
        }}
      />
      <NewUserForm
        showForm={showUpdateForm}
        closeForm={setShowUpdateForm}
        options={options}
        defaultData={mapUserUpdateDetail(defaultValue, options?.options)}
        headerTitle={"Update User Details"}
        isUpdate
        onFinish={()=>{setShowUpdateForm(false);
          setTrigger(prev=> prev+1)
        }}
      />
    </>
  );
};

AllUserPageSection.propTypes = {
  userType: proptype.string,
  options: proptype.object,
  id: proptype.any,
  reloadData: proptype.func,
};
export default AllUserPageSection;
