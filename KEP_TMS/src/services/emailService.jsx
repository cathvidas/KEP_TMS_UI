import {
  sendEmailApi,
  sendEmailToManyApi,
  updateEmailReminderIntervalApi,
} from "../api/emailApi";

const emailService = {
  sendEmail: async (data) => {
    const response = await sendEmailApi(data);
    return response.status === 1 ? response?.data : [];
  },
  sendEmailToMany: async (data) => {
    const response = await sendEmailToManyApi(data);
    if (response.status !== 1) {
      throw new Error(response.message);
    }
    return response;
  },
  updateEmailReminderInterval: async (data) => {
    const response = await updateEmailReminderIntervalApi(data);
    if (response.status !== 1) {
      throw new Error(response.message);
    }
    return response;
  },
};
export default emailService;
