import { useEffect, useState } from "react";
import commonService from "../services/commonService";
import handleResponseAsync from "../services/handleResponseAsync";
import trainingRequestService from "../services/trainingRequestService";
import trainingReportService from "../services/trainingReportService";
import effectivenessService from "../services/effectivenessService";
import { statusCode } from "../api/constants";
import userMapping from "../services/DataMapping/userMapping";
import externalFacilitatorService from "../services/externalFacilitatorService";
import userService from "../services/userService";

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
          const reports =
            await trainingReportService.getApproverAssignedReports(id);
          const forApprovalEffectiveness = effectiveness?.filter(
            (item) => item.routingActivity?.statusId !== statusCode.TOUPDATE
          );
          setData({
            requests: requests,
            effectiveness: forApprovalEffectiveness,
            reports: reports,
            overallCount:
              requests?.length +
              forApprovalEffectiveness?.length +
              reports?.length
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
  useAllActivityApprovers: (id, activityIn) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequests = async () => {
        handleResponseAsync(
          () =>
            commonService.getActivityApprovers(
              id,
              activityIn,
            ),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      getRequests();
    }, [id, activityIn]);
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
    }, [requestId, activityIn]);
    return { data, error, loading };
  },
  useMappedInternalFacilitatorList: (faciList) => {
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
    return { data, error, loading };
  },
  useFormattedFacilitatorList: (faciList) => {
    const [data, setData] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        try {
          let formattedFacilitators = "";
          const faciNames = await Promise.all(
            faciList?.map(async (faci) => {
              if (faci?.isExternal) {
                const faciDetail =
                  await externalFacilitatorService.getExternaFacilitatorById(
                    faci?.externalFacilitatorId
                  );
                return faciDetail?.name;
              } else {
                const userDetail = await userService.getUserById(
                  faci?.facilitatorBadge
                );
                return userDetail?.fullname;
              }
            })
          );
          formattedFacilitators = faciNames.join("; ");
          setData(formattedFacilitators);
          setLoading(false);
        } catch (err) {
          setError(err?.message);
        }
      };
      fetchData();
    }, [faciList]);
    return { data, error, loading };
  },
};
export default commonHook;
