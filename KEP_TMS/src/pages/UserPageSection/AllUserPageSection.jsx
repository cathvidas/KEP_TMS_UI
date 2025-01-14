import { Button } from "primereact/button";
import CommonTable from "../../components/General/CommonTable";
import { useNavigate } from "react-router-dom";
import { formatDateOnly } from "../../utils/datetime/Formatting";
import proptype from "prop-types";
import { useState } from "react";
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
import { SessionGetEmployeeId } from "../../services/sessions";
import { ButtonGroup } from "primereact/buttongroup";

const AllUserPageSection = ({
  userType,
  data,
  options,
  isFilter,
  reloadData,
}) => {
  const [defaultValue, setDefaultValue] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const navigate = useNavigate();
  const actionTemplate = (rowData) => (
    <ButtonGroup className="d-flex">
      <Button
        type="button"
        size="small"
        text
        icon="pi pi-eye"
        severity="success"
        className="rounded-circle"
        onClick={() =>
          navigate(`/KEP_TMS/Users/Detail/${rowData.employeeBadge}`)
        }
      />
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
      {isFilter && (
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
    { field: "employeeBadge", header: "ID" },
    { field: "fullname", header: "Name" },
    { field: "email", header: "Email" },
    { field: "position", header: "Position" },
    { field: "departmentName", header: "Department" },
    { field: "roleName", header: "User Type" },
    { field: "createdBy", header: "Created By" },
    {
      field: "createdDate",
      header: "Date Created",
      body: (rowdata) => formatDateOnly(rowdata?.createdDate),
    },
    { field: "statusName", header: "Status" },
    {
      field: "createdDate",
      header: "Action",
      body: (rowData) => actionTemplate(rowData),
    },
  ];
  const header = (
    <div className="flex justify-content-between">
      <div className="flex flex-wrap gap-3">
        <div className="flex theme-color">
          <h6 className="theme-color m-0 fw-bold">{`${userType ?? "All"} Users`}</h6>
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
      <CommonTable
        headerComponent={
          userType === UserTypeValue.REQUESTOR ||
          userType === UserTypeValue.FACILITATOR ||
          userType === UserTypeValue.ADMIN
            ? header
            : null
        }
        dataTable={
          userType ? data?.filter((item) => item?.roleName === userType) : data
        }
        columnItems={columnItems}
      />
      <AddUserForm
        showForm={showForm}
        closeForm={() => setShowForm(false)}
        userType={userType}
        data={data}
        userRoles={options?.options?.roles}
        optionList={options?.options}
        onFinish={reloadData}
      />
      <NewUserForm
        showForm={showUpdateForm}
        closeForm={setShowUpdateForm}
        options={options}
        defaultData={mapUserUpdateDetail(defaultValue, options?.options)}
        headerTitle={"Update User Details"}
        isUpdate
        onFinish={reloadData}
      />
    </>
  );
};

AllUserPageSection.propTypes = {
  userType: proptype.string,
  data: proptype.array,
  userRoles: proptype.array,
  options: proptype.object,
  isFilter: proptype.bool,
  reloadData: proptype.func,
};
export default AllUserPageSection;
