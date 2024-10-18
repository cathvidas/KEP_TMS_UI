const getPassingScore = (totalItem, percentage)=>{
    return Math.floor(totalItem * (percentage??75/100));
}
export default getPassingScore;