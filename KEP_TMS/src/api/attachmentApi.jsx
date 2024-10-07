import fetchFromApi from "./apiUtil";

export const getModuleAttachmentByIdApi = async (id) => {
  return await fetchFromApi(`/Attachment/GetModuleFile?attachmentId=${id}`);
};
