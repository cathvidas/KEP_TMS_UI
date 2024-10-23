import { statusCode } from "../../api/constants";
import handleResponseAsync from "../handleResponseAsync";
import { actionFailed, actionSuccessful, confirmAction } from "../sweetalert";
import trainingRequestService from "../trainingRequestService";

const handleApproveRequest = async (data) => {
  const newData = {
    requestId: data.id,
    employeeBadge: data.user,
    statusId: data.approve ? statusCode.APPROVED : statusCode.DISAPPROVED,
    updatedBy: data.user,
  };
  confirmAction({
    title: data.approve ? "Approve Request" : "Reject Request",
    text:data.approve  ?  `Are you sure you want to approve this request?`: `Are you sure you want to disapprove this request?`,
    confirmButtonText: data.approve ?"Approve": "Disapprove",
    cancelButtonText: "Cancel",
    confirmButtonColor: !data.approve && "#d33",
    onConfirm: () =>
      handleResponseAsync(
        () => trainingRequestService.approveTrainingRequest(newData),
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
    // param: { id: reqId, statusId: statusCode.APPROVED },
  });
};
export default handleApproveRequest;
