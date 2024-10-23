import { useEffect, useState } from "react";
import trainingRequestService from "../services/trainingRequestService";
import userMapping from "../services/DataMapping/userMapping";
import userService from "../services/userService";
import countStatus from "../utils/countStatus";
import handleResponseAsync from "../services/handleResponseAsync";
import { ActivityType } from "../api/constants";
import mapUserTrainings from "../services/DataMapping/mapUserTrainings";
import trainingReportService from "../services/trainingReportService";
import evaluationService from "../services/evaluationService";
import effectivenessService from "../services/effectivenessService";
import commonService from "../services/commonService";
import examService from "../services/examService";

const trainingRequestHook = {
  useTrainingRequest: (id) => {
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
            const facilitators = await userMapping.mapUserIdList(
              response.trainingFacilitators,
              "facilitatorBadge"
            );
            const approvers = await userMapping.mapUserIdList(
              response.approvers,
              "employeeBadge"
            );
            const requestor = await userService.getUserById(
              response.requestorBadge
            );
            const routings =
              await commonService.getRoutingActivityWithAuditTrail(
                response.id,
                ActivityType.REQUEST
              );
            const approver =
              await trainingRequestService.getCurrentRoutingActivity(
                response.id,
                ActivityType.REQUEST
              );
            const currentRouting = await userService.getUserById(
              approver?.assignedTo
            );
            setData({
              ...response,
              trainingParticipants: participants,
              trainingFacilitators: facilitators,
              requestor: requestor,
              routings,
              approvers,
              currentRouting: currentRouting,
            });
            setLoading(false)
          },
          (e) => setError(e),
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

  useAllTrainingRequests: (id = 0, type = null) => {
    const [data, setData] = useState([]);
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
            const updatedRequests = await Promise.all(
              e?.map(async (request) => {
                const facilitators = await userMapping.mapUserIdList(
                  request.trainingFacilitators,
                  "facilitatorBadge"
                );
                const approver =
                  await trainingRequestService.getCurrentRoutingActivity(
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
                  routing, // Replace with detailed facilitator information
                };
              })
            );
            setData(
              type != null
                ? updatedRequests.filter((x) => x?.trainingType?.id === type)
                : updatedRequests
            );
           setLoading(false)
          },
          (e) => setError(e),
        );
      };
      fetchData();
    }, [id, type]);
    return {
      data,
      error,
      loading,
    };
  },
  useStatusCount: (id) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        handleResponseAsync(
          () => trainingRequestService.getAllTrainingRequests(),
          (e) => {
            const userRequest =
              id != null ? e?.filter((x) => x.requestorBadge === id) : e;
            setData(countStatus(e, userRequest));
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
  useAssignedApprovalTrainingRequest: (id) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        handleResponseAsync(
          () => trainingRequestService.getTrainingRequestByApprover(id),
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
  useParticipantTrainings: (id, role) => {
    const [data, setData] = useState([]);
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
                const approver =
                  await trainingRequestService.getCurrentRoutingActivity(
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
          },
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      fetchData();
    }, [id, role]);
    return {
      data,
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
                  
                  console.log(item)
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
                    const exam = item?.traineeExamId ? await examService.getTraineeExam(item?.traineeExamId) : {};
                  return {
                    userDetail: item,
                    reportDetail: report,
                    effectivenessDetail: effectiveness,
                    evaluationDetail: evaluation,
                    examDetail: exam,
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
};

export default trainingRequestHook;
