import { useState } from "react";
import { SearchValueConstant } from "../../api/constants";
import attachmentHook from "../../hooks/attachmentHook";
import { ButtonGroup } from "primereact/buttongroup";
import { Button } from "primereact/button";
import SkeletonDataTable from "../Skeleton/SkeletonDataTable";
import ErrorTemplate from "../General/ErrorTemplate";
import CommonTable from "../General/CommonTable";
import { Paginator } from "primereact/paginator";
import proptype from "prop-types"
import { VideoFileUrl } from "../../api/attachmentApi";

const TrainingVideosList = ({ requestId }) => {
  const [paginatorConfig, setPaginatorConfig] = useState({
    first: 0,
    rows: 10,
    page: 1,
    value: null,
  });
  const { data, error, loading } = attachmentHook.useAttachmentAccess(
    paginatorConfig.page,
    paginatorConfig.rows,
    SearchValueConstant.REQUEST,
    requestId,
    paginatorConfig.value,
    requestId
  );
  const columnItems = [
    {
      field: "",
      header: "No",
      body: (_, { rowIndex }) => <>{rowIndex + 1}</>,
    },
    {
      field: "fileName",
      header: "File Name",
    },
    {
      field: "category",
      header: "Category",
    },
    {
      field: "fileType",
      header: "File Type",
    },
    {
      field: "ExternalTrainer",
      header: "Action",
      body: (rowData) => (
        <ButtonGroup>
          <Button
            type="button"
            text
            severity="success"
            icon="pi pi-play-circle"
            className="p-button-rounded"
            title="Play Video"
            size="small"
            onClick={() => window.open(VideoFileUrl + `${rowData?.attachmentId}` , "_blank")}
          />
        </ButtonGroup>
      ),
    },
  ];
  return (
    <>
      <div className="d-flex ">
        <div
          className="flex-fill overflow-auto p-3"
          style={{ minHeight: "100vh" }}
        >
          <>
            {loading ? (
              <SkeletonDataTable />
            ) : error ? (
              <ErrorTemplate message={error} />
            ) : (
              <>
                <CommonTable
                  tableName="Videos"
                  columnItems={columnItems}
                  dataTable={data?.results}
                  hidePaginator
                  hideOnEmpty={false}
                />
                <Paginator
                  first={paginatorConfig?.first ?? 1}
                  pageLinkSize={5}
                  rows={paginatorConfig.rows}
                  totalRecords={data?.totalRecords}
                  rowsPerPageOptions={[10, 20, 30, 50, 100]}
                  onPageChange={(e) =>
                    setPaginatorConfig((prev) => ({
                      ...prev,
                      first: e.first,
                      rows: e.rows,
                      page: e.page + 1,
                    }))
                  }
                />
              </>
            )}
          </>
        </div>
      </div>
    </>
  );
};
TrainingVideosList.propTypes = {
  requestId: proptype.object,
}
export default TrainingVideosList;
