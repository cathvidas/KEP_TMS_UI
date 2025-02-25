import Layout from "../components/General/Layout";
import trainingRequestHook from "../hooks/trainingRequestHook";
import { SessionGetEmployeeId } from "../services/sessions";
import CertificatesList from "../components/certificate/CertificatesList";
const CertificatesPage = () => {
  const contentBody = () => (
    <>
      <div className="px-3">
        <CertificatesList userId={SessionGetEmployeeId()} />
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
        hide:true
      }}
    />
  );
};

export default CertificatesPage;
