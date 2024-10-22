import { SessionGetEmployeeId } from "./sessions";

export const TrainingRequest =  {
  requestorBadge: SessionGetEmployeeId()??0,
  trainingCategory: {},
  trainingProgram: {},
  trainingProviderId: 0,
  trainingType:{id: parseInt(localStorage.getItem("request-type")) ??  0},
  trainingObjectives: "",
  trainingStartDate: "",
  trainingEndDate: "",
  venue: "",
  trainingParticipants: [],
  isOffSite: true,
  trainingFee: 0,
  totalTrainingFee: 0,
  discountedRate: 0,
  cutOffDate: null,
  trainingDates: [],
  trainingFacilitators: [],
  createdBy: null,
  
};

export const TrainingParticipants = () => ({
  id: 0,
  trainingRequestId: 0,
  employeeId: 0,
  effectivenessId: 0,
  evaluationId: 0,
  reportId: 0,
});

export const TrainingDates ={
  date: "",
  startTime: "",
  endTime: "",
};
export const TrainingFacilitators = () => ({
  facilitorId: 0,
  trainingRequestId: 0,
  trainingEvaluationId: 0,
});

export const TrainingRequestApproval = {
  requestId: 0,
  employeeBadge: "string",
  statusId: 0,
  updatedBy: "string"
}