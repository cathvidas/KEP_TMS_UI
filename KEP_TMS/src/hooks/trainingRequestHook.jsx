import { useEffect, useState } from "react";
import trainingRequestService from "../services/trainingRequestService";
import userMapping from "../services/DataMapping/userMapping";
import userService from "../services/userService";
import handleResponseAsync from "../services/handleResponseAsync";
import { ActivityType } from "../api/constants";
import trainingReportService from "../services/trainingReportService";
import evaluationService from "../services/evaluationService";
import effectivenessService from "../services/effectivenessService";
import commonService from "../services/commonService";
import routingService from "../services/common/routingService";
import ErrorTemplate from "../components/General/ErrorTemplate";

const trainingRequestHook = {
  useTrainingRequest: (id, trigger) => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequest = async () => {
        handleResponseAsync(
          () => trainingRequestService.getTrainingRequest(id),
          async (response) => {
            if (!response) {
              setError("No Request Found");
              setLoading(false);
              return;
            }
            const participants = await userMapping.mapUserIdList(
              response.trainingParticipants,
              "employeeBadge"
            );
            const approvers = await commonService.getActivityApprovers(
              response?.id,
              ActivityType.REQUEST
            );
            const requestor = await userService.getUserById(
              response.requesterBadge
            );
            const auditTrail = await commonService.getAuditTrail(
              id,
              ActivityType.REQUEST
            );
            const routings =
              await commonService.getRoutingActivityWithAuditTrail(
                response.id,
                ActivityType.REQUEST
              );
            const currentRouting = await routingService.getCurrentApprover(
              routings
            );
            if (!currentRouting?.assignedDetail) {
              currentRouting.assignedDetail = await userService.getUserById(
                currentRouting?.assignedTo
              );
            }
            setData({
              ...response,
              trainingParticipants: participants,
              requestor: requestor,
              routings,
              approvers,
              currentRouting: { ...currentRouting },
              auditTrail,
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
  useAllParticipantsReports: (datalist) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequests = async () => {
        if (datalist?.length > 0) {
          handleResponseAsync(
            async () =>
              await Promise.all(
                datalist?.map(async (item) => {
                  const report = item?.reportId
                    ? await trainingReportService.getTrainingReportById(
                        item.reportId
                      )
                    : {};
                  const evaluation = item?.evaluationId
                    ? await evaluationService.getTrainingEvaluationById(
                        item.evaluationId
                      )
                    : {};
                  const effectiveness = item?.effectivenessId
                    ? await effectivenessService.getEffectivenessById(
                        item.effectivenessId
                      )
                    : {};
                  return {
                    userDetail: item,
                    reportDetail: report,
                    effectivenessDetail: effectiveness,
                    evaluationDetail: evaluation,
                  };
                })
              ),
            (e) => setData(e),
            (e) => setError(e),
            () => setLoading(false)
          );
        }
      };
      getRequests();
    }, [datalist]);
    return { data, error, loading };
  },
  useAllParticipantsTrainingForms: (reqId, datalist) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequests = async () => {
        const effectiveness =
          await effectivenessService.getEffectivenessByRequestId(reqId);
        const reports =
          await trainingReportService.getTrainingReportByRequestId(reqId);
        const evaluations =
          await evaluationService.getTrainingEvaluationsByRequestId(reqId);
        if (datalist?.length > 0) {
          handleResponseAsync(
            async () =>
              await Promise.all(
                datalist?.map(async (item) => {
                  const reportDetail =
                    reports?.find((r) => r?.id === item?.reportId) ?? {};
                  const evaluationDetail =
                    evaluations?.find((r) => r?.id === item?.evaluationId) ??
                    {};
                  const effectivenessDetail =
                    effectiveness?.find(
                      (eff) => eff?.id == item.effectivenessId
                    ) ?? {};
                  return {
                    userDetail: item,
                    reportDetail,
                    effectivenessDetail,
                    evaluationDetail,
                  };
                })
              ),
            (e) => setData(e),
            (e) => setError(e),
            () => setLoading(false)
          );
        }
      };
      getRequests();
    }, [reqId, datalist]);
    return { data, error, loading };
  },
  usePagedTrainingRequest: (
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
      const getRequests = async () => {
        handleResponseAsync(
          () =>
            trainingRequestService.getPagedTrainingRequest(
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
      pageNumber,
      pageSize,
      searchValue,
      secondSearchValue,
      thirdSearchValue,
      fourthSearchValue,
    ]);
    return { data, error, loading };
  },
  useTrainingsAttended: (id) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        handleResponseAsync(
          () => trainingRequestService.getTrainingsAttended(id),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      fetchData();
    }, [id]);
    return {
      data,
      error,
      loading,
    };
  },
  useTrainingsFacilitated: (id) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        handleResponseAsync(
          () => trainingRequestService.getTrainingsFacilitated(id),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      fetchData();
    }, [id]);
    return {
      data,
      error,
      loading,
    };
  },
  useTrainingRequestSummary: (id) => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        handleResponseAsync(
          () => trainingRequestService.getTrainingRequestSummary(id),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      fetchData();
    }, [id]);
    return {
      data,
      error,
      loading,
    };
  },
  useFacilitatorRating: (userId, reqId) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      const fetchData = async () => {
        handleResponseAsync(
          () => commonService.getFacilitatorRating(reqId, userId),
          (e) => setData(e ? Math.round(e * 100) / 100 : e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      fetchData();
    }, [reqId, userId]);
    return (
      <>
        {loading ? (
          <i className="pi pi-spinner pi-spin"></i>
        ) : error ? (
          <ErrorTemplate message={error} />
        ) : (
          <>{data ?? "No ratings Found"}</>
        )}
      </>
    );
  },
};

export default trainingRequestHook;
