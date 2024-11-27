import { useEffect, useState } from "react";
import commonService from "../services/commonService";
import handleResponseAsync from "../services/handleResponseAsync";
import trainingRequestService from "../services/trainingRequestService";
import trainingReportService from "../services/trainingReportService";
import effectivenessService from "../services/effectivenessService";
import trainingDetailsService from "../services/common/trainingDetailsService";
import { statusCode } from "../api/constants";
import userMapping from "../services/DataMapping/userMapping";

const commonHook = {
  useAllDepartments: () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getDepartments = async () => {
        handleResponseAsync(
          () => commonService.getAllDepartments(),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      getDepartments();
    }, []);
    return { data, error, loading };
  },
  useAllAssignedForApproval: (id, trigger) => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const requests =
            await trainingRequestService.getTrainingRequestByApprover(id);
          const effectiveness =
            await effectivenessService.getApproverAssignedEffectiveness(id);
            console.log(effectiveness);
          const reports =
            await trainingReportService.getApproverAssignedReports(id);
          const updatedRequest = requests?.filter(
            (item) =>
              trainingDetailsService.checkTrainingIfOutDated(
                item?.trainingRequest
              ) === false
          );
          const forApprovelEffectiveness =effectiveness?.filter(
            (item) => item.routingActivity?.statusId !== statusCode.TOUPDATE
          );
          // Filter for evaluation (6 months from now)
          const forEvaluation = effectiveness?.filter(
            (item) =>
              item.routingActivity?.statusId === statusCode.TOUPDATE &&
              new Date(item?.trainingEffectiveness?.trainingRequest?.trainingEndDate) <= new Date(new Date().setMonth(new Date().getMonth() - 6))
          );
          
          setData({
            requests: updatedRequest,
            effectiveness: forApprovelEffectiveness,
            reports: reports,
            forEvaluation: forEvaluation,
            overallCount:
              updatedRequest?.length + forApprovelEffectiveness?.length + reports?.length + forEvaluation?.length,
          });
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [id, trigger]);
    return { data, error, loading };
  },
  useAllRoles: () => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRoles = async () => {
        handleResponseAsync(
          () => commonService.getAllRoles(),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      getRoles();
    }, []);
    return { data, error, loading };
  },
  useAllPositions: () => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRoles = async () => {
        handleResponseAsync(
          () => commonService.getAllPositions(),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      getRoles();
    }, []);
    return { data, error, loading };
  },
  useAllEmployeeTypes: () => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRoles = async () => {
        handleResponseAsync(
          () => commonService.getAllEmployeeTypes(),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      getRoles();
    }, []);
    return { data, error, loading };
  },
  useApproverApprovedForms: (assignedTo, activityIn) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequests = async () => {
        handleResponseAsync(
          () => commonService.getApprovedForms(assignedTo, activityIn),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      getRequests();
    }, [assignedTo, activityIn]);
    return { data, error, loading };
  },
  useAllActivityApprovers: (userBadge, activityIn, requestCost) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequests = async () => {
        handleResponseAsync(
          () =>
            commonService.getActivityApprovers(
              userBadge,
              activityIn,
              requestCost
            ),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      getRequests();
    }, [userBadge, activityIn, requestCost]);
    return { data, error, loading };
  },
  useCurrentRouting: (requestId, activityIn) => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getRequests = async () => {
          handleResponseAsync(
            () => commonService.getCurrentRouting(requestId, activityIn),
            (e) => setData(e),
            (e) => setError(e),
            () => setLoading(false)
          );
        };
        getRequests();
      },[requestId, activityIn]
    );
    return { data, error, loading };
  },
  useMappedInternalFacilitatorList: (faciList)=>{
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
          try {
            const facilitators = await userMapping.mapUserIdList(
              faciList,
              "facilitatorBadge"
            );
            setData(facilitators);
            setLoading(false);
          } catch (err) {
            setError(err?.message);
          }
      };
      fetchData();
    }, [faciList]);
    console.log(data, error)
    return { data, error, loading };
  }
};
export default commonHook;
