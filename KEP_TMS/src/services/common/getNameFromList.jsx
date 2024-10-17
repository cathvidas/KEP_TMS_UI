const getNameFromList = (list, value)=>{
    return list?.find(item => item.employeeBadge === value)?.fullname;
}
export default getNameFromList;