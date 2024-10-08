import { useNavigate, useParams } from "react-router-dom";
import MenuItemTemplate from "../components/General/MenuItemTemplate";
import MenuContainer from "../components/menus/MenuContainer";
import { useEffect, useState } from "react";
import Layout from "../components/General/Layout";
import ForApprovalRequest from "./ApproverPageSection/ForApprovalRequest";
import ForApprovaleffectiveness from "./ApproverPageSection/ForApprovalEffectiveness";

const ApproverPage = () =>{
  const { type, page } = useParams();
    const navigate = useNavigate();
    const [currentContent, setCurrentContent] = useState(0); 
    const pageContent = [
          <ForApprovalRequest key={0} /> ,
          <ForApprovaleffectiveness key={1} />
      ];
  const items = [
    {
      label: "For Approval",
      items: [
        {
          label: "Requests",
          icon: "pi pi-list-check",
          command: () => navigate(`/KEP_TMS/List/ForApproval/Requests`),
          template: MenuItemTemplate,
          active: currentContent === 0 ? true : false,
        },
        {
          label: "Effectiveness",
          icon: "pi pi-file",
          command: () => navigate(`/KEP_TMS/List/ForApproval/Effectiveness`),
          template: MenuItemTemplate,
          active: currentContent === 1 ? true : false,
        },
        {
          label: "Report",
          icon: "pi pi-file-check",
          command: () => navigate(`/KEP_TMS/List/ForApproval/Reports`),
          template: MenuItemTemplate,
          active: currentContent === 2 ? true : false,
        },
      ],
    },
    { separator: true, template: MenuItemTemplate },
    {
      label: "Approved",
      items: [
        {
          label: "Requests",
          icon: "pi pi-list-check",
          command: () => navigate(`/KEP_TMS/List/Approved/Requests`),
          template: MenuItemTemplate,
          active: currentContent === 0 ? true : false,
        },
        {
          label: "Effectiveness",
          icon: "pi pi-file",
          command: () => navigate(`/KEP_TMS/List/Approved/Effectiveness`),
          template: MenuItemTemplate,
          active: currentContent === 1 ? true : false,
        },
        {
          label: "Report",
          icon: "pi pi-file-check",
          command: () => navigate(`/KEP_TMS/List/Approved/Reports`),
          template: MenuItemTemplate,
          active: currentContent === 2 ? true : false,
        },
      ],
    },
  ];
  useEffect(() => {
    if (type === "ForApproval") {
      if (page === "Requests") {
        setCurrentContent(0);
      } else if (page === "Effectiveness") {
        setCurrentContent(1);
      } else if (page === "Reports") {
        setCurrentContent(2);
      }
    } else if(type === "Approved") {
        if (page === "Requests") {
          setCurrentContent(0);
        } else if (page === "Effectiveness") {
          setCurrentContent(1);
        } else if (page === "Reports") {
          setCurrentContent(2);
        }
    }
  }, [page]);
  const Content = () => (
    <div className={`d-flex g-0`}>
      <MenuContainer itemList={items} />
      <div
        className={`border-start p-3 pb-5 flex-grow-1`}
        style={{ minHeight: "calc(100vh - 50px)" }}
      >
        {pageContent[currentContent]}
      </div>
    </div>
  );
    return<>  <Layout
    BodyComponent={Content}
    header={{
      title: "For Approvals",
      icon: <i className="pi pi-pen-to-square"></i>,
    }}
  />
</>
}
export default ApproverPage;