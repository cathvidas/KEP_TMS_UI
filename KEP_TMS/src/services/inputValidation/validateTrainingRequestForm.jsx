import { TrainingType } from "../../api/constants";
import { SessionGetEmployeeId } from "../sessions";

export const validateTrainingRequestForm = (formData) => {
  return {
    id: formData?.id,
    requesterBadge: formData.requesterBadge ?? SessionGetEmployeeId(),
    categoryId: formData.trainingCategory?.id,
    trainingProgramId: formData.trainingProgram?.id,
    trainingProviderId: formData.trainingProvider?.id,
    trainingTypeId: formData.trainingType?.id,
    trainingObjectives: formData.trainingObjectives,
    venue: formData.venue,
    trainingParticipants: formData.trainingParticipants
      ? formData.trainingParticipants.map(({ employeeBadge }) => ({
          EmployeeBadge: employeeBadge,
        }))
      : [],
    cutOffDate: formData.cutOffDate == "" ? null : formData.cutOffDate,
    isOffSite: formData.isOffSite,
    trainingFee: formData.trainingFee,
    discountedRate: formData.discountedRate,
    // cutOffDate: new Date(),
    trainingDates: formData?.trainingDates?.length > 0 ? formData?.trainingDates?.map(
      ({ startTime, endTime, date }) => ({ startTime, endTime, date })
    ): null,
    trainingFacilitators: formData.trainingFacilitators
      ? formData?.trainingType?.id === TrainingType.EXTERNAL
        ? formData.trainingFacilitators.map(({ faciDetail }) => ({
            ExternalFacilitatorId:
              faciDetail?.id ?? formData?.externalFacilitatorId,
          }))
        : formData.trainingFacilitators.map((faci) => ({
            FacilitatorBadge: faci?.employeeBadge ?? faci?.facilitatorBadge,
          }))
      : [],
    statusId: formData?.status?.id,
    createdBy: SessionGetEmployeeId(),
    forTrainingAgreement: formData?.forTrainingAgreement ?? false,
  };
};

