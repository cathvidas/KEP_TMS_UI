import { statusCode } from "../../api/constants";

const routingService = {
  sortRoutingBySequence: (data, descending) => {
    if (data?.length > 0) {
      if (descending) {
        return data?.sort((a, b) => b.id - a.id);
      } else {
        return data?.sort((a, b) => a.id - b.id);
      }
    }
  },
  getCurrentApprover: (approvers, routings) => {
    let currentApprover = null;
    const sortedRouting = routingService.sortRoutingBySequence(routings, true);
    let currentRouting = sortedRouting?.find(
      (routing) => routing.statusId !== statusCode.TOUPDATE
    );
    if (approvers && approvers.length > 0 && currentRouting) {
      currentApprover = approvers.find(
        (approver) => approver.employeeBadge === currentRouting.assignedTo
      );
    }
    return { ...currentRouting, assignedDetail: currentApprover };
  },
  getApproverStatus: (routings, user) => {
    if (routings) {
      const sortedRouting = routingService.sortRoutingBySequence(
        routings,
        true
      );
      return sortedRouting?.find((routing) => routing.assignedTo === user);
    }
  },
};
export default routingService;
