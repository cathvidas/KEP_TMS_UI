import { useState } from "react";
import { API_BASE_URL, SearchValueConstant } from "../../api/constants";
import attachmentHook from "../../hooks/attachmentHook";
import { ButtonGroup } from "primereact/buttongroup";
import { Button } from "primereact/button";
import CommonTable from "../General/CommonTable";
import { Paginator } from "primereact/paginator";
import proptype from "prop-types"
import VideoPlayer from "../General/VideoPlayer";
import { VideoFileUrl } from "../../api/attachmentApi";
import { SessionGetEmployeeId } from "../../services/sessions";
import { getVideoAttachmentUrl } from "../../utils/getVideoAttachmentUrl";

const TrainingVideosList = ({ requestId }) => {
  const [playVideo, setPlayVideo] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
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
            // onClick={()=>{setActiveVideo(rowData);setPlayVideo(true)}}
            onClick={() => window.open(getVideoAttachmentUrl(rowData?.attachmentId, true) , "_blank")}
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
            <CommonTable
              tableName="Videos"
              columnItems={columnItems}
              dataTable={data?.results || []}
              hidePaginator
              hideOnEmpty={false}
              loading={loading}
              errorMessage={error}
            />
            {(!loading && !error) && (
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
            )}
          </>
        </div>
      </div>
      <VideoPlayer handleShow={playVideo} handleClose={() => setPlayVideo(false)} data={activeVideo}/>
    </>
  );
};
TrainingVideosList.propTypes = {
  requestId: proptype.number,
}
export default TrainingVideosList;
