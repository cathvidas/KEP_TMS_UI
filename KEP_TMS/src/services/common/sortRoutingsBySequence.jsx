const sortRoutingBySequence = (data)=>{
    return data?.sort((a,b)=>{
        if(a.sequence>b.sequence){
            return 1;
        }
        if(a.sequence<b.sequence){
            return -1;
        }
        return 0;
    })
}
export default sortRoutingBySequence

export const sortDataByProperty = (data, property)=>{
    return data?.sort((a,b)=>b[property]-a[property]);
}