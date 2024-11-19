import { useEffect, useState } from "react";
import handleResponseAsync from "../services/handleResponseAsync";
import externalFacilitatorService from "../services/externalFacilitatorService";

const externalFacilitatorHook = {
    useExternalFacilitatorById: (id) => {
      const [data, setData] = useState([]);
      const [error, setError] = useState(null);
      const [loading, setLoading] = useState(true);
      useEffect(() => {
        const getRequest = async () => {
          handleResponseAsync(
            () => externalFacilitatorService.getExternaFacilitatorById(id),
            (e) => setData(e),
            (e) => setError(e),
            () => setLoading(false)
          );
        };
        getRequest();
      }, [id]);
      return {
        data,
        error,
        loading,
      };
    },
    useAllExternalFacilitators: () => {
      const [data, setData] = useState([]);
      const [error, setError] = useState(null);
      const [loading, setLoading] = useState(true);
      useEffect(() => {
        const getRequest = async () => {
          handleResponseAsync(
            () => externalFacilitatorService.getAllExternaFacilitators(),
            (e) => setData(e),
            (e) => setError(e),
            () => setLoading(false)
          );
        };
        getRequest();
      }, []);
      return {
        data,
        error,
        loading,
      };
    },
  usePagedExternalFacilitator: (pageNumber, pageSize, searchValue, trigger) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequest = async () => {
        handleResponseAsync(
          () =>
            externalFacilitatorService.getPagedExternaFacilitator(
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
export default externalFacilitatorHook;