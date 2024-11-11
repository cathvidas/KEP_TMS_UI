import activityLogHook from "../../hooks/activityLogHook";
import { formatDateTime } from "../../utils/datetime/Formatting";
import proptype from "prop-types"
const RequestAuditTrailLogsItem = ({data})=>{
    const logs = activityLogHook.useRequestAuditTrailActivityLogs(data?.auditTrail).filter(item=>item?.changes)
    const ItemTemplate = (item)=> {
        const hasValue = item?.value && item?.value !== "{}"
      return (
        <>
        {hasValue &&
          <div className="flex gap-0 flex-wrap ">
            <h6 className="mb-0" style={{ fontSize: "0.9rem" }}>
              {item.label}:
            </h6>
            <small className="text-muted">{item?.value?.toString()}</small>
          </div>
          }
        </>
      );
    }
    return (
      <>
        {logs?.length > 0 ? logs?.map(
          (item) =>
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
        : <p>No logs available</p>
      }
      </>
    );
}
RequestAuditTrailLogsItem.propTypes = {
  data: proptype.object
}
export default RequestAuditTrailLogsItem;