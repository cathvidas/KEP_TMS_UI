export const mapTRequestToTableData = (data)=>{
    const mappedData = data.map((item)=>({
        id: item.id,
        requestorName: item?.requestorName,
        requestorId: item?.requestorBadge,
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

    }))
    return mappedData
}