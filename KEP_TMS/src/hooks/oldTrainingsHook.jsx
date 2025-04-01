import { useEffect, useState } from "react";
import handleResponseAsync from "../services/handleResponseAsync";
import oldTrainingsService from "../services/oldTrainingsService";
import userMapping from "../services/DataMapping/userMapping";
import userService from "../services/userService";
import { ActivityType, SearchValueConstant, TrainingType } from "../api/constants";
import ErrorTemplate from "../components/General/ErrorTemplate";

const oldTrainingsHook = {
  useOldTrainingRequestById: (type, id, trigger) => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequest = async () => {
        handleResponseAsync(
          () => type == TrainingType.EXTERNAL ? oldTrainingsService.getOldExternalRequestById(id): oldTrainingsService.getOldInternalRequestById(id),
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
    }, [type, id, trigger]);
    return {
      data,
      error,
      loading,
    };
  },
  useOldTrainingRequest: (
    loader,
    trainingType,
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
            oldTrainingsService.getOldTrainingRequest(
              trainingType,
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
      trainingType,
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
  useTrainingActivities: (id, activityType, trainingType) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        handleResponseAsync(
          ()=>activityType == ActivityType.REQUEST ? oldTrainingsService.getExternalActivitiesByRequestId(id) : 
          activityType == ActivityType.EFFECTIVENESS ? oldTrainingsService.getOldEffectivenessActivityById(id, trainingType): null,
          (res)=>setData(res),
          (err)=>setError(err?.message),
          ()=>setLoading(false)
        )
      };
      fetchData();
    }, [id, activityType, trainingType]);
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
  useTrainingReportByRequestId: (reqId, reqType) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        handleResponseAsync(
          ()=>oldTrainingsService.getOldTrainingReportByRequestId(reqId, reqType),
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
          const reports = await oldTrainingsService.getOldTrainingReportByRequestId(reqId, reqType);
          const evaluations = await oldTrainingsService.getOldTrainingEvaluationByRequestId(reqId, reqType);
          let traineeForms = [];
          participantList?.forEach((userDetail) =>{
            const effectivenessDetail = effectiveness?.find(eff => eff?.employeeBadge == userDetail?.employeeBadge);
            const reportDetail = reports?.find(rep => rep?.id == userDetail?.reportId);
            const evaluationDetail = evaluations?.find(eva => eva?.id == userDetail?.evaluationId);
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
  useOldSystemFacilitator: (id) => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        handleResponseAsync(
          ()=>oldTrainingsService.getOldSystemFacilitator(id),
          (res)=>setData(res),
          (err)=>setError(err?.message),
          ()=>setLoading(false)
        )
      };
      fetchData();
    }, [id]);
    return {
      data,
      error,
      loading,
    };
  },
  useUserOldTrainings: (id, reqType) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        handleResponseAsync(
          ()=>reqType == SearchValueConstant.FACILITATED ? oldTrainingsService.getOldFacilitatedTrainings(id) : oldTrainingsService.getOldAttendedTrainings(id),
          (res)=>setData(res),
          (err)=>setError(err?.message),
          ()=>setLoading(false)
        )
      };
      fetchData();
    }, [id, reqType]);
    return {
      data,
      error,
      loading,
    };
  },
  useOldTotalAccumulatedHours: (id) => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        handleResponseAsync(
          ()=>oldTrainingsService.getOldTotalAccumulatedHours(id),
          (res)=>setData(res),
          (err)=>setError(err?.message),
          ()=>setLoading(false)
        )
      };
      fetchData();
    }, [id]);
    return {
      data,
      error,
      loading,
    };
  },
  useOldFacilitatorRating: (userId, reqId) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        handleResponseAsync(
          ()=>oldTrainingsService.getOldFacilitatorRating(userId, reqId),
          (res)=>setData(res),
          (err)=>setError(err?.message),
          ()=>setLoading(false)
        )
      };
      fetchData();
    }, [userId, reqId]);
  return <>
  {loading ? <i className="pi pi-spinner pi-spin"></i> : error? <ErrorTemplate message={error}/> : <>{data ?? "No ratings Found"}</>}
  </>
  }

};
export default oldTrainingsHook;