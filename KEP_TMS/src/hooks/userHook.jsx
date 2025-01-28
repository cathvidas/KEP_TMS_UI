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
    useAllUsers:(pageNumber, pageSize, searchValue, trigger) => {
      const [data, setData] = useState();
      const [error, setError] = useState(null);
      const [loading, setLoading] = useState(true);
      useEffect(() => {
        const getRequest = async () => {
          handleResponseAsync(
            () =>
              userService.getAllUsers(
                pageNumber,
                pageSize,
                searchValue
              ),
            (e) => setData(e),
            (e) => setError(e),
            () => setLoading(false)
          );
        };
        getRequest();
      }, [pageNumber, pageSize, searchValue, trigger]);
      return {
        data,
        error,
        loading,
      };
    },
    useUsersByRole:(pageNumber, pageSize, role, searchValue, trigger) => {
      const [data, setData] = useState();
      const [error, setError] = useState(null);
      const [loading, setLoading] = useState(true);
      useEffect(() => {
        const getRequest = async () => {
          handleResponseAsync(
            () =>
              userService.getUsersByRole(
                pageNumber,
                pageSize,
                role,
                searchValue
              ),
            (e) => setData(e),
            (e) => setError(e),
            () => setLoading(false)
          );
        };
        getRequest();
      }, [pageNumber, pageSize, searchValue, role,trigger]);
      return {
        data,
        error,
        loading,
      };
    },
    useFacilitators:(pageNumber = 1, pageSize = 100, searchValue, trigger) => {
      const [data, setData] = useState([]);
      const [error, setError] = useState(null);
      const [loading, setLoading] = useState(true);
      useEffect(() => {
        const getRequest = async () => {
          try {
            const admins = await userService.getUsersByRole(
              pageNumber,
              pageSize,
              UserTypeValue.ADMIN,
              searchValue
            );
            const facilitators = await userService.getUsersByRole(
              pageNumber,
              pageSize,
              UserTypeValue.FACILITATOR,
              searchValue
            );
            setData([...admins.results, ...facilitators.results]);
          } catch (err) {
            setError(err);
          }finally {
            setLoading(false);
          }
        };
        getRequest();
      }, [pageNumber, pageSize, searchValue,trigger]);
      return {
        data,
        error,
        loading,
      };
    },
}
export default userHook;