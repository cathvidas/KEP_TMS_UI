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
import PendingActionsSection from "../components/dashboard/PendingActionsSection";
import { SectionTitle } from "../components/General/Section";
import { APP_DOMAIN, UserTypeValue } from "../api/constants";
import activityLogHook from "../hooks/activityLogHook";
import SkeletonList from "../components/Skeleton/SkeletonList";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const approval = commonHook.useAllAssignedForApproval(SessionGetEmployeeId());
  const assignedTraining = trainingRequestHook.useTrainingRequestByTraineeId(
    SessionGetEmployeeId()
  );
  const trainingRequests =
  SessionGetRole() == "Admin" || SessionGetRole() == "SuperAdmin" ? trainingRequestHook.useAllTrainingRequests(): trainingRequestHook.useAllTrainingRequests(
    SessionGetEmployeeId()
  );
  const trainerAssignedData = trainingRequestHook.useParticipantTrainings(
    SessionGetEmployeeId(),
    "trainer"
  );
  const pendingTasks = activityLogHook.useUserPendingTaskList(
    SessionGetEmployeeId(),
    assignedTraining?.mappedData?.pending
  );
  const values = [
    {
      label: "Pending Effectiveness",
      color: "#fbbf24",
      value: trainingRequests?.mappedData?.submitted?.length,
      icon: "pi pi-list-check",
      status: "Pending",
      isRequest: true,
      url: "/RequestList/Pending",
    },
    {
      label: "For Approval Requests",
      color: "#fbbf24",
      value: trainingRequests?.mappedData?.forApproval?.length,
      icon: "pi pi-list-check",
      status: "Pending",
      isRequest: true,
      url: "/RequestList/ForApproval",
    },
          {
            label: "Outdated Requests",
            color: "#ff6b6b",
            value: trainingRequests?.mappedData?.outdated?.length,
            icon: "pi pi-clock",
            status: "OutDated",
            isRequest: true,
            url: "/RequestList/OutDated",
            disabled: !trainingRequests?.mappedData?.outdated?.length > 0,
          },
    {
      label: "Returned Request",
      color: "#d36034",
      value: trainingRequests?.mappedData?.returned?.length,
      icon: "pi pi-times-circle",
      status: "Disapproved",
      isRequest: true,
      url: "/RequestList/Returned",
    },
    {
      label: "Published Request",
      color: "#34cdd3",
      value: trainingRequests?.mappedData?.published?.length,
      icon: "pi pi-check-circle",
      status: "Published",
      isRequest: true,
      url: "/RequestList/Publised",
    },
    {
      label: "Closed Request",
      color: "#c084fc",
      value: trainingRequests?.mappedData?.closed?.length,
      icon: "pi pi-bookmark",
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
      isRequest: true,
      url: "/List/ForApproval",
      disabled: !approval?.data?.overallCount > 0,
    },
    {
      label: "Facilitated Trainings",
      color: "#ff6bbd",
      value: trainerAssignedData?.mappedData?.approved?.length +  trainerAssignedData?.mappedData?.closed?.length+ trainerAssignedData?.mappedData?.published?.length,
      icon: "pi pi-tag",
      status: "FacilitatedTrainings",
      isRequest: false,
      url: "/Trainings/facilitated",
      disabled: !(trainerAssignedData?.mappedData?.approved?.length +  trainerAssignedData?.mappedData?.closed?.length+ trainerAssignedData?.mappedData?.published?.length) > 0,
    },
    {
      label: "Enrolled Trainings",
      color: "#608dfa",
      value:
        assignedTraining?.mappedData?.ongoing?.length +
        assignedTraining?.mappedData?.upcoming?.length +
        assignedTraining?.mappedData?.attended?.length,
      icon: "pi pi-address-book",
      status: "Training",
      isRequest: false,
      url: "/Trainings",
      disabled: SessionGetRole() !== UserTypeValue.FACILITATOR,
    },
    {
      label: "Ongoing Trainings",
      color: "#608dfa",
      value: assignedTraining?.mappedData?.ongoing?.length ?? 0,
      icon: "pi pi-address-book",
      status: "Training",
      isRequest: false,
      url: "/Trainings",
      disabled: SessionGetRole() === UserTypeValue.FACILITATOR,
    },
    {
      label: "Upcoming Trainings",
      color: "#faea60",
      value: assignedTraining?.mappedData?.ongoing?.upcoming ?? 0,
      icon: "pi pi-calendar-clock",
      status: "Training",
      isRequest: false,
      url: "/Trainings/upcoming",
      disabled: SessionGetRole() === UserTypeValue.FACILITATOR,
    },
    {
      label: "Attended Trainings",
      color: "#34d399",
      value: assignedTraining?.mappedData?.attended?.length ?? 0,
      icon: "pi pi-address-book",
      status: "Training",
      isRequest: false,
      url: "/Trainings/attended",
      disabled: SessionGetRole() === UserTypeValue.FACILITATOR,
    },
  ];
  const Content = () => {
    return (
      <div className="p-3">
        <>
          <Row className="h-100">
            <Col className="col-xl-9 col-12">
              {assignedTraining?.loading ? (
                <SkeletonBanner />
              ) : (
                <>
                  <Banner setShowModal={() => setShowModal(true)} />
                </>
              )}
              {assignedTraining?.loading ? (
                <SkeletonCards />
              ) : (
                <>
                  <SectionTitle title="Assigned Trainings" />
                  <Row className="g-2 row-cols-lg-4">
                    {assignedTrainingItems
                      ?.filter((item) => item.disabled !== true)
                      .map((item, index) => (
                        <Col key={index}>
                          <Card
                            className="shadow-sm p-3 h-100 btn"
                            style={{
                              background: item.color + "1c",
                              borderColor: item.color,
                            }}
                            onClick={() => navigate(`${APP_DOMAIN}${item.url}`)}
                          >
                            <div className="flex justify-content-between gap-5">
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
              )}
              <br />
              {trainingRequests?.loading ? (
                <SkeletonCards />
              ) : (
                (SessionGetRole() === UserTypeValue.ADMIN ||
                  SessionGetRole() === UserTypeValue.REQUESTOR ||
                  trainingRequests?.data?.length > 0) && (
                  <>
                    <SectionTitle title="Training Requests" />
                    <Row className="g-2 row-cols-lg-4">
                      {values.map((item, index) => (
                        <Col key={index}>
                          <Card
                            className="shadow-sm p-3 h-100 btn"
                            style={{
                              background: item.color + "1c",
                              borderColor: item.color,
                            }}
                            onClick={() => navigate(`${APP_DOMAIN + item.url}`)}
                          >
                            <div className="flex justify-content-between gap-5">
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
              {/* <EnrolledTrainingsSection/> */}
            </Col>
            <br />
            <Col className="col-xl-3 to-do-list-bar">
              {pendingTasks?.loading ? (
                <SkeletonList />
              ) : (
                <PendingActionsSection items={pendingTasks?.data} />
              )}
            </Col>
          </Row>
        </>
      </div>
    );
  };

  return (
    <Layout
      navReference="Dashboard"
      header={{ title: "Dashboard", icon: <FontAwesomeIcon icon={faHouse} /> }}
      BodyComponent={() => <Content />}
      showModalAction={showModal}
      returnAction={setShowModal}
    />
  );
};

export default Dashboard;
