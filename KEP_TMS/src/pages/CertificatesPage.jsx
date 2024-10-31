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
const CertificatesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [trainingsOption, setTrainingsOption] = useState([]);
  const { data, loading } = trainingRequestHook.useUserTrainingsSummary(
    SessionGetEmployeeId()
  );
  // console.log(data);
  useEffect(() => {
    const mappedData = data?.attended?.map(({ id, trainingProgram }) => ({
      value: id,
      label: trainingProgram.name,
    }));
    setTrainingsOption(mappedData);
  }, [data]);
  const conteneBody = () => (
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
      </Row>
      <CertificateForm
        showModal={showModal}
        hideModal={() => setShowModal(false)}
        trainingOptions={trainingsOption}
        onFinish={()=>setShowModal(false)}
      />
    </div>
  );
  return (
    <Layout
      BodyComponent={conteneBody}
      header={{
        title: "Training Certificates",
        icon: <i className="pi pi-trophy"></i>,
      }}
    />
  );
};

export default CertificatesPage;
