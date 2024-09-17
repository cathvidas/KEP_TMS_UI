import { SessionGetEmployeeId, SessionGetUserId } from "./sessions";

export const InsertFormattedTrainingRequestData = (formData)=>{

    if(!formData.trainingDates) throw new Error("Training dates are required");
    if(!formData.requestorId) throw new Error("Requestor ID is required");
    if(!formData.trainingProgramId) throw new Error("Training Program is required");
    if(!formData.categoryId) throw new Error("Category is required");
    if(!formData.trainingTypeId) throw new Error("Training Type ID is required");
    if(!formData.trainingFacilitators) throw new Error("Training facilitators are required");
    if(!formData.trainingObjectives) throw new Error("Training objectives are required");
    if(!formData.venue) throw new Error("Venue is required");
    if(!formData.trainingProviderId) throw new Error("Training Provider ID is required");
    if(!formData.trainingParticipants) throw new Error("Training participants are required");


    return{
        requestorBadge: formData.requestorId ?? SessionGetEmployeeId(),
        categoryId: formData.categoryId,
        trainingProgramId: formData.trainingProgramId,
        trainingProviderId: formData.trainingProviderId,
        trainingTypeId: formData.trainingTypeId,
        trainingObjectives: formData.trainingObjectives,
        venue: formData.venue,
        trainingParticipants: formData.trainingParticipants? formData.trainingParticipants.map(({employeeBadge})=>({
            EmployeeBadge:employeeBadge
        })):[]
        ,
        isOffSite: true,
        trainingFee: formData.trainingFee,
        // discountedRate: 0,
        // cutOffDate: new Date(),
        trainingDates: formData.trainingDates,
        trainingFacilitators:formData.trainingFacilitators ? formData.trainingFacilitators.map(({employeeBadge}) =>({
            FacilitorBadge:employeeBadge
        })):[],
        createdBy: SessionGetEmployeeId()
      }
}