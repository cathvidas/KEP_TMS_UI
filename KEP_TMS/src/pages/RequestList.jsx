import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/General/Layout";
import trainingRequestHook from "../hooks/trainingRequestHook";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getStatusCode from "../utils/status/getStatusCode";
import SkeletonDataTable from "../components/Skeleton/SkeletonDataTable";
import { SessionGetEmployeeId, SessionGetRole } from "../services/sessions";
import { statusCode } from "../api/constants";
import TrainingRequestList from "../components/List/TrainingRequestList";
import MenuContainer from "../components/menus/MenuContainer";
import MenuItemTemplate from "../components/General/MenuItemTemplate";
const RequestList = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const isAdmin =
    SessionGetRole() == "Admin" || SessionGetRole() == "SuperAdmin"
      ? true
      : false;
  const { data, mappedData, error, loading } = isAdmin
    ? trainingRequestHook.useAllTrainingRequests()
    : trainingRequestHook.useAllTrainingRequests(SessionGetEmployeeId());
  const [filter, setFilter] = useState({
    label: type,
    value: getStatusCode(type),
    data: []
  });
  // useEffect(() => {
  //   if (filter.label?.toUpperCase() === "OUTDATED") {
  //     let updatedList = [];
  //     data.forEach((item) => {
  //       if (
  //         trainingDetailsService.checkTrainingIfOutDated(item) &&
  //         (item?.status?.id === statusCode.SUBMITTED ||
  //           item?.status?.id === statusCode.FORAPPROVAL ||
  //           item?.status?.id === statusCode.APPROVED)
  //       ) {
  //         updatedList.push(item);
  //       }
  //     });
  //     setRequests(updatedList);
  //   } else if (filter.label === "Pending") {
  //     const updatedList = data.filter(
  //       (request) =>
  //         !trainingDetailsService.checkTrainingIfOutDated(request) &&
  //         (request?.status?.id === statusCode.FORAPPROVAL ||
  //           request?.status?.id === statusCode.SUBMITTED ||
  //           request?.status?.id === statusCode.APPROVED)
  //     );
  //     setRequests(updatedList);
  //   } else if (filter?.value) {
  //     const updatedList = data.filter(
  //       (request) => request?.status?.id === filter.value
  //     );
  //     setRequests(updatedList);
  //   } else {
  //     setRequests(data);
  //   }
  // }, [filter.value, filter.label, type, data]);
  const [currentContent, setCurrentContent] = useState(0);
  const items = [
    {
      items: [
        {
          label: "All",
          icon: "pi pi-list",
          command: () => navigate(`/KEP_TMS/RequestList`),
          template: MenuItemTemplate,
          count: data?.length,
          active: currentContent === 8 ? true : false,
          // badge:
          //   mappedData?.ongoing?.length > 0
          //     ? { value: mappedData?.ongoing?.length }
          //     : false,
        },
        {
          label: "Pending Effectiveness",
          icon: "pi pi-file-import",
          command: () => navigate(`/KEP_TMS/RequestList/Pending`),
          template: MenuItemTemplate,
          count: mappedData?.submitted?.length,
          active: currentContent === 0 ? true : false,
        },
        {
          label: "For Approval",
          icon: "pi pi-file-edit",
          command: () => navigate(`/KEP_TMS/RequestList/ForApproval`),
          template: MenuItemTemplate,
          count: mappedData?.forApproval?.length,
          active: currentContent === 1 ? true : false,
        },
        {
          label: "Approved",
          icon: "pi pi-thumbs-up",
          command: () => navigate(`/KEP_TMS/RequestList/Approved`),
          template: MenuItemTemplate,
          count: mappedData?.approved?.length,
          active: currentContent === 2 ? true : false,
        },
        {
          label: "Returned",
          icon: "pi pi-replay",
          command: () => navigate(`/KEP_TMS/RequestList/Returned`),
          template: MenuItemTemplate,
          count: mappedData?.returned?.length,
          active: currentContent === 3 ? true : false,
        },
        {
          label: "Published",
          icon: "pi pi-clipboard",
          command: () => navigate(`/KEP_TMS/RequestList/Publised`),
          template: MenuItemTemplate,
          count: mappedData?.published?.length,
          active: currentContent === 4 ? true : false,
        },
        {
          label: "Closed",
          icon: "pi pi-check-circle",
          command: () => navigate(`/KEP_TMS/RequestList/Closed`),
          template: MenuItemTemplate,
          count: mappedData?.closed?.length,
          active: currentContent === 5 ? true : false,
        },
        {
          label: "Cancelled",
          icon: "pi pi-times-circle",
          command: () => navigate(`/KEP_TMS/RequestList/Inactive`),
          template: MenuItemTemplate,
          count: mappedData?.inactive?.length,
          active: currentContent === 6 ? true : false,
        },
        {
          label: "OutDated",
          icon: "pi pi-calendar-clock",
          command: () => navigate(`/KEP_TMS/RequestList/OutDated`),
          template: MenuItemTemplate,
          count: mappedData?.outdated?.length,
          active: currentContent === 7 ? true : false,
        },
      ],
    },
  ];
  
  useEffect(() => {
    const currentPage = type?.toUpperCase();
    if (currentPage === "PENDING") {
      setCurrentContent(0);
      setFilter({ value: statusCode.SUBMITTED, label: "Pending", data: mappedData?.submitted });
    } else if (currentPage === "FORAPPROVAL") {
      setCurrentContent(1);
      setFilter({ value: statusCode.FORAPPROVAL, label: "For Approval", data: mappedData?.forApproval });
    } else if (currentPage === "APPROVED") {
      setFilter({ value: statusCode.APPROVED, label: "Approved", data: mappedData?.approved });
      setCurrentContent(2);
    } else if (currentPage === "RETURNED") {
      setFilter({ value: statusCode.DISAPPROVED, label: "Disapproved", data: mappedData?.returned });
      setCurrentContent(3);
    } else if (currentPage === "PUBLISED") {
      setCurrentContent(4);
      setFilter({ value: statusCode.PUBLISHED, label: "Published", data: mappedData?.published });
    } else if (currentPage === "CLOSED") {
      setFilter({ value: statusCode.CLOSED, label: "Closed", data: mappedData?.closed });
      setCurrentContent(5);
    }else if (currentPage === "INACTIVE") {
      setFilter({ value: null, label: "Inactive", data: mappedData?.inactive });
      setCurrentContent(6);
    } else if (currentPage === "OUTDATED") {
      setFilter({ value: null, label: "Outdated", data: mappedData?.outdated });
      setCurrentContent(7);
    } else {
      setCurrentContent(8);
      setFilter({ value: statusCode.PUBLISHED, label: "All Training", data:  data});
    }
  }, [type, mappedData, data]);
  const Content = () => (
    <>
      {loading ? (
        error ? (
          <div className="text-center text-danger">Error: {error?.message}</div>
        ) : (
          <SkeletonDataTable />
        )
      ) : (
        <>
          <div className={`d-flex `}>
            <MenuContainer itemList={items} />
            <div
              className={`p-3 pb-5 flex-fill overflow-auto`}
              style={{ minHeight: "calc(100vh - 50px)" }}
            >
              <TrainingRequestList
                userType={"user"}
                data={filter.data}
                filter={filter}
                headingTitle={`${filter?.label} Requests`}
                handleActionFilter={setFilter}
                isAdmin={isAdmin}
                isRequestor
              />
            </div>
          </div>
        </>
      )}
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
        }}
      />
    </>
  );
};
export default RequestList;
