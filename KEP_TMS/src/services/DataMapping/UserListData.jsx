import { getUserById } from "../../api/UserAccountApi";

export const mapUserListAsync = (users, property)=>{
    console.log(users, property)
    const getUser = async () =>{
        try{ 
            const participants = await Promise.all(
              users.map(async  element => {
                const user = await getUserById(element[property]);
                return user?.data;
              })
            );
            return participants
        }catch(error){
            console.error(error)
        }
    }
    return getUser()

}