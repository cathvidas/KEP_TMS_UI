import fetchFromApi from "./apiUtil";

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
export const AddAttachmentsAccessApi = async (data) => {
  return await fetchFromApi(`/Attachment/AddAttachmentsAccess`, "POST", data);
}
export const GetAttachmentsApi = async (pageNumber, pageSize, searchValue, SecondSearchValue) =>{
  if(SecondSearchValue && searchValue){
      return await fetchFromApi(`Attachment/GetAttachment?pageNumber=${pageNumber}&pageSize=${pageSize}&searchValue=${searchValue}&secondSearchValue=${SecondSearchValue}`);
  }else if(searchValue){
    return await fetchFromApi(`Attachment/GetAttachment?pageNumber=${pageNumber}&pageSize=${pageSize}&searchValue=${searchValue}`);
  }
  return await fetchFromApi(`Attachment/GetAttachment?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}