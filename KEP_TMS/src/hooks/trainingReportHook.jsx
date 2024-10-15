import { useEffect, useState } from "react";
import handleResponseAsync from "../services/handleResponseAsync";
import trainingReportService from "../services/trainingReportService";

const trainingReportHook = {
  useTrainingReportById: (id, trigger) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const getRequest = async () => {
        handleResponseAsync(
          () => trainingReportService.getTrainingReportById(id),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
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
  useAllTrainingReports: () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequests = async () => {
        handleResponseAsync(
          () =>trainingReportService.getAllTrainingReports(),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      getRequests();
    });
    return { data, error, loading };
  },
  useApproverAssignedReports: (approverId, trigger) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequests = async () => {
        handleResponseAsync(
          () =>
            trainingReportService.getApproverAssignedReports(approverId),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      getRequests();
    }, [approverId, trigger]);
    return { data, error, loading };
  },
  useAllParticipantsReports: (datalist) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequests = async () => {
        handleResponseAsync(
         async ()=> await Promise.all(
            datalist?.map(async (item) => {
              const response = await trainingReportService.getTrainingReportById(
                item?.reportId ? item.reportId : 0
              );
              console.log(response)
              return { userDetail: item, reportDetail: response };
            })
          ),
          (e)=> setData(e),
          (e)=>setError(e),
          ()=> setLoading(false)
        )
      };
      getRequests()
    }, [datalist]);
    return { data, error, loading };
  },
};
export default trainingReportHook;