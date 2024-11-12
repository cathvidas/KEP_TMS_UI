import { Card } from "primereact/card";
import Layout from "../components/General/Layout";
import { SectionHeading } from "../components/General/Section";
import cardHeaderImg from "../img/examHeader.png";
import { Col, Row } from "react-bootstrap";
import { Button } from "primereact/button";
import CertificateForm from "../components/forms/ModalForms/CertificateForm";
import trainingRequestHook from "../hooks/trainingRequestHook";
import { SessionGetEmployeeId } from "../services/sessions";
import { useEffect, useState } from "react";
import attachmentHook from "../hooks/attachmentHook";
import CertificateViewModal from "../components/Modal/CertificateViewModal";
import certificateHook from "../hooks/certificateHook";
const CertificatesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCerticateDetail, setShowCerticateDetail] = useState(false);
  const [trainingsOption, setTrainingsOption] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [trigger, setTrigger] = useState({});
  const { data, loading } = trainingRequestHook.useUserTrainingsSummary(
    SessionGetEmployeeId()
  );
  // const certicates = []
  const certicates = certificateHook.useAllTraineeCertificates(SessionGetEmployeeId(), data?.attended, trigger
  );
  console.log(certicates)
  useEffect(() => {
    const mappedData = data?.attended?.map(({ id, trainingProgram }) => ({
      value: id,
      label: trainingProgram.name,
    }));
    setTrainingsOption(mappedData);
  }, [data]);

  const contentBody = () => (
    <>
        <div className="px-3">
          <div className="flex justify-content-between align-items-center mt-3">
            <SectionHeading title="Recent" />
            <Button
              type="button"
              icon="pi pi-plus"
              label="Add New"
              className="p-button-rounded p-button-success float-right py-1 rounded"
              onClick={() => setShowModal(true)}
            />
          </div>
          <Row className="row-cols-lg-5 row-cols-md-3 row-cols-sm-2">
            <Col>
                  <Col>
              <Card
                title="Recent"
                subTitle="Certificates"
                header={
                  <div className="position-relative">
                    <img alt="Card" src={cardHeaderImg} />
                  </div>
                }
              ></Card>
            </Col>
            </Col>
          </Row>
          <br />
          <SectionHeading title="Recent" />
          <Row className="row-cols-1 row-cols-lg-1 g-2">
            {certicates?.data?.newTrainings?.map((item) => (
              <>
              {item?.certificate?.length > 0 && 
                <Col>
                  <div className="flex border rounded p-2 px-3 align-items-center gap-3 bg-white" onClick={()=>{setSelectedData({...item, title: item?.trainingProgram?.name});
                setShowCerticateDetail(true);
                }}>
                    <span
                      className="rounded-pill bg-light bg-danger flex justify-content-center"
                      style={{ width: "3rem", height: "3rem" }}
                    >
                      <i
                        className="pi pi-trophy text-secondary"
                        style={{ fontSize: "1.5rem" }}
                      ></i>
                    </span>
                    <div className="flex-wrap flex-grow-1 d-flex flex-column gap-2">
                      <h6 className="m-0 ">{item?.trainingProgram?.name}</h6>
                      <div className="flex align-items-center gap-2">
                        <i className="pi pi-tag text-sm"></i>
                        <span>{item?.trainingCategory?.name}</span>
                      </div>
                    </div>
                    {/* <span className="font-bold text-900 ms-auto">${"item.price"}</span> */}
                  </div>
                </Col>}
              </>
            ))}
          </Row>
          <CertificateViewModal
          showModal={showCerticateDetail}
          hideModalFunction={() => setShowCerticateDetail(false)}
          title={selectedData?.title}
          items={selectedData?.certificate}
          />
          <CertificateForm
            showModal={showModal}
            hideModal={() => setShowModal(false)}
            trainingOptions={trainingsOption}
            onFinish={() => {setShowModal(false);
              setTrigger(prev=>prev+1)
            }}
          />
        </div>
    </>
  );
  return (
    <Layout
    navReference="Certificates"
      BodyComponent={contentBody}
      header={{
        title: "Training Certificates",
        icon: <i className="pi pi-trophy"></i>,
      }}
    />
  );
};

export default CertificatesPage;
