import Layout from "../components/General/Layout";
import MenuContainer from "../components/menus/MenuContainer";
import MenuItemTemplate from "../components/General/MenuItemTemplate";
import AllUserPageSection from "./UserPageSection/AllUserPageSection";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserDetailView from "./UserPageSection/UserDetailView";
import { Button } from "primereact/button";
import NewUserForm from "../components/forms/ModalForms/NewUserForm";
import userHook from "../hooks/userHook";
import SkeletonDataTable from "../components/Skeleton/SkeletonDataTable";
import commonHook from "../hooks/commonHook";
import { statusCode, UserTypeValue } from "../api/constants";
import { SessionGetEmployeeId, SessionGetRole } from "../services/sessions";
import NotFoundPage from "./NotFoundPage";

const UserPage = () => {
  const [trigger, setTrigger] = useState(0)
  const [showForm, setShowForm] = useState(false);
  const { page, id } = useParams();
  const navigate = useNavigate();
  const [currentContent, setCurrentContent] = useState(0);
  const { data, loading } = userHook.useAllUsersAndEmployee(trigger);
  const [options, setOptions] = useState({ options: [], loading: true });
  const roles = commonHook.useAllRoles();
  const departments = commonHook.useAllDepartments();
  const positions = commonHook.useAllPositions();
  const empTypes = commonHook.useAllEmployeeTypes();
  const filterdata = (userType) => {
    return userType ? data?.filter((item) => item.roleName === userType) : data;
  };
  const refreshData = ()=>{
    setTrigger(prev=>prev+1);
    setShowForm(false);
  }
  useEffect(() => {
    if (
      !roles?.loading &&
      !departments?.loading &&
      !departments?.loading &&
      !positions?.loading &&
      !empTypes?.loading
    ) {
      const mappedRoles = roles?.data?.map((role) => ({
        label: role.name,
        value: role.id,
      }));
      const mappedDepartments = departments?.data?.map((dept) => ({
        label: dept.name,
        value: dept.id,
      }));
      const mappedPositions = positions?.data
        ?.filter((p) => p.isActive === true)
        ?.map((p) => ({ label: p.positionDesc, value: p.positionId }));
      const mappedEmpTypes = empTypes?.data?.map((emptype) => ({
        label: emptype.name,
        value: emptype.id,
      }));
      const mappedUsers = data?.map((user) => ({
        label: user.fullname,
        value: user.employeeBadge,
      }));
      setOptions((prev) => ({
        ...prev,
        loading: false,
        options: {
          ...options.options,
          roles: mappedRoles,
          departments: mappedDepartments,
          users: mappedUsers,
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
    data,
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
          active: currentContent === 1 ? true : false,
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
          active: currentContent === 3 ? true : false,
        },
        {
          label: "Facilitators",
          template: MenuItemTemplate,
          command: () => navigate("/KEP_TMS/Users/Facilitator"),
          active: currentContent === 4 ? true : false,
        },
        {
          label: "Admins",
          template: MenuItemTemplate,
          command: () => navigate("/KEP_TMS/Users/Admin"),
          active: currentContent === 5 ? true : false,
        },
      ],
    },
  ];
  const pageContent = [
    <UserDetailView
      key={0}
      id={id}
      adminList={filterdata(UserTypeValue.ADMIN)}
      isAdmin={isAdmin}
      options={options}
    />,
    <AllUserPageSection key={1} options={options} data={data} reloadData={refreshData} />,
    <AllUserPageSection
      key={2}
      options={options}
      data={data}
      userType={UserTypeValue.TRAINEE}
      reloadData={refreshData}
    />,
    <AllUserPageSection
      key={3}
      options={options}
      data={data}
      userType={UserTypeValue.REQUESTOR}
      isFilter
      reloadData={refreshData}
    />,
    <AllUserPageSection
      key={4}
      options={options}
      data={data}
      userType={UserTypeValue.FACILITATOR}
      isFilter
      reloadData={refreshData}
    />,
    <AllUserPageSection
      key={5}
      options={options}
      data={data}
      userType={UserTypeValue.ADMIN}
      reloadData={refreshData}
      isFilter
    />,
  ];
  useEffect(() => {
    if (page && id) {
      setCurrentContent(0);
    } else if (page === "Trainee") {
      setCurrentContent(2);
    } else if (page === "Requester") {
      setCurrentContent(3);
    } else if (page === "Facilitator") {
      setCurrentContent(4);
    } else if (page === "Admin") {
      setCurrentContent(5);
    } else {
      setCurrentContent(1);
    }
  }, [page, id]);
  const Content = () => {
    return (
      <>
        <div className={`d-flex g-0`}>
          {isAdmin && (
            <MenuContainer
            label="Users"
            fullHeight
              itemList={items}
              action={
                <Button
                  type="button"
                  label="Add User"
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
            {loading ? <SkeletonDataTable /> : pageContent[currentContent]}
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
  return (currentContent === 0 && SessionGetEmployeeId() === id) || isAdmin ? (
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
