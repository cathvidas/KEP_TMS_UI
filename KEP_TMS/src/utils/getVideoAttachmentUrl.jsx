import { VideoFileUrl } from "../api/attachmentApi";
import { API_BASE_URL } from "../api/constants";
import { SessionGetEmployeeId } from "../services/sessions";

export const getVideoAttachmentUrl = (id, isView) => {
  const mainUrl =
    API_BASE_URL +
    VideoFileUrl +
    id +
    `&employeeBadge=${SessionGetEmployeeId()}`;
    if(isView){
      return mainUrl + "&isView=true";
    }
  return mainUrl;
};
