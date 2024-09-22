export const SessionGetUserName = () => {
  return sessionStorage.getItem("fullname");
};
export const SessionGetEmployeeId = () => {
  return sessionStorage.getItem("employeeId");
};
export const SessionGetFirstName = () => {
  return sessionStorage.getItem("firstname");
};
export const SessionGetRole = () => {
  return sessionStorage.getItem("role");
};
export const SessionGetDepartment = () => {
  return sessionStorage.getItem("department");
};
export const SessionGetUserId = () => {
  const id = sessionStorage.getItem("id");
  console.log(id)
  if (id == null) return new Error("User not found, please log in again!");
  return parseInt(id) ;
};

export const SessionSetReference=(data)=>{
  sessionStorage.setItem("fullname", data.fullname);
  sessionStorage.setItem("username", data.username);
  sessionStorage.setItem("firstname", data.firstname);
  sessionStorage.setItem("lastname", data.lastname);
  sessionStorage.setItem("id", data.id);
  sessionStorage.setItem("token", data.token);
  sessionStorage.setItem("employeeId", data.employeeBadge);
  sessionStorage.setItem("role", data.roleName);
  sessionStorage.setItem("department", data.departmentName);
  console.log(data)
}

export const ClearSessions=()=>{
  sessionStorage.clear();
}