import CommonTable from "../General/CommonTable";
import { Button } from "primereact/button";
import proptype from "prop-types"
import externalFacilitatorHook from "../../hooks/externalFacilitatorHook";

const ExternalFacilitatorList = ({
  trainers,
  removeTrainer,
  showDeleteButton,
}) => {
  const mappedData = externalFacilitatorHook.useListExternalFacilitators(trainers)
  const actionBodyTemplate = (data) => {
    return (
      <Button
        type="button"
        severity="danger"
        icon="pi pi-trash"
        text
        // onClick={() => removeTrainer(data.employeeBadge)}
      />
    );
  };
  console.log(trainers, mappedData)
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
      field: "depatmentOrganization",
      header: "Depatment Organization",
    },
    // ...(showDeleteButton && {
    //   field: "",
    //   header: "Action",
    //   body: actionBodyTemplate,
    // }),
  ];
  return (
    <>
      <CommonTable columnItems={columnItems} dataTable={mappedData?.data} hideHeader/>
    </>
  );
};
ExternalFacilitatorList.propTypes = {
  trainers: proptype.array,
  removeTrainer: proptype.func,
  showDeleteButton: proptype.bool,
}
export default ExternalFacilitatorList;
