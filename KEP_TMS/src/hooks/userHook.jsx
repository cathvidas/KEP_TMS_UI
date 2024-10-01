import userService from "../services/userService";

const userHook = {
    useAllUsers: () => {
        const response = await userService.getAllUsers();
        
    }
}
export default userHook;