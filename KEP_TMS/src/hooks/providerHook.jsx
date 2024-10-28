import { useEffect, useState } from "react";
import handleResponseAsync from "../services/handleResponseAsync";
import providerService from "../services/providerService";

const providerHook = {
  useAllProviders: (trigger) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getPrograms = async () => {
        handleResponseAsync(
         () => providerService.getAllProviders(),
          (e) => setData(e),
          (e) => setError(e),
          ()=>setLoading(false)
        );
      };
      getPrograms();
    }, [trigger]);
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
  }
};

export default providerHook;