import { useEffect, useState } from "react";
import commonService from "../services/commonService";
import handleResponseAsync from "../services/handleResponseAsync";

const commonHook ={
    useAllDepartments: ()=>{
        const [data, setData] = useState([]);
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(true);
        useEffect(()=>{
            const getDepartments = async ()=>{
                handleResponseAsync(
                    ()=>commonService.getDepartments(),
                    (e)=>setData(e),
                    (e)=>setError(e),
                    ()=>setLoading(false)
                )
            }
            getDepartments();
        }, []);
        return { data, error, loading };
    } 
}
export default commonHook;