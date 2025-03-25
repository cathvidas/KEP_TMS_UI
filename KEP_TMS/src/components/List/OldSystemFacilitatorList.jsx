import CommonTable from "../General/CommonTable";
import proptype from "prop-types";
import SkeletonDataTable from "../Skeleton/SkeletonDataTable";
import oldTrainingsHook from "../../hooks/oldTrainingsHook";

const OldSystemFacilitatorList = ({ facilitators }) => {
  const mappedData = oldTrainingsHook.useMappedFacilitator(facilitators);
  const columnItems = [
    {
      field: "",
      header: "No",
      body: (_, { rowIndex }) => <>{1 + rowIndex}</>,
    },
    {
      field: "fullname",
      header: "Name",
    },
    {
      field: "position",
      header: "Position",
    },
    {
      field: "departmentName",
      header: "Department",
    },
  ];
  return (
    <>
      <CommonTable
        hidePaginator
        columnItems={columnItems}
        dataTable={mappedData?.data}
        hideHeader
        hideOnEmpty={false}
        loading={mappedData?.loading}
      />
    </>
  );
};
OldSystemFacilitatorList.propTypes = {
  facilitators: proptype.array,
};
export default OldSystemFacilitatorList;
