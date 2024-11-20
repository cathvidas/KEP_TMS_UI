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
import { statusCode } from "../../api/constants";
import trainingDetailsService from "../../services/common/trainingDetailsService";

const ForEvaluationEffectiveness = () => {
  const [trigger, setTrigger] = useState(0);
  const [selectedData, setSelectedData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [availableData, setAvailableData] = useState([]);
  const effectivessDetail = effectivenessHook.useEffectivenessById(
    selectedData?.trainingEffectiveness?.id,trigger
  );
  // const requestData = trainingRequestHook.useTrainingRequest(4);
  const { data, loading } = effectivenessHook.useEvaluatorAssignedEffectiveness(
    SessionGetEmployeeId(),
    trigger
  );
useEffect(()=>{
const filtered = data?.filter(item=> trainingDetailsService.checkIfTrainingEndsAlready(item?.requestData) && item.routingActivity?.statusId === statusCode.TOUPDATE)
setAvailableData(filtered);
},[data])
  console.log(availableData, )
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
      body: (rowData) => <>{rowData?.trainingEffectiveness?.id}</>,
    },
    {
      field: "id",
      header: "Created By",
      body: (rowData) => <>{rowData?.auditTrail?.createdBy}</>,
    },
    {
      field: "trainingProgramName",
      header: "Program",
      body: (rowData) => (
        <>{rowData?.trainingEffectiveness?.trainingProgram?.name}</>
      ),
    },
    {
      field: "id",
      header: "Created Date",
      body: (rowData) => (
        <>{formatDateTime(rowData?.auditTrail?.createdDate)}</>
      ),
    },
    {
      field: "id",
      header: "Status",
      body: () => <>{"For Evaluation"}</>,
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
      ) : !showForm ? (
        <>
          <div className="p-3">
            <SectionBanner
              title="For Evaluation Training Effectiveness"
              subtitle="List of Training Effectiveness for Evaluation"
            />
            <CommonTable
              columnItems={items}
              dataTable={availableData}
              tableName={"For Evaluation Training Effectiveness"}
            />
          </div>
        </>
      ) : (
        <>
          {effectivessDetail?.loading ? (
            <SkeletonForm />
          ) : (
            <Card>
              <div className="text-end">
                <Button
                  text
                  icon="pi pi-times"
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setSelectedData({});
                  }}
                />
              </div>
              
              <EffectivenessForm
                evaluate
                onFinish={() => setTrigger((prev) => prev + 1)}
                data={selectedData?.requestData}
                formData={effectivessDetail?.data}
                userData={selectedData?.userDetail}
                currentRouting={effectivessDetail?.currentRouting}
                auditTrail={effectivessDetail?.auditTrail}
              />
            </Card>
          )}
        </>
      )}
    </>
  );
};
export default ForEvaluationEffectiveness;
