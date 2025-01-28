import { useEffect, useState } from "react";
import trainingRequestService from "../services/trainingRequestService";
import userMapping from "../services/DataMapping/userMapping";
import userService from "../services/userService";
import handleResponseAsync from "../services/handleResponseAsync";
import { ActivityType, statusCode } from "../api/constants";
import mapUserTrainings, {
  mappedTrainingRequestByStatus,
} from "../services/DataMapping/mapUserTrainings";
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

  useAllTrainingRequests: (id = 0) => {
    const [data, setData] = useState([]);
    const [mappedData, setMappedData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        handleResponseAsync(
          () =>
            id !== 0
              ? trainingRequestService.getTrainingRequestsByRequestor(id)
              : trainingRequestService.getAllTrainingRequests(),
          async (e) => {
            setData(e);
            setMappedData(mappedTrainingRequestByStatus(e));
            setLoading(false);
          },
          (e) => setError(e)
        );
      };
      fetchData();
    }, [id]);
    return {
      data,
      mappedData,
      error,
      loading,
    };
  },
  useParticipantTrainings: (id, role) => {
    const [data, setData] = useState([]);
    const [mappedData, setMappedData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        handleResponseAsync(
          () =>
            trainingRequestService.getTrainingRequestByParticipant(id, role),
          async (e) => {
            const updatedRequests = await Promise.all(
              e.map(async (request) => {
                const facilitators = await userMapping.mapUserIdList(
                  request.trainingFacilitators,
                  "facilitatorBadge"
                );
                const approver = await commonService.getCurrentRouting(
                  request.id,
                  ActivityType.REQUEST
                );
                const user = await userService.getUserById(approver.assignedTo);
                const routing = {
                  approverUsername: user.username,
                  approverFullName: user.lastname + ", " + user.firstname,
                  statusId: approver.statusId,
                  approverId: user.employeeBadge,
                  approverPosition: user.position,
                };
                return {
                  ...request,
                  trainingFacilitators: facilitators,
                  routing: routing, // Replace with detailed facilitator information
                };
              })
            );
            setData(updatedRequests);
            setMappedData(mappedTrainingRequestByStatus(updatedRequests));
          },
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      fetchData();
    }, [id, role]);
    return {
      data,
      mappedData,
      error,
      loading,
    };
  },
  useUserTrainingsSummary: (id) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = () => {
        handleResponseAsync(
          () => trainingRequestService.getAllTrainingRequests(),
          (response) => setData(mapUserTrainings(response, id)),
          (error) => setError(error),
          () => setLoading(false)
        );
      };
      fetchData();
    }, [id]);
    return { data, error, loading };
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
          () => trainingRequestService.getTrainingRequestByTraineeId(id),
          (e) => {
            setData(
              e?.filter(
                (item) =>
                  (attended
                    ? trainingDetailsService.checkIfTrainingEndsAlready(item)
                    : true) &&
                  (item?.status?.id === statusCode.APPROVED ||
                    item?.status?.id === statusCode.CLOSED)
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
          () => trainingRequestService.getTrainingRequestByFacilitatorId(id),
          (e) => {
            setData(
              e?.filter(
                (item) =>
                  item?.status?.id === statusCode.APPROVED ||
                  item?.status?.id === statusCode.CLOSED
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
