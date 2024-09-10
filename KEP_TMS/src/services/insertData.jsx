import { Component } from "react";

export const TrainingRequest = () => ({
  requestorId: 0,
  categoryId: 0,
  trainingProgramId: 0,
  trainingProviderId: 0,
  trainingTypeId: 0,
  trainingObjectives: null,
  trainingStartDate: null,
  trainingEndDate: null,
  venue: null,
  trainingParticipants: [],
  isOffSite: true,
  trainingFee: 0,
  totalTrainingFee: 0,
  discountedRate: 0,
  cutOffDate: null,
  trainingDates: [],
  trainingFacilitators: [],
  createdBy: null,
});

export const TrainingParticipants = () => ({
  id: 0,
  trainingRequestId: 0,
  employeeId: 0,
  effectivenessId: 0,
  evaluationId: 0,
  reportId: 0,
});

export const TrainingDates = () => ({
  id: 0,
  date: null,
  startTime: null,
  endTime: null,
});
export const TrainingFacilitators = () => ({
  facilitorId: 0,
  trainingRequestId: 0,
  trainingEvaluationId: 0,
});