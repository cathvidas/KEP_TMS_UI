import proptype from 'prop-types'
import { ActivityType, statusCode } from '../../api/constants';
import commonHook from '../../hooks/commonHook';
import countData from '../../utils/countData';
const RequestStatusColumn = ({value})=>{
    const currentRouting = commonHook.useCurrentRouting(value?.id, ActivityType.REQUEST);
    return (
      <>
        <div>
          {value?.status?.id == statusCode.DRAFTED ?<span className='text-danger fst-italic'>Draft</span>:
          value?.status?.id == statusCode.INACTIVE ?<span className='text-danger fst-italic'>Cancelled</span>: <>
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
          </b></>}
        </div>
      </>
    );
}
RequestStatusColumn.propTypes = {
    value: proptype.object.isRequired
}
export default RequestStatusColumn;