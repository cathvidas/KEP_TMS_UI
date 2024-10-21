import fetchFromApi from "./apiUtil";

export const getModuleAttachmentByIdApi = async (id) => {
  return await fetchFromApi(`/Attachment/GetModuleFile?attachmentId=${id}`);
};
export const addAttachmentApi = async (formData) => {
  return await fetchFromApi("/Attachment/AddAttachment","POST", formData, {'Content-Type': 'multipart/form-data'});
}