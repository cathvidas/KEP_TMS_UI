import { useEffect, useState } from "react";
import userService from "../services/userService";
import handleResponseAsync from "../services/handleResponseAsync";
import { UserTypeValue } from "../api/constants";

const userHook = {
    useUserById: (id, trigger) => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        handleResponseAsync(
          () => userService.getUserById(id),
          (e) => setData(e),
          (e) => setError(e),
          ()=>setLoading(false)
        );
      };
      fetchData();
    }, [id, trigger]);
    return {
      data,
      error,
      loading,
    };
    }
    , 
    useAllUsersAndEmployee : (trigger)=>{
      const [data, setData] = useState([]);
      const [admins, setAdmins] = useState([]);
      const [facilitators, setFacilitators] = useState([]);
      const [error, setError] = useState(null);
      const [loading, setLoading] = useState(true);
      useEffect(()=>{
        const fetchRegisteredUsers = async ()=>{
          handleResponseAsync(
            () => userService.getAllUsers(),
            (e) => {
              setData(e);
              e?.map((user) => {
                if (user?.roleName === UserTypeValue.ADMIN) {
                  setAdmins((admins) => [...admins, user]);
                }
                if (user?.roleName === UserTypeValue.FACILITATOR) {
                  setFacilitators((facilitators) => [...facilitators, user]);
                }
              });
            },
            (e)=>setError(e),
            ()=>setLoading(false)
          );
        }
        fetchRegisteredUsers();
      }, [trigger])
      return {data, facilitators, admins, error, loading}
    }
}
export default userHook;