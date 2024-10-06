import { Button } from "primereact/button";
import ProgramForm from "../../components/forms/ModalForms/ProgramForm";
import GeneralTable from "../../components/General/GeneralTable";
import { SectionBanner } from "../../components/General/Section";
import SkeletonBanner from "../../components/Skeleton/SkeletonBanner";
import SkeletonDataTable from "../../components/Skeleton/SkeletonDataTable";
import programHook from "../../hooks/programHook";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import CommonTable from "../../components/General/CommonTable";
import { useState } from "react";
import { formatDateOnly } from "../../utils/Formatting";

const ProgramListPage = () => {
  const [visible, setVisible] = useState(false);
  const { data, error, loading } = programHook.useAllPrograms();
  const [selectedData, setSelectedData] = useState({});
  console.log(data)
  const columnItems = [{
    field: "id",
    header: "ID",
  }, {
    field: "name",
    header: "Name",
  },{
    field: "description",
    header: "Description",
  },{
    field: "createdDate",
    header: "Created",
    body: (rowData) => formatDateOnly(rowData.createdDate),
  }
]
  const actionButton = () => {
    return (
      <div className=" flex flex-wrap justify-content- gap-3">
        <Button
          type="button"
          icon="pi pi-plus"
          severity="success"
          className="rounded theme-bg"
          label={"programs"}
          onClick={() => {setVisible(true)
            setSelectedData(null)
          }}
        />
      </div>
    );
  };
  return (
    <>
      {loading ? (
        <>
          <SkeletonBanner />
          <SkeletonDataTable />
        </>
      ) : (
        <>
          <SectionBanner
            title={"Programs"}
            subtitle="List of Training Programs"
            ActionComponents={actionButton}
          />{" "}
          <CommonTable dataTable={data} title="Programs" columnItems={columnItems} />
          <ProgramForm
            handleShow={visible}
            handleClose={setVisible}
            selectedData={selectedData}
          />
        </>
      )}
    </>
  );
};
export default ProgramListPage;
