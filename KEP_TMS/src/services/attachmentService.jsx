import { getModuleAttachmentByIdApi } from "../api/attachmentApi";

const attachmentService = {
    getModuleAttachmentById: async (id)=>{
        const response = await getModuleAttachmentByIdApi(id);
        return response;
    }
}
export default attachmentService;