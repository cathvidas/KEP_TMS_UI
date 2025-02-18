import { useEffect, useState } from "react";
import { OtherConstant, SearchValueConstant, statusCode } from "../api/constants";
import effectivenessService from "../services/effectivenessService";
import trainingReportService from "../services/trainingReportService";
import examService from "../services/examService";
import getTraineeExamDetail from "../services/common/getTraineeExamDetail";
import trainingDetailsService from "../services/common/trainingDetailsService";
import getStatusById from "../utils/status/getStatusById";
import trainingRequestService from "../services/trainingRequestService";
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
  useUserPendingTaskList: (id) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          let requestList = [];
          let page = 1;
          const assignedRequest = await trainingRequestService.getPagedTrainingRequest(1, 10, SearchValueConstant.PARTICIPANT, id);
          
          while(requestList.length < assignedRequest.totalRecords && assignedRequest.totalRecords > 0) {
            const response = await trainingRequestService.getPagedTrainingRequest(page, 10, SearchValueConstant.PARTICIPANT, id);
            requestList = [...requestList, ...response.results];
            page++;
          }
          const pendingList = await Promise.all(
            requestList?.map(async (item) => {
              const user = item?.trainingParticipants?.find((i) => i.employeeBadge === id);
              if (!user) return [];
              const tasks = [];
    
              // Helper to push a task to the list
              const addTask = (type, title, detail, link, date, status = null) => {
                tasks.push({type, title, status, detail, program: item?.trainingProgram?.name, link, date });
              };
    
              // Effectiveness report
              if (item?.durationInHours >= OtherConstant.EFFECTIVENESS_MINHOUR) {
                const effectivenessReport = await handleEffectivenessReport(user, item);
                if (effectivenessReport) tasks.push({...effectivenessReport, program: item?.trainingProgram?.name});
              }
    
              if(trainingDetailsService.checkIfTrainingEndsAlready(item) && (item?.status?.id === statusCode.APPROVED || item?.status?.id === statusCode.CLOSED)) {
              // Training report
              const reportItem = await handleTrainingReport(user, item);
              if (reportItem) tasks.push({...reportItem, program: item?.trainingProgram?.name});
    
              // Evaluation
              if (!user?.evaluationId) addTask("Evaluation", "Pending Training Evaluation", "You have a pending training evaluation to be submitted.", `TrainingDetail/${item.id}/Form/Evaluation`, item?.trainingStartDate, "Not yet submitted");
    
              // Exam
              const examItems = await handleExams(item, id);
              tasks.push(...examItems);
              
              }
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
    }, [id]);
  
    return { data, loading, error };
  
  },
};
export default activityLogHook;



// Handle Effectiveness Report
const handleEffectivenessReport = async (user, item) => {
  if (user?.effectivenessId > 0) {
    try {
      const effDetail = await effectivenessService.getEffectivenessById(
        user?.effectivenessId
      );
      if (effDetail) {
        const isAfter = trainingDetailsService.checkIfTrainingEndsAlready(item) && new Date(item?.trainingEndDate) <=
        new Date(new Date().setMonth(new Date().getMonth() - 6));

        if (
          effDetail?.statusName === getStatusById(statusCode.APPROVED) ||
          effDetail?.statusName === getStatusById(statusCode.FORAPPROVAL)
        ) {
          if (isAfter && !checkIfActualPerformanceRated(effDetail)) {
            return {
              type: "Effectiveness Report",
              title:"Actual Performance Rating",
              status: "Awaiting",
              detail: "You have a pending effectiveness report to be updated.",
              link: `TrainingDetail/${item.id}/Form/Effectiveness`,
              date:
                effDetail?.currentRouting?.createdDate ||
                item?.trainingStartDate,
            };
          } else {
            return null;
          }
        } else if (
          effDetail?.statusName === getStatusById(statusCode.DISAPPROVED)
        ) {
          return {
            type: "Effectiveness Report",
            title: "Effectiveness Report Disapproved",
            status: effDetail?.statusName,
            detail:
              "Your effectiveness report has been disapproved. Click here to view more details.",
            link: `TrainingDetail/${item.id}/Form/Effectiveness`,
            date:
              effDetail?.currentRouting?.createdDate || item?.trainingStartDate,
          };
        }
      } else {
        return {
          type: "Effectiveness Report",
          title: "Pending Effectiveness Report",
          status: "Not yet submitted",
          detail: "You have a pending effectiveness report to be submitted.",
          link: `TrainingDetail/${item.id}/Form/Effectiveness`,
          date:
            effDetail?.currentRouting?.createdDate || item?.trainingStartDate,
        };
      }
    } catch {
      return null;
    }
  }
  return {
    type: "Effectiveness Report",
    title: "Pending Effectiveness Report",
    status: null,
    detail:
      "You have a pending effectiveness report to be submitted for this training request",
    link: `TrainingDetail/${item.id}/Form/Effectiveness`,
    date: item?.trainingStartDate,
  };
};

