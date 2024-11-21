import { SessionGetEmployeeId } from "../sessions";

export const validateTrainingRequestForm = (formData)=>{
    return{
        id: formData?.id,
        requesterBadge: formData.requesterBadge ?? SessionGetEmployeeId(),
        categoryId: formData.trainingCategory?.id,
        trainingProgramId: formData.trainingProgram?.id,
        trainingProviderId: formData.trainingProvider?.id,
       trainingTypeId: formData.trainingType?.id,
        trainingObjectives: formData.trainingObjectives,
        venue: formData.venue,
        trainingParticipants: formData.trainingParticipants? formData.trainingParticipants.map(({employeeBadge})=>({
            EmployeeBadge:employeeBadge
        })):[]
        ,
        cutOffDate: formData.cutOffDate == "" ? null : formData.cutOffDate,
        isOffSite: formData.isOffSite,
        trainingFee: formData.trainingFee,
        discountedRate: formData.discountedRate,
        // cutOffDate: new Date(),
        trainingDates: formData?.trainingDates?.map(({startTime, endTime, date})=>({startTime, endTime, date})),
        trainingFacilitators:formData.trainingFacilitators ? formData.trainingFacilitators.map(({employeeBadge}) =>({
            FacilitatorBadge:employeeBadge
        })):[],
        statusId:formData?.status?.id,
        createdBy: SessionGetEmployeeId(),
        forTrainingAgreement: formData?.forTrainingAgreement ?? false,
      }
}


export const SubmitApprovalRequest = (data)=>{
   return {
    requestId: data.requestId,
    employeeBadge: data.approverId,
    statusId: data.statusId,
    updatedBy: data.approver
  }
}