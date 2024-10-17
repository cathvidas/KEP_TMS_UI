import { getUserApi } from "../../api/userApi";

export const mapTRequestToTableData = (data)=>{
    const mappedData = data?.map(item=>({
        id: item.id,
        requestorName: item?.requestorName,
        requestorBadge: item?.requestorBadge,
        status: item?.status?.name,
        program: item.trainingProgram?.name,
        type: item?.trainingType?.name,
        objectives: item?.trainingObjectives,
        venue: item?.venue,
        category: item?.trainingCategory?.name,
        provider: item?.trainingProvider?.name,
        startDate: item.trainingStartDate,
        endDate: item.trainingEndDate,
        totalFee: item?.totalTrainingFee,
        approverId: item?.routing?.approverId,
        approverFullName: item?.routing?.approverFullName,
        approverUsername: item?.routing?.approverUsername,
        approverPosition: item?.routing?.approverPosition,
        facilitatorName: item?.trainingFacilitators[0]?.fullname ,
        totalParticipants: item?.totalParticipants,
        trainingParticipants: item?.trainingParticipants
        // facilitatorName: item?trainingFac 

    }))
    return mappedData
}

export const mapForApprovalRequestToTableData =  (data) => {
  const result = data.map(
    ({ routingActivity, trainingRequest }) => {
        const value = mapTrainingRequestDetails(trainingRequest);
        const currentApprover= routingActivity.assignedTo;
        return {...value, currentApprover: currentApprover}
    }
  );
  return result
};

export const mapTrainingRequestDetails = (data)=>{
    const user = {
        id: data.id,
        requestorName: data?.requestorName,
        requestorId: data?.requestorBadge,
        status: data?.status?.name,
        program: data.trainingProgram?.name,
        type: data?.trainingType?.name,
        objectives: data?.trainingObjectives,
        venue: data?.venue,
        category: data?.trainingCategory?.name,
        provider: data?.trainingProvider?.name,
        startDate: data.trainingStartDate,
        endDate: data.trainingEndDate,
        totalFee: data?.totalTrainingFee,

    }
    return user;
}

