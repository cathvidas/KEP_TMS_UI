import { useEffect, useState } from "react";
import commonService from "../services/commonService";
import handleResponseAsync from "../services/handleResponseAsync";
import trainingRequestService from "../services/trainingRequestService";
import trainingReportService from "../services/trainingReportService";
import effectivenessService from "../services/effectivenessService";

const commonHook ={
    useAllDepartments: ()=>{
        const [data, setData] = useState([]);
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(true);
        useEffect(()=>{
            const getDepartments = async ()=>{
                handleResponseAsync(
                    ()=>commonService.getAllDepartments(),
                    (e)=>setData(e),
                    (e)=>setError(e),
                    ()=>setLoading(false)
                )
            }
            getDepartments();
        }, []);
        return { data, error, loading };
    } ,
    useAllAssignedForApproval : (id)=>{
        const [data, setData] = useState({});
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(true);
        console.log(id)
        useEffect(()=>{
            const fetchData = async () => {
              try {
                const requests =
                  await trainingRequestService.getTrainingRequestByApprover(id);
                const effectiveness =
                  await effectivenessService.getApproverAssignedEffectiveness(
                    id
                  );
                const reports =
                  await trainingReportService.getApproverAssignedReports(id);
                  setData({requests: requests, effectiveness: effectiveness, reports: reports, overallCount: requests.length + effectiveness.length + reports.length});
              } catch (error) {
                setError(error.message);
              }
              finally{
                setLoading(false);
              }
            };
            fetchData();
        }, [id]);
        return { data, error, loading };
    }, 
    useAllRoles: ()=>{
      const [data, setData] = useState({});
      const [error, setError] = useState(null);
      const [loading, setLoading] = useState(true);
      useEffect(()=>{
          const getRoles = async ()=>{
              handleResponseAsync(
                  ()=>commonService.getAllRoles(),
                  (e)=>setData(e),
                  (e)=>setError(e),
                  ()=>setLoading(false)
              )
          }
          getRoles();
      }, []);
      return { data, error, loading };
    },
    useAllPositions: ()=>{
      const [data, setData] = useState({});
      const [error, setError] = useState(null);
      const [loading, setLoading] = useState(true);
      useEffect(()=>{
          const getRoles = async ()=>{
              handleResponseAsync(
                  ()=>commonService.getAllPositions(),
                  (e)=>setData(e),
                  (e)=>setError(e),
                  ()=>setLoading(false)
              )
          }
          getRoles();
      }, []);
      return { data, error, loading };
    },
    useAllEmployeeTypes: ()=>{
      const [data, setData] = useState({});
      const [error, setError] = useState(null);
      const [loading, setLoading] = useState(true);
      useEffect(()=>{
          const getRoles = async ()=>{
              handleResponseAsync(
                  ()=>commonService.getAllEmployeeTypes(),
                  (e)=>setData(e),
                  (e)=>setError(e),
                  ()=>setLoading(false)
              )
          }
          getRoles();
      }, []);
      return { data, error, loading };
    },

}
export default commonHook;