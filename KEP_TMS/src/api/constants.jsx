import { SessionGetRole } from "../services/sessions";

const localhost = {
    API_BASE_URL: "http://localhost:5030/api",
    APPLICATION_BASE_URL: "http://localhost:5173/KEP_TMS/"
}

const testEnvi = {
    API_BASE_URL: "http://kep-testenvw16:2024/api",
    APPLICATION_BASE_URL: "http://kep-testenvw16:2024/KEP_TMS/"
}

const currentServer = localhost;
export const API_BASE_URL = currentServer.API_BASE_URL
export const APPLICATION_BASE_URL = currentServer.APPLICATION_BASE_URL
export const APP_DOMAIN = "/KEP_TMS"

export const statusCode = {
  INACTIVE: 1,
  ACTIVE: 2,
  SUBMITTED: 3,
  FORAPPROVAL: 4,
  APPROVED: 5,
  DISAPPROVED: 6,
  CLOSED: 7,
  PUBLISHED: 8,
  FAILED: 9,
  TOUPDATE: 10,
  DRAFTED: 12,
  PENDING: 13
};

export const TrainingType = {
  INTERNAL: 1,
  EXTERNAL: 2,
  INTERNAL_ONLINE: 3,
  EXTERNAL_ONLINE: 4,
};
export const ActivityType = {
  REQUEST: 1,
  EVALUATION: 2,
  CATEGORY: 3,
  PROVIDER: 4,
  EFFECTIVENESS: 5,
  PERFORMANCE_EVALUATION: 6,
  PROGRAM: 7,
  REPORT: 8,
  USER: 9,
  ROUTING_ACTIVITY: 10,
  EXAM: 11,
  MODULE: 12,
  TRAINEE_EXAM: 13,
}
export const UserTypeValue = {
  ADMIN: "Admin",
  FACILITATOR: "Facilitator",
  TRAINEE: "Trainee",
  SUPER_ADMIN: "SuperAdmin",
  APPROVER: "Approver",
  REQUESTOR: "Requester",
}
export const attachmentType = {
  MODULE: 1,
  CERTIFICATE: 2,
  VIDEO: 3
}
export const OtherConstant = {
  EFFECTIVENESS_MINHOUR : 16
}
export const SearchValueConstant = {
  FACILITATOR : 'Facilitator',
  REQUESTER : 'Requester',
  PARTICIPANT : 'Participant',
  REQ_STATUS: "Status"
}

export const hasRequestAccess = SessionGetRole() === UserTypeValue.ADMIN ||
SessionGetRole() === UserTypeValue.REQUESTOR ||
SessionGetRole() === UserTypeValue.FACILITATOR;