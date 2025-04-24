import CommonTable from "../General/CommonTable";
import proptype from "prop-types"
import externalFacilitatorHook from "../../hooks/externalFacilitatorHook";

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
      header: "Department / Organization",
    },
  ];
  return (
    <>
      <CommonTable hidePaginator columnItems={columnItems} dataTable={mappedData?.data} hideHeader loading={mappedData?.loading}/>
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
