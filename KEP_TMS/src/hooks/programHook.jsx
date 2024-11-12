import { useEffect, useState } from "react";
import handleResponseAsync from "../services/handleResponseAsync";
import programService from "../services/programService";
import { statusCode } from "../api/constants";
import getStatusById from "../utils/status/getStatusById";

const programHook = {
  useAllPrograms: (active, trigger) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getPrograms = async () => {
        handleResponseAsync(
         () => programService.getAllPrograms(),
          (e) => setData(!active ? e : e.filter((item) => item.statusName === getStatusById(statusCode.ACTIVE))),
          (e) => setError(e),
          ()=>setLoading(false)
        );
      };
      getPrograms();
    }, [active, trigger]);
    return { data, error, loading };
  },
  useProgramById: (id) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getProgram = async () => {
        handleResponseAsync(
          () => programService.getProgramById(id),
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

export default programHook;