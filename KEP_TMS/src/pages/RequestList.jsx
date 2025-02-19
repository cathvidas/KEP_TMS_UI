import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/General/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getStatusCode from "../utils/status/getStatusCode";
import { SessionGetEmployeeId, SessionGetRole } from "../services/sessions";
import {
  statusCode,
  UserTypeValue,
} from "../api/constants";
import TrainingRequestList from "../components/List/TrainingRequestList";
import MenuContainer from "../components/menus/MenuContainer";
import MenuItemTemplate from "../components/General/MenuItemTemplate";
import { Button } from "primereact/button";
import trainingRequestHook from "../hooks/trainingRequestHook";
const RequestList = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const isAdmin =
    SessionGetRole() == UserTypeValue.ADMIN ||
    SessionGetRole() == UserTypeValue.SUPER_ADMIN
      ? true
      : false;
  const {data} = trainingRequestHook.useTrainingRequestSummary(SessionGetEmployeeId());
  const [filter, setFilter] = useState({
    label: type,
    value: getStatusCode(type),
    data: [],
  });
  const [currentContent, setCurrentContent] = useState(0);
  const items = [
    {
      items: [
        {
          label: "All",
          icon: "pi pi-list",
          command: () => navigate(`/KEP_TMS/RequestList`),
          template: MenuItemTemplate,
          count: data?.active + data?.approved + data?.cancelled + data?.closed + data?.disapproved + data?.forApproval + data?.submitted + (isAdmin ? 0 : data?.drafted),
          active: currentContent === 8 ? true : false,
        },
        {
          label: "Submitted",
          icon: "pi pi-file-import",
          command: () => navigate(`/KEP_TMS/RequestList/Pending`),
          template: MenuItemTemplate,
          count: data?.submitted ,
          active: currentContent === 0 ? true : false,
        },
        {
          label: "For Approval",
          icon: "pi pi-pen-to-square",
          command: () => navigate(`/KEP_TMS/RequestList/ForApproval`),
          template: MenuItemTemplate,
          count: data?.forApproval ,
          active: currentContent === 1 ? true : false,
        },
        {
          label: "Approved",
          icon: "pi pi-thumbs-up",
          command: () => navigate(`/KEP_TMS/RequestList/Approved`),
          template: MenuItemTemplate,
          count: data?.approved ,
          active: currentContent === 2 ? true : false,
        },
        {
          label: "Disapproved",
          icon: "pi pi-replay",
          command: () => navigate(`/KEP_TMS/RequestList/Returned`),
          template: MenuItemTemplate,
          count: data?.disapproved ,
          active: currentContent === 3 ? true : false,
        },
        {
          label: "Closed",
          icon: "pi pi-check-circle",
          command: () => navigate(`/KEP_TMS/RequestList/Closed`),
          template: MenuItemTemplate,
          count: data?.closed ,
          active: currentContent === 5 ? true : false,
        },
        {
          label: "Cancelled",
          icon: "pi pi-times-circle",
          command: () => navigate(`/KEP_TMS/RequestList/Cancelled`),
          template: MenuItemTemplate,
          count: data?.cancelled ,
          active: currentContent === 6 ? true : false,
        },
        {
          label: "Draft",
          icon: "pi pi-file-edit",
          command: () => navigate(`/KEP_TMS/RequestList/Draft`),
          template: MenuItemTemplate,
          count: data?.drafted ,
          active: currentContent === 7 ? true : false,
        },
      ],
    },
  ];

  useEffect(() => {
    const currentPage = type?.toUpperCase();
    if (currentPage === "PENDING") {
      setCurrentContent(0);
      setFilter({
        value: statusCode.SUBMITTED,
        label: "Pending",
      });
    } else if (currentPage === "FORAPPROVAL") {
      setCurrentContent(1);
      setFilter({
        value: statusCode.FORAPPROVAL,
        label: "For Approval",
      });
    } else if (currentPage === "APPROVED") {
      setFilter({
        value: statusCode.APPROVED,
        label: "Approved",
      });
      setCurrentContent(2);
    } else if (currentPage === "RETURNED") {
      setFilter({
        value: statusCode.DISAPPROVED,
        label: "Disapproved",
      });
      setCurrentContent(3);
    } else if (currentPage === "PUBLISED") {
      setCurrentContent(4);
      setFilter({
        value: statusCode.PUBLISHED,
        label: "Published",
      });
    } else if (currentPage === "CLOSED") {
      setFilter({
        value: statusCode.CLOSED,
        label: "Closed",
      });
      setCurrentContent(5);
    } else if (currentPage === "CANCELLED") {
      setFilter({ value: statusCode.INACTIVE, label: "Cancelled"});
      setCurrentContent(6);
    } else if (currentPage === "DRAFT") {
      setCurrentContent(7);
      setFilter({
        value: statusCode.DRAFTED,
        label: "Draft",
      });
    } else {
      setCurrentContent(8);
      setFilter({
        value: null,
        label: "All Training",
      });
    }
  }, [type, ]);
  const Content = () => (
    <>
          <div className={`d-flex `}>
            <MenuContainer
              fullHeight
              itemList={items}
              action={
                <Button
                  type="button"
                  label="Create New"
                  className="theme-bg rounded"
                  size="small"
                  onClick={() => setShowModal(true)}
                />
              }
            />
            <div
              className={`p-3 pb-5 flex-fill overflow-auto`}
              style={{ minHeight: "100vh" }}
            >
              <TrainingRequestList
                userType={"user"}
                requestStatus={filter.value}
                headingTitle={`${filter?.label} Requests`}
                // handleActionFilter={setFilter}
                isAdmin={isAdmin}
                isRequestor
                enablePagination
              />
            </div>
          </div>
    </>
  );
  return (
    <>
      <Layout
        navReference="RequestList"
        BodyComponent={Content}
        header={{
          title: "Training Request",
          icon: <FontAwesomeIcon icon={faStickyNote} />,
          hide: true,
        }}
        showModalAction={showModal}
        returnAction={(e) => setShowModal(e)}
      />
    </>
  );
};
export default RequestList;
