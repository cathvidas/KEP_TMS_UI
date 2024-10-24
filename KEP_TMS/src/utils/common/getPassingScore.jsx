const getPassingScore = (totalItem, percentage)=>{
    const passingSore = Math.round(totalItem * (percentage??75/100));
    if(passingSore === totalItem){
        return passingSore -1;
    }
    return passingSore;
}
export default getPassingScore;