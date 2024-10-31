const getNameFromList = (list, value, returnNameOnly=true)=>{
    const result = list?.find(item => item.employeeBadge === value);
    return returnNameOnly ? result?.fullname : result;
}
export default getNameFromList;