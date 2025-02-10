import fetchFromApi from "./apiUtil";
import { API_BASE_URL } from "./constants";
export const VideoFileUrl = API_BASE_URL + "/Attachment/GetVideoFile?attachmentId=";
export const getModuleAttachmentByIdApi = async (id) => {
  return await fetchFromApi(`/Attachment/GetModuleFile?attachmentId=${id}`);
};
export const addAttachmentsApi = async (formData) => {
  // serialise formdata
  const serializedFormData = [];
  for (let pair of formData.entries()) {
    serializedFormData.push(encodeURIComponent(pair[0]) + "=" + encodeURIComponent(pair[1]));
  }
  return await fetchFromApi("/Attachment/AddAttachments","POST", formData, {'Content-Type': 'multipart/form-data'});
}
export const deleteAttachmentApi = async (id) =>{
    return await fetchFromApi(`/Attachment/DeleteAttachment`, "DELETE", {id: id});
}
export const getAttachmentByReferenceApi = async (referenceId, attachmentType) => {
  return await fetchFromApi(`/Attachment/GetAttachmentByReferenceId?referenceId=${referenceId}&attachmentType=${attachmentType}`);
}
export const AddAttachmentsAccessApi = async (id, data, creator) => {
  return await fetchFromApi(`/Attachment/AddAttachmentsAccess?requestId=${id}&createdBy=${creator}`, "POST", data, {'Content-Type': 'multipart/form-data'});
}
export const GetAttachmentsApi = async (pageNumber, pageSize, searchValue, SecondSearchValue) =>{
  if(SecondSearchValue && searchValue){
      return await fetchFromApi(`Attachment/GetAttachment?pageNumber=${pageNumber}&pageSize=${pageSize}&searchValue=${searchValue}&secondSearchValue=${SecondSearchValue}`);
  }else if(searchValue){
    return await fetchFromApi(`Attachment/GetAttachment?pageNumber=${pageNumber}&pageSize=${pageSize}&searchValue=${searchValue}`);
  }
  return await fetchFromApi(`Attachment/GetAttachment?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}
export const GetAttachmentAccessApi = async (pageNumber, pageSize, searchValue, SecondSearchValue,thirdSearchValue) =>{
  if(SecondSearchValue && searchValue && thirdSearchValue){
    return await fetchFromApi(`Attachment/GetAttachmentAccess?pageNumber=${pageNumber}&pageSize=${pageSize}&searchValue=${searchValue}&secondSearchValue=${SecondSearchValue}&thirdSearchValue=${thirdSearchValue}`);
}else if(SecondSearchValue && searchValue){
      return await fetchFromApi(`Attachment/GetAttachmentAccess?pageNumber=${pageNumber}&pageSize=${pageSize}&searchValue=${searchValue}&secondSearchValue=${SecondSearchValue}`);
  }else if(searchValue){
    return await fetchFromApi(`Attachment/GetAttachmentAccess?pageNumber=${pageNumber}&pageSize=${pageSize}&searchValue=${searchValue}`);
  }
  return await fetchFromApi(`Attachment/GetAttachmentAccess?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}
export const DeleteAttachmentAccessApi = async (id) =>{
    return await fetchFromApi(`/Attachment/DeleteAttachmentAccess?Id=${id}`, "DELETE");
}
export const GetVideoFileApi = async (id) =>{
  return await fetchFromApi(`/Attachment/GetVideoFile?attachmentId=${id}`);
}