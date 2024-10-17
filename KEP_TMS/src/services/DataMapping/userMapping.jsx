import userService from "../userService";

const userMapping = {
  mapUserIdList: (data, property, propList) => {
    const getUser = async () => {
      const users = await Promise.all(
        data.map(async (user) => {
          try {
            const userDetail = await userService.getUserById(user[property]);
            if (propList && propList.length > 0) {
              let newData = { ...user };
              propList.forEach((element) => {
                newData = {
                  ...user,
                  [element?.label]: userDetail[element?.value],
                };
              });
              return newData;
            }else{
              return {...user, ...userDetail}
            }} catch {
            return user;
          }
        })
      );
      return users
    };
    return getUser();
  },
};
export default userMapping;
