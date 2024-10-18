import { SectionBanner } from "../../components/General/Section";
import { useEffect, useState } from "react";
import { SessionGetEmployeeId } from "../../services/sessions";
import { getUserApi } from "../../api/userApi";
import StatusColor from "../../components/General/StatusColor";
import { mapForApprovalRequestToTableData } from "../../services/DataMapping/TrainingRequestData";
import { formatCurrency, formatDateOnly } from "../../utils/datetime/Formatting";
import ApproverAction from "../../components/tableComponents/ApproverAction";
import CommonTable from "../../components/General/CommonTable";
import trainingRequestService from "../../services/trainingRequestService";

const ForApprovalRequest = () => {
  const [request, setRequest] = useState([]);
  const [trigger, setTrigger] = useState(0);
  useEffect(() => {
    const getRequest = async () => {
      try {
        const res = await trainingRequestService.getTrainingRequestByApprover(SessionGetEmployeeId());
        const mappedData = mapForApprovalRequestToTableData(res);
        const updated = await Promise.all(
          mappedData.map(async (x) => {
            const user = await getUserApi(x.requestorId);
            return { ...x, requestorName: user.data.fullname };
          })
        );
        setRequest(updated);
      } catch (error) {
        console.error(error);
      }
    };
    getRequest();
  }, [trigger]);


  const actionTemplate = (data) => {
    return (
       <ApproverAction reqId={data.id} onFinish={refreshData} hasView/>
    );
  };
  const columnItems = [
    {
      field: "id",
      header: "Id",
    },
    {
      field: "requestorName",
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
    {
      field: "endDate",
      header: "Total Fee",
      body: (rowData) => <>{StatusColor({status: rowData.status,showStatus:true})}</>
    },
    {
      field: "",
      header: "Action",
       body: actionTemplate
    },
  ];
  const refreshData= ()=>{
    
    setInterval(() => {
      setTrigger(trigger+1)
    }, 2000);
  }

  return (
    <div className="p-3">
    <SectionBanner
      title="For Approvals"
      subtitle="List of Trainings waiting for Approval"
    />
    <CommonTable dataTable={request} columnItems={columnItems} tableName="Training Requests"/>
  </div>
  );
};
export default ForApprovalRequest;
