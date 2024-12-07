import { useEffect, useState } from "react";
import handleResponseAsync from "../services/handleResponseAsync";
import providerService from "../services/providerService";
import getStatusById from "../utils/status/getStatusById";
import { statusCode } from "../api/constants";

const providerHook = {
  useAllProviders: (active, trigger) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getPrograms = async () => {
        handleResponseAsync(
         () => providerService.getAllProviders(),
          (e) => setData(!active ? e : e.filter((p) => p.statusName === getStatusById(statusCode.ACTIVE))),
          (e) => setError(e),
          ()=>setLoading(false)
        );
      };
      getPrograms();
    }, [active, trigger]);
    return { data, error, loading };
  },
  useProviderById: (id) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getProgram = async () => {
        handleResponseAsync(
          () => providerService.getProviderById(id),
          (e) => setData(e),
          (e) => setError(e),
          ()=>setLoading(false)
        );
      };
      getProgram();
    }, [id]);
    return { data, error, loading };
  },
  usePagedProvider: (pageNumber, pageSize, searchValue, trigger) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequest = async () => {
        handleResponseAsync(
          () =>
            providerService.getPagedProviders(
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
};

export default providerHook;