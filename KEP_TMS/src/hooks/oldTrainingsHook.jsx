import { useEffect, useState } from "react";
import handleResponseAsync from "../services/handleResponseAsync";
import oldTrainingsService from "../services/oldTrainingsService";
import userMapping from "../services/DataMapping/userMapping";
import userService from "../services/userService";

const oldTrainingsHook = {
  useOldExternalRequestById: (id, trigger) => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequest = async () => {
        handleResponseAsync(
          () => oldTrainingsService.getOldExternalRequestById(id),
          async (response) => {
            if (!response) {
              setError("No Request Found");
              setLoading(false);
              return;
            }
            const requestor = await userService.getUserById(
              response.requesterBadge
            );
            const participants = await userMapping.mapUserIdList(
              response.trainingParticipants,
              "employeeBadge"
            );
            setData({
              ...response,
              requestor,
              trainingParticipants: participants,
            });
            setLoading(false);
          },
          (e) => setError(e)
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
  useOldExternalRequest: (
    loader,
    pageNumber,
    pageSize,
    searchValue,
    secondSearchValue,
    thirdSearchValue,
    fourthSearchValue
  ) => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if(loader){
        setLoading(true);
      }
      const getRequests = async () => {
        handleResponseAsync(
          () =>
            oldTrainingsService.getOldExternalRequest(
              pageNumber,
              pageSize,
              searchValue,
              secondSearchValue,
              thirdSearchValue,
              fourthSearchValue
            ),
          (e) => setData(e),
          (e) => setError(e?.message ?? e),
          () => setLoading(false)
        );
      };
      getRequests();
    }, [
      loader,
      pageNumber,
      pageSize,
      searchValue,
      secondSearchValue,
      thirdSearchValue,
      fourthSearchValue,
    ]);
    return { data, error, loading };
  },
  useCombinedTrainings: (
    pageNumber,
    pageSize,
    userId,
    searchValue,
    loader
  ) => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if(loader){
        setLoading(true)
      }
      const getRequests = async () => {
        handleResponseAsync(
          () =>
            oldTrainingsService.getCombinedTrainings(
              pageNumber,
              pageSize,
              userId,
              searchValue,
            ),
          (e) => setData(e),
          (e) => setError(e?.message ?? e),
          () => setLoading(false)
        );
      };
      getRequests();
    }, [
      pageNumber,
      pageSize,
      userId,
      searchValue,
      loader
    ]);
    return { data, error, loading };
  },
  useMappedFacilitator: (faciList) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await Promise.all(
            faciList?.map((facilitator) => {
              return oldTrainingsService.getOldSystemFacilitator(facilitator?.externalFacilitatorId);
            })
          );
          setData(response?.filter(x=>x != null));
          setLoading(false);
        } catch (err) {
          setError(err?.message);
        }
      };
      fetchData();
    }, [faciList]);
    return { data, error, loading };
  },
  useTrainingActivities: (reqId) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        handleResponseAsync(
          ()=>oldTrainingsService.getExternalActivitiesByRequestId(reqId),
          (res)=>setData(res),
          (err)=>setError(err?.message),
          ()=>setLoading(false)
        )
      };
      fetchData();
    }, [reqId]);
    return { data, error, loading };
  },
  useEffectivenessByRequestId: (reqId, reqType) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        handleResponseAsync(
          ()=>oldTrainingsService.getOldEffectivenessByRequestId(reqId, reqType),
          (res)=>setData(res),
          (err)=>setError(err?.message),
          ()=>setLoading(false)
        )
      };
      fetchData();
    }, [reqId, reqType]);
    return { data, error, loading };
  },
  useOldTrainingForms: (reqId, reqType, participantList) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        try{
          const effectiveness = await oldTrainingsService.getOldEffectivenessByRequestId(reqId, reqType);
          let traineeForms = [];
          participantList?.forEach((userDetail) =>{
            const effectivenessDetail = effectiveness?.find(eff => eff?.employeeBadge == userDetail?.employeeBadge);
            const reportDetail = null;
            const evaluationDetail = null;
            traineeForms.push({userDetail, effectivenessDetail, reportDetail, evaluationDetail});
          })
          setData(traineeForms);
          setLoading(false);
        }catch(err){
          setError(err?.message);
        }
      };
      fetchData();
    }, [reqId, reqType, participantList]);
    return { data, error, loading };
  },
};
export default oldTrainingsHook;