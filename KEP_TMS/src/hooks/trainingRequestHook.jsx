import { useEffect, useState } from "react";
import trainingRequestService from "../services/trainingRequestService";
import userMapping from "../mappings/userMapping";
import userService from "../services/userService";
import { getRoutingActivity } from "../api/trainingServices";

const trainingRequestHook = {
    useTrainingRequest : (id) => {
        const [data, setData] = useState({});
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(false);
        useEffect(() => {
          const getRequest = async () => {
            try {
              setLoading(true);
              const response = await trainingRequestService.getTrainingRequest(id);
              console.log(response)
              const participants = await userMapping.mapUserIdList(
                response.trainingParticipants,
                "employeeBadge"
              );
              const facilitators = await userMapping.mapUserIdList(
                response.trainingFacilitators,
                "facilitatorBadge"
              );
              const approvers = await userMapping.mapUserIdList(response.approvers, "employeeBadge")
              const requestor = await userService.getUserById(response.requestorBadge);
              const routing = await getRoutingActivity(response.id, 1);
              setData({
                ...response,
                trainingParticipants: participants,
                trainingFacilitators: facilitators,
                requestor: requestor,
                routing: routing,
                approvers
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

      useAllTrainingRequests: ()=>{
        const [data, setData] = useState([]);
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(true);
        useEffect(() =>{
            const fetchData = async ()=>{
                try{
                    const response = await trainingRequestService.getAllTrainingRequests();
                    setData(response);
                }catch(error){
                    setError(error);
                }
                setLoading(false);
            }
            fetchData();
        }, [])
        return{
            data,
            error, loading
        }
      }
}

export default trainingRequestHook;
