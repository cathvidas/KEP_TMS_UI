import fetchFromApi from "./apiUtil";
import { TrainingType } from "./constants";

export const GetOldExternalRequestByIdApi = async (requestId)=>{
    return await fetchFromApi(`/OldHts/GetOldExternalRequestById?id=${requestId}`);
}
export const GetOldInternalRequestByIdApi = async (requestId)=>{
    return await fetchFromApi(`/OldHts/GetOldInternalRequestById?id=${requestId}`);
}
export const GetOldTrainingRequestApi = async (trainingType, pageNumber, pageSize, searchValue, SecondSearchValue, thirdSearchValue, fourthSearchValue) => {
    
    let url = `OldHts/${trainingType == TrainingType.EXTERNAL ? "GetOldExternalRequest" : "GetOldInternalRequest"}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    if(searchValue){
        url += `&searchValue=${searchValue}`
    }
    if(SecondSearchValue){
        url += `&secondSearchValue=${SecondSearchValue}`
    }
    if(thirdSearchValue && thirdSearchValue !== 'null'){
        url += `&thirdSearchValue=${thirdSearchValue}`
    }
    if(fourthSearchValue){
        url += `&fourthSearchValue=${fourthSearchValue}`
    }
    return await fetchFromApi(url);
};

export const GetOldSystemFacilitatorApi = async (id)=>{
    return await fetchFromApi(`/OldHts/GetHtsFacilitator?Id=${id}`);
}
export const GetExternalActivitiesByRequestIdApi = async (id)=>{
    return await fetchFromApi(`/OldHts/GetExternalActivitiesByRequestId?RequestId=${id}`);
}
export const GetOldTrainingActivitiesByRequestIdApi = async (id, type)=>{
    let url = `/OldHts/GetInternalActivitiesByRequestId?RequestId=${id}`
    if(type == TrainingType.EXTERNAL){
        url = `/OldHts/GetExternalActivitiesByRequestId?RequestId=${id}`
    }
    return await fetchFromApi(url);
}
//Training Effectiveness
export const GetOldEffectivenessActivityByIdApi = async (id, type)=>{
    return await fetchFromApi(`/OldHts/GetTrainingEffectivenessActivityByEffecId?EffectivenessId=${id}&TrainingType=${type}`);
}
export const GetOldEffectivenessByRequestIdApi = async (id, typeId)=>{
    return await fetchFromApi(`/OldHts/GetTrainingEffectivenessByRequestId?RequestId=${id}&TrainingType=${typeId}`);
}
// Training Report
export const GetOldTrainingReportByRequestIdApi = async (id, typeId)=>{
    return await fetchFromApi(`/OldHts/GetTrainingReportByRequestId?RequestId=${id}&TrainingType=${typeId}`);
}
export const GetOldTrainingReportActivityByIdApi = async (id, type)=>{
    return await fetchFromApi(`/OldHts/GetTrainingReportActivityByReportId?ReportId=${id}&TrainingType=${type}`);
}
//Training Evaluation
export const GetOldTrainingEvaluationByRequestIdApi = async (id, typeId)=>{
    return await fetchFromApi(`/OldHts/GetTrainingEvaluationByRequestId?RequestId=${id}&TrainingType=${typeId}`);
}
//
export const GetOldFacilitatedTrainingsApi = async (id)=>{
    return await fetchFromApi(`/OldHts/GetOldFacilitatedTrainings?EmployeeBadge=${id}`);
}
export const GetOldAttendedTrainingsApi = async (id)=>{
    return await fetchFromApi(`/OldHts/GetOldAttendedTrainings?EmployeeBadge=${id}`);
}
export const GetOldTotalAccumulatedHoursApi = async (id)=>{
    return await fetchFromApi(`/OldHts/GetOldTotalAccumulatedHours?EmployeeBadge=${id}`);
}
export const GetOldFacilitatorRatingApi = async (userId, reqId)=>{
    return await fetchFromApi(`/OldHts/GetOldFacilitatorRating?FacilitatorBadge=${userId}&RequestId=${reqId}`);
}