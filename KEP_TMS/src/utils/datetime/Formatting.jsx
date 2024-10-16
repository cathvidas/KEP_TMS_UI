import { FormatDate, FormatTime } from "./FormatDateTime";

export const FormatToOptions=(data)=>{
    return {value: data.id, label: data.name}
 
}

export const formatCurrency = (value) => {
    return value?.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' });
};

export const formatDateTime = (value, hasSecond) => {
    const date = value && new Date(value);
    if(hasSecond){
        return date?.toLocaleString("en-US")
    }else{
     const time = date?.toLocaleTimeString("en-US", { hour12: true, hour: '2-digit', minute: '2-digit' });
     return `${date?.toLocaleDateString("en-US")} ${time}`;
    }
    
}
export const formatDateOnly = (value, type = 'slash') => {
    const date = new Date(value);

    if (isNaN(date.getTime())) {
        return ''; // Return empty if the date is invalid
    }

    // Extract year, month, and day components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if necessary

    // Handle different types of date formats
    switch (type) {
        case 'slash': // yyyy/mm/dd
            return `${month}/${day}/${year}`;
        case 'dash': // yyyy-mm-dd (default)
        default:
            return `${year}-${month}-${day}`;
    }
};

export const formatDateString = (value) => {
    const date = new Date(value);
    return FormatDate(date.toISOString().split('T')[0]);
}