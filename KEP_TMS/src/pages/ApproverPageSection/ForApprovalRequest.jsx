import { SectionBanner } from "../../components/General/Section";
import { useEffect, useState } from "react";
import { SessionGetEmployeeId } from "../../services/sessions";
import { getUserApi } from "../../api/userApi";
import { mapForApprovalRequestToTableData } from "../../services/DataMapping/TrainingRequestData";
import { formatCurrency, formatDateOnly } from "../../utils/datetime/Formatting";
import CommonTable from "../../components/General/CommonTable";
import trainingRequestService from "../../services/trainingRequestService";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const ForApprovalRequest = () => {
  const [request, setRequest] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getRequest = async () => {
      try {
        const res = await trainingRequestService.getTrainingRequestByApprover(SessionGetEmployeeId());
        const mappedData = mapForApprovalRequestToTableData(res);
        const updated = await Promise.all(
          mappedData.map(async (x) => {
            const user = await getUserApi(x.requestorId);
            return { ...x, requesterName: user.data.fullname };
          })
        );
        setRequest(updated);
      } catch (error) {
        console.error(error);
      }
    };
    getRequest();
  }, []);

  const actionTemplate = (data) => {
    return (
      
    <div className="d-flex">
      <Button
        type="button"
        icon="pi pi-eye"
        size="small"
        severity="success"
        className="rounded"
        text
        onClick={() => navigate(`/KEP_TMS/TrainingDetail/${data?.id}`)}
      />
  </div>
    );
  };
  const columnItems = [
    {
      field: "id",
      header: "Id",
    },
    {
      field: "type",
      header: "Type",
    },
    {
      field: "requesterName",
      header: "Requestor",
    },
    {
      field: "requestorId",
      header: "Badge No",
    },
    {
      field: "program",
      header: "Program",
    },
    {
      field: "category",
      header: "Category",
    },
    {
      field: "provider",
      header: "Provider",
    },
    {
      field: "venue",
      header: "Venue",
    },
    {
      field: "startDate",
      header: "Start Date",
      body: (rowData) => <>{formatDateOnly(rowData.startDate)}</>
    },
    {
      field: "endDate",
      header: "End Date",
      body: (rowData) => <>{formatDateOnly(rowData.endDate)}</>
    },
    {
      field: "endDate",
      header: "Total Fee",
      body: (rowData) => <>{formatCurrency(rowData.totalFee)}</>
    },
    // {
    //   field: "trainingTotalCost",
    //   header: "Total Fee",
    //   body: (rowData) => <>{StatusColor({status: rowData.status,showStatus:true})}</>
    // },
    {
      field: "",
      header: "Action",
       body: actionTemplate
    },
  ];
  return (
    <div className="p-3">
    <SectionBanner
      title="For Approval Training Requests"
      subtitle="List of Trainings waiting for Approval"
    />
    <CommonTable dataTable={request} columnItems={columnItems} tableName="Training Requests"/>
  </div>
  );
};
export default ForApprovalRequest;
