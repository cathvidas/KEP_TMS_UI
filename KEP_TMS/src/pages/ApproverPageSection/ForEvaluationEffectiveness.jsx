import { useEffect, useState } from "react";
import CommonTable from "../../components/General/CommonTable";
import { SectionBanner } from "../../components/General/Section";
import effectivenessHook from "../../hooks/effectivenessHook";
import { SessionGetEmployeeId } from "../../services/sessions";
import SkeletonBanner from "../../components/Skeleton/SkeletonBanner";
import SkeletonDataTable from "../../components/Skeleton/SkeletonDataTable";
import userMapping from "../../services/DataMapping/userMapping";
import { formatDateTime } from "../../utils/datetime/Formatting";
import { Button } from "primereact/button";
import EffectivenessForm from "../../components/forms/EffectivenessForm";
import SkeletonForm from "../../components/Skeleton/SkeletonForm";
import trainingRequestHook from "../../hooks/trainingRequestHook";
import { Card } from "react-bootstrap";

const ForEvaluationEffectiveness = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState(SessionGetEmployeeId());
  const [assignedForms, setAssignedForms] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const effectivessDetail = effectivenessHook.useEffectivenessById(selectedData?.id);
  const requestData = trainingRequestHook.useTrainingRequest(4);
  const { data, error, loading } = effectivenessHook.usePagedEffectiveness(
    pageNumber,
    pageSize,
    search
  );
  useEffect(() => {
    const updatedData = data?.results?.filter(
      (item) => item?.evaluatorBadge === SessionGetEmployeeId()
    );
    const getRequestData = async () => {
      const mappedDetail = await userMapping.mapUserIdList(
        updatedData,
        "createdBy",
        null,
        true
      );
      setAssignedForms(mappedDetail);
    };
    getRequestData();
  }, [data, loading]);
  const actionTemplate = (rowData) => (
    <>
      <div className="d-flex">
        <Button
          type="button"
          size="small"
          text
          icon="pi pi-eye"
          severity="success"
          className="rounded-circle"
          onClick={() => {
            setSelectedData(rowData);
            setShowForm(true);
          }}
        />
      </div>
    </>
  );
  const items = [
    {
      field: "id",
      header: "No",
    },
    {
      field: "trainingProgramName",
      header: "Program",
    },
    {
      field: "id",
      header: "Created By",
      body: (rowData)=><>{rowData?.userDetail?.fullname}</>
    },
    {
      field: "id",
      header: "Created Date",
      body: (rowData)=><>{formatDateTime(rowData?.createdDate)}</>
    },
    {
      field: "id",
      header: "Status",
    },
    {
      field: "id",
      header: "Option",
      body: actionTemplate,
    },
  ];
  return (
    <>
        {loading ? (
          <>
            <SkeletonBanner /> <SkeletonDataTable />
          </>
        ) : !showForm ?  (
          <>
      <div className="p-3">
            <SectionBanner
              title="For Evaluation Training Effectiveness"
              subtitle="List of Training Effectiveness for Evaluation"
            />
            <CommonTable
              columnItems={items}
              dataTable={assignedForms}
              tableName={"For Evaluation Training Effectiveness"}
            />
            </div>
          </>
        ) : <>
        {effectivessDetail?.loading ? <SkeletonForm/> : 
        <Card>
<div className="text-end">
    <Button text icon="pi pi-times" type="button" onClick={()=>{
        setShowForm(false);
        setSelectedData({});
    }}/>
</div>
        <EffectivenessForm data={requestData?.data} formData={effectivessDetail?.data} userData={selectedData?.userDetail} currentRouting={effectivessDetail?.currentRouting} auditTrail={effectivessDetail?.auditTrail} /></Card>}
        </>}
    </>
  );
};
export default ForEvaluationEffectiveness;
