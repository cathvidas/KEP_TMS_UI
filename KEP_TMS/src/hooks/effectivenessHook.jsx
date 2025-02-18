import { useEffect, useState } from "react";
import effectivenessService from "../services/effectivenessService";
import handleResponseAsync from "../services/handleResponseAsync";

const effectivenessHook = {
  useEffectivenessById: (id, trigger) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const getRequest = async () => {
        handleResponseAsync(
          () => effectivenessService.getEffectivenessById(id),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      getRequest();
    }, [id, trigger]);
    return {
      data,
      error,
      loading,
    };
  },
  useAllEffectiveness: (assignee) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequests = async () => {
        handleResponseAsync(
          () =>
            assignee
              ? effectivenessService.getEffectivenessById(assignee)
              : effectivenessService.getAllEffectiveness(),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      getRequests();
    });
    return { data, error, loading };
  },
  useApproverAssignedEffectiveness: (approverId, trigger) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequests = async () => {
        handleResponseAsync(
          () =>
            effectivenessService.getApproverAssignedEffectiveness(approverId),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      getRequests();
    }, [approverId, trigger]);
    return { data, error, loading };
  },
  useEvaluatorAssignedEffectiveness: (id, trigger) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequests = async () => {
        handleResponseAsync(
          () => 
            effectivenessService.getEvaluatorAssignedEffectiveness(id),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      getRequests();
    }, [id, trigger]);
    return { data, error, loading };
  },
  useAllParticipantsEffectiveness: (datalist) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequests = async () => {
        handleResponseAsync(
         async ()=> await Promise.all(
            datalist?.map(async (item) => {
              const response = await effectivenessService.getEffectivenessById(
                item?.effectivenessId ? item.effectivenessId : 0
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
  useAllAssignedEffectivenessEvalutaion :(id)=>{
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequests = async () => {
        handleResponseAsync(
          () => effectivenessService.getEvaluatorAssignedEffectiveness(id),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      getRequests();
    }, [id]);
    return { data, error, loading };
  },
  usePagedEffectiveness: (pageNumber, pageSize, searhValue) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequests = async () => {
        handleResponseAsync(
          () => effectivenessService.getPagedEffectiveness(pageNumber, pageSize, searhValue),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      getRequests();
    }, [pageNumber, pageSize, searhValue]);
    return { data, error, loading };
  },
};
export default effectivenessHook;