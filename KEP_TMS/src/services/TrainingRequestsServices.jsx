import { getAllTrainingRequests } from "./trainingServices"

export const getAlltrainingRequestByUserId = async (userId) => {
    const res = await getAllTrainingRequests();
    return res.filter(req => req.requestorName === userId);
}

