import { useEffect, useState } from "react";
import handleResponseAsync from "../services/handleResponseAsync";
import videoAccessMatrixService from "../services/videoAccessMatrixService";

const videoAccessMatrixHook = {
    useVideoAccessMatrix: (id, trigger) => {
      const [data, setData] = useState({});
      const [error, setError] = useState(null);
      const [loading, setLoading] = useState(true);
      useEffect(() => {
        const fetchData = async () => {
          handleResponseAsync(
            () => videoAccessMatrixService.getVideoAccessMatrix(id),
            (e) => setData(e),
            (e) => setError(e),
            () => setLoading(false)
          );
        };
        fetchData();
      }, [id, trigger]);
      return {
        data,
        error,
        loading,
      };
    },
    useAllVideoAccessMatrix: (trigger) => {
      const [data, setData] = useState([]);
      const [error, setError] = useState(null);
      const [loading, setLoading] = useState(true);
      useEffect(() => {
        const fetchData = async () => {
          handleResponseAsync(
            () => videoAccessMatrixService.getAllVideoAccessMatrix(),
            (e) => setData(e),
            (e) => setError(e),
            () => setLoading(false)
          );
        };
        fetchData();
      }, [trigger]);
      return {
        data,
        error,
        loading,
      };
    },
};
export default videoAccessMatrixHook;