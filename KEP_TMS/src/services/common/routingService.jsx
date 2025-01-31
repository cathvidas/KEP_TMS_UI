import { statusCode } from "../../api/constants";

const routingService = {
  sortRoutingBySequence: (data, descending) => {
    if (data?.length > 0) {
      if (descending) {
        return data?.sort((a, b) => b.sequence - a.sequence);
      } else {
        return data?.sort((a, b) => a.sequence - b.sequence);
      }
    }
  },
  getCurrentApprover: (routings) => {
    let currentApprover = null;
    const sortedRouting = routingService.sortRoutingBySequence(routings, true);
    console.log(sortedRouting)
    let currentRouting = sortedRouting?.find(
      (routing) => routing.statusId !== statusCode.TOUPDATE
    );
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
