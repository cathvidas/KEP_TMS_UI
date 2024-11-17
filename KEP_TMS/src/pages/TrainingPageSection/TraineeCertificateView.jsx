import { Button } from "primereact/button";
import { useState } from "react";
import { SectionHeading } from "../../components/General/Section";
import proptype from "prop-types";
import certificateHook from "../../hooks/certificateHook";
import { SessionGetEmployeeId } from "../../services/sessions";
import CertificateViewModal from "../../components/Modal/CertificateViewModal";
import CertificateForm from "../../components/forms/ModalForms/CertificateForm";
import { Col, Row } from "react-bootstrap";

const TraineeCertificateView = ({ data, isAdmin }) => {
  const [trigger, setTrigger] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [showCertificateViewModal, setShowCertificateViewModal] = useState(false);
  const certificates = certificateHook.useTrainingCertificatesByRequestId(
    data?.id,
    isAdmin ? null : SessionGetEmployeeId(),
    trigger
  );
  const userOptions = ()=>{
    return data?.trainingParticipants?.map((item) => {
      return {
        label: item.fullname,
        value: item.employeeBadge,
      };
    })
  }
  const getUserDetail = (userId) => {
    return data?.trainingParticipants?.find(
      (item) => item.employeeBadge === userId
    )?.fullname;
  };
  return (
    <div>
      <div className="flex justify-content-between align-items-center mb-2 mt-3">
        <SectionHeading
          title="Training Certificate"
          icon={<i className="pi pi-trophy" />}
        />
        <Button
          type="button"
          icon="pi pi-plus"
          label="Add New"
          className="p-button-rounded p-button-success float-right py-1 rounded"
          onClick={() => {
            setShowModal(true);
            setSelectedData(null);
            setDataToUpdate(null);
          }}
        />
      </div>
      {isAdmin ? (<>
        <Row className="g-2">
          {certificates?.data?.map((item) => (
            <>
              <Col className="col-md-6">
                <div
                  className="flex border rounded p-3 cursor-pointer theme-hover-light align-items-center gap-3 bg-white"
                  onClick={() => {
                    setSelectedData(item);
                    setShowCertificateViewModal(true);
                  }}
                >
                  <span
                    className="rounded-pill bg-light bg-danger flex justify-content-center"
                    style={{ width: "3rem", height: "3rem" }}
                  >
                    <i
                      className="pi pi-trophy text-secondary"
                      style={{ fontSize: "1.6rem" }}
                    ></i>
                  </span>
                  <div className="flex-wrap flex-grow-1 d-flex flex-column gap-2">
                    <h5 className="m-0 ">{getUserDetail(item?.userId)}</h5>
                    <div className="flex flex-wrap align-items-center gap-2">
                      {item?.certificate?.length} items &nbsp;|&nbsp;{" "}
                      {item?.certificate?.map((cert) => (
                        <>
                          <span className="theme-color">{cert?.detail}</span>;
                        </>
                      ))}
                    </div>
                  </div>
                  {/* <span className="font-bold text-900 ms-auto">${"item.price"}</span> */}
                </div>
              </Col>
            </>
          ))}
        </Row>
        {showCertificateViewModal &&<>
        <CertificateViewModal
        customHeader={<>
      <div className="flex justify-content-between">
        <h5 className="m-0">{getUserDetail(selectedData?.userId)}</h5>
        <Button
          type="button"
          icon="pi pi-times"
          className="rounded"
          text
          onClick={() => setShowCertificateViewModal(false)}/>
        </div>
        <hr />
        </>}
          hideHeader
          data={{ training: data, certificate: selectedData?.certificate }}
          onUpdate={(e) => {
            setShowModal(true);
            setDataToUpdate(e);
          }}
        /></>}
        </>
      ) : certificates.data.length > 0 ? (
        <CertificateViewModal
          hideHeader
          data={{ training: data, certificate: certificates?.data }}
          onUpdate={(e) => {
            setShowModal(true);
            setDataToUpdate(e);
          }}
        />
      ) : (
        <div className="flex justify-content-center align-items-center py-5">
          No Certificate Found
        </div>
      )}
      <CertificateForm
      userOptions={isAdmin ? userOptions() : []}
        userId={SessionGetEmployeeId()}
        showModal={showModal}
        hideModal={() => setShowModal(false)}
        trainingOptions={[
          { value: data?.id, label: data?.trainingProgram?.name },
        ]}
        defaultTraining={{
          value: data?.id,
          label: data?.trainingProgram?.name,
        }}
        onFinish={(e) => {
          setShowModal(!e);
          setTrigger((prev) => prev + 1);
        }}
        defaultValue={dataToUpdate}
      />
    </div>
  );
};
TraineeCertificateView.propTypes = {
  data: proptype.object.isRequired,
  isAdmin: proptype.bool,
};
export default TraineeCertificateView;
