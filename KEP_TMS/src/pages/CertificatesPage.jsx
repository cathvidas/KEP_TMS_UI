import Layout from "../components/General/Layout";
import trainingRequestHook from "../hooks/trainingRequestHook";
import { SessionGetEmployeeId } from "../services/sessions";
import CertificatesList from "../components/certificate/CertificatesList";
import SkeletonList from "../components/Skeleton/SkeletonList";
const CertificatesPage = () => {
  const { data, loading } = trainingRequestHook.useTrainingRequestByTraineeId(SessionGetEmployeeId(), true);
  const contentBody = () => (
    <>
      {loading ? (
        <SkeletonList />
      ) : (
        <div className="px-3">
          <CertificatesList
            userId={SessionGetEmployeeId()}
            trainings={data}
          />
        </div>
      )}
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
