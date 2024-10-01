import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Banner from "../components/General/Banner";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Layout from "../components/General/Layout";
import TRequestTable from "../components/General/TRequestTable";
import SkeletonBanner from "../components/Skeleton/SkeletonBanner";
import SkeletonDataTable from "../components/Skeleton/SkeletonDataTable";
import { Card, Col, Row } from "react-bootstrap";
import trainingRequestHook from "../hooks/trainingRequestHook";
import { SessionGetEmployeeId } from "../services/sessions";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const {data, error, loading} = trainingRequestHook.useStatusCount();
  console.log(data)
  const values = [
    { label: 'Pending', color1: '#fbbf24', color2: '#fbbf24', value: data.pending, icon: 'pi pi-list-check', status: 'Pending' },
    { label: 'Approved', color1: '#34d399', color2: '#31bf77', value: data.approved, icon: 'pi pi-check-circle', status: 'Approved' },
    { label: 'On Going', color1: '#60a5fa', color2: '#60a5fa', value: data.ongoing ?? 0, icon: 'pi pi-clock', status: 'Published' },
    { label: 'Closed', color1: '#c084fc', color2: '#c084fc', value: data.closed, icon: 'pi pi-bookmark', status: 'Closed' }
];
  const Content = () => {
    return (
      <div className="p-3">
        {loading ? <>
        <SkeletonBanner/>
        </>: <>
        <Banner  setShowModal={()=>setShowModal(true)} />
          
        <Row className="mt-4 g-2 ">
            {values.map((item, index) => (
              <Col  key={index}>
                <Card className="shadow-sm p-3 btn" style={{background: item.color1 + "1c", borderColor: item.color1}} onClick={()=>navigate(`/KEP_TMS/RequestList/${item?.status}`)}>
                    <div className="flex justify-content-between gap-5">
                        <div className="flex flex-column gap-1">
                            <span className="text-secondary h5">{item.label}</span>
                            <span className="font-bold h4">{item.value}</span>
                        </div>
                        <span className="p-3 ratio ratio-1x1 d-flex justify-content-center align-items-center text-center rounded-circle" style={{ backgroundColor: item.color1, color: '#ffffff' , width: "4rem"}}>
                            <i className={item.icon}  style={{top: "unset", left: "unset", fontSize: "2rem", height: "unset"}}/>
                        </span>
                    </div>
                </Card></Col>
            ))}
        </Row></>}
        {/* <TRequestTable filterType={"UserRole"} setLoading={()=>setLoading(false)}/> */}
      </div>)
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
