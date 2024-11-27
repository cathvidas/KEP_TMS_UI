import fetchFromApi from "./apiUtil";

export const sendEmailApi = async (data) =>{
    return await fetchFromApi(`/EmailActions/SendEmail`, "POST", data);
}
export const sendEmailToManyApi = async (data) =>{
    return await fetchFromApi(`/EmailActions/SendEmailToMany`, "POST", data);
}
export const updateEmailReminderIntervalApi = async (data) =>{
    return await fetchFromApi(`/EmailActions/UpdateReminderInterval`, "POST", data);
}
export const getEmailReminderIntervalApi = async () =>{
    return await fetchFromApi(`/EmailActions/GetReminderInterval`);
}