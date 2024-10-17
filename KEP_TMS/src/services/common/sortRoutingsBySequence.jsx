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