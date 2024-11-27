import proptype from 'prop-types'
import { ActivityType, statusCode } from '../../api/constants';
import trainingDetailsService from '../../services/common/trainingDetailsService';
import commonHook from '../../hooks/commonHook';
import countData from '../../utils/countData';
const RequestStatusColumn = ({value})=>{
    const currentRouting = commonHook.useCurrentRouting(value?.id, ActivityType.REQUEST);
    const checkTrainingDates = (value) => {
        return (
          trainingDetailsService.checkTrainingIfOutDated(value) &&
          (value?.status?.id === statusCode.SUBMITTED ||
            value?.status?.id === statusCode.FORAPPROVAL)
        );
      };
    const isOutDated = checkTrainingDates(value);
    return (
      <>
        <div>
          {isOutDated && (
            <div className="text-danger flex gap-1">
              <i className="rounded pi pi-info-circle d-block"></i>Outdated
            </div>
          )}
          <span>
            {" "}
            {value.status?.id == statusCode.FORAPPROVAL
              ? "For " + currentRouting?.data?.assignedDetail?.position + " Approval"
              : value.status?.id == statusCode.SUBMITTED
              ? "Awaiting for trainee effectiveness"
              : value.status?.name}
          </span>
          <br />
          <b>
            {value.status?.id == statusCode.SUBMITTED
              ? `${countData(
                  value.trainingParticipants,
                  "effectivenessId",
                  4
                )}/${value.totalParticipants} submitted`
              : (value.status?.id == statusCode.PUBLISHED || value.status?.id == statusCode.CLOSED)
            }
          </b>
        </div>
      </>
    );
}
RequestStatusColumn.propTypes = {
    value: proptype.object.isRequired
}
export default RequestStatusColumn;