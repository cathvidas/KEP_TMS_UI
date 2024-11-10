import { ActivityType } from "../../api/constants";
import handleResponseAsync from "../handleResponseAsync";
import { actionFailed, actionSuccessful, confirmAction } from "../sweetalert";
import trainingRequestService from "../trainingRequestService";

const handleApproveRequest = async (data) => {
  const newData = {
    transactId: data.id,
    approvedBy: data.user,
    activityIn: ActivityType.REQUEST,
  };
  if(!data.approve){
    newData.remarks = data.remarks;
    newData.updatedBy = data.user
  }
  confirmAction({
    showLoaderOnConfirm: true,
    title: data.approve ? "Approve Request" : "Disapprove Request",
    text:data.approve  ?  `Are you sure you want to approve this request?`: `Are you sure you want to disapprove this request?`,
    confirmButtonText: data.approve ?"Approve": "Disapprove",
    cancelButtonText: "Cancel",
    confirmButtonColor: !data.approve && "#d33",
    onConfirm: () =>
      handleResponseAsync(
        () => data?.approve ? trainingRequestService.approveTrainingRequest(newData) : trainingRequestService.disapproveTrainingRequest(newData),
        (e) => {
          actionSuccessful(
            "Success",
            !data?.approve
              ? "Successfully disapproved the request"
              : e.message
          );
          data?.onFinish();
        },
        (error) =>
          actionFailed("Error", error?.message)
      ),
  });
};
export default handleApproveRequest;