export const checkIfActualPerformanceRated = (item) => {
  let isRated = true;
  if(!item){
    return false;
  }
  item?.projectPerformanceEvaluation?.map((x) =>{
    if(!(x?.actualPerformance > 1) && x?.content){
      isRated = false;
    }
  })
  return isRated;
}
export const checkIfEvaluatedActualPerformanceRated = (item) => {
  let isRated = true;
  if(!item){
    return false;
  }
  item?.projectPerformanceEvaluation?.map((x) =>{
    if(x?.evaluatedActualPerformance === 0 && x?.content){
      isRated = false;
    }
  })
  return isRated;
}

// Handle Training Report
const handleTrainingReport = async (user, item) => {
  if (user?.reportId > 0) {
    try {
      const reportDetail = await trainingReportService.getTrainingReportById(user?.reportId);
      if (reportDetail?.status === getStatusById(statusCode.APPROVED) ||reportDetail?.status === getStatusById(statusCode.FORAPPROVAL) ) return null;
      return {
        type: "Training Report",
        title: reportDetail?.status === getStatusById(statusCode.DISAPPROVED) ? "Training Report Disapproved" : "Pending Training Report",
        status: reportDetail?.status ?? "Not yet submitted",
        detail: reportDetail?.status === getStatusById(statusCode.DISAPPROVED)
          ? "Your training report has been disapproved. Click here to view more details."
          : "You have a pending training report to be submitted.",
        link: `TrainingDetail/${item.id}/Form/Report`,
        date: reportDetail?.currentRouting?.createdDate || item?.trainingStartDate,
      };
    } catch {
      return null;
    }
  }
  return {
    type: "Training Report",
    title: "Pending Training Report",
    status: null,
    detail: "You have a pending training report to be submitted for this training request",
    link: `TrainingDetail/${item.id}/Form/Report`,
    date: item?.trainingStartDate,
  };
};

// Handle Exams
const handleExams = async (item, id) => {
  if (!trainingDetailsService.checkIfTrainingEndsAlready(item)) return [];

  const exams = await examService.getExamByRequestId(item.id);
  const examItems = await Promise.all(exams?.map(async (exam) => {
    const traineeExams = await examService.getAllTraineeExamByExamId(exam.id);
    
    const traineeExamList = [];
    traineeExams?.map(item=>{
      const isExist = traineeExamList.find((x) => x.traineeId === item.createdBy);
      if(isExist){
        isExist.examList.push(item);
      }else{
        traineeExamList.push({
          traineeId: item.createdBy,
          examList: [item],
        }
        )
      }
    })
    const detailExam = getTraineeExamDetail({traineeExam: traineeExamList}, id)
    if (!detailExam?.submitted) {
      return {
        title: exam?.title,
        type: "Exam",
        status: null,
        detail: "You have a pending exam to be submitted for this training request",
        program: item?.trainingProgram?.name,
        link: `TrainingDetail/${item.id}/Exams`,
        date: item?.trainingStartDate,
      };
    } else if (detailExam?.submitted && detailExam?.isRetake) {
      return {
        type: "Exam",
        title: exam?.title,
        status: "For Retake",
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
