const mapUserUpdateDetail = (data) => {
  return {
    id: data.id,
    username: data?.username,
    firstname: data?.firstname,
    email: data?.email,
    password: data.password,
    status: data.status,
    lastname: data?.lastname,
    positionId: data?.positionId,
    employeeBadge: data?.employeeBadge,
    roleId: data?.roleId,
    departmentId: data?.departmentId,
    employeeTypeId: data?.employeeTypeId,
    superiorBadge: data?.superiorBadge,
    //createdBy:data.createdBy,
    //createdDate:data.createdDate,
    //updatedBy:data.updatedBy,
    //updatedDate:data.updatedDate
  };
};
export default mapUserUpdateDetail;
