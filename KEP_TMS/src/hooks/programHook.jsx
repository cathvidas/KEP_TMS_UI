import { useEffect, useState } from "react";
import handleResponseAsync from "../services/handleResponseAsync";
import programService from "../services/programService";

const programHook = {
  useAllPrograms: () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getPrograms = async () => {
        handleResponseAsync(
         () => programService.getAllPrograms(),
          (e) => setData(e),
          (e) => setError(e)
        );
        setLoading(false);
      };
      getPrograms();
    }, []);
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
          (e) => setError(e)
        );
        setLoading(false);
      };
      getProgram();
    }, [id]);
    return { data, error, loading };
  }
};

export default programHook;