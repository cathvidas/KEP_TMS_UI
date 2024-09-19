export const FormatToOptions=(data)=>{
    return {value: data.id, label: data.name}
 
}

export const formatCurrency = (value) => {
    return value.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' });
};