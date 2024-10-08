import { useEffect, useState } from "react";
import handleResponseAsync from "../services/handleResponseAsync";
import categoryService from "../services/categoryService";

const categoryHook = {
  useAllCategories: () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getPrograms = async () => {
        handleResponseAsync(
         () => categoryService.getAllCategories(),
          (e) => setData(e),
          (e) => setError(e),
          ()=>setLoading(false)
        );
      };
      getPrograms();
    }, []);
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