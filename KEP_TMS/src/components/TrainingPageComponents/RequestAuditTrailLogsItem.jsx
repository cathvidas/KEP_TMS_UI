import activityLogHook from "../../hooks/activityLogHook";
import { formatDateTime } from "../../utils/datetime/Formatting";
import { checkIfNullOrEmpty } from "../../utils/stringUtil";

const RequestAuditTrailLogsItem = ({data})=>{
    const logs = activityLogHook.useRequestAuditTrailActivityLogs(data?.auditTrail)
    console.log(logs)
    const checkIfHasValue = (item)=>{
        return  item?.value && item?.value !== "{}"
    }
    const ItemTemplate = (item)=> {
        const hasValue = item?.value && item?.value !== "{}"
      return (
        <>
        {hasValue &&
          <div className="flex gap-0 flex-wrap ">
            <h6 className="mb-0" style={{ fontSize: "0.9rem" }}>
              {item.label}:
            </h6>
            <small className="text-muted">{item?.value}</small>
          </div>
          }
        </>
      );
    }
    return (
      <>
        {logs?.map(
          (item) =>
            item?.changes && (
              <>
                <div className="flex flex-wrap">
                  <h6 className="mb-0" style={{ fontSize: "0.9rem" }}>
                    Date: {formatDateTime(item?.updatedDate)}
                  </h6>||
                  <h6 className="mb-0" style={{ fontSize: "0.9rem" }}>
                    Updated By: {item?.updatedBy}
                  </h6>
                  
                </div>
                <i className="pi pi-ellipsis-h"></i>
                <ItemTemplate
                  label={"Training Dates"}
                  value={item?.changes?.TrainingDates}
                />
                <ItemTemplate
                  label={"Training Participants"}
                  value={item?.changes?.TrainingParticipants}
                />
                <ItemTemplate
                  label={"Training ProgramId"}
                  value={item?.changes?.TrainingProgramId}
                />
                <ItemTemplate
                  label={"Training ProviderId"}
                  value={item?.changes?.TrainingProviderId}
                />
                <ItemTemplate
                  label={"Training Objectives"}
                  value={item?.changes?.TrainingFee}
                />
                <ItemTemplate
                  label={"Training Fee"}
                  value={item?.changes?.TrainingProviderId}
                />
                <ItemTemplate label={"Venue"} value={item?.changes?.Venue} />
                <ItemTemplate
                  label={"TrainingType"}
                  value={item?.changes?.TrainingType ?? ""}
                />
                <hr />
              </>
            )
        )}
      </>
    );
}
export default RequestAuditTrailLogsItem;