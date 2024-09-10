import { GetAllCategories, GetAllPrograms } from "./getApis";

const  ReturnAllByType=(type)=>{
    const list = [];
    var entity = type && type == "program" ? GetAllPrograms() : type == "category" ? GetAllCategories(): null;
    if(entity){
        entity.then((res)=>{
            res.forEach(data => {
                list.push({
                    value: data.id,
                    label: data.name
                })
            });});
    }
    return list;
}
export const ReturnAllPrograms=()=>{
    return ReturnAllByType("program");
}
export const ReturnAllCategories=()=>{
    return ReturnAllByType("category");
}