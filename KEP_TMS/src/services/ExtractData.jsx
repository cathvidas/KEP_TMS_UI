import { formatCurrency } from "../utils/Formatting";

export const extractTrainingRequests = (data) => {
  const extracted = data.map(
    ({
      id,
      requestorName,
      categoryName,
      statusName,
      trainingProgramName,
      trainingProviderName,
      trainingTypeName,
      trainingObjectives,
      trainingStartDate,
      trainingEndDate,
      totalTrainingDays,
      durationInHours,
      venue,
      totalParticipants,
      isOffSite,trainingFee,
      totalTrainingFee,
      discountedRate,
      cutOffDate,
      createdBy,
      createdDate,

    }) => ({ 
        Id: "TR"+ id,
        Requestor: requestorName,
        Category: categoryName,
        Status: statusName,
        Program: trainingProgramName,
        Provider: trainingProviderName,
        Type: trainingTypeName,
        Objective: trainingObjectives,
        Start_Date: trainingStartDate,
        End_Date: trainingEndDate,
        TotalDays: totalTrainingDays,
        TotalHours: durationInHours,
        Venue: venue,
        Participants: totalParticipants,
        Offsite: isOffSite === true ? "Yes" : "No",
        Fee: formatCurrency(trainingFee) ,
        TotalCost: formatCurrency(totalTrainingFee),
        Discount: formatCurrency(discountedRate),
        CutOffDate: cutOffDate,
        CreatedBy: createdBy,
        Created: createdDate,
 
     })
  );
  return extracted;
};

export const extractApproverDetails = (data) => {
  const extracted = data.map(
    ({
      employeeBadge,
      firstname,
      lastname,
      email,
      department,
    }) => ({
        EmployeeBadge: employeeBadge,
        FullName: lastname + ", " + firstname,
        Email: email,
        Department: department
}))
return extracted;
}