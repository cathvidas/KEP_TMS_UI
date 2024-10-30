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

const Dashboard = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { data, error, loading } =
    SessionGetRole() == "Admin" || SessionGetRole() == "SuperAdmin"
      ? trainingRequestHook.useStatusCount()
      : trainingRequestHook.useStatusCount(SessionGetEmployeeId());
  const approval = commonHook.useAllAssignedForApproval(
    SessionGetEmployeeId()
  );
  const values = [
    ...(approval?.data?.overallCount > 0
      ? [
          {
            label: "For Approval",
            color1: "#60a5fa",
            color2: "#60a5fa",
            value: approval?.data?.overallCount,
            icon: "pi pi-user-edit",
            status: "Approver",
          },
        ]
      : []),
    ...(data?.trainerAction > 0
      ? [
          {
            label: "Facilitated Trainings",
            color1: "#ff6bbd",
            color2: "#ff6b6b",
            value: data?.trainerAction,
            icon: "pi pi-tag",
            status: "AssignedTrainings",
          },
        ]
      : []),
    {
      label: "Assigned Trainings",
      color1: "#60c8fa",
      color2: "#60a5fa",
      value: data.assignedTraining ?? 0,
      icon: "pi pi-address-book",
      status: "Training",
    },
    {
      label: "Pending Request",
      color1: "#fbbf24",
      color2: "#fbbf24",
      value: data.pending,
      icon: "pi pi-list-check",
      status: "Pending",
    },
    ...(data?.outDatedRequests > 0
      ? [
          {
            label: "Outdated Requests",
            color1: "#ff6b6b",
            color2: "#ff6b6b",
            value: data?.outDatedRequests,
            icon: "pi pi-clock",
            status: "OutDated",
          },
        ]
      : []),
      {
        label: "Returned Request",
        color1: "#d36034",
        color2: "#31bf77",
        value: data.rejected ?? 0,
        icon: "pi pi-times-circle",
        status: "Disapproved",
      },
      {
        label: "Published Request",
        color1: "#34d399",
        color2: "#31bf77",
        value: data.published ?? 0,
        icon: "pi pi-check-circle",
        status: "Published",
      },
    {
      label: "Closed Request",
      color1: "#c084fc",
      color2: "#c084fc",
      value: data.closed,
      icon: "pi pi-bookmark",
      status: "Closed",
    },
  ];
  const Content = () => {
    return (
      <div className="p-3">
        {loading ? (
          <>
            <SkeletonBanner />
            <SkeletonCards/>
          </>
        ) : (
          <>
            <Banner setShowModal={() => setShowModal(true)} />

            <Row className="mt-4 g-2 row-cols-lg-4">
              {values.map((item, index) => (
                <Col key={index}>
                  <Card
                    className="shadow-sm p-3 h-100 btn"
                    style={{
                      background: item.color1 + "1c",
                      borderColor: item.color1,
                    }}
                    onClick={() =>
                      navigate(
                        `/KEP_TMS/${
                          item.status === "Approver"
                            ? "List/ForApproval"
                            : item.status === "Training"
                            ? "Trainings"
                            : item.status === "AssignedTrainings"
                            ? "AssignedTrainings"
                            : `RequestList/${item?.status}`
                        }`
                      )
                    }
                  >
                    <div className="flex justify-content-between gap-5">
                      <div className="flex flex-column gap-1">
                        <span className="text-secondary h5">{item.label}</span>
                        <span className="font-bold h4">{item.value ?? 0}</span>
                      </div>
                      <span
                        className="p-3 ratio ratio-1x1 d-flex justify-content-center align-items-center text-center rounded-circle"
                        style={{
                          backgroundColor: item.color1,
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
        {/* <TrainingRequestTableList filterType={"UserRole"} setLoading={()=>setLoading(false)}/> */}
      </div>
    );
  };

  return (
    <Layout
      header={{ title: "Dashboard", icon: <FontAwesomeIcon icon={faHouse} /> }}
      BodyComponent={() => <Content />}
      showModalAction={showModal}
      returnAction={setShowModal}
    />
  );
};

export default Dashboard;
