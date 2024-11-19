const getPassingScore = (totalItem, percentage)=>{
    const passingSore = Math.round(totalItem * ((percentage ??75)/100));
    return totalItem > 1 ? passingSore : totalItem;
}
export default getPassingScore;