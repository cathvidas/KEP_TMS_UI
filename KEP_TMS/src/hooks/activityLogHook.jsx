import { useEffect, useState } from "react";
import { OtherConstant, statusCode } from "../api/constants";
import effectivenessService from "../services/effectivenessService";
import trainingReportService from "../services/trainingReportService";
import examService from "../services/examService";
import getTraineeExamDetail from "../services/common/getTraineeExamDetail";
import trainingDetailsService from "../services/common/trainingDetailsService";
const activityLogHook = {
  useRequestAuditTrailActivityLogs: (auditTrail) => {
    const [logs, setLogs] = useState([]);
    useEffect(() => {
      if (auditTrail) {
        const newLogs = auditTrail.map((item) => {
          const changes = JSON.parse(item?.changes);
          return { ...item, changes: changes };
        });
        setLogs(newLogs);
      }
    }, [auditTrail]);
    return logs;
  },
  useUserPendingTaskList: (id, assignedRequest) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
  
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const pendingList = await Promise.all(
            assignedRequest?.map(async (item) => {
              const user = item?.trainingParticipants?.find((i) => i.employeeBadge === id);
              if (!user) return [];
    
              const tasks = [];
    
              // Helper to push a task to the list
              const addTask = (title, detail, link, date, status = null) => {
                tasks.push({ title, status, detail, program: item?.trainingProgram?.name, link, date });
              };
    
              // Effectiveness report
              if (item?.durationInHours >= OtherConstant.EFFECTIVENESS_MINHOUR) {
                const effectivenessReport = await handleEffectivenessReport(user, item);
                if (effectivenessReport) tasks.push({...effectivenessReport, program: item?.trainingProgram?.name});
              }
    
              // Training report
              const reportItem = await handleTrainingReport(user, item);
              if (reportItem) tasks.push({...reportItem, program: item?.trainingProgram?.name});
    
              // Evaluation
              if (!user?.evaluationId) addTask("Pending Training Evaluation", "You have a pending training evaluation to be submitted.", `TrainingDetail/${item.id}/Reports`, item?.trainingStartDate);
    
              // Exam
              const examItems = await handleExams(item, id);
              tasks.push(...examItems);
    
              return tasks;
            })
          );
    
          setData(pendingList.flat()); // Flatten the array of arrays
          setLoading(false);
        } catch (err) {
          setError(err.message);
        } 
      };
      fetchData();
    }, [assignedRequest, id]);
  
    return { data, loading, error };
  
  },
};
export default activityLogHook;



// Handle Effectiveness Report
const handleEffectivenessReport = async (user, item) => {
  if (user?.effectivenessId > 0) {
    try {
      const effDetail = await effectivenessService.getEffectivenessById(user?.effectivenessId);
      if (effDetail?.status === statusCode.APPROVED) return null;
      const title = effDetail?.status === statusCode.DISAPPROVED ? "Effectiveness Report Disapproved" : "Pending Effectiveness Report";
      return {
        title,
        status: effDetail?.status,
        detail: effDetail?.status === statusCode.DISAPPROVED 
          ? "Your effectiveness report has been disapproved. Click here to view more details." 
          : "You have a pending effectiveness report to be submitted.",
        link: `TrainingDetail/${item.id}/Reports`,
        date: effDetail?.currentRouting?.createdDate || item?.trainingStartDate,
      };
    } catch {
      return null;
    }
  }
  return {
    title: "Pending Effectiveness Report",
    status: null,
    detail: "You have a pending effectiveness report to be submitted for this training request",
    link: `TrainingDetail/${item.id}/Reports`,
    date: item?.trainingStartDate,
  };
};

// Handle Training Report
const handleTrainingReport = async (user, item) => {
  if (user?.reportId > 0) {
    try {
      const reportDetail = await trainingReportService.getTrainingReportById(user?.reportId);
      if (reportDetail?.status === statusCode.APPROVED) return null;
      return {
        title: reportDetail?.status === statusCode.DISAPPROVED ? "Training Report Disapproved" : "Pending Training Report",
        status: reportDetail?.status,
        detail: reportDetail?.status === statusCode.DISAPPROVED
          ? "Your training report has been disapproved. Click here to view more details."
          : "You have a pending training report to be submitted.",
        link: `TrainingDetail/${item.id}/Reports`,
        date: reportDetail?.currentRouting?.createdDate || item?.trainingStartDate,
      };
    } catch {
      return null;
    }
  }
  return {
    title: "Pending Training Report",
    status: null,
    detail: "You have a pending training report to be submitted for this training request",
    link: `TrainingDetail/${item.id}/Reports`,
    date: item?.trainingStartDate,
  };
};

// Handle Exams
const handleExams = async (item, id) => {
  if (!trainingDetailsService.checkIfTrainingEndsAlready(item)) return [];

  const exams = await examService.getExamByRequestId(item.id);
  const examItems = await Promise.all(exams?.map(async (exam) => {
    const traineeExams = await examService.getAllTraineeExamByExamId(exam.id);
    const s = getTraineeExamDetail(traineeExams, id);
    if (s.length === 0) {
      return {
        title: "Pending Exam",
        status: null,
        detail: "You have a pending exam to be submitted for this training request",
        program: item?.trainingProgram?.name,
        link: `TrainingDetail/${item.id}/Exams`,
        date: item?.trainingStartDate,
      };
    } else if (s.length < 3 && !s.isPassed) {
      return {
        title: "Failed Exam",
        status: "Pending",
        detail: "You have failed on this exam, please retake the exam",
        program: item?.trainingProgram?.name,
        link: `TrainingDetail/${item.id}/Exams`,
        date: item?.trainingStartDate,
      };
    }
    return null;
  }));

  return examItems.filter(item => item !== null); // Remove null values
};