import { Col, Row } from "react-bootstrap";
import { formatDateOnly } from "../../utils/datetime/Formatting";
import { useEffect, useState } from "react";
import CertificateViewModal from "../Modal/CertificateViewModal";
import proptype from "prop-types";
import { SectionHeading } from "../General/Section";
import { Button } from "primereact/button";
import CertificateForm from "../forms/ModalForms/CertificateForm";
import certificateHook from "../../hooks/certificateHook";
import { SessionGetEmployeeId } from "../../services/sessions";
const CertificatesList = ({ userId }) => {
  const [showCerticateDetail, setShowCerticateDetail] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [dataToUpdate, setDataToUpdate] = useState(null);
  const certificates = certificateHook.useAllTraineeCertificates(
    userId ?? SessionGetEmployeeId(),
    trigger
  );
  useEffect(() => {
    if(selectedData){
    const selCert = certificates?.data?.find((item) =>item?.training?.id === selectedData?.training?.id);
    if(selCert){
      setSelectedData(selCert)
    if(dataToUpdate){
        const toUpdateCert = selCert?.certificates?.find((cert) => cert.id === dataToUpdate?.id);
        if(toUpdateCert){
            setDataToUpdate(toUpdateCert)
        }
    }
    }else{
      setSelectedData(null)
      setShowCerticateDetail(false)
    }
}
  }, [certificates?.data, dataToUpdate, selectedData]);
  console.log(certificates?.data?.length, certificates, userId,)
  return (
    <>
      {!showCerticateDetail ? (
        <>
          <div className="flex justify-content-between align-items-center mb-2 mt-3">
            <SectionHeading title="Training Certificates" />
            <Button
              type="button"
              icon="pi pi-plus"
              label="Add New"
              className="p-button-rounded p-button-success float-right py-1 rounded"
              onClick={() => {setShowModal(true);
                setSelectedData(null);
                setDataToUpdate(null);
              }}
            />
          </div>
          {certificates?.data?.length > 0 ?
          <Row className="row-cols-1 row-cols-lg-1 g-2">
            {certificates?.data?.map((item) => (
              <>
                <Col>
                  <div
                    className="flex border rounded p-3 cursor-pointer theme-hover-light align-items-center gap-3 bg-white"
                    onClick={() => {
                      setSelectedData(item);
                      setShowCerticateDetail(true);
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
                      <h5 className="m-0 ">
                        {item?.training?.trainingProgram?.name}
                      </h5>
                      <div className="flex align-items-center gap-2">
                        <span>{item?.training?.trainingCategory?.name}</span>{" "}
                        &nbsp;|&nbsp;{" "}
                        {`${formatDateOnly(item?.training?.trainingStartDate)} 
                        ${
                          formatDateOnly(item?.training?.trainingStartDate) !==
                          formatDateOnly(item?.training?.trainingEndDate)
                            ? " - " +
                              formatDateOnly(item?.training?.trainingEndDate)
                            : ""
                        }`}
                      </div>
                      <div className="flex align-items-center gap-2">
                        &nbsp; {item?.certificate?.length} items
                        &nbsp;|&nbsp;{" "}
                        {item?.certificate?.map(cert=><>
                        <span className="theme-color">{cert?.detail}</span>
                         ;
                        </>)}
                      </div>
                    </div>
                    {/* <span className="font-bold text-900 ms-auto">${"item.price"}</span> */}
                  </div>
                </Col>
              </>
            ))}
          </Row>:
          <div className="text-center text-900 my-5">No certificates uploaded</div>}
        </>
      ) : (
        <CertificateViewModal
          hideModalFunction={() => setShowCerticateDetail(false)}
          data={selectedData}
          onFinish={()=>setTrigger((prev) => prev + 1)}
          onUpdate={(e)=>{
            setShowModal(true);
            setDataToUpdate(e)
          }}
        />
      )}
      <CertificateForm
        userId={userId}
        showModal={showModal}
        hideModal={() => setShowModal(false)}
        onFinish={(e) => {
          setShowModal(!e);
          setTrigger((prev) => prev + 1);
        }}
        defaultValue={dataToUpdate}
      />
    </>
  );
};

CertificatesList.propTypes = {
  trainings: proptype.array,
  userId: proptype.string,
};
export default CertificatesList;
