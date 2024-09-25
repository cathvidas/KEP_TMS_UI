export const API_ENDPOINTS = {
  //Training Programs
  GET_TRAINING_PROGRAMS: "/TrainingProgram/GetAllTrainingPrograms",
  GET_TRAINING_PROGRAM_BY_ID: "/TrainingProgram/GetTrainingProgramById",
  INSERT_TRAINING_PROGRAM: "/TrainingProgram/CreateTrainingProgram",
  DELETE_TRAINING_PROGRAM: "/TrainingProgram/DeleteTrainingProgram",
  UPDATE_TRAINING_PROGRAM: "/TrainingProgram/UpdateTrainingProgram",

  //Training Categories
  GET_TRAINING_CATEGORIES: "/TrainingCategory/GetAllTrainingCategories",
  GET_TRAINING_CATEGORY_BY_ID: "/TrainingCategory/GetTrainingCategoryById",
  INSERT_TRAINING_CATEGORY: "/TrainingCategory/CreateTrainingCategory",
  DELETE_TRAINING_CATEGORY: "/TrainingCategory/DeleteTrainingCategory",
  UPDATE_TRAINING_CATEGORY: "/TrainingCategory/UpdateTrainingCategory",

  //Training Providers
  GET_TRAINING_PROVIDERS: "/TrainingProvider/GetAllTrainingProviders",
  GET_TRAINING_PROVIDER_BY_ID: "/TrainingProvider/GetTrainingProviderById",
  INSERT_TRAINING_PROVIDER: "/TrainingProvider/CreateTrainingProvider",
  DELETE_TRAINING_PROVIDER: "/TrainingProvider/DeleteTrainingProvider",
  UPDATE_TRAINING_PROVIDER: "/TrainingProvider/UpdateTrainingProvider",

  //Training Report
  GET_TRAINING_REPORTS: "/TrainingReport/GetAllTrainingReports",
  INSERT_TRAINING_REPORT: "/TrainingReport/InsertTrainingReport",
  GET_TRAINING_REPORT_BY_ID: "/TrainingReport/GetTrainingReportById",
  UPDATE_TRAINING_REPORT: "/TrainingReport/UpdateTrainingReport",
  DELETE_TRAINING_REPORT: "/TrainingReport/DeleteTrainingReport",

  //Users
  GET_USERS: "/Users/GetAllUsers",
  GET_USER_BY_ID: "/Users/GetUserById",
  UPDATE_USER: "/Users/UpdateUser",
  DELETE_USER: "/Users/DeleteUser",
  GET_USER_BY_POSITION_ID: "/Users/GetUserByPositionId",
  USER_LOGIN: "/Users/Login",
  CREATE_USER: "Users/CreateUser",

  //Training Requests
  INSERT_TRAINING_REQUEST: "/TrainingRequest/CreateTrainingRequest",
  GET_TRAINING_REQUESTS: "/TrainingRequest/GetAllTrainingRequests",
  GET_TRAINING_REQUEST_BY_ID: "/TrainingRequest/GetTrainingRequestById",
  UPDATE_TRAINING_REQUEST: "/TrainingRequest/UpdateTrainingRequest",
  GET_TRAINING_REQUEST_BY_APPROVER: "Services/GetAssignedRequests",
  APPROVE_TRAINING_REQUEST: "/Services/ApproveRequest",
  GET_TRAINING_REQUEST_APPROVERS: "/Services/GetApprovers",

  GET_TRAINING_TYPES: "/TrainingType/GetAllTrainingTypes",
  GET_TRAINING_EFFECTIVENESSES:"/TrainingEffectiveness/GetAllTrainingEffectivenesses",
  GET_TRAINING_EVALUATIONS: "/TrainingEvaluation/GetAllTrainingEvaluations",
  GET_TRAINING_PARTICIPANTS: "/TrainingRequest/GetAllTrainingParticipants",

  //comboboxes
  GET_DEPARTMENTS: "Comboboxes/GetDepartments",
  GET_ROUTING_ACTIVITY: "Services/GetRoutingActivity",
  GET_CURRENT_ROUTING: "Services/routing",

  //FILE UPLOADS
  UPLOAD_FILE: "/Users/getUploadedParticipants",
  EXPORT_DATA: "/Services/ExportData",
};
