import { useEffect, useState } from "react"
import examService from "../services/examService";
import handleResponseAsync from "../services/handleResponseAsync";

const examHook = {
    useExamByRequestId: (id)=>{
        const [exams, setExams] = useState([]);
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(true);
        useEffect(()=>{
           const getRequest = async ()=>{
            handleResponseAsync(()=>examService.getExamByRequestId(id), (e)=>setExams(e),(e)=> setError(e));
            setLoading(false);
           }
           getRequest();
        },[])
        return {
            exams, error, loading
        }
    }
}
export default examHook;