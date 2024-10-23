import fetchFromApi from "./apiUtil";

export const getModuleAttachmentByIdApi = async (id) => {
  return await fetchFromApi(`/Attachment/GetModuleFile?attachmentId=${id}`);
};
export const addAttachmentsApi = async (formData) => {
  return await fetchFromApi("/Attachment/AddAttachments","POST", formData, {'Content-Type': 'multipart/form-data'});
}
export const deleteAttachmentApi = async (id) =>{
    return await fetchFromApi(`/Attachment/DeleteAttachment`, "DELETE", {id: id});
}