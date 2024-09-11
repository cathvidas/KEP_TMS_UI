import handleApiAction from "../api/apiHandlers";
import { GetAllCategories, GetAllPrograms } from "./getApis";
import { getTrainingPrograms } from "./trainingService";

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
export const ReturnThrough=(param)=>{
    const data =[];
    var response = param();
    if(response){
        response.then((res)=>{
            res.forEach(obj =>{
                data.push({
                    obj
                })
            })
        })
    }
    finalreturn(data)
}
export const finalreturn=(data)=>{
console.log(data)
}
export const ReturnInList= async()=>{
    ReturnThrough(getTrainingPrograms)
}