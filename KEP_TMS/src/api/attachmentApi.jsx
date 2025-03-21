import fetchFromApi from "./apiUtil";
import { API_BASE_URL } from "./constants";
export const VideoFileUrl = API_BASE_URL + "/Attachment/GetVideoFile?attachmentId=";
export const getModuleAttachmentByIdApi = async (id) => {
  return await fetchFromApi(`/Attachment/GetModuleFile?attachmentId=${id}`);
};
export const addAttachmentsApi = async (formData) => {
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
  let url = `Attachment/GetAttachment?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  if (searchValue) {
    url += `&searchValue=${searchValue}`;
  }
  if (SecondSearchValue) {
    url += `&secondSearchValue=${SecondSearchValue}`;
  }
  return await fetchFromApi(url);
}
export const GetAttachmentAccessApi = async (pageNumber, pageSize, searchValue, SecondSearchValue,thirdSearchValue) =>{
  let url = `Attachment/GetAttachmentAccess?pageNumber=${pageNumber}&pageSize=${pageSize}`
  if (searchValue) {
    url += `&searchValue=${searchValue}`;
  }
  if (SecondSearchValue) {
    url += `&secondSearchValue=${SecondSearchValue}`;
  }
  if (thirdSearchValue) {
    url += `&thirdSearchValue=${thirdSearchValue}`;
  }
  return await fetchFromApi(url);
}
export const DeleteAttachmentAccessApi = async (id) =>{
    return await fetchFromApi(`/Attachment/DeleteAttachmentAccess?Id=${id}`, "DELETE");
}
export const GetVideoFileApi = async (id) =>{
  return await fetchFromApi(`/Attachment/GetVideoFile?attachmentId=${id}`);
}