import { addAttachmentApi, getModuleAttachmentByIdApi } from "../api/attachmentApi";

const attachmentService = {
    getModuleAttachmentById: async (id)=>{
        const response = await getModuleAttachmentByIdApi(id);
        return response.status === 1 ? response?.data : {};
    }, addAttachment: async (formData)=>{
        const response = await addAttachmentApi(formData);
        if(response.status !== 1){
            throw new Error(response.message);
        }
        return response?.data;
    }
}
export default attachmentService;