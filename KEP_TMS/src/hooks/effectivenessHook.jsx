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
              console.log(response)
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
export default effectivenessHook;