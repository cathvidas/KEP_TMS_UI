import { statusCode } from "../../api/constants";
import trainingDetailsService from "../common/trainingDetailsService";

const mapUserTrainings = (data, id) => {
  const entity = {
    attended: [],
    facilitated: [],
    requested: [],
    ongoing: [],
    upcoming: [],
  };
  data?.forEach((item) => {
    if (item?.requestorBadge === id) {
      entity.requested.push(item);
    }
    const isParticipant = item?.trainingParticipants?.find(
      (participant) => participant?.employeeBadge === id
    );
    if (isParticipant) {
      entity.attended.push(item);
      if (item?.status?.id !== statusCode.CLOSED) {
        entity.ongoing.push(item);
      }
    }
    const isFacilitator = item?.trainingFacilitators?.find(
      (facilitator) => facilitator?.facilitatorBadge === id
    );
    if (isFacilitator) {
      entity.facilitated.push(item);
    }
  });
  return entity;
};
export default mapUserTrainings;

export const mappedTrainingRequestByStatus = (trainings) => {
  const attended = [];
  const submitted = [];
  const published = [];
  const upcoming = [];
  const ongoing = [];
  const approved = [];
  const forApproval = [];
  const pending = [];
  const outdated = [];
  const closed = [];
  trainings?.forEach((item) => {
    if (
      trainingDetailsService.checkTrainingIfOutDated(item) &&
      (item?.status?.id === statusCode.SUBMITTED ||
        item?.status?.id === statusCode.FORAPPROVAL ||
        item?.status?.id === statusCode.APPROVED)
    ) {
      outdated.push(item);
    } else if (item?.status?.id === statusCode.CLOSED) {
      closed.push(item);
      attended.push(item);
    } else if (item?.status?.id === statusCode.PUBLISHED) {
      published.push(item);
      if (trainingDetailsService.checkTrainingScheduleStatus(item)?.isEnd) {
        pending.push(item);
        attended.push(item);
      } else if (
        trainingDetailsService.checkTrainingScheduleStatus(item)?.isOngoing
      ) {
        ongoing.push(item);
      } else {
        upcoming.push(item);
      }
    } else if (item?.status?.id === statusCode.APPROVED) {
      approved.push(item);
    } else if (item?.status?.id === statusCode.FORAPPROVAL) {
      forApproval.push(item);
    } else if (item?.status?.id === statusCode.SUBMITTED) {
      submitted.push(item);
      pending.push(item);
    }
  });
  return {
    attended,
    upcoming,
    ongoing,
    approved,
    forApproval,
    pending,
    submitted,
    published,
    outdated,
    closed,
  };
};
