import { ButtonGroup } from "primereact/buttongroup";
import CommonTable from "../General/CommonTable";
import { Button } from "primereact/button";
import proptype from "prop-types";
import { useState } from "react";
import VideoAccessForm from "../forms/ModalForms/VideoAccessForm";

const VideoAccess = ({ data, handleClose }) => {
  const [showForm, setShowForm] = useState(false);
  const sampleItems = [
    {
      field: "",
      header: "Training Id",
      body: (_, { rowIndex }) => <>{rowIndex + 1}</>,
    },
    {
      field: "Name",
      header: "Training Program",
    },
    {
      field: "Access",
      header: "Training Category",
    },
    {
      field: "Owner",
      header: "Created By",
    },
    {
      field: "Date",
      header: "Created Date",
    },
    {
      field: "ExternalTrainer",
      header: "Action",
      body: (
        <ButtonGroup>
          <Button
            type="button"
            text
            icon="pi pi-trash"
            severity="danger"
            size="small"
            className="p-button-rounded"
          />
        </ButtonGroup>
      ),
    },
  ];
  const sampleData = [
    {
      Name: "Training Management System Guidlines and Features",
      Type: "MP4",
      Size: "363 MB",
      Date: "10/25/2026",
      Owner: "John Doe",
      Access: 12 + " Training Request",
    },
    {
      Name: "Training Management System User Manual",
      Type: "WEBM",
      Size: "363 MB",
      Date: "10/25/2026",
      Owner: "John Doe",
      Access: 36 + " Training Request",
    },

    {
      Name: "Onboarding Training Guide",
      header: "Name",
      Type: "MOV",
      Owner: "John Doe",
      Date: "10/25/2026",
      Size: "1.3 GB",
      Access: 3 + " Training Request",
    },
  ];
  return (
    <>
      <div className="flex border-bottom pb-2">
        <h5 className="theme-color fw-bold mb-0 px-2">{data?.fileName}</h5>
        <Button
          className="ms-auto"
          icon="pi pi-arrow-left"
          text
          type="button"
          label="Back"
          onClick={handleClose}
        />
      </div>
      <CommonTable
        headerComponent={
          <Button
            label="Add New"
            icon="pi pi-plus"
            text
            onClick={() => setShowForm(true)}
          />
        }
        tableName="Video Access"
        columnItems={sampleItems}
        dataTable={sampleData}
      />
      <VideoAccessForm
        showForm={showForm}
        closeForm={() => setShowForm(false)}
        data={data}
      />
    </>
  );
};
VideoAccess.propTypes = {
  data: proptype.object,
  handleClose: proptype.func,
};
export default VideoAccess;
