const countData = (data, property, value)=>{
    return data.filter(item => item[property] === value).length;
} 
export default countData;