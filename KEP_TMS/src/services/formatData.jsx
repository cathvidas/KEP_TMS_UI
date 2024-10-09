import { SessionGetEmployeeId, SessionGetUserId } from "./sessions";

export const InsertFormattedTrainingRequestData = (formData)=>{
console.log(formData)
    if(!formData.trainingDates) throw new Error("Training dates are required");
  //  if(!formData.requestorBadge) throw new Error("Requestor ID is required");
    if(!formData.trainingProgram?.id) throw new Error("Training Program is required");
    if(!formData.trainingCategory?.id) throw new Error("Category is required");
    // if(!formData.trainingType?.id) throw new Error("Training Type ID is required");
    if(!formData.trainingFacilitators) throw new Error("Training facilitators are required");
    if(!formData.trainingObjectives) throw new Error("Training objectives are required");
    if(!formData.venue) throw new Error("Venue is required");
    if(!formData.trainingProvider?.id) throw new Error("Training Provider ID is required");
    if(!formData.trainingParticipants) throw new Error("Training participants are required");


    return{
        id: formData?.id,
        requestorBadge: formData.requestorBadge ?? SessionGetEmployeeId(),
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
        createdBy: SessionGetEmployeeId()
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