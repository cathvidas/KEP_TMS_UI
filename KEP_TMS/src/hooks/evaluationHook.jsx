import { useEffect, useState } from "react";
import handleResponseAsync from "../services/handleResponseAsync";
import evaluationService from "../services/evaluationService";

const evaluationHook = {
  useEvaluationId: (id) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const getRequest = async () => {
        handleResponseAsync(
          () => evaluationService.getTrainingEvaluationById(id),
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
  useAllEvaluations: () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequests = async () => {
        handleResponseAsync(
          () => evaluationService.getAllTrainingEvaluation(),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      getRequests();
    },[]);
    return { data, error, loading };
  },
  useAllParticipantsEvaluation: (datalist) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequests = async () => {
        handleResponseAsync(
         async ()=> await Promise.all(
            datalist?.map(async (item) => {
              const response = await evaluationService.getTrainingEvaluationById(
                item?.evaluationId ? item.evaluationId : 0
              );
              return { userDetail: item, reportDetail: response };
            })
          ),
          (e)=> setData(e),
          (e)=>setError(e),
          ()=> setLoading(false)
        )
      };
      getRequests()
    }, [datalist]);
    return { data, error, loading };
  },
};
export default evaluationHook;