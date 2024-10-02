import { useEffect, useState } from "react";
import userService from "../services/userService";
import handleResponseAsync from "../services/handleResponseAsync";

const userHook = {
    useUserById: (id) => {
        
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        handleResponseAsync(
          () => userService.getUserById(id),
          async (e) => {
            setData(e);
          },
          (e) => setError(e)
        );
        setLoading(false);
      };
      fetchData();
    }, []);
    return {
      data,
      error,
      loading,
    };
    }
}
export default userHook;