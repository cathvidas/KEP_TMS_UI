import fetchFromApi from "./apiUtil";

export const GetOldExternalRequestByIdApi = async (requestId)=>{
    return await fetchFromApi(`/OldHts/GetOldExternalRequestById?id=${requestId}`);
}
export const GetOldExternalRequestApi = async (pageNumber, pageSize, searchValue, SecondSearchValue, thirdSearchValue, fourthSearchValue) => {
    let url = `OldHts/GetOldExternalRequest?pageNumber=${pageNumber}&pageSize=${pageSize}`
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
export const GetOldEffectivenessByRequestIdApi = async (id, typeId)=>{
    return await fetchFromApi(`/OldHts/GetTrainingEffectivenessByRequestId?RequestId=${id}&TrainingType=${typeId}`);
}