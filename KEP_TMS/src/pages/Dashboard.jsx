import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Banner from "../components/General/Banner";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Layout from "../components/General/Layout";
import SkeletonBanner from "../components/Skeleton/SkeletonBanner";
import { Card, Col, Row } from "react-bootstrap";
import trainingRequestHook from "../hooks/trainingRequestHook";
import { useNavigate } from "react-router-dom";
import { SessionGetEmployeeId, SessionGetRole } from "../services/sessions";
import commonHook from "../hooks/commonHook";
import SkeletonCards from "../components/Skeleton/SkeletonCards";
import { APP_DOMAIN, SearchValueConstant, UserTypeValue } from "../api/constants";
import { TabPanel, TabView } from "primereact/tabview";
import activityLogHook from "../hooks/activityLogHook";
const Dashboard = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const approval = commonHook.useAllAssignedForApproval(SessionGetEmployeeId());
  
  const assignedTraining = trainingRequestHook.usePagedTrainingRequest(1,10, SearchValueConstant.PARTICIPANT,
    SessionGetEmployeeId()
  );
  const pendings =  activityLogHook.useUserPendingTaskList(SessionGetEmployeeId())
  const trainerAssignedData =
  trainingRequestHook.usePagedTrainingRequest(1, 10, SearchValueConstant.FACILITATOR,
    SessionGetEmployeeId()
  );
  const trainingRequests = trainingRequestHook.useTrainingRequestSummary(SessionGetEmployeeId())?.data;
  const values = [
    {
      label: "Submitted",
      color: "#fbbf24",
      value: trainingRequests?.submitted,
      icon: "pi pi-list",
      status: "Pending",
      isRequest: true,
      url: "/RequestList/Pending",
    },
    {
      label: "For Approval Requests",
      color: "#24ccfb",
      value: trainingRequests?.forApproval,
      icon: "pi pi-file-edit",
      status: "Pending",
      isRequest: true,
      url: "/RequestList/ForApproval",
    },
    {
      label: "Disapproved Request",
      color: "#d36034",
      value: trainingRequests?.disapproved,
      icon: "pi pi-replay",
      status: "Disapproved",
      isRequest: true,
      url: "/RequestList/Returned",
    },
    {
      label: "Approved Request",
      color: "#50d0a2",
      value: trainingRequests?.approved,
      icon: "pi pi-thumbs-up",
      status: "Disapproved",
      isRequest: true,
      url: "/RequestList/Approved",
    },
    {
      label: "Closed Request",
      color: "#c084fc",
      value: trainingRequests?.closed,
      icon: "pi pi-check-circle",
      status: "Closed",
      isRequest: true,
      url: "/RequestList/Closed",
    },
  ];
  const assignedTrainingItems = [
    {
      label: "For Your Approval",
      color: "#fa606a",
      value: approval?.data?.overallCount,
      icon: "pi pi-pen-to-square",
      status: "Approver",
      isRequest: false,
      url: "/List/ForApproval",
      loading: approval?.loading,
      disabled: !approval?.data?.overallCount > 0,
    },
    {
      label: "Facilitated Trainings",
      color: "#ff6bbd",
      value:
        trainerAssignedData?.data?.totalRecords,
      icon: "pi pi-tag",
      status: "FacilitatedTrainings",
      isRequest: false,
      loading: trainerAssignedData?.loading,
      url: "/FacilitatedTrainings",
      disabled: !(trainerAssignedData?.data?.totalRecords > 0 || SessionGetRole() === UserTypeValue.FACILITATOR),
    },
    {
      label: "Enrolled Trainings",
      color: "#608dfa",
      value:
        assignedTraining?.data?.totalRecords,
      icon: "pi pi-address-book",
      isRequest: false,
      url: "/Trainings",
      loading: assignedTraining?.loading,
    },
    {
      label: "To Comply",
      color: "#919090",
      value: pendings?.data?.length,
      icon: "pi pi-file",
      isRequest: false,
      url: "/Trainings/ToComply",
      loading: pendings?.loading,
    },
  ];
  const hasRequestAccess = SessionGetRole() === UserTypeValue.ADMIN ||
  SessionGetRole() === UserTypeValue.REQUESTOR ||
  SessionGetRole() === UserTypeValue.FACILITATOR
  const Content = () => {
    return (
      <div className="p-3">
        <>
          <Row className="h-100">
            <Col>
              {assignedTraining?.loading ? (
                <SkeletonBanner />
              ) : (
                <>
                  <Banner setShowModal={() => setShowModal(true)} />
                </>
              )}

              <TabView
                className={`custom-tab ${hasRequestAccess
                    ? ""
                    : "border-0 hide-nav"
                }`}
              >
                <TabPanel
                  header={hasRequestAccess
                      ? "Activities"
                      : ""
                  }
                >
                  {assignedTraining?.loading ? (
                    <SkeletonCards />
                  ) : (
                    <>
                      <Row className="g-2 row-cols-lg-4">
                        {assignedTrainingItems
                          ?.filter((item) => item.disabled !== true)
                          .map((item, index) => (
                            <Col key={index}>
                              <Card
                                className="shadow-sm p-3 h-100 btn "
                                style={{
                                  background: item.color + "1c",
                                  borderColor: item.color,
                                }}
                                onClick={() =>
                                  navigate(`${APP_DOMAIN}${item.url}`)
                                }
                              >
                                <div className="flex justify-content-between gap-2">
                                  <div className="flex  flex-column gap-1">
                                    <span className="text-secondary h5">
                                      {item.label}
                                    </span>
                                    <span className="font-bold h4">
                                      {item?.loading ? (
                                        <i className="text-secondary pi pi-spin pi-spinner-dotted"></i>
                                      ) : item.value > 0 ? (
                                        item.value
                                      ) : (
                                        "0"
                                      )}
                                    </span>
                                  </div>
                                  <span
                                    className="p-3 ratio ratio-1x1 d-flex justify-content-center align-items-center text-center rounded-circle"
                                    style={{
                                      backgroundColor: item.color,
                                      color: "#ffffff",
                                      width: "4rem",
                                    }}
                                  >
                                    <i
                                      className={item.icon}
                                      style={{
                                        top: "unset",
                                        left: "unset",
                                        fontSize: "2rem",
                                        height: "unset",
                                      }}
                                    />
                                  </span>
                                </div>
                              </Card>
                            </Col>
                          ))}
                      </Row>
                    </>
                  )}
                </TabPanel>
                {(hasRequestAccess) && (
                  <TabPanel header={"Training Requests"}>
                    {trainingRequests?.loading ? (
                      <SkeletonCards />
                    ) : (
                      (hasRequestAccess ||
                        trainingRequests?.data?.length > 0) && (
                        <>
                          <Row className="g-2 row-cols-lg-4">
                            {values.map((item, index) => (
                              <Col key={index}>
                                <Card
                                  className="shadow-sm p-3 h-100 btn"
                                  style={{
                                    background: item.color + "1c",
                                    borderColor: item.color,
                                  }}
                                  onClick={() =>
                                    navigate(`${APP_DOMAIN + item.url}`)
                                  }
                                >
                                  <div className="flex justify-content-between gap-2">
                                    <div className="flex flex-column gap-1">
                                      <span className="text-secondary h5">
                                        {item.label}
                                      </span>
                                      <span className="font-bold h4">
                                        {item.value ?? 0}
                                      </span>
                                    </div>
                                    <span
                                      className="p-3 ratio ratio-1x1 d-flex justify-content-center align-items-center text-center rounded-circle"
                                      style={{
                                        backgroundColor: item.color,
                                        color: "#ffffff",
                                        width: "4rem",
                                      }}
                                    >
                                      <i
                                        className={item.icon}
                                        style={{
                                          top: "unset",
                                          left: "unset",
                                          fontSize: "2rem",
                                          height: "unset",
                                        }}
                                      />
                                    </span>
                                  </div>
                                </Card>
                              </Col>
                            ))}
                          </Row>
                        </>
                      )
                    )}
                  </TabPanel>
                )}
              </TabView>
              <br />
            </Col>
            <br />
          </Row>
        </>
      </div>
    );
  };
  return (
    <Layout
      navReference="Dashboard"
      header={{ title: "Dashboard", icon: <FontAwesomeIcon icon={faHouse} />, hide:true, className: "border-bottom" }}
      BodyComponent={() => <Content />}
      showModalAction={showModal}
      returnAction={setShowModal}
    />
  );
};

export default Dashboard;
