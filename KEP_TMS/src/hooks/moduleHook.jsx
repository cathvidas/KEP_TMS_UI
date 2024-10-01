import { useEffect, useState } from "react"
import handleResponseAsync from "../services/handleResponseAsync";
import moduleService from "../services/moduleService";

const moduleHook = {
    useModulesByRequestId: (id)=>{
        const [modules, setModules] = useState([]);
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(true);
        useEffect(()=>{
           const getRequest = async ()=>{
            handleResponseAsync(()=>moduleService.getModulesByRequestId(id), (e)=>setModules(e),(e)=> setError(e));
            setLoading(false);
           }
           getRequest();
        },[])
        return {
            modules, error, loading
        }
    }
}
export default moduleHook;