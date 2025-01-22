import { Button } from "primereact/button";
import CommonTable from "../components/General/CommonTable";
import Layout from "../components/General/Layout";
import MenuItemTemplate from "../components/General/MenuItemTemplate";
import { ButtonGroup } from "primereact/buttongroup";
import fetchFromApi from "../api/apiUtil";
import { useState } from "react";
import VideoUploadForm from "../components/forms/ModalForms/VideoUploadForm";
import VideoAccess from "../components/List/VideoAccess";
import { SessionGetRole } from "../services/sessions";
import { UserTypeValue } from "../api/constants";

const DocumentsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const isAdmin = SessionGetRole() === UserTypeValue.ADMIN
  const items = [
    {
      items: [
        {
          label: "Category",
          template: MenuItemTemplate,
        },
        {
          label: "Programs",
          // icon: "pi pi-file-check",
          template: MenuItemTemplate,
          // active: currentContent === 1 ? true : false,
          // command: () => navigate("/KEP_TMS/MasterList/Programs"),
        },
        {
          label: "Providers",
          template: MenuItemTemplate,
        },
        {
          label: "External Trainers",
          template: MenuItemTemplate,
        },
        // {
        //   label: "Training Type",
        //   template: MenuItemTemplate,
        //   icon: "pi pi-check-square",
        // },
      ],
    },
  ];
  const sampleItems = [
    {
      field: "",
      header: "No",
      body: (_, { rowIndex }) => <>{rowIndex + 1}</>,
    },
    {
      field: "Name",
      header: "File Name",
    },  isAdmin ? 
    {
      field: "Name",
      header: "Category",
    }:"",
    {
      field: "Access",
      header: isAdmin ? "Access" : "Training Program",
      body: (rowData) => (
        <>
        {isAdmin ? 
        <span className="p-badge p-badge-info cursor-pointer" onClick={()=>setSelectedItem(rowData)}>{rowData?.Access}</span> : <>
        <lu><span>Sample Training Request; </span><span>Sample Training Request; </span><span>Sample Training Request</span></lu>
        </>}</>
      ),
    },
    isAdmin ? 
    {
      field: "Owner",
      header: "Owner",
    }: "",isAdmin ? 
    {
      field: "Type",
      header: "Type",
    }:"",isAdmin ? 
    {
      field: "Size",
      header: "Size",
    }:"",isAdmin ? 
    {
      field: "Date",
      header: "Date Modified",
    }:"",
    {
      field: "ExternalTrainer",
      header: "Action",
      body: (rowData) => (
        <ButtonGroup>
          <Button
            type="button"
            text
            severity="success"
            icon="pi pi-eye"
            className="p-button-rounded"
            size="small"
            onClick={() => window.open(rowData?.url, '_blank')}
          />
          {isAdmin &&
          <Button
            type="button"
            text
            icon="pi pi-trash"
            severity="danger"
            size="small"
            className="p-button-rounded"
          />}
        </ButtonGroup>
      ),
    },
  ];
const sampleData = [{
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
  Access: 36+ " Training Request"
},

{
  Name: "Onboarding Training Guide",
  header: "Name",
  Type: "MOV",
  Owner: "John Doe",
  Date: "10/25/2026",
  Size: "1.3 GB",
  Access: 3+ " Training Request"
},
]
const [file, setFile] = useState(null)
const uploadFile = async () => {
  //TODO: Implement file upload functionality
  const formData = new FormData();
  formData.append("file", file);
 const res = await fetchFromApi("/Attachment/UploadLargeFile","POST", formData, {'Content-Type': 'multipart/form-data'});
 console.log(res);
}
const header = <><Button label="Upload Video" icon="pi pi-upload" text onClick={() => setShowModal(true)} /></>
  const Content = () => {
    return (
      <>
        <div className="d-flex ">
          {/* <MenuContainer fullHeight label="Documents" itemList={items} /> */}
          <div
            className="flex-fill overflow-auto p-3"
            style={{ minHeight: "100vh" }}
          >
            {selectedItem ? <VideoAccess data={selectedItem} handleClose={()=>setSelectedItem(null)}/> : <>
            <CommonTable
              headerComponent={header}
              tableName="Videos"
              columnItems={sampleItems}
              dataTable={sampleData}
            />
            <VideoUploadForm
              handleShow={showModal}
              handleClose={() => setShowModal(false)}
            /></>}
          </div>
        </div>
      </>
    );
  };
  return (
    <Layout
      navReference="Files"
      header={{
        title: "Dashboard",
        hide: true,
        className: "border-bottom",
      }}
      BodyComponent={() => <Content />}
    />
  );
};
export default DocumentsPage;
