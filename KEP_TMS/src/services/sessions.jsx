export const SessionGetUserName = () => {
  return sessionStorage.getItem("fullname");
};
export const SessionGetUserId = () => {
  const id = sessionStorage.getItem("id");
  if (id == null) return new Error("User not found, please log in again!");
  return parseInt(id) ;
};
