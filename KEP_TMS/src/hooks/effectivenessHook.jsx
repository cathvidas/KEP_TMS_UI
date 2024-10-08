import { useEffect, useState } from "react";
import effectivenessService from "../services/effectivenessService";
import handleResponseAsync from "../services/handleResponseAsync";

const effectivenessHook = {
    useEffectivenessById: (id) => {
        const [data, setData] = useState([]);
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
          const getRequest = async () => {
            handleResponseAsync(
              () => effectivenessService.getEffectivenessById(id),
              (e) => setData(e),
              (e) => setError(e),
              ()=>setLoading(false)
            );
          };
          getRequest();
        }, [id]);
        return {
            data, error, loading
        }
    },
    useAllEffectiveness: (assignee) =>{
        const [data, setData] = useState([]);
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(true);
        useEffect(()=>{
            const getRequests = async () => {
              handleResponseAsync(
                () => assignee ? effectivenessService.getEffectivenessById(assignee): effectivenessService.getAllEffectiveness(),
                (e) => setData(e),
                (e) => setError(e),
                ()=>setLoading(false)
              );
            };
            getRequests();
        })
        return{data, error, loading}
    }
}
export default effectivenessHook;