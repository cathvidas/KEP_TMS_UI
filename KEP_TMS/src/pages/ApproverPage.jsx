import { useNavigate, useParams } from "react-router-dom";
import MenuItemTemplate from "../components/General/MenuItemTemplate";
import MenuContainer from "../components/menus/MenuContainer";
import { useEffect, useState } from "react";
import Layout from "../components/General/Layout";
import ForApprovalRequest from "./ApproverPageSection/ForApprovalRequest";
import ForApprovaleffectiveness from "./ApproverPageSection/ForApprovalEffectiveness";
import commonHook from "../hooks/commonHook";
import { SessionGetEmployeeId } from "../services/sessions";
import ForApprovalReport from "./ApproverPageSection/ForApprovalReport";

const ApproverPage = () => {
  const [trigger, setTrigger] = useState(0);
  const { type, page } = useParams();
  const navigate = useNavigate();
  const [currentContent, setCurrentContent] = useState(0);
  const {data} = commonHook.useAllAssignedForApproval(
    SessionGetEmployeeId(), trigger
  );
  const refreshData = () => {
    setTrigger((prev) => prev + 1);
  };
  const pageContent = [
    <ForApprovalRequest key={0} />,
    <ForApprovaleffectiveness key={1} data={data?.effectiveness} refreshData={refreshData}/>,
    <ForApprovalReport key={2} data={data?.reports} refreshData={refreshData}/>,
  ];
  const items = [
    {
      items: [
        {
          label: "Requests",
          icon: "pi pi-list-check",
          command: () => navigate(`/KEP_TMS/List/ForApproval/Requests`),
          template: MenuItemTemplate,
          active: currentContent === 0 ? true : false,
          badge: data?.requests?.length > 0 ?{value: data?.requests?.length}:false
        },
        {
          label: "Effectiveness",
          icon: "pi pi-file",
          command: () => navigate(`/KEP_TMS/List/ForApproval/Effectiveness`),
          template: MenuItemTemplate,
          active: currentContent === 1 ? true : false,
          badge: data?.effectiveness?.length > 0 ?{value: data?.effectiveness?.length}:false
        },
        {
          label: "Report",
          icon: "pi pi-file-check",
          command: () => navigate(`/KEP_TMS/List/ForApproval/Reports`),
          template: MenuItemTemplate,
          active: currentContent === 2 ? true : false,
          badge: data?.reports?.length > 0 ?{value: data?.reports?.length}:false
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
    } else if (type === "Approved") {
      if (page === "Requests") {
        setCurrentContent(0);
      } else if (page === "Effectiveness") {
        setCurrentContent(4);
      } else if (page === "Reports") {
        setCurrentContent(2);
      }
    }
  }, [page, type]);
  const Content = () => (
    <div className={`d-flex g-0`}>
      <MenuContainer fullHeight itemList={items}/>
      <div
        className={`p-3 pb-5 flex-grow-1`}
        style={{ minHeight: "calc(100vh - 50px)" }}
      >
        {pageContent[currentContent]}
      </div>
    </div>
  );
  return (
    <>
      {" "}
      <Layout
      navReference="List/ForApproval"
        BodyComponent={Content}
        header={{
          title: "For Approval",
          icon: <i className="pi pi-pen-to-square"></i>,
          hide: true
        }}
      />
    </>
  );
};
export default ApproverPage;
