import { useEffect, useState } from "react";

const mappingHook = {
  useMappedActivityRoute: (approvers, activity) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        console.log(approvers, activity)
      const mappedApprovers = [];
      approvers?.map((app) => {
        const actItem = activity?.filter(
          (act) => act?.assignedTo == app?.employeeBadge
        );
        actItem?.sort((a, b) => a.sequence - b.sequence);
        mappedApprovers.push({ detail: app, status: actItem ? actItem[0] : {}});
      });
      setData(mappedApprovers);
    }, [approvers, activity]);
    return data ;
  },
};
export default mappingHook;