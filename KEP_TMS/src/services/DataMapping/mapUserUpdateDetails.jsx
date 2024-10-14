const mapUserUpdateDetail = (data, options) => {
  console.log(options,data)
  return {
    id: data.id,
    username: data?.username,
    firstname: data?.firstname,
    email: data?.email,
    password: data.password,
    statusId: options?.status?.filter(i=>i.label === data?.statusName)?.[0]?.value,
    lastname: data?.lastname,
    positionId: options?.positions?.filter(i=>i.label === data?.position)?.[0]?.value ,
    employeeBadge: data?.employeeBadge,
    roleId: options?.roles?.filter(i=>i.label === data?.roleName)?.[0]?.value ,
    departmentId: options?.departments?.filter(i=>i.label === data?.departmentName)?.[0]?.value ,
    employeeTypeId: options?.empTypes?.filter(i=>i.label === data?.employeeTypeName)?.[0]?.value ,
    superiorBadge: data?.superiorBadge,
    //createdBy:data.createdBy,
    //createdDate:data.createdDate,
    //updatedBy:data.updatedBy,
    //updatedDate:data.updatedDate
  };
};
export default mapUserUpdateDetail;
