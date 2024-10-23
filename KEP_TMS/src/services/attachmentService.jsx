import { addAttachmentsApi, deleteAttachmentApi, getModuleAttachmentByIdApi } from "../api/attachmentApi";

const attachmentService = {
    getModuleAttachmentById: async (id)=>{
        const response = await getModuleAttachmentByIdApi(id);
        return response.status === 1 ? response?.data : {};
    }, addAttachments: async (formData)=>{
        const response = await addAttachmentsApi(formData);
        if(response.status !== 1){
            throw new Error(response.message);
        }
        return response?.data;
    },
    deleteAttachment: async (id) => {
        const response = await deleteAttachmentApi(id);
        if(response.status!== 1){
            throw new Error(response.message);
        }
        return response;
    }
}
export default attachmentService;