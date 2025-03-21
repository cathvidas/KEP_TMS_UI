import { useEffect, useState } from "react";
import trainingRequestService from "../services/trainingRequestService";
import userMapping from "../services/DataMapping/userMapping";
import userService from "../services/userService";
import handleResponseAsync from "../services/handleResponseAsync";
import { ActivityType, SearchValueConstant, statusCode } from "../api/constants";
import trainingReportService from "../services/trainingReportService";
import evaluationService from "../services/evaluationService";
import effectivenessService from "../services/effectivenessService";
import commonService from "../services/commonService";
import routingService from "../services/common/routingService";
import trainingDetailsService from "../services/common/trainingDetailsService";

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
  useTrainingRequestByTraineeId: (id, attended) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        handleResponseAsync(
          () => trainingRequestService.getPagedTrainingRequest(1, 1000, SearchValueConstant.PARTICIPANT, id),
          (e) => {
            setData(
              e?.results?.filter(
                (item) =>
                  (attended
                    ? trainingDetailsService.checkIfTrainingEndsAlready(item)
                    : true) &&
                  (item?.status?.id !== statusCode.DISAPPROVED ||
                    item?.status?.id !== statusCode.INACTIVE)
              )
            );
          },
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      fetchData();
    }, [id, attended]);
    return {
      data,
      error,
      loading,
    };
  },
  useTrainingRequestByFacilitatorId: (id) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        handleResponseAsync(
          () => trainingRequestService.getPagedTrainingRequest(1, 1000, SearchValueConstant.FACILITATOR, id),
          (e) => {
            setData(
              e?.results?.filter(
                (item) => trainingDetailsService.checkIfTrainingEndsAlready(item) &&
                  (item?.status?.id !== statusCode.INACTIVE ||
                  item?.status?.id !== statusCode.DISAPPROVED)
              )
            );
          },
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
};

export default trainingRequestHook;
