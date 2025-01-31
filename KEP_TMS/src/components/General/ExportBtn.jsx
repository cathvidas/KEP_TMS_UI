import { Button } from "primereact/button";
import Proptypes from "prop-types";
import externalFacilitatorService from "../../services/externalFacilitatorService";
import userService from "../../services/userService";

const ExportBtn = ({ data, closeModal }) => {
  ExportBtn.propTypes = {
    data: Proptypes.array,
    closeModal: Proptypes.func,
  };
  const handleDownload = async (e) => {
    e.preventDefault();
    const fetchFaci = async (faciList) => {
      try {
        let formattedFacilitators = "";
        const faciNames = await Promise.all(
          faciList?.map(async (faci) => {
            if (faci?.isExternal) {
              const faciDetail =
                await externalFacilitatorService.getExternaFacilitatorById(
                  faci?.externalFacilitatorId
                );
              return faciDetail?.name;
            } else {
              const userDetail = await userService.getUserById(
                faci?.facilitatorBadge
              );
              return userDetail?.fullname;
            }
          })
        );
        formattedFacilitators = faciNames.join("; ");
        return formattedFacilitators;
      } catch (err) {
        return "Error: " + err.message;
      }
    };
    const requestData = await Promise.all(
      data?.map(async (dataItem) => ({
        RequestID: dataItem?.id,
        requesterBadge: dataItem?.requesterBadge,
        requesterName: dataItem?.requesterName,
        Type: dataItem?.trainingType?.name ?? "",
        Program: dataItem?.trainingProgram?.name ?? "N/A",
        Category: dataItem?.trainingCategory?.name ?? "N/A",
        Provider: dataItem?.trainingProvider?.name ?? "N/A",
        Venue: dataItem?.venue,
        StartDate: dataItem?.trainingStartDate,
        EndDate: dataItem?.trainingEndDate,
        TotalTrainingFee: dataItem?.totalTrainingFee,
        TrainingHours: dataItem?.durationInHours,
        TotalTrainingParticipants: dataItem?.totalParticipants,
        TrainingFacilitators: await fetchFaci(dataItem?.trainingFacilitators),
      }))
    );

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
      ...requestData.map((row) =>
        Object.values(row)
          .map((value) => {
            if (typeof value === "string") {
              return `"${value.replace(/"/g, '""')}"`;
            } else {
              return `"${value}"`;
            }
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `TMS_REQUESTS_LIST_${Date.now()}.csv`;
    link.click();
    closeModal();
  };

  return (
    <Button
      icon="pi pi-download"
      label="Export"
      size="small"
      className="rounded"
      onClick={handleDownload}
    />
  );
};

export default ExportBtn;
