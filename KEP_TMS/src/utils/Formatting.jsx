import { FormatDate } from "./FormatDateTime";

export const FormatToOptions=(data)=>{
    return {value: data.id, label: data.name}
 
}

export const formatCurrency = (value) => {
    return value?.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' });
};

export const formatDateTime = (value) => {
    const date = value ? new Date(value): new Date();
    return date.toLocaleString("en-US")
}
export const formatDateOnly = (value) => {
    const date = new Date(value);
    return date.toLocaleDateString("en-US")
}
export const formatDateString = (value) => {
    const date = new Date(value);
    return FormatDate(date.toISOString().split('T')[0]);
}