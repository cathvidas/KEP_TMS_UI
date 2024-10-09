const countData = (data, property, value)=>{
    return data.filter(item => item[property] !== null).length;
} 
export default countData;