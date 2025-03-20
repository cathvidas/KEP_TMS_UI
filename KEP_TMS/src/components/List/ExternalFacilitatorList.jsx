import CommonTable from "../General/CommonTable";
import proptype from "prop-types"
import externalFacilitatorHook from "../../hooks/externalFacilitatorHook";
import SkeletonDataTable from "../Skeleton/SkeletonDataTable";

const ExternalFacilitatorList = ({
  trainers,
  property
}) => {
  const mappedData = externalFacilitatorHook.useListExternalFacilitators(trainers, property)
  const columnItems = [
    {
      field: "",
      header: "No",
      body: (_, { rowIndex }) => <>{1 + rowIndex}</>,
    },
    {
      field: "name",
      header: "Name",
    },
    {
      field: "position",
      header: "Position",
    },
    {
      field: "departmentOrganization",
      header: "Department Organization",
    },
  ];
  return (
    <>
    {mappedData?.loading ? <SkeletonDataTable/> :
      <CommonTable hidePaginator columnItems={columnItems} dataTable={mappedData?.data} hideHeader/>}
    </>
  );
};
ExternalFacilitatorList.propTypes = {
  trainers: proptype.array,
  removeTrainer: proptype.func,
  showDeleteButton: proptype.bool,
  property: proptype.string
}
export default ExternalFacilitatorList;
