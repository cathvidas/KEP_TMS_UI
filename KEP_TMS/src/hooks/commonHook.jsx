import { useEffect, useState } from "react";
import commonService from "../services/commonService";
import handleResponseAsync from "../services/handleResponseAsync";
import trainingRequestService from "../services/trainingRequestService";
import trainingReportService from "../services/trainingReportService";
import effectivenessService from "../services/effectivenessService";
import { checkTrainingIfOutDated } from "../services/inputValidation/validateTrainingSchedules";

const commonHook = {
  useAllDepartments: () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getDepartments = async () => {
        handleResponseAsync(
          () => commonService.getAllDepartments(),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      getDepartments();
    }, []);
    return { data, error, loading };
  },
  useAllAssignedForApproval: (id) => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const requests =
            await trainingRequestService.getTrainingRequestByApprover(id);
          const effectiveness =
            await effectivenessService.getApproverAssignedEffectiveness(id);
            console.log(effectiveness)
          const reports =
            await trainingReportService.getApproverAssignedReports(id);
            const updatedRequest = requests?.filter(item => checkTrainingIfOutDated(item?.trainingRequest) === false)
            console.log(updatedRequest)
          setData({
            requests: updatedRequest,
            effectiveness: effectiveness,
            reports: reports,
            overallCount:
              updatedRequest.length + effectiveness.length + reports.length,
          });
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [id]);
    return { data, error, loading };
  },
  useAllRoles: () => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRoles = async () => {
        handleResponseAsync(
          () => commonService.getAllRoles(),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      getRoles();
    }, []);
    return { data, error, loading };
  },
  useAllPositions: () => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRoles = async () => {
        handleResponseAsync(
          () => commonService.getAllPositions(),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      getRoles();
    }, []);
    return { data, error, loading };
  },
  useAllEmployeeTypes: () => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRoles = async () => {
        handleResponseAsync(
          () => commonService.getAllEmployeeTypes(),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      getRoles();
    }, []);
    return { data, error, loading };
  },
  useApproverApprovedForms: (assignedTo, activityIn)=>{
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const getRequests = async () => {
        handleResponseAsync(
          () =>
            commonService.getApprovedForms(assignedTo, activityIn),
          (e) => setData(e),
          (e) => setError(e),
          () => setLoading(false)
        );
      };
      getRequests();
    }, [assignedTo, activityIn]);
    return { data, error, loading };
  },
};
export default commonHook;
