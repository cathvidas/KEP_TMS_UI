const formatUserName = (userDetail, firtsNameOnly) => {
  let userName =
    userDetail?.firstname && userDetail?.lastname
      ? userDetail.firstname + " " + userDetail.lastname
      : userDetail?.fullname;
  return firtsNameOnly ? userDetail?.firstname : userName;
};
export default formatUserName;
