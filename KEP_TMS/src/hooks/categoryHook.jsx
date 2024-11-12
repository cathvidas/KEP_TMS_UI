import { useEffect, useState } from "react";
import handleResponseAsync from "../services/handleResponseAsync";
import categoryService from "../services/categoryService";
import getStatusById from "../utils/status/getStatusById";
import { statusCode } from "../api/constants";

const categoryHook = {
  useAllCategories: (active, trigger) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getPrograms = async () => {
        handleResponseAsync(
         () => categoryService.getAllCategories(),
          (e) => setData(!active ? e : e?.filter((item) => item.status === getStatusById(statusCode.ACTIVE))),
          (e) => setError(e),
          ()=>setLoading(false)
        );
      };
      getPrograms();
    }, [active, trigger]);
    return { data, error, loading };
  },
  useCategoryById: (id) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getProgram = async () => {
        handleResponseAsync(
          () => categoryService.getCategoryById(id),
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

export default categoryHook;