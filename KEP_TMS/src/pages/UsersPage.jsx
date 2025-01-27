import Layout from "../components/General/Layout";
import MenuContainer from "../components/menus/MenuContainer";
import MenuItemTemplate from "../components/General/MenuItemTemplate";
import AllUserPageSection from "./UserPageSection/AllUserPageSection";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import NewUserForm from "../components/forms/ModalForms/NewUserForm";
import commonHook from "../hooks/commonHook";
import { statusCode, UserTypeValue } from "../api/constants";
import { SessionGetEmployeeId, SessionGetRole } from "../services/sessions";
import NotFoundPage from "./NotFoundPage";

const UserPage = () => {
  const [showForm, setShowForm] = useState(false);
  const { page, id } = useParams();
  const navigate = useNavigate();
  const [options, setOptions] = useState({ options: [], loading: true });
  const roles = commonHook.useAllRoles();
  const departments = commonHook.useAllDepartments();
  const positions = commonHook.useAllPositions();
  const empTypes = commonHook.useAllEmployeeTypes();  
  const [userType, setUserType] = useState("");
  
  const refreshData = ()=>{
    setShowForm(false);
  }
  useEffect(() => {
    if (
      !roles?.loading &&
      !departments?.loading &&
      !positions?.loading &&
      !empTypes?.loading
    ) {
      const mappedRoles = roles?.data?.map((role) => ({
        label: role.name,
        value: role.id,
      }));
      const mappedDepartments = departments?.data?.map((dept) => ({
        label: dept.deptName,
        value: dept.deptId,
      }));
      const mappedPositions = positions?.data
        ?.filter((p) => p.isActive === 1)
        ?.map((p) => ({ label: p.positionDesc, value: p.positionId }));
      const mappedEmpTypes = empTypes?.data?.map((emptype) => ({
        label: emptype.name,
        value: emptype.id,
      }));
      // const mappedUsers = data?.map((user) => ({
      //   label: user.fullname,
      //   value: user.employeeBadge,
      // }));
      setOptions((prev) => ({
        ...prev,
        loading: false,
        options: {
          ...options.options,
          roles: mappedRoles,
          departments: mappedDepartments,
          // users: mappedUsers,
          positions: mappedPositions,
          empTypes: mappedEmpTypes,
          status: [
            { label: "Active", value: statusCode.ACTIVE },
            { label: "Inactive", value: statusCode.INACTIVE },
          ],
        },
      }));
    }
  }, [
    // data,
    roles?.loading,
    departments?.loading,
    positions?.loading,
    empTypes?.loading,
  ]);

  const isAdmin =
    SessionGetRole() === UserTypeValue.ADMIN ||
    SessionGetRole() === UserTypeValue.SUPER_ADMIN;
  const items = [
    {
      items: [
        {
          label: "All Users",
          template: MenuItemTemplate,
          command: () => navigate("/KEP_TMS/Users"),
          active: userType === null,
        },
        // {
        //   label: "Trainees",
        //   template: MenuItemTemplate,
        //   command: () => navigate("/KEP_TMS/Users/Trainee"),
        //   active: currentContent === 2 ? true : false,
        // },
        // {
        //   label: "Approvers",
        //   icon: "pi pi-users",
        //   template: MenuItemTemplate,
        //   command: () => navigate("/KEP_TMS/Users/Approver"),
        //   active: currentContent === 3 ? true : false,
        // },
        {
          label: "Requester",
          template: MenuItemTemplate,
          command: () => navigate("/KEP_TMS/Users/Requester"),
          active: userType === UserTypeValue.REQUESTOR,
        },
        {
          label: "Facilitators",
          template: MenuItemTemplate,
          command: () => navigate("/KEP_TMS/Users/Facilitator"),
          active: userType === UserTypeValue.FACILITATOR,
        },
        {
          label: "Admins",
          template: MenuItemTemplate,
          command: () => navigate("/KEP_TMS/Users/Admin"),
          active: userType === UserTypeValue.ADMIN,
        },
      ],
    },
  ];
  useEffect(() => {
    if (page === "Requester") {
      setUserType(UserTypeValue.REQUESTOR);
    } else if (page === "Facilitator") {
      setUserType(UserTypeValue.FACILITATOR);
    } else if (page === "Admin") {
      setUserType(UserTypeValue.ADMIN);
    } else {
      setUserType(null);
    }
  }, [page, id]);
  const Content = () => {
    return (
      <>
        <div className={`d-flex g-0`}>
          {(isAdmin && !id) && (
            <MenuContainer
              label="Users"
              fullHeight
              itemList={items}
              action={
                <Button
                  type="button"
                  label="New User"
                  className="theme-bg rounded py-1"
                  icon="pi pi-plus"
                  onClick={() => setShowForm(true)}
                />
              }
            />
          )}
          <div
            className={`p-3 pb-5 flex-grow-1`}
            style={{ minHeight: "100vh" }}
          >
            <AllUserPageSection
              key={3}
              options={options}
              id={id}
              userType={userType}
              isFilter
              reloadData={refreshData}
            />
          </div>
        </div>
        <NewUserForm
          showForm={showForm}
          closeForm={() => setShowForm(false)}
          options={options}
          headerTitle="Add New User"
          onFinish={refreshData}
        />
      </>
    );
  };
  return (SessionGetEmployeeId() === id) || isAdmin ? (
    <Layout
      navReference="Users"
      header={{ title: "Users", icon: <i className="pi pi-users"></i>, hide:true }}
      BodyComponent={Content}
    />
  ) : (
    <NotFoundPage />
  );
};
export default UserPage;
