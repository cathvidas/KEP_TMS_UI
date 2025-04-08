import { AddAttachmentsAccessApi, addAttachmentsApi, DeleteAttachmentAccessApi, deleteAttachmentApi, GetAttachmentAccessApi, getAttachmentByReferenceApi, GetAttachmentsApi, getModuleAttachmentByIdApi, GetVideoFileApi } from "../api/attachmentApi";

const attachmentService = {
  getModuleAttachmentById: async (id) => {
    const response = await getModuleAttachmentByIdApi(id);
    return response.status === 1 ? response?.data : {};
  },
  addAttachments: async (formData) => {
    const response = await addAttachmentsApi(formData);
    if (response.status !== 1) {
      throw new Error(response.message);
    }
    return response?.data;
  },
  deleteAttachment: async (id) => {
    const response = await deleteAttachmentApi(id);
    if (response.status !== 1) {
      throw new Error(response.message);
    }
    return response;
  },
  getAttachmentByReference: async (
    referenceId,
    attachmentType,
  ) => {
    const response = await getAttachmentByReferenceApi(
      referenceId,
      attachmentType,
    );
    return response.status === 1 ? response?.data : [];
  },
  addAttachmentsAccess: async (id, data, creator
  ) => {
    const response = await AddAttachmentsAccessApi(id, data, creator
    );
    if (response.status !== 1) {
      throw new Error(response.message);
    }
    return response;
  },
  getAttachments: async (pageNumber, pageSize, searchValue, SecondSearchValue
  ) => {
    const response = await GetAttachmentsApi(pageNumber, pageSize, searchValue, SecondSearchValue
    );
    return response;
  },
  getAttachmentAccess: async (pageNumber, pageSize, searchValue, SecondSearchValue, thirdSearchValue
  ) => {
    const response = await GetAttachmentAccessApi(pageNumber, pageSize, searchValue, SecondSearchValue, thirdSearchValue
    );
    return response;
  },
  deleteAttachmentAccess: async (id) => {
    const response = await DeleteAttachmentAccessApi(id);
    if (response.status !== 1) {
      throw new Error(response);
    }
    return response;
  },
  getVideoFile: async (id, empBadge) => {
    const response = await GetVideoFileApi(id, empBadge);
    return response;
  },
};
export default attachmentService;