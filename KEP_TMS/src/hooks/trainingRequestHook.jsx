import { useEffect, useState } from "react";
import trainingRequestService from "../services/trainingRequestService";
import userMapping from "../mappings/userMapping";
import userService from "../services/userService";
import { getRoutingActivity } from "../api/trainingServices";
import countStatus from "../utils/countStatus";
import handleResponseAsync from "../services/handleResponseAsync";
import { ActivityType } from "../api/constants";

const trainingRequestHook = {
  useTrainingRequest: (id) => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      const getRequest = async () => {
        try {
          setLoading(true);
          const response = await trainingRequestService.getTrainingRequest(id);
          console.log(response);
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
          const routing = await getRoutingActivity(response.id, 1);
          setData({
            ...response,
            trainingParticipants: participants,
            trainingFacilitators: facilitators,
            requestor: requestor,
            routing: routing,
            approvers,
          });
        } catch (error) {
          setError(error);
        }
        setLoading(false);
      };
      getRequest();
    }, [id]);
    return {
      data,
      error,
      loading,
    };
  },

  useAllTrainingRequests: (id) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        handleResponseAsync(
          () =>
            id
              ? trainingRequestService.getTrainingRequestsByRequestor(id)
              : trainingRequestService.getAllTrainingRequests(),
          async (e) => {
            const updatedRequests = await Promise.all(
              e?.data.map(async (request) => {
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
          (e) => setError(e)
        );
        setLoading(false);
      };
      fetchData();
    }, []);
    return {
      data,
      error,
      loading,
    };
  },
  useStatusCount: (id, role) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        handleResponseAsync(
          () =>trainingRequestService.getAllTrainingRequests(),
          (e) => {
            const userRequest = id != null? e?.data?.filter((x)=>x.requestorBadge === id): e.data;
            setData(countStatus(e.data,userRequest))
          },
          // (e) => setData(countStatus(e.data)),
          (e) => setError(e)
        );
        setLoading(false);
      };
      fetchData();
      console.log(data);
    }, []);
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
      console.log(id)
      const fetchData = async () => {
        handleResponseAsync(
          ()=>trainingRequestService.getTrainingRequestByApprover(id),
          (e)=>setData(e),
          (e)=>setError(e)
        )
        setLoading(false)
      };
      fetchData();
    },[]);
    return{
      data,
      error,
      loading,
    }
  },
  useParticipantTrainings: (id, role)=>{
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        handleResponseAsync(
          () => trainingRequestService.getTrainingRequestByParticipant(id, role),
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
          (e) => setError(e)
        );
        setLoading(false);
      };
      fetchData();
    }, []);
    return{
      data, error, loading
    }
  }
};

export default trainingRequestHook;
