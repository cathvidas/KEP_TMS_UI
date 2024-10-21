const sortByDate = (list)=>{
    return list.sort((a,b)=>{
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
    })
}
expo