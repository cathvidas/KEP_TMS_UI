import { SessionGetUserId } from "./sessions";

export const TrainingRequest =  {
  requestorId: SessionGetUserId()??0,
  categoryId: 0,
  trainingProgramId: 0,
  trainingProviderId: 0,
  trainingTypeId: parseInt(localStorage.getItem("request-type")) ??  0,
  trainingObjectives: "",
  trainingStartDate: null,
  trainingEndDate: null,
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