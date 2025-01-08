import { Button } from "primereact/button";
import CommonTable from "../components/General/CommonTable";
import Layout from "../components/General/Layout";
import MenuItemTemplate from "../components/General/MenuItemTemplate";
import MenuContainer from "../components/menus/MenuContainer";
import { ButtonGroup } from "primereact/buttongroup";
import fetchFromApi from "../api/apiUtil";
import { useState } from "react";

const DocumentsPage = () => {
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
      field: "Name",
      header: "File Name",
    },
    {
      field: "Type",
      header: "Type",
    },
    {
      field: "Size",
      header: "Size",
    },
    {
      field: "Date",
      header: "Date Modified",
    },
    {
      field: "ExternalTrainer",
      header: "Action",
      body: (
        <ButtonGroup>
          <Button
          type="button"
            label="View"
            icon="pi pi-eye"
            className="p-button-rounded"
            size="small"
          />
          <Button
          type="button"
            label="Update"
            icon="pi pi-pencil"
            size="small"
            className="p-button-rounded"
          />
        </ButtonGroup>
      ),
    },
  ];
const sampleData = [{
  Name: "Name",
  Type: "Category",
  Size: "Program",
  Date: "Provider",
},
{
  Name: "Name",
  header: "Name",
  Category: "Category",
  Program: "Program",
  Provider: "Provider",
  ExternalTrainer: "External Trainer",
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
  const Content = () => {
    return (
      <div className="d-flex ">
        <MenuContainer fullHeight label="Documents" itemList={items} />
        <div
          className="flex-fill overflow-auto p-3"
          style={{ minHeight: "100vh" }}
        >
          <CommonTable columnItems={sampleItems} dataTable={sampleData}/>
          <input type="file" onChange={(e) => setFile(e.target.files[0])}></input>
          <Button label="upload" onClick={uploadFile}/>
        </div>
      </div>
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
