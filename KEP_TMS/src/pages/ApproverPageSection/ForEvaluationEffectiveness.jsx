import { useState } from "react";
import CommonTable from "../../components/General/CommonTable";
import effectivenessHook from "../../hooks/effectivenessHook";
import { formatDateTime } from "../../utils/datetime/Formatting";
import { Button } from "primereact/button";
import EffectivenessForm from "../../components/forms/EffectivenessForm";
import SkeletonForm from "../../components/Skeleton/SkeletonForm";
import { Card } from "react-bootstrap";
import proptype from "prop-types";
import userHook from "../../hooks/userHook";
import trainingRequestHook from "../../hooks/trainingRequestHook";

const ForEvaluationEffectiveness = ({data, refreshData}) => {
  const [trigger, setTrigger] = useState(0);
  const [selectedData, setSelectedData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const effectivessDetail = effectivenessHook.useEffectivenessById(
    selectedData?.id, trigger
  );
  const trainingRequestDetail = trainingRequestHook.useTrainingRequest(selectedData?.trainingRequestId);
  const userDetail = userHook.useUserById(selectedData?.employeeBadge);
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
      body: (rowData) => <>{rowData?.id}</>,
    },
    {
      field: "id",
      header: "Created By",
      body: (rowData) => <>{rowData?.createdBy}</>,
    },
    {
      field: "trainingProgramName",
      header: "Program",
      body: (rowData) => (
        <>{rowData?.trainingProgramName}</>
      ),
    },
    {
      field: "id",
      header: "Created Date",
      body: (rowData) => (
        <>{formatDateTime(rowData?.createdDate)}</>
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
      { !showForm ? (
        <>
          <div className="p-3">
            <CommonTable
              columnItems={items}
              dataTable={data}
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
                    refreshData();
                  }}
                />
              </div>
              
              <EffectivenessForm
                evaluate
                onFinish={() => setTrigger((prev) => prev + 1)}
                data={trainingRequestDetail?.data}
                formData={effectivessDetail?.data}
                userData={userDetail?.data}
                currentRouting={effectivessDetail?.data?.currentRouting}
                auditTrail={effectivessDetail?.data?.auditTrail
                }
              />
            </Card>
          )}
        </>
      )}
    </>
  );
};
ForEvaluationEffectiveness.propTypes = {
  data: proptype.array,
  refreshData: proptype.func,
}
export default ForEvaluationEffectiveness;
