import handleApiResponse from "../api/apiHandlers";
import { getAllTrainingRequests, getTrainingCategories, getTrainingPrograms } from "../api/trainingServiceApi";
import { FormatToOptions } from "../utils/Formatting";

export const GetAllTrainingPrograms = () => {
    return handleApiResponse(FormatToOptions, getTrainingPrograms);
  };
export const GetAllTrainingCategories = () => {
  return handleApiResponse(FormatToOptions, getTrainingCategories);
};

export const GetAllTrainingRequests = () => {
  var res =  handleApiResponse(null, getAllTrainingRequests);
   res.then((r)=>{
    console.log(r)
  })
  return res
}