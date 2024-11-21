import { Button } from "primereact/button";
import Proptypes from "prop-types";

const ExportBtn=({ data })=> {
  ExportBtn.propTypes = {
    data: Proptypes.array,
  };
  const handleDownload = (e) => {
    e.preventDefault();
  
    const mapFacilitator = (dataList) => {
      let facilitators = "";
      dataList?.map((x) => {
        facilitators += `${x?.fullname}; `;
      });
      return facilitators;
    };
    const requestData = data?.map((dataItem) => ({
      RequestID: dataItem.id,
      requesterBadge: dataItem.requesterBadge,
      requesterName: dataItem.requesterName,
      Type: dataItem.trainingType.name,
      Program: dataItem.trainingProgram.name,
      Category: dataItem.trainingCategory.name,
      Provider: dataItem.trainingProvider.name,
      Venue: dataItem?.venue,
      StartDate: dataItem.trainingStartDate,
      EndDate: dataItem.trainingEndDate,
      TotalTrainingFee: dataItem.totalTrainingFee,
      TrainingHours: dataItem.durationInHours,
      TotalTrainingParticipants: dataItem.totalParticipants,
      TrainingFacilitators: mapFacilitator(dataItem.trainingFacilitators),
    }));
  
    const csvRequestHeaders = [
      "Request ID",
      "Requestor Badge",
      "Requestor Name",
      "Type",
      "Program",
      "Category",
      "Provider",
      "Venue",
      "Start Date",
      "End Date",
      "Total Training Fee",
      "Total Participants",
      "Total Training Hours",
      "Training Facilitators",
    ];
  
    const csvContent = [
      csvRequestHeaders.join(","),
      ...requestData.map((row) => Object.values(row)
      .map((value) => {
        if (typeof value === "string") {
          return `"${value.replace(/"/g, '""')}"`;
        } else {
          return `"${value}"`;
        }
      })
      .join(","))
    ].join("\n");
  
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `TMS_REQUESTS_LIST_${Date.now()}.csv`;
    link.click();
  };
  
  

  return (
    <Button
      icon="pi pi-download"
      text
      className="rounded"
      onClick={handleDownload}
    />
  );
}

export default ExportBtn;
