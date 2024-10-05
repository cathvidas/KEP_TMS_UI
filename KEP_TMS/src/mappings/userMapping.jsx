import userService from "../services/userService";

const userMapping = {
  mapUserIdList: (data, property) => {
    const getUser = async () => {
      try {
        const users = await Promise.all(
          data.map(async (user) => {
            const userDetail = await userService.getUserById(user[property]);
            return {...user, ...userDetail};
          })
        );
        return users;
      } catch (error) {
        console.error(error);
      }
    };
    return getUser();
  },
};
export default userMapping;
